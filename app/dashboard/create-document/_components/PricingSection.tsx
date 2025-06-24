import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function PricingSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" placeholder="500" type="number" className="w-full" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select defaultValue="usd">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="usd">$ USD</SelectItem>
                                <SelectItem value="eur">€ EUR</SelectItem>
                                <SelectItem value="gbp">£ GBP</SelectItem>
                                <SelectItem value="cad">$ CAD</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pricing-type">Type</Label>
                        <Select defaultValue="fixed">
                            <SelectTrigger>
                                <SelectValue />
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
    )
}


export default PricingSection;