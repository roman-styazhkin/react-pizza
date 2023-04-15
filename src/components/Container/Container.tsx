import React from "react";
import styles from "./Container.module.scss";

const Container: React.FC = ({ children }: any) => {
  return <div className={styles.root}>{children}</div>;
};

export default Container;
