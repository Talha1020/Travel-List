import { useState } from "react";

export default function App() {
  const [ItemsList, setItemsList] = useState([]);
  function onAddItems(itemsCheckList) {
    setItemsList((ItemsList) => [...ItemsList, itemsCheckList]);
  }
  function onDeleteItems(id) {
    setItemsList(ItemsList.filter((items) => items.id !== id));
  }

  function strikePackedItems(id) {
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
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={onAddItems} />
      <PackingList
        strikePackedItems={strikePackedItems}
        setItemsList={setItemsList}
        onDeleteItems={onDeleteItems}
        ItemsList={ItemsList}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // dont add the state variables here since they will render each time when state is changed. So use it in submit handler
  function HandlerSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const itemsCheckList = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    onAddItems(itemsCheckList);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={HandlerSubmit}>
      <h3>What do you need for trip 😍</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>

      <button> ADD</button>
    </form>
  );
}
function PackingList({ ItemsList, onDeleteItems, strikePackedItems }) {
  return (
    <div className="list">
      <ul>
        {ItemsList.map((items) => (
          <Item
            onDeleteItems={onDeleteItems}
            strikePackedItems={strikePackedItems}
            items={items}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ items, onDeleteItems, strikePackedItems }) {
  return (
    <li key={items.id}>
      <input
        type="checkbox"
        onChange={() => strikePackedItems(items.id)}
      ></input>
      <span style={items.packed ? { textDecoration: "line-through" } : {}}>
        {items.quantity} {items.description}
      </span>
      <button onClick={() => onDeleteItems(items.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
