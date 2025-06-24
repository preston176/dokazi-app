import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function CustomContentSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Custom Content (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="document-content">Document Content</Label>
                    <Textarea
                        id="document-content"
                        placeholder="Leave blank to auto-generate content based on document type."
                        className="min-h-32 resize-none"
                        rows={6}
                    />
                    <p className="text-sm text-gray-500">
                        AI-based content will be automatically generated based on your document type and details.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default CustomContentSection;