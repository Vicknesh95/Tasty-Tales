import React from "react";
import styles from "./Modal.module.css";

const MeatModal = ({ isOpen, onClose, recipe }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <button onClick={onClose}> X </button>
        <div className="recipeName">
          <h1>{recipe.title}</h1>
          <div className="ingredients">
            <p>Ingredients</p>
            <ul>
              {recipe.extendedIngredients.map((ingredient) => {
                return <li key={ingredient.id}>{ingredient.name}</li>;
              })}
            </ul>
            <div className="instructions">
              <p>INSTRUCTIONS</p>
              <ol dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeatModal;
