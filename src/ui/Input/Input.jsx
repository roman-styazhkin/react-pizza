import styles from "./Input.module.scss";

const Input = (props) => {
  return <input {...props} ref={props.innerref} className={styles.root} />;
};

export default Input;
