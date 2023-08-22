export default function Item({ items, onDeleteItems, onPackedItems }) {
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
