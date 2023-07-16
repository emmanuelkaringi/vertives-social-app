import './App.css';
import HomePage from './pages/Homepage/HomePage';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Feed from './pages/Feed/Feed';
import {createBrowserRouter,Route,createRoutesFromElements,RouterProvider} from "react-router-dom";

const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route>
   
    <Route path="/" element={<HomePage />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/feed" element={<Feed />} />
    </Route>
   
  )
);

function App() {
    return <RouterProvider router={myRouter} />;
}

export default App;
