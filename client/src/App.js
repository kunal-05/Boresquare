import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import NewLocation from './components/NewLoction'
import LocationList from './components/LocationList'
import LikedLocations from './components/LikedLocations'
import MyLocations from './components/MyLocations'


function App() {
  return (

    <div className="App">

      <Router>
        <header className="App-header">
          <h1 className="App-title">
            BORESQUARE
          </h1>

          <nav>
            <ul>
              <li>
                <NavLink className="navlink" to="/my-locations">
                  My locations
                </NavLink>
              </li>
              {/* <li>
                <NavLink className="navlink" to="/new-location">
                  Add New Location
                </NavLink>
              </li> */}
              <li>
                <NavLink className="navlink" to="/my-likes">
                  Liked Location
                </NavLink>
              </li>
              <li>
                <NavLink className="navlink" to="/">
                  Home
                </NavLink>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<LocationList/>} />
            <Route
              path="/my-likes"
              element={<LikedLocations/>}
            />
            <Route
              path="/new-location"
              element={<NewLocation/>}
            />
            <Route
              path="/my-locations"
              element={<MyLocations/>}
            />
          </Routes>
        </header>
      </Router>
    </div>
  );
}

export default App;
