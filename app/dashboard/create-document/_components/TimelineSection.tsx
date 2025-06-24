import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function TimelineSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <div className="relative">
                            <Input id="start-date" placeholder="dd/mm/yyyy" type="date" className="w-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <div className="relative">
                            <Input id="end-date" placeholder="dd/mm/yyyy" type="date" className="w-full" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Input id="duration" placeholder="e.g. 4-6 weeks" className="w-full" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default TimelineSection;