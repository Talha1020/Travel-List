import { useState } from "react";

export default function Form({ onAddItems }) {
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
