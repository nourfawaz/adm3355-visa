import { Shield } from "lucide-react";
import VisaLogo from "./VisaLogo";
import { Badge } from "@/components/ui/badge";

export interface GiftCardData {
  id: string;
  lastFourDigits: string;
  balance: number;
  expiryMonth: string;
  expiryYear: string;
  isExpired?: boolean;
  isLowBalance?: boolean;
}

interface GiftCardProps {
  card: GiftCardData;
  onClick?: () => void;
}

export default function GiftCard({ card, onClick }: GiftCardProps) {
  const isLowBalance = card.balance < 10;
  const isExpired = card.isExpired;

  return (
    <div
      onClick={onClick}
      data-testid={`card-gift-${card.id}`}
      className={`relative aspect-[1.586/1] rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
        isExpired
          ? "bg-gradient-to-br from-gray-400 to-gray-500"
          : "bg-gradient-to-br from-[#1A1F71] via-[#2D3A8C] to-[#1A1F71]"
      }`}
    >
      {isExpired && (
        <div className="absolute inset-0 rounded-2xl bg-black/30 flex items-center justify-center">
          <Badge variant="secondary" className="text-sm font-semibold">
            Expired
          </Badge>
        </div>
      )}
      
      <div className="flex flex-col h-full justify-between relative z-10">
        <div className="flex justify-between items-start">
          <VisaLogo variant="light" className="w-12 md:w-16" />
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0">
              Prepaid Gift Card
            </Badge>
            <Shield className="w-4 h-4 text-white/70" />
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <p className="font-mono text-lg md:text-xl text-white/90 tracking-widest">
            •••• •••• •••• {card.lastFourDigits}
          </p>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/60 text-xs mb-1">Balance</p>
            <div className="flex items-center gap-2">
              <p className="text-white text-2xl md:text-3xl font-bold">
                ${card.balance.toFixed(2)}
              </p>
              {isLowBalance && !isExpired && (
                <Badge className="bg-amber-500 text-white text-xs border-0">
                  Low
                </Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-xs mb-1">Expires</p>
            <p className="text-white text-sm font-medium">
              {card.expiryMonth}/{card.expiryYear}
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7B600]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F7B600]/5 rounded-full blur-2xl" />
    </div>
  );
}
