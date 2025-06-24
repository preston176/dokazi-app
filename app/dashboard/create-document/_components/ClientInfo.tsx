"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ClientInfo() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Client Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="client-name">Client Name</Label>
                        <Input id="client-name" placeholder="Enter client name" className="w-full" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="client-email">Client Email</Label>
                        <Input id="client-email" type="email" placeholder="client@example.com" className="w-full" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ClientInfo;