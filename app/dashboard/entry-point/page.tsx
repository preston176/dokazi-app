import { redirect } from "next/navigation";
import { createOrGetUser } from "@/app/actions/createOrGetUser";

export default async function DashboardEntryPoint() {
    await createOrGetUser(); // ensures user is in DB

    redirect("/dashboard/"); // or wherever your real dashboard is
}