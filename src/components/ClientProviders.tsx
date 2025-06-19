"use client";

import { SessionProvider } from "next-auth/react";
import { BookmarkProvider } from "@/context/BookmarkContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <BookmarkProvider>{children}</BookmarkProvider>
    </SessionProvider>
  );
}
