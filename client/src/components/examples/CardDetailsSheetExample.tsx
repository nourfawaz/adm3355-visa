import { useState } from "react";
import { Button } from "@/components/ui/button";
import CardDetailsSheet from "../CardDetailsSheet";

export default function CardDetailsSheetExample() {
  const [open, setOpen] = useState(true);

  // todo: remove mock functionality
  const mockCard = {
    id: "1",
    lastFourDigits: "4532",
    balance: 150.00,
    expiryMonth: "12",
    expiryYear: "26",
  };

  // todo: remove mock functionality
  const mockTransactions = [
    { id: "t1", merchant: "Amazon", amount: 24.99, date: "Dec 10, 2025", type: "purchase" as const },
    { id: "t2", merchant: "Starbucks", amount: 6.50, date: "Dec 9, 2025", type: "coffee" as const },
    { id: "t3", merchant: "Shell Gas Station", amount: 45.00, date: "Dec 8, 2025", type: "fuel" as const },
    { id: "t4", merchant: "Target", amount: 89.99, date: "Dec 5, 2025", type: "store" as const },
  ];

  return (
    <div>
      <Button onClick={() => setOpen(true)} data-testid="button-open-sheet">
        Open Card Details
      </Button>
      <CardDetailsSheet
        open={open}
        onOpenChange={setOpen}
        card={mockCard}
        transactions={mockTransactions}
        onRemoveCard={(id) => console.log("Remove card:", id)}
      />
    </div>
  );
}
