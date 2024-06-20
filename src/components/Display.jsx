import React from "react";
import MeatLovers from "./MeatLovers";
import Vegan from "./Vegan";
import WinePairing from "./WinePairing";
import Dessert from "./Dessert";
import NavBar from "./NavBar";
import Favourites from "./Favourites2";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";

const Display = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="MeatLovers" element={<MeatLovers />} />

        <Route path="Vegan" element={<Vegan />} />

        <Route path="Dessert" element={<Dessert />} />

        <Route path="WinePairing" element={<WinePairing />} />

        <Route path="Favourites" element={<Favourites />} />
      </Routes>
    </>
  );
};

export default Display;
