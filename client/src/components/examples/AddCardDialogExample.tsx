import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddCardDialog from "../AddCardDialog";

export default function AddCardDialogExample() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Button onClick={() => setOpen(true)} data-testid="button-open-dialog">
        Open Add Card Dialog
      </Button>
      <AddCardDialog
        open={open}
        onOpenChange={setOpen}
        onAddCard={(card) => {
          console.log("Card added:", card);
        }}
      />
    </div>
  );
}
