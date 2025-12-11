import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreditCard, Lock, Calendar } from "lucide-react";

const addCardSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Card number is too long")
    .regex(/^[\d\s]+$/, "Card number must contain only digits"),
  cvv: z
    .string()
    .length(3, "CVV must be 3 digits")
    .regex(/^\d+$/, "CVV must contain only digits"),
  expiryMonth: z
    .string()
    .min(1, "Required")
    .max(2)
    .regex(/^(0[1-9]|1[0-2])$/, "Invalid month (01-12)"),
  expiryYear: z
    .string()
    .length(2, "Use 2 digits (e.g., 25)")
    .regex(/^\d+$/, "Year must be digits"),
  balance: z
    .string()
    .min(1, "Balance is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid balance format"),
});

type AddCardFormData = z.infer<typeof addCardSchema>;

interface AddCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCard: (card: {
    cardNumber: string;
    cvv: string;
    expiryMonth: string;
    expiryYear: string;
    balance: number;
  }) => void;
}

export default function AddCardDialog({
  open,
  onOpenChange,
  onAddCard,
}: AddCardDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddCardFormData>({
    resolver: zodResolver(addCardSchema),
    defaultValues: {
      cardNumber: "",
      cvv: "",
      expiryMonth: "",
      expiryYear: "",
      balance: "",
    },
  });

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(" ") : digits;
  };

  const onSubmit = async (data: AddCardFormData) => {
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    onAddCard({
      cardNumber: data.cardNumber.replace(/\s/g, ""),
      cvv: data.cvv,
      expiryMonth: data.expiryMonth,
      expiryYear: data.expiryYear,
      balance: parseFloat(data.balance),
    });
    
    form.reset();
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Gift Card
          </DialogTitle>
          <DialogDescription>
            Enter your Visa prepaid gift card details to add it to your wallet.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        {...field}
                        data-testid="input-card-number"
                        placeholder="1234 5678 9012 3456"
                        className="pl-10"
                        maxLength={19}
                        onChange={(e) => {
                          field.onChange(formatCardNumber(e.target.value));
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="expiryMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          {...field}
                          data-testid="input-expiry-month"
                          placeholder="MM"
                          className="pl-10"
                          maxLength={2}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiryYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        data-testid="input-expiry-year"
                        placeholder="YY"
                        maxLength={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          {...field}
                          data-testid="input-cvv"
                          type="password"
                          placeholder="•••"
                          className="pl-10"
                          maxLength={3}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Balance ($)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        {...field}
                        data-testid="input-balance"
                        placeholder="100.00"
                        className="pl-7"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
                data-testid="button-submit-card"
              >
                {isSubmitting ? "Adding..." : "Add Card"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
