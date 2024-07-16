import React from "react";
import Navebar from "../Navebar/Navebar";
import Footer from "../Footer/Footer";
//import Display from '../Display/Display';
import { Outlet } from "react-router-dom";
export default function LayOut() {
  return (
    <>
      <Outlet />
    </>
    
 
  );
}
