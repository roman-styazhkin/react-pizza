import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./PizzaCategory.module.scss";
import SimpleBar from "simplebar-react";
import {
  selectFilterPizza,
  setCategoryId,
} from "../../redux/slices/filterPizzaSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectPizzas } from "../../redux/slices/pizzaItems";

type CategoryItem = {
  id: number;
  label: string;
};

const categoryList: CategoryItem[] = [
  {
    id: 0,
    label: "Все",
  },

  {
    id: 1,
    label: "Мясные",
  },

  {
    id: 2,
    label: "Вегетарианская",
  },

  {
    id: 3,
    label: "Гриль",
  },

  {
    id: 4,
    label: "Острые",
  },

  {
    id: 5,
    label: "Закрытые",
  },
];

const PizzaCategory: React.FC = () => {
  const { categoryId } = useSelector(selectFilterPizza);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const { isLoading } = useSelector(selectPizzas);

  const onSelectCategory = (id: number) => {
    dispatch(setCategoryId(id));
    setIsOpen(false);
  };

  const onClickOutside = (e: MouseEvent) => {
    e.stopPropagation();
    if (
      categoryRef.current &&
      !e.composedPath().includes(categoryRef.current)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", onClickOutside);

    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  const categoryName = categoryList.find(
    (item) => item.id === categoryId
  )?.label;

  return (
    <div
      ref={categoryRef}
      className={classNames(styles.root, {
        [styles.isOpen]: isOpen,
        [styles.isLoading]: isLoading,
      })}
    >
      <div className={styles.root__top} onClick={() => setIsOpen(!isOpen)}>
        <h2 className={styles.root__heading}>Выбрать категорию: </h2>
        <span className={styles.root__selected}>{categoryName || "Все"}</span>
      </div>
      {isOpen && (
        <div className={styles.root__modal}>
          <SimpleBar style={{ maxHeight: 140 }}>
            {Object.values(categoryList).map(({ label, id }) => (
              <button
                key={id}
                className={classNames(styles.root__element, {
                  [styles.active]: id == categoryId,
                })}
                type="button"
                onClick={() => onSelectCategory(id)}
              >
                {label}
              </button>
            ))}
          </SimpleBar>
        </div>
      )}
    </div>
  );
};

export default PizzaCategory;
