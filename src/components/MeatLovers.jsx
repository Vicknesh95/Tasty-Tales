import React, { useEffect, useState } from "react";
import styles from "./Recipes.module.css";
import MeatModal from "./MeatModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const MeatLovers = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER +
          "apiKey=" +
          import.meta.env.VITE_API_KEY +
          "&include-tags=meat&number=20"
      );
      if (!res.ok) {
        throw new Error("fetch error");
      }
      const data = await res.json();

      setRecipes(data.recipes);
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
    setSelectedRecipe(recipe);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedRecipe(null);
  };

  return (
    <div>
      <div className={styles.container}>
        {recipes.map((eachrecipe) => {
          if (!eachrecipe.image) {
            return null;
          }
          return (
            <div key={eachrecipe.id} className={styles.recipeItem}>
              <img
                src={eachrecipe.image}
                className={styles.recipeImage}
                onClick={() => {
                  openModal(eachrecipe);
                }}
              ></img>

              <p className={styles.recipeTitle}>{eachrecipe.title}</p>
              <button 
              className={styles.likeButton}
              onClick={() => addFavouriteRecipes(eachrecipe)}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          );
        })}
      </div>
      <MeatModal
        isOpen={isOpenModal}
        onClose={closeModal}
        recipe={selectedRecipe}
      />
    </div>
  );
};
export default MeatLovers;
