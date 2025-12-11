import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "@/components/Header";
import GiftCard, { type GiftCardData } from "@/components/GiftCard";
import EmptyState from "@/components/EmptyState";
import AddCardDialog from "@/components/AddCardDialog";
import CardDetailsSheet from "@/components/CardDetailsSheet";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { GiftCard as GiftCardType, Transaction } from "@shared/schema";

export default function Home() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<GiftCardData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  const { data: cards = [], isLoading } = useQuery<GiftCardType[]>({
    queryKey: ["/api/cards"],
  });

  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["/api/cards", selectedCard?.id, "transactions"],
    enabled: !!selectedCard?.id,
  });

  const createCardMutation = useMutation({
    mutationFn: async (cardData: {
      cardNumber: string;
      cvv: string;
      expiryMonth: string;
      expiryYear: string;
      balance: number;
    }) => {
      return apiRequest("POST", "/api/cards", {
        lastFourDigits: cardData.cardNumber.slice(-4),
        balance: cardData.balance.toString(),
        expiryMonth: cardData.expiryMonth,
        expiryYear: cardData.expiryYear,
        isExpired: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cards"] });
      toast({
        title: "Card added",
        description: "Your gift card has been added to your wallet.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add card. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteCardMutation = useMutation({
    mutationFn: async (cardId: string) => {
      return apiRequest("DELETE", `/api/cards/${cardId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cards"] });
      toast({
        title: "Card removed",
        description: "Your gift card has been removed from your wallet.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove card. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddCard = (cardData: {
    cardNumber: string;
    cvv: string;
    expiryMonth: string;
    expiryYear: string;
    balance: number;
  }) => {
    createCardMutation.mutate(cardData);
  };

  const handleRemoveCard = (cardId: string) => {
    deleteCardMutation.mutate(cardId);
    setSelectedCard(null);
  };

  const handleCardClick = (card: GiftCardData) => {
    setSelectedCard(card);
    setIsDetailsOpen(true);
  };

  const mapCardToDisplay = (card: GiftCardType): GiftCardData => ({
    id: card.id,
    lastFourDigits: card.lastFourDigits,
    balance: parseFloat(card.balance),
    expiryMonth: card.expiryMonth,
    expiryYear: card.expiryYear,
    isExpired: card.isExpired || false,
    isLowBalance: parseFloat(card.balance) < 10,
  });

  const displayCards = cards.map(mapCardToDisplay);
  const totalBalance = displayCards.reduce((sum, card) => sum + card.balance, 0);

  const mapTransactions = (txns: Transaction[]) =>
    txns.map((tx) => ({
      id: tx.id,
      merchant: tx.merchant,
      amount: parseFloat(tx.amount),
      date: tx.date,
      type: tx.type as "purchase" | "coffee" | "fuel" | "store",
    }));

  return (
    <div className="min-h-screen bg-background">
      <Header onAddCard={() => setIsAddDialogOpen(true)} />

      <main className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        {isLoading ? (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <Skeleton className="h-4 w-24 mx-auto mb-2" />
              <Skeleton className="h-12 w-40 mx-auto" />
            </div>
            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="aspect-[1.586/1] rounded-2xl" />
              ))}
            </div>
          </div>
        ) : displayCards.length > 0 ? (
          <>
            <div className="mb-8 text-center">
              <p className="text-muted-foreground text-sm mb-1">Total Balance</p>
              <p className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-total-balance">
                ${totalBalance.toFixed(2)}
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                {displayCards.length} card{displayCards.length !== 1 ? "s" : ""} in wallet
              </p>
            </div>

            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              {displayCards.map((card) => (
                <GiftCard
                  key={card.id}
                  card={card}
                  onClick={() => handleCardClick(card)}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState onAddCard={() => setIsAddDialogOpen(true)} />
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
        transactions={mapTransactions(transactions)}
        onRemoveCard={handleRemoveCard}
      />
    </div>
  );
}
