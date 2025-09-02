import { create } from "zustand";

type Item = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: Item[];
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
};

const initialItems: Item[] = [
  { id: 1, name: "Apple", price: 100, quantity: 1 },
  { id: 2, name: "Banana", price: 50, quantity: 2 },
];

export const useCartStore = create<CartState>((set) => ({
  items: initialItems,
  addItem: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
}));

