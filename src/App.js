import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Passports", quantity: 2, packed: false },
  { id: 4, description: "Socks", quantity: 12, packed: false },
  { id: 5, description: "Passports", quantity: 2, packed: false },
  { id: 6, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
function Form() {
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
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((items) => (
          <Item items={items} />
        ))}
      </ul>
    </div>
  );
}

function Item({ items }) {
  return (
    <li key={items.id}>
      <span style={items.packed ? { textDecoration: "line-through" } : {}}>
        {items.quantity} {items.description}
      </span>
      <button>❌</button>
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
