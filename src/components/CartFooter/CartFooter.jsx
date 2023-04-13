import classNames from "classnames";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCart } from "../../redux/slices/cartSlice";
import Container from "../Container/Container";
import styles from "./CartFooter.module.scss";

const CartFooter = () => {
  const { totalPrice, totalPizzaCount } = useSelector(selectCart);
  const navigate = useNavigate();

  return (
    <footer className={styles.root}>
      <Container>
        <div className={styles.root__top}>
          <p className={styles.root__count}>
            Всего пицц: <b>{totalPizzaCount} шт.</b>
          </p>
          <p className={styles.root__sum}>
            Сумма заказа: <b>{totalPrice} ₽</b>
          </p>
        </div>
        <div className={styles.root__bottom}>
          <button
            onClick={() => navigate("/react-pizza/")}
            className={classNames(styles.root__button, styles.root__back)}
            type="button"
          >
            Вернуться назад
          </button>
          <button
            className={classNames(styles.root__button, styles.root__pay)}
            type="button"
          >
            Оплатить сейчас
          </button>
        </div>
      </Container>
    </footer>
  );
};

export default CartFooter;
