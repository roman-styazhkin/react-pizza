import styles from "./VisuallyHidden.module.scss";

const VisuallyHidden = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default VisuallyHidden;
