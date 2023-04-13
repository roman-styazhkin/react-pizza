import styles from "./PizzaSort.module.scss";
import classNames from "classnames";
import PizzaOrder from "../PizzaOrder/PizzaOrder";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilterPizza,
  setSortName,
} from "../../redux/slices/filterPizzaSlice";
import { selectPizzas } from "../../redux/slices/pizzaItems";

const sortList = {
  rating: { id: 1, label: "Популярность", name: "rating" },
  price: { id: 2, label: "Цена", name: "price" },
  alphabet: { id: 4, label: "Алфавит", name: "title" },
};

const PizzaSort = () => {
  const dispatch = useDispatch();
  const { sortName } = useSelector(selectFilterPizza);
  const { isLoading } = useSelector(selectPizzas);

  return (
    <div className={styles.root}>
      {Object.values(sortList).map(({ id, label, name }) => (
        <button
          disabled={isLoading}
          type="button"
          key={id}
          className={classNames(styles.root__item, {
            [styles.active]: sortName === name,
          })}
          onClick={() => dispatch(setSortName(name))}
        >
          {label}
        </button>
      ))}

      <PizzaOrder />
    </div>
  );
};

export default PizzaSort;
