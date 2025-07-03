"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDocumentField } from "@/lib/useDocumentField";
import useStore from "@/store/DocumentStore";
import { useEditDocStore } from "@/store/EditDocumentStore";
function TimelineSection({isEdit}: {isEdit?: boolean}) {
    
  const startDateField = useDocumentField("StartDate", isEdit? useEditDocStore: useStore);
  const endDateField = useDocumentField("EndDate", isEdit? useEditDocStore: useStore);
  const durationField = useDocumentField("Duration", isEdit? useEditDocStore: useStore);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Timeline</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <div className="relative">
              <Input
                id="start-date"
                type="date"
                className="w-full"
                value={startDateField.value}
                onChange={startDateField.onChange}
              />
            </div>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <div className="relative">
              <Input
                id="end-date"
                type="date"
                className="w-full"
                value={endDateField.value}
                onChange={endDateField.onChange}
              />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              placeholder="e.g. 4-6 weeks"
              className="w-full"
              value={durationField.value}
              onChange={durationField.onChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TimelineSection;
