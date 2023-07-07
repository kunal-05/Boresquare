import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import axios from "axios";
import { createClient } from "redis";
import { uuid } from "uuidv4";
const redisClient = createClient();
redisClient.connect().catch(console.error);

const typeDefs = `#graphql

type Query {
  locationPosts: [Location]
  likedLocations: [Location]
  userPostedLocations: [Location]
}
type Location {
    id: ID!
    image: String!
    name: String!
    address: String
    userPosted: Boolean!
    liked: Boolean!
}

type Mutation {
  uploadLocation(image: String!, address: String, name: String): Location
  updateLocation(id: ID!, image: String, name: String, address: String, userPosted: Boolean, liked: Boolean): Location
  deleteLocation(id: ID!): Location
}
`;
const resolvers = {
  Query: {
    locationPosts: async (_, { nums = 10 }) => {
      try {
        const locations = [];
        const baseURL = "https://api.foursquare.com/v3/places/search";
        const options = {
          method: "GET",
          params: { limit: 50 },
          headers: {
            accept: "application/json",
            Authorization: "fsq3h1u0Aqe4F8pk+P24fcyYOH0u5ngVuhHk8eLC6O6+uGE=",
          },
        };
        const response = await axios.get(baseURL, options);
        if(response.data.results.length===0){
          return "Not able to retrieve data!"
        }
        for (let resp of response.data.results) {
          const photosResponse = await axios.get(
            `https://api.foursquare.com/v3/places/${resp.fsq_id}/photos`,
            options
          );
          if (photosResponse.data[0] !== undefined) {
            const photoItems = photosResponse.data[0];
            const prefix = photoItems.prefix;
            const suffix = photoItems.suffix;
            const image = `${prefix}original${suffix}`;
            if (await redisClient.get(resp.fsq_id)) {
              let temp = await redisClient.get(resp.fsq_id);
              // const location = JSON.parse(locationIds[id]);
              locations.push(JSON.parse(temp));
            } else {
              locations.push({
                id: resp.fsq_id,
                image: image,
                name: resp.name,
                address: resp.location.formatted_address,
                userPosted: false,
                liked: false,
              });
            }
          }
        }
        return locations;
      } catch (e) {
        return e.message;
      }
    },
    likedLocations: async () => {
      try {
        const locationIds = await redisClient.lRange("likedLocations", 0, -1);
        const locations = [];
        if (locationIds.length === 0) {
          return [];
        }
        for (let id in locationIds) {
          let temp = await redisClient.get(locationIds[id]);

          locations.push(JSON.parse(temp));
        }
        return locations;
      } catch (error) {
        return error.message;
      }
    },
    userPostedLocations: async () => {
      try {
        const locationIds = await redisClient.lRange(
          "userPostedLocations",
          0,
          -1
        );
        if (locationIds.length === 0) {
          return [];
        }
        const locations = [];

        for (let id in locationIds) {
          let temp = await redisClient.get(locationIds[id]);
          locations.push(JSON.parse(temp));
        }

        return locations;
      } catch (error) {
        return error.message;
      }
    },
  },

  Mutation: {
    uploadLocation: async (_, { name, address, image }) => {
      try {
        const id = uuid();
        const location = {
          id: id,
          name: name,
          address: address,
          image: image,
          userPosted: true,
          liked: false,
        };
        await redisClient.set(location["id"], JSON.stringify(location));
        await redisClient.rPush("userPostedLocations", id);

        return location;

      } catch (error) {
        console.log(error.message)
        return error.message;
      }
    },
    updateLocation: async (
      _,
      { id, name, address, image, userPosted, liked }
    ) => {
      try {
        const location = {
          id: id,
          name: name,
          address: address,
          image: image,
          userPosted: userPosted,
          liked: liked,
        };
        if (!liked) {
          await redisClient.LREM("likedLocations", 0, id);
          if (!userPosted) {
            await redisClient.DEL(id);
          } else {
            await redisClient.set(id, JSON.stringify(location));
          }
        } else {
          await redisClient.set(id, JSON.stringify(location));
          await redisClient.rPush("likedLocations", id);
        }
        return location;
      } catch (error) {
        return error.message;
      }
    },
    deleteLocation: async (_, { id }) => {
      try {
        await redisClient.LREM("userPostedLocations", 0, id);
        await redisClient.DEL(id);
      
        const locationIds = await redisClient.lRange(
          "userPostedLocations",
          0,
          -1
        );
        if (locationIds.length >= 0) {
          return {
            id: "undefined",
            name: "undefined",
            address: "undefined",
            image: "undefined",
            userPosted: false,
            liked: false,
          };
        }
        const locations = [];

        for (let id in locationIds) {
          let temp = await redisClient.get(locationIds[id]);
          locations.push(JSON.parse(temp));
        }
      
        return locations;
      } catch (error) {
        return error.message;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
