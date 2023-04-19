import React from "react";
import styles from "./Header.module.scss";
import logo from "../../images/logo.svg";
import RippleButton from "../../ui/RippleButton/RippleButton";
import Input from "../../ui/Input/Input";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  selectFilterPizza,
  setSearchQuery,
  setSearchValue,
} from "../../redux/slices/filterPizzaSlice";
import debounce from "lodash.debounce";
import { useCallback, useRef } from "react";
import { selectCart } from "../../redux/slices/cartSlice";
import { selectPizzas } from "../../redux/slices/pizzaItems";
import classNames from "classnames";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/react-pizza";
  const { totalPizzaCount, totalPrice } = useSelector(selectCart);
  const { searchValue } = useSelector(selectFilterPizza);
  const { isLoading } = useSelector(selectPizzas);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearch = useCallback(
    debounce((e) => dispatch(setSearchQuery(e.target.value)), 500),
    []
  );

  const onClearSearch = () => {
    dispatch(setSearchQuery(""));
    dispatch(setSearchValue(""));
    inputRef.current?.focus();
  };

  const onResetHomeFilters = () => {
    isHomePage && dispatch(resetFilters());
  };

  const onUpdateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e);
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <header className={styles.root}>
      <div className={styles.root__inner}>
        <div className={styles.root__column}>
          <div onClick={onResetHomeFilters} className={styles.root__reset}>
            <Link className={styles.root__logo} to="/react-pizza">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>

        {isHomePage && (
          <>
            <div className={styles.root__search}>
              <Input
                innerref={inputRef}
                placeholder="Поиск пиццы..."
                onChange={onUpdateSearchQuery}
                value={searchValue}
              />
              <div className={styles.root__decor}></div>
              {searchValue && (
                <button
                  className={styles.root__clear}
                  onClick={onClearSearch}
                  type="button"
                ></button>
              )}
            </div>

            <div className={styles.root__column}>
              <div className={styles.root__cart}>
                <Link
                  to="/react-pizza/cart"
                  className={classNames("", {
                    [styles.disabled]: isLoading,
                  })}
                >
                  <RippleButton
                    rippleColor={"var(--hit-pink)"}
                    disabled={isLoading}
                  >
                    <span className={styles.root__price}>{totalPrice} ₽</span>
                    <span className={styles.root__counter}>
                      {totalPizzaCount}
                    </span>
                  </RippleButton>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
