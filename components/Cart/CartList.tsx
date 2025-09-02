"use client";

import styles from "./CartList.module.css";

type Item = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Props = {
  items: Item[];
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
};

export default function CartList({ items, onAdd, onRemove }: Props) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <span>
            {item.name} (${item.price}) x {item.quantity}
          </span>
          <span>
            <button onClick={() => onAdd(item.id)}>＋</button>
            <button onClick={() => onRemove(item.id)}>－</button>
          </span>
        </li>
      ))}
    </ul>
  );
}

