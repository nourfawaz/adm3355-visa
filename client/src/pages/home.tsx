import { useState } from "react";
import Header from "@/components/Header";
import GiftCard, { type GiftCardData } from "@/components/GiftCard";
import EmptyState from "@/components/EmptyState";
import AddCardDialog from "@/components/AddCardDialog";
import CardDetailsSheet from "@/components/CardDetailsSheet";

// todo: remove mock functionality
const initialMockCards: GiftCardData[] = [
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
    balance: 25.00,
    expiryMonth: "06",
    expiryYear: "27",
  },
];

// todo: remove mock functionality
const mockTransactions = [
  { id: "t1", merchant: "Amazon", amount: 24.99, date: "Dec 10, 2025", type: "purchase" as const },
  { id: "t2", merchant: "Starbucks", amount: 6.50, date: "Dec 9, 2025", type: "coffee" as const },
  { id: "t3", merchant: "Shell Gas Station", amount: 45.00, date: "Dec 8, 2025", type: "fuel" as const },
  { id: "t4", merchant: "Target", amount: 89.99, date: "Dec 5, 2025", type: "store" as const },
];

export default function Home() {
  const [cards, setCards] = useState<GiftCardData[]>(initialMockCards);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<GiftCardData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleAddCard = (cardData: {
    cardNumber: string;
    cvv: string;
    expiryMonth: string;
    expiryYear: string;
    balance: number;
  }) => {
    const newCard: GiftCardData = {
      id: Date.now().toString(),
      lastFourDigits: cardData.cardNumber.slice(-4),
      balance: cardData.balance,
      expiryMonth: cardData.expiryMonth,
      expiryYear: cardData.expiryYear,
    };
    setCards([newCard, ...cards]);
  };

  const handleRemoveCard = (cardId: string) => {
    setCards(cards.filter((c) => c.id !== cardId));
    setSelectedCard(null);
  };

  const handleCardClick = (card: GiftCardData) => {
    setSelectedCard(card);
    setIsDetailsOpen(true);
  };

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header onAddCard={() => setIsAddDialogOpen(true)} />

      <main className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        {cards.length > 0 && (
          <div className="mb-8 text-center">
            <p className="text-muted-foreground text-sm mb-1">Total Balance</p>
            <p className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-total-balance">
              ${totalBalance.toFixed(2)}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              {cards.length} card{cards.length !== 1 ? "s" : ""} in wallet
            </p>
          </div>
        )}

        {cards.length === 0 ? (
          <EmptyState onAddCard={() => setIsAddDialogOpen(true)} />
        ) : (
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <GiftCard
                key={card.id}
                card={card}
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>
        )}
      </main>

      <AddCardDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddCard={handleAddCard}
      />

      <CardDetailsSheet
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        card={selectedCard}
        transactions={mockTransactions}
        onRemoveCard={handleRemoveCard}
      />
    </div>
  );
}
