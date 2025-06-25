"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useDocumentField } from "@/lib/useDocumentField"; // adjust if needed

function ServiceScopeSection() {
  const scopeField = useDocumentField("ServiceScope");

  const services = scopeField.value;

  const updateService = (index: number, value: string) => {
    const updated = [...services];
    updated[index] = value;
    scopeField.onChange({ target: { value: updated } } as any);
  };

  const addService = () => {
    scopeField.onChange({ target: { value: [...services, ""] } } as any);
  };

  const removeService = (index: number) => {
    if (services.length > 1) {
      const filtered = services.filter((_, i) => i !== index);
      scopeField.onChange({ target: { value: filtered } } as any);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Services & Scope</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Services</Label>
          {services.map((service: string, index: number) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="e.g. Website Design"
                value={service}
                onChange={(e) => updateService(index, e.target.value)}
                className="flex-1"
              />
              {services.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeService(index)}
                  className="px-3"
                >
                  ×
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addService}
            className="gap-2 mt-2"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ServiceScopeSection;
