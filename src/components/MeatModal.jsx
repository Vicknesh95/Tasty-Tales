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
            <div className="instructions">
              <ol>
                <li>{recipe.instructions}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeatModal;