import React from "react";
import styles from "./Modal.module.css";

const WineModal = ({ isOpen, onClose, wine }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <button onClick={onClose}> X </button>
        <div className="recipeName">
          <h1>{wine.title}</h1>

          <div className="instructions">
            <h1>DESCRIPTION</h1>
            <p>{wine.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineModal;
