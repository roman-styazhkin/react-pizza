import React from "react";
import styles from "./VisuallyHidden.module.scss";

const VisuallyHidden: React.FC = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default VisuallyHidden;
