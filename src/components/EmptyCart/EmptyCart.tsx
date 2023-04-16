import React from "react";
import styles from "./EmptyCart.module.scss";

const EmptyCart: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1 className={styles.root__title}>
        Вы пока ничего не добавили в корзину...
      </h1>
    </div>
  );
};

export default EmptyCart;
