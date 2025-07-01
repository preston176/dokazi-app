import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function CreateDocumentPage() {
    // Generate a unique docid using uuid
    const docid = uuidv4();

    // Redirect to the dynamic route with the generated docid
    redirect(`/dashboard/create-document/${docid}`);

    // Optionally, return null or a loading state (won't be seen due to redirect)
    return null;
}