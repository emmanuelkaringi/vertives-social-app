import "./App.css";
import HomePage from "./pages/Homepage/HomePage";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import Feed from "./pages/Feed/Feed";
import { Routes, Route} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={!user ? <HomePage /> : <Feed />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={user ? <Feed /> : <SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
