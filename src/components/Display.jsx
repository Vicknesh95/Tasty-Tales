import React from "react";
import MeatLovers from "./MeatLovers";
import Vegan from "./Vegan";
import WinePairing from "./WinePairing";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";

const Display = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="MeatLovers" element={<MeatLovers />} />

        <Route path="Vegetarian" element={<Vegan />} />

        <Route path="WinePairing" element={<WinePairing />} />
      </Routes>
    </>
  );
};

export default Display;
