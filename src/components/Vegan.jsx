import React, { useState, useEffect } from "react";
import styles from "./Recipes.module.css";
import VeganModal from "./VeganModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Vegan = () => {
  const [vegans, setVegans] = useState([]);
  const [selectedVegan, setSelectedVegan] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER +
          "apiKey=" +
          import.meta.env.VITE_API_KEY +
          "&include-tags=vegan,main-course&exclude-tags=dessert,beverage,drink,sauce,marinade&number=20"
      );
      if (!res.ok) {
        throw new Error("fetch error");
      }
      const data = await res.json();

      setVegans(data.recipes);
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
    setSelectedVegan(recipe);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedVegan(null);
  };

  return (
    <div>
      <div className={styles.container}>
        {vegans.map((eachvegan) => {
          if (!eachvegan.image) {
            return null;
          }
          return (
            <div key={eachvegan.id} className={styles.recipeItem}>
              <img
                src={eachvegan.image}
                alt={eachvegan.title}
                className={styles.recipeImage}
                onClick={() => {
                  openModal(eachvegan);
                }}
              ></img>
              <p className={styles.recipeTitle}>{eachvegan.title}</p>
              <button
                className={styles.likeButton}
                onClick={() => addFavouriteRecipes(eachvegan)}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          );
        })}
      </div>
      <VeganModal
        isOpen={isOpenModal}
        onClose={closeModal}
        recipe={selectedVegan}
      />
    </div>
  );
};

export default Vegan;
