import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  deleteItem,
  selectCart,
} from "../../redux/slices/cartSlice";
import styles from "./CartItem.module.scss";

const CartItem = ({ id, imageUrl, title, size, count, totalPrice, type }) => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);
  const pizzaData = items.find((item) => item.id === id);

  const confirmAction = (action) => {
    const question = `Вы уверены, что хотите удалить пиццу ${pizzaData.title}?`;
    if (window.confirm(question)) {
      dispatch(action);
    }
  };

  const onDeleteItem = () => {
    confirmAction(deleteItem(id));
  };

  const onRemoveItem = () => {
    if (pizzaData.count < 2) {
      confirmAction(removeItem({ ...pizzaData }));
      return;
    }

    dispatch(removeItem({ ...pizzaData }));
  };

  return (
    <article className={styles.root}>
      <div className={styles.root__wrapper}>
        <div className={styles.root__info}>
          <img src={imageUrl} width={80} height={80} alt={title} />
          <div className={styles.root__description}>
            <h2 className={styles.root__title}>{title}</h2>
            <p className={styles.root__text}>
              {type}, {size} см.
            </p>
          </div>
        </div>

        <div className={styles.root__inner}>
          <div className={styles.root__counter}>
            <button
              onClick={onRemoveItem}
              className={classNames(
                styles.root__button,
                styles.root__decrement
              )}
              type="button"
            ></button>
            <span>{count}</span>
            <button
              onClick={() => dispatch(addItem({ ...pizzaData }))}
              className={classNames(
                styles.root__button,
                styles.root__increment
              )}
              type="button"
            ></button>
          </div>

          <p className={styles.root__price}>{totalPrice} ₽ </p>
        </div>

        <button
          onClick={onDeleteItem}
          className={classNames(styles.root__button, styles.root__delete)}
          type="button"
        ></button>
      </div>
    </article>
  );
};

export default CartItem;
