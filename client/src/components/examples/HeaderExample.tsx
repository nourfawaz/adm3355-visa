import Header from "../Header";

export default function HeaderExample() {
  return (
    <Header onAddCard={() => console.log("Add card clicked")} />
  );
}
