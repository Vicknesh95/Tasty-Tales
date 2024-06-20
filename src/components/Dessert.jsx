import React, { useState, useEffect } from "react";
import styles from "./Recipes.module.css";
import DessertModal from "./DessertModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


const Dessert = () => {
  const [desserts, setDesserts] = useState([]);
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER +
          "apiKey=" +
          import.meta.env.VITE_API_KEY +
          "&include-tags=desserts,beverages&number=20"
      );
      if (!res.ok) {
        throw new Error("fetch error");
      }
      const data = await res.json();

      setDesserts(data.recipes);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const addFavouriteRecipes = async (recipe) => {
    try {
      const res = await fetch(import.meta.env.VITE_AIRTABLE_SERVER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                id: recipe.id.toString(),
                title: recipe.title,
                image: recipe.image,
                url: recipe.sourceUrl,
              },
            },
          ],
        }),
      });
      if (!res.ok) {
        throw new Error("could not like recipe");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const openModal = (recipe) => {
    setSelectedDessert(recipe);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedDessert(null);
  };

  return (
    <div>
      <div className={styles.container}>
        {desserts.map((dessert) => {
          if (!dessert.image) {
            return null;
          }
          return (
            <div key={dessert.id} className={styles.recipeItem}>
              <img
                src={dessert.image}
                placeholder={dessert.title}
                className={styles.recipeImage}
                onClick={() => {
                  openModal(dessert);
                }}
              ></img>
              <p className={styles.recipeTitle}>{dessert.title}</p>
              <button className={styles.likeButton} onClick={() => addFavouriteRecipes(dessert)}>
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          );
        })}
      </div>
      <DessertModal
        isOpen={isOpenModal}
        onClose={closeModal}
        recipe={selectedDessert}
      />
    </div>
  );
};

export default Dessert;
