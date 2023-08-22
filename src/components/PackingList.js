import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  ItemsList,
  onDeleteItems,
  onPackedItems,
  onClearList,
}) {
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
