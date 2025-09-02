import { atom } from "jotai";

export type Item = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const initialItems: Item[] = [
  { id: 1, name: "Apple", price: 100, quantity: 1 },
  { id: 2, name: "Banana", price: 50, quantity: 2 },
];

export const itemsAtom = atom<Item[]>(initialItems);

export const addItemAtom = atom(
  null,
  (get, set, id: number) => {
    const items = get(itemsAtom);
    set(
      itemsAtom,
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }
);

export const removeItemAtom = atom(
  null,
  (get, set, id: number) => {
    const items = get(itemsAtom);
    set(
      itemsAtom,
      items.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }
);

