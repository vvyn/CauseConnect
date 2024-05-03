import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import VDsidebar from "./components/VDsidebar";
import NPsidebar from "./components/NPsidebar";
import "./App.css";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function App() {
  const SelectSidebar = () => {
    const location = useLocation();
    if (location.pathname.startsWith('/np') && !location.pathname.startsWith('/np/login') && !location.pathname.startsWith('/np/signup')){
      return <NPsidebar />;
    } else if (location.pathname.startsWith('/vd') && !location.pathname.startsWith('/vd/login') && !location.pathname.startsWith('/vd/signup')){
      return <VDsidebar />;
    } else {
      return <Sidebar />;
    }
  };
  
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <SelectSidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
