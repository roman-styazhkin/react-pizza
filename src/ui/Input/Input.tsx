import React from "react";
import styles from "./Input.module.scss";

type InputProps = {
  innerref: any;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Input: React.FC<InputProps> = ({ innerref, ...props }) => {
  return <input {...props} ref={innerref} className={styles.root} />;
};

export default Input;
