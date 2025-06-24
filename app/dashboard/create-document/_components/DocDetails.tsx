import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function DocDetails() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Document Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="document-title">Document Title</Label>
                        <Input id="document-title" placeholder="e.g. Website Development Proposal" className="w-full" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="document-type">Document Type</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="proposal">Proposal</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="nda">NDA</SelectItem>
                                <SelectItem value="invoice">Invoice</SelectItem>
                                <SelectItem value="quote">Quote</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default DocDetails;