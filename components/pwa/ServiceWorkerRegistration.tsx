"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
    useEffect(() => {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
            const registerSW = async () => {
                try {
                    const registration = await navigator.serviceWorker.register("/sw.js", {
                        scope: "/",
                    });

                    console.log("[PWA] Service Worker registered:", registration.scope);

                    registration.addEventListener("updatefound", () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                            newWorker.addEventListener("statechange", () => {
                                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                                    console.log("[PWA] New content available, refresh to update.");
                                }
                            });
                        }
                    });
                } catch (error) {
                    console.error("[PWA] Service Worker registration failed:", error);
                }
            };

            registerSW();
        }
    }, []);

    return null;
}
