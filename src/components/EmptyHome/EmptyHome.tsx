import React from "react";
import styles from "./EmptyHome.module.scss";
import { useDispatch } from "react-redux";
import { resetFilters } from "../../redux/slices/filterPizzaSlice";

const EmptyHome: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <h1 className={styles.root__title}>
        Такой пиццы нет. Попробуйте ввести что-то другое <br></br>
        или
        <button
          onClick={() => dispatch(resetFilters())}
          className={styles.root__example}
        >
          Сбросить фильтры поиска
        </button>
      </h1>
    </div>
  );
};

export default EmptyHome;
