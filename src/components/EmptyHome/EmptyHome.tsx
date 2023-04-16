import React from "react";
import styles from "./EmptyHome.module.scss";
import { useDispatch } from "react-redux";
import {
  setFilters,
  setSearchValue,
} from "../../redux/slices/filterPizzaSlice";
import { setSearchQuery } from "../../redux/slices/filterPizzaSlice";

const EmptyHome: React.FC = () => {
  const dispatch = useDispatch();

  const onResetFilterPizzas = () => {
    dispatch(
      setFilters({
        sortName: "rating",
        categoryId: 0,
        order: "asc",
      })
    );

    dispatch(setSearchQuery(""));
    dispatch(setSearchValue(""));
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.root__title}>
        Такой пиццы нет. Попробуйте ввести что-то другое <br></br>
        или
        <button onClick={onResetFilterPizzas} className={styles.root__example}>
          Сбросить фильтры поиска
        </button>
      </h1>
    </div>
  );
};

export default EmptyHome;
