import EmptyState from "../EmptyState";

export default function EmptyStateExample() {
  return (
    <EmptyState onAddCard={() => console.log("Add card clicked")} />
  );
}
