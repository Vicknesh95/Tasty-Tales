import React from "react";
import styles from "./Display.module.css";

const LandingPage = () => {
  return (
    <div className="img-container">
      <img
        className={styles.img}
        src="https://images.unsplash.com/photo-1607198179219-cd8b835fdda7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=ktryna-wq7VErajAaE-unsplash.jpg"
        alt="food image"
      ></img>
    </div>
  );
};

export default LandingPage;
