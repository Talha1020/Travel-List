import { useState } from "react";

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

function PackingList({ ItemsList, onDeleteItems, onPackedItems, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let NewItems;

  if (sortBy === "input") NewItems = ItemsList;

  if (sortBy === "description") {
    NewItems = ItemsList.slice().sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }

  if (sortBy === "packed") {
    NewItems = ItemsList.slice().sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  }

  return (
    <div className="list">
      <ul>
        {NewItems.map((items) => (
          <Item
            key={items.id}
            // key is very important to write. i mad a mistake here not to add key here but to list component.

            onDeleteItems={onDeleteItems}
            onPackedItems={onPackedItems}
            items={items}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="packed">Sort by packed status</option>
          <option value="description">Sort by description</option>
        </select>
        <button onClick={() => onClearList()}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ items, onDeleteItems, onPackedItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={items.packed}
        onChange={() => onPackedItems(items.id)}
      ></input>
      <span style={items.packed ? { textDecoration: "line-through" } : {}}>
        {items.quantity} {items.description}
      </span>
      <button onClick={() => onDeleteItems(items.id)}>❌</button>
    </li>
  );
}

function Stats({ ItemsList }) {
  if (ItemsList.length === 0) {
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );
  }
  const numItems = ItemsList.length;

  const ItemsPacked = ItemsList.filter((items) => items.packed).length;
  const percentage = Math.round((ItemsPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${numItems} items on your list, and you already packed
        ${ItemsPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
