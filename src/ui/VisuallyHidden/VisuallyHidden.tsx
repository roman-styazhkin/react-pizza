import React from "react";
import styles from "./VisuallyHidden.module.scss";

type VisuallyHiddenProps = {
  children: React.ReactNode;
};

const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default VisuallyHidden;
