import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilterPizza,
  setOrder,
} from "../../redux/slices/filterPizzaSlice";
import { selectPizzas } from "../../redux/slices/pizzaItems";
import styles from "./PizzaOrder.module.scss";

const PizzaOrder = () => {
  const { order } = useSelector(selectFilterPizza);
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectPizzas);

  return (
    <div className={styles.root}>
      <button
        disabled={isLoading}
        type="button"
        className={classNames(styles.root__asc, {
          [styles.active]: order === "asc",
        })}
        onClick={() => dispatch(setOrder("asc"))}
      ></button>
      <button
        disabled={isLoading}
        type="button"
        className={classNames(styles.root__desc, {
          [styles.active]: order === "desc",
        })}
        onClick={() => dispatch(setOrder("desc"))}
      ></button>
    </div>
  );
};

export default PizzaOrder;
