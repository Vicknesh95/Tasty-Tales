import React, { useState, useEffect } from "react";
import styles from "./Recipes.module.css";
import VeganModal from "./VeganModal";

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
      <div>Vegan</div>
      <div className={styles.container}>
        {vegans.map((eachvegan) => {
          return (
            <div key={eachvegan.id} className={styles.recipeItem}>
              <img
                src={eachvegan.image}
                placeholder={eachvegan.title}
                className={styles.recipeImage}
                onClick={() => {
                  openModal(eachvegan);
                }}
              >
                
              </img>
              <p className={styles.recipeTitle}>{eachvegan.title}</p>
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
