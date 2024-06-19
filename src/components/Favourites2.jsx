import React, { useState, useEffect } from "react";
import styles from "./Recipes.module.css";

const Favourites2 = () => {
  const [showFavourites, setShowFavourites] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(
        "https://api.airtable.com/v0/appyQOE6dqHGqSVnJ/Table%201?maxRecords=20&view=Grid%20view",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("fetch error");
      }
      const data = await res.json();

      setShowFavourites(data.records);
      // console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      Favourites
      {
        <div className={styles.container}>
          {showFavourites.map((favourites) => {
            return (
              <div key={favourites.id} className={styles.recipeItem}>
                <img
                  src={favourites.fields.image}
                  className={styles.recipeImage}
                ></img>

                <p className={styles.recipeTitle}>{favourites.fields.title}</p>
                <a href={favourites.fields.url}>View Recipe</a>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
};

export default Favourites2;
