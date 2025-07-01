"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientRedirect() {
    const router = useRouter();

    useEffect(() => {
        // 🧹 Clear localStorage drafts
        const keys = Object.keys(localStorage).filter((key) =>
            key.startsWith("doc-")
        );
        keys.forEach((key) => localStorage.removeItem(key));

        // 🚀 Redirect to dashboard
        router.replace("/dashboard");
    }, [router]);

    return null;
}
