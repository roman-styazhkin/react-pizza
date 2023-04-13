import styles from "./Header.module.scss";
import logo from "../../images/logo.svg";
import RippleButton from "../../ui/RippleButton/RippleButton";
import Input from "../../ui/Input/Input";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../redux/slices/filterPizzaSlice";
import debounce from "lodash.debounce";
import { useCallback, useRef, useState } from "react";
import { selectCart } from "../../redux/slices/cartSlice";
import { selectPizzas } from "../../redux/slices/pizzaItems";
import classNames from "classnames";

const Header = () => {
  const dispatch = useDispatch();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const { pathname } = useLocation();
  const isHomePage = pathname === "/react-pizza";
  const { totalPizzaCount, totalPrice } = useSelector(selectCart);
  const { isLoading } = useSelector(selectPizzas);
  const inputRef = useRef();

  const updateSearch = useCallback(
    debounce((e) => dispatch(setSearchQuery(e.target.value)), 1000),
    []
  );

  const onClearSearch = () => {
    dispatch(setSearchQuery(""));
    setLocalSearchQuery("");
    inputRef.current.focus();
  };

  const onUpdateSearchQuery = (e) => {
    updateSearch(e);
    setLocalSearchQuery(e.target.value);
  };

  return (
    <header className={styles.root}>
      <div className={styles.root__inner}>
        <div className={styles.root__column}>
          <Link className={styles.root__logo} to="/react-pizza">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {true && (
          <>
            <div className={styles.root__search}>
              <Input
                innerref={inputRef}
                placeholder="Поиск пиццы..."
                onChange={onUpdateSearchQuery}
                value={localSearchQuery}
              />
              <div className={styles.root__decor}></div>
              {localSearchQuery && (
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
                  to="/cart"
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
