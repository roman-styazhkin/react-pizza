import React from "react";
import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectItemById } from "../../redux/slices/cartSlice";
import RippleButton from "../../ui/RippleButton/RippleButton";
import styles from "./PizzaCard.module.scss";

const typeNames = ["тонкое", "традиционное"];

const sizeValues = {
  26: 1,
  30: 1.25,
  40: 1.5,
};

type PizzaCardProps = {
  id: string;
  imageUrl: string;
  types: number[];
  sizes: number[];
  title: string;
  price: number;
};

const PizzaCard: React.FC<PizzaCardProps> = ({
  id,
  imageUrl,
  types,
  sizes,
  title,
  price,
}) => {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const ratio = sizeValues[activeSize as keyof typeof sizeValues];
  const pizzaPrice = Math.floor(price * ratio);
  const pizzaId = `${id}_${activeType}${activeSize}`;

  const onClickAddItem = () => {
    const pizzaInfo = {
      id: pizzaId,
      imageUrl,
      title,
      type: typeNames[activeType],
      size: activeSize,
      price: pizzaPrice,
      totalPrice: pizzaPrice,
      count: 1,
    };

    dispatch(addItem({ ...pizzaInfo }));
  };

  return (
    <article className={classNames(styles.root, "link-reset")}>
      <img className={styles.root__img} src={imageUrl} alt={title} />
      <h2 className={styles.root__heading}>{title}</h2>
      <div className={styles.root__panel}>
        <div className={styles.root__types}>
          {types.map((item: number, i: number) => (
            <button
              onClick={() => setActiveType(item)}
              className={classNames(styles.root__button, {
                [styles.active]: item === activeType,
              })}
              key={i}
              type="button"
            >
              {typeNames[item]}
            </button>
          ))}
        </div>
        <div className={styles.root__sizes}>
          {sizes.map((size: number) => (
            <button
              onClick={() => setActiveSize(size)}
              className={classNames(styles.root__button, {
                [styles.active]: activeSize === size,
              })}
              key={size}
              type="button"
            >
              {size} см.
            </button>
          ))}
        </div>
      </div>
      <div className={styles.root__bottom}>
        <span className={styles.root__price}>от {pizzaPrice} ₽</span>
        <div onClick={onClickAddItem} className={styles.root__add}>
          <RippleButton rippleColor={"var(--hit-pink)"}>
            <span className={styles.root__label}>Добавить</span>
          </RippleButton>
        </div>
      </div>
    </article>
  );
};

export default PizzaCard;
