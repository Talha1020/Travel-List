import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [ItemsList, setItemsList] = useState([]);
  function HandlerAddItems(itemsCheckList) {
    setItemsList((ItemsList) => [...ItemsList, itemsCheckList]);
  }
  function HandlerDeleteItems(id) {
    setItemsList(ItemsList.filter((items) => items.id !== id));
  }

  function HandlerPackedItems(id) {
    setItemsList((ItemsList) =>
      ItemsList.map(
        (previousitems) =>
          previousitems.id === id
            ? { ...previousitems, packed: !previousitems.packed }
            : previousitems
        // To consider property which is after the packed items because it is the way to replace old items in the object/ update it
      )
    );
  }

  function HandlerItemsList() {
    setItemsList([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={HandlerAddItems} />
      <PackingList
        onPackedItems={HandlerPackedItems}
        onClearList={HandlerItemsList}
        onDeleteItems={HandlerDeleteItems}
        ItemsList={ItemsList}
      />
      <Stats ItemsList={ItemsList} />
    </div>
  );
}
