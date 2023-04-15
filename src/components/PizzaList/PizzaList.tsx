import React from "react";
import styles from "./PizzaList.module.scss";

const PizzaList: React.FC = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default PizzaList;
