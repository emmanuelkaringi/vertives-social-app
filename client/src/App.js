import "./App.css";
import HomePage from "./pages/Homepage/HomePage";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import { Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={!user ? <SignUp /> : <Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={user ? <Feed /> : <Navigate to ='/login'/>} />
        <Route path='/profile/:id' element={user? <Profile /> : <Navigate to ='/login'/>} />
      </Routes>
    </div>
  );
}

export default App;
