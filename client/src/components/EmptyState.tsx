import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddCard: () => void;
}

export default function EmptyState({ onAddCard }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-48 h-48 rounded-full bg-muted flex items-center justify-center mb-6">
        <Wallet className="w-24 h-24 text-muted-foreground" />
      </div>
      
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        No cards in your wallet
      </h2>
      
      <p className="text-muted-foreground mb-8 max-w-sm">
        Add your first Visa prepaid gift card to get started managing your balances.
      </p>
      
      <Button
        data-testid="button-add-first-card"
        onClick={onAddCard}
        size="lg"
      >
        Add Your First Card
      </Button>
    </div>
  );
}
