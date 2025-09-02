"use client";

import CartList from "@/components/Cart/CartList";
import CartSummary from "@/components/Cart/CartSummary";
import { useCartStore } from "@/stores/zustand/cartStore";

export default function ZustandCartPage() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Zustand Cart</h1>
      <CartList items={items} onAdd={addItem} onRemove={removeItem} />
      <CartSummary items={items} />
    </div>
  );
}
