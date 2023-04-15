import React from "react";
import styles from "./Input.module.scss";

const Input: React.FC = ({ innerref, ...props }) => {
  return <input {...props} ref={innerref} className={styles.root} />;
};

export default Input;
