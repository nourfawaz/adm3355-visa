import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import VisaLogo from "./VisaLogo";

interface HeaderProps {
  onAddCard: () => void;
}

export default function Header({ onAddCard }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-primary shadow-md">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <VisaLogo variant="light" className="w-12" />
          <span className="text-white font-semibold text-lg hidden sm:inline">Wallet</span>
        </div>
        
        <h1 className="text-white font-semibold text-lg absolute left-1/2 -translate-x-1/2">
          My Wallet
        </h1>
        
        <Button
          data-testid="button-add-card"
          onClick={onAddCard}
          size="icon"
          variant="ghost"
          className="text-white hover:bg-white/10"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
