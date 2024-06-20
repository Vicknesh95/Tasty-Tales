import React from "react";
import styles from "./Modal.module.css";

const WineModal = ({ isOpen, onClose, wine }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}> X </button>
        <div className="recipeName">
          <h1>{wine.title}</h1>

          <div className={styles.wineDescription}>
            <p>DESCRIPTION</p>
            <p>{wine.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineModal;
