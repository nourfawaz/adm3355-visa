import GiftCard from "../GiftCard";

export default function GiftCardExample() {
  // todo: remove mock functionality
  const mockCards = [
    {
      id: "1",
      lastFourDigits: "4532",
      balance: 150.00,
      expiryMonth: "12",
      expiryYear: "26",
    },
    {
      id: "2",
      lastFourDigits: "7891",
      balance: 8.50,
      expiryMonth: "03",
      expiryYear: "25",
      isLowBalance: true,
    },
    {
      id: "3",
      lastFourDigits: "2345",
      balance: 0.00,
      expiryMonth: "01",
      expiryYear: "24",
      isExpired: true,
    },
  ];

  return (
    <div className="grid gap-4 max-w-md">
      {mockCards.map((card) => (
        <GiftCard 
          key={card.id} 
          card={card} 
          onClick={() => console.log(`Card ${card.id} clicked`)} 
        />
      ))}
    </div>
  );
}
