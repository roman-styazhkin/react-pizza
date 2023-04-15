import React from "react";
import { useEffect, useRef } from "react";
import styles from "./Home.module.scss";
import PizzaSort from "../../components/PizzaSort/PizzaSort";
import Container from "../../components/Container/Container";
import PizzaCategory from "../../components/PizzaCategory/PizzaCategory";
import PizzaCard from "../../components/PizzaCard/PizzaCard";
import PizzaList from "../../components/PizzaList/PizzaList";
import PizzaSkeleton from "../../components/PizzaSkeleton/PizzaSkeleton";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import {
  selectFilterPizza,
  setFilters,
} from "../../redux/slices/filterPizzaSlice";
import isEqual from "lodash.isequal";
import { fetchPizzas, selectPizzas } from "../../redux/slices/pizzaItems";

const Home: React.FC = () => {
  const { sortName, categoryId, order, searchQuery } =
    useSelector(selectFilterPizza);
  const { items, pizzaCounter, isLoading } = useSelector(selectPizzas);
  const isSearched = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const windowSearchQuery = window.location.search;

    if (windowSearchQuery) {
      const params = qs.parse(windowSearchQuery, { ignoreQueryPrefix: true });

      dispatch(setFilters({ ...params }));
      isSearched.current = true;
    }
  }, []);

  const getPizzas = async () => {
    const requestSettings = {
      params: {
        category: categoryId == 0 ? null : categoryId,
        sortBy: sortName,
        order: order,
        title: searchQuery,
      },
    };

    try {
      dispatch(fetchPizzas(requestSettings));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const params = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    const initialFilterSettings = {
      sortName: "rating",
      categoryId: "0",
      order: "asc",
    };

    if (!isSearched.current) {
      getPizzas();
    }

    // если фильтры были выбраны пользователем по умолчанию
    else if (isEqual(initialFilterSettings, params)) {
      getPizzas();
    }

    isSearched.current = false;
  }, [order, searchQuery, sortName, categoryId]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          order,
          sortName,
          categoryId,
        },
        { addQueryPrefix: true }
      );

      navigate(queryString);
    }

    isMounted.current = true;
  }, [order, sortName, categoryId]);

  const skeletons = [...new Array(pizzaCounter)].map((_, i) => (
    <PizzaSkeleton key={i} />
  ));

  const pizzaItems = items.map((item: any) => (
    <PizzaCard key={item.id} {...item} />
  ));

  return (
    <div className={styles.root}>
      <Container>
        <div className={styles.root__top}>
          <PizzaSort />
          <PizzaCategory />
        </div>

        <PizzaList>{isLoading ? skeletons : pizzaItems}</PizzaList>
      </Container>
    </div>
  );
};

export default Home;
