import React from "react";
import styles from "./Modal.module.css";

const DessertModal = ({ isOpen, onClose, recipe }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}> X </button>
        <div className={styles.recipe}>
          <h1 className={styles.title}>{recipe.title}</h1>
          <div className={styles.ingredients}>
            <h2>INGREDIENTS</h2>
            <ul>
              {recipe.extendedIngredients.map((ingredient) => {
                const { amount, unitLong } = ingredient.measures.metric;
                const roundedAmount = Number.isInteger(amount)
                  ? amount
                  : amount.toFixed(1);
                return (
                  <li key={ingredient.id}>
                    {ingredient.name} - {roundedAmount} {unitLong}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.instructions}>
            <h3>INSTRUCTIONS</h3>
            <ol dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DessertModal;
