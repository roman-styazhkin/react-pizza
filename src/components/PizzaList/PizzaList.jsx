import styles from "./PizzaList.module.scss";

const PizzaList = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default PizzaList;
