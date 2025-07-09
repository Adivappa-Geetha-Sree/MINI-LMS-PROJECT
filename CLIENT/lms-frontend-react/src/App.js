import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Loginpage";
import Register from "./pages/Register";
import Courses from "./pages/Coursespage";
import Profile from "./pages/Profilepage";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./components/CourseDetails";
import ForgetPassword from "./pages/ForgetPassword";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About from "./pages/About";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Forgetpassword" element={<ForgetPassword/>}/>
        <Route path="/Courses" element={<Courses/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Course/:id" element={<CourseDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
