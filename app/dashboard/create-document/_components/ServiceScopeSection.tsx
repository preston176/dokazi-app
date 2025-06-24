"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { useState } from "react"

function ServiceScopeSection() {
    const [services, setServices] = useState([""])

    const addService = () => {
        setServices([...services, ""])
    }

    const updateService = (index: number, value: string) => {
        const newServices = [...services]
        newServices[index] = value
        setServices(newServices)
    }

    const removeService = (index: number) => {
        if (services.length > 1) {
            setServices(services.filter((_, i) => i !== index))
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Services & Scope</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Services</Label>
                    {services.map((service, index) => (
                        <div key={index} className="flex gap-2">
                            <Input
                                placeholder="e.g. Website Design"
                                value={service}
                                onChange={(e) => updateService(index, e.target.value)}
                                className="flex-1"
                            />
                            {services.length > 1 && (
                                <Button variant="outline" size="sm" onClick={() => removeService(index)} className="px-3">
                                    ×
                                </Button>
                            )}
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addService} className="gap-2 mt-2">
                        <Plus className="w-4 h-4" />
                        Add Service
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default ServiceScopeSection;