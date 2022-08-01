import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Teams from "./components/Teams";
import Calendar from "./components/Calendar";
import Manage from "./components/Manage";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='team' element={<Teams />} />
        <Route path='calendar' element={<Calendar />} />
        <Route path='manage' element={<Manage />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
