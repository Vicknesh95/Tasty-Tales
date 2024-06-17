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
            to="/Vegetarian"
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            Vegetarian
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
      </ul>
    </nav>
  );
};

export default NavBar;
