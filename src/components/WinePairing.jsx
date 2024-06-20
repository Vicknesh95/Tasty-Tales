import React, { useState, useEffect } from "react";
import styles from "./Recipes.module.css";
import WineModal from "./WineModal";

const WinePairing = () => {
  const [wines, setWines] = useState([]);
  const [selectedWine, setSelectedWine] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const getData = async () => {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_WINE +
          "apiKey=" +
          import.meta.env.VITE_API_KEY +
          "&wine=prosecco&number=20"
      );
      if (!res.ok) {
        throw new Error("fetch error");
      }
      const data = await res.json();

      setWines(data.recommendedWines);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const openModal = (wines) => {
    setSelectedWine(wines);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedWine(null);
  };

  return (
    <div>
      <div className={styles.container}>
        {wines.map((wine) => {
          return (
            <div key={wine.id} className={styles.recipeItem}>
              <img
                src={wine.imageUrl}
                placeholder={wine.title}
                className={styles.recipeImage}
                onClick={() => {
                  openModal(wine);
                }}
              ></img>
              <p className={styles.recipeTitle}>{wine.title}</p>
            </div>
          );
        })}
      </div>
      <WineModal
        isOpen={isOpenModal}
        onClose={closeModal}
        wine={selectedWine}
      />
    </div>
  );
};

export default WinePairing;
