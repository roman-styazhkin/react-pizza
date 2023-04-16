import React from "react";
import styles from "./Cart.module.scss";
import CartItem from "../../components/CartItem/CartItem";
import Container from "../../components/Container/Container";
import { useDispatch, useSelector } from "react-redux";
import CartFooter from "../../components/CartFooter/CartFooter";
import { clearItems, selectCart } from "../../redux/slices/cartSlice";
import EmptyCart from "../../components/EmptyCart/EmptyCart";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);

  const onClearPizzas = () => {
    const question = `Вы уверены, что хотите очистить корзину?`;

    if (items.length && window.confirm(question)) {
      dispatch(clearItems());
    }
  };

  return (
    <div className={styles.root}>
      <Container>
        <div className={styles.root__top}>
          <h1 className={styles.root__title}>Корзина</h1>
          <button
            onClick={onClearPizzas}
            className={styles.root__clear}
            type="button"
          >
            Очистить корзину
          </button>
        </div>

        {items.length < 1 && <EmptyCart />}

        <div className={styles.root__inner}>
          {items.map((item: any) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
      </Container>

      <CartFooter />
    </div>
  );
};

export default Cart;
