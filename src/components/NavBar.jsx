import React from "react";
import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/" className={styles.title}>
        TASTY TALES
      </NavLink>

      <ul>
        <li>
          <NavLink
            to="/MeatLovers"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            Meat Lovers
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Vegan"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            Vegan
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Dessert"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            Dessert
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/WinePairing"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            Wine Pairing
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Favourites"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            Favourites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
