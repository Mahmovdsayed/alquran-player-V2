'use client'

import { store } from '@/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner"
import { useState } from "react";
import { Provider } from 'react-redux';

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <>
            <Provider store={store}>
                <NextThemesProvider attribute={"class"} defaultTheme='dark' enableSystem={false} storageKey='alquran-player'>
                    <Toaster position="top-center" closeButton={true}/>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </NextThemesProvider>
            </Provider>
        </>
    )
}