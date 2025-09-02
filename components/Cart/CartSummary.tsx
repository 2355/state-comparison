"use client";

import styles from "./CartSummary.module.css";

type Item = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Props = {
  items: Item[];
};

export default function CartSummary({ items }: Props) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return <div className={styles.summary}>Total: ${total}</div>;
}

