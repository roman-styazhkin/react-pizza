import styles from "./Container.module.scss";

const Container = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default Container;
