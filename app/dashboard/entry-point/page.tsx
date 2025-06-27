//@ts-ignore: React declarations for tsx
import ClientRedirect from "./ClientRedirect";
import { createOrGetUser } from "@/app/actions/createOrGetUser";

export default async function DashboardEntryPoint() {
    await createOrGetUser(); // Ensure user is in DB

    // Render client-side redirect component to clear drafts and navigate
    return <ClientRedirect />;
}
