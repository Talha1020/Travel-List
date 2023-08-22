export default function Stats({ ItemsList }) {
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
