"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDocumentField } from "@/lib/useDocumentField";
import useStore from "@/store/DocumentStore";
import { useEditDocStore } from "@/store/EditDocumentStore";

function PricingSection({isEdit}: {isEdit?: boolean}) {
  const amountField = useDocumentField("PricingAmount", isEdit? useEditDocStore: useStore);
  const currencyField = useDocumentField("Currency", isEdit? useEditDocStore: useStore);
  const typeField = useDocumentField("Type", isEdit? useEditDocStore: useStore);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pricing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              placeholder="500"
              type="number"
              className="w-full"
              value={amountField.value}
              onChange={(e) => {
                // override value to number before passing to the handler
                e.target.value = String(Number(e.target.value) || 0);
                amountField.onChange(e);
              }}
            />
          </div>

          {/* Currency Select */}
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={currencyField.value}
              onValueChange={(val) =>
                currencyField.onChange({
                  target: { value: val },
                } as any)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">$ USD</SelectItem>
                <SelectItem value="eur">€ EUR</SelectItem>
                <SelectItem value="gbp">£ GBP</SelectItem>
                <SelectItem value="cad">$ CAD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Type Select */}
          <div className="space-y-2">
            <Label htmlFor="pricing-type">Type</Label>
            <Select
              value={typeField.value}
              onValueChange={(val) =>
                typeField.onChange({
                  target: { value: val },
                } as any)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pricing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="milestone">Milestone</SelectItem>
                <SelectItem value="retainer">Retainer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PricingSection;
