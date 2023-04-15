import React from "react";
import styles from "./PizzaList.module.scss";

type PizzaListProps = {
  children: React.ReactNode;
};

const PizzaList: React.FC<PizzaListProps> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default PizzaList;
