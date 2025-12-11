import { Trash2, ShoppingBag, Coffee, Fuel, Store } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import GiftCard, { type GiftCardData } from "./GiftCard";

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  type: "purchase" | "coffee" | "fuel" | "store";
}

interface CardDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: GiftCardData | null;
  transactions?: Transaction[];
  onRemoveCard: (cardId: string) => void;
}

const iconMap = {
  purchase: ShoppingBag,
  coffee: Coffee,
  fuel: Fuel,
  store: Store,
};

export default function CardDetailsSheet({
  open,
  onOpenChange,
  card,
  transactions = [],
  onRemoveCard,
}: CardDetailsSheetProps) {
  if (!card) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle>Card Details</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-6 space-y-6">
            <GiftCard card={card} />

            <div className="flex gap-3">
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  onRemoveCard(card.id);
                  onOpenChange(false);
                }}
                data-testid="button-remove-card"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Card
              </Button>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
              
              {transactions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No transactions yet
                </p>
              ) : (
                <div className="space-y-1">
                  {transactions.map((tx) => {
                    const Icon = iconMap[tx.type];
                    return (
                      <div
                        key={tx.id}
                        className="flex items-center gap-3 py-3 border-b border-border last:border-0"
                        data-testid={`transaction-${tx.id}`}
                      >
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{tx.merchant}</p>
                          <p className="text-sm text-muted-foreground">{tx.date}</p>
                        </div>
                        <p className="font-semibold text-destructive">
                          -${tx.amount.toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
