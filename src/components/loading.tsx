'use client';

import { useFunctions } from "@/hooks/use-functions";

export default function LoadingScreen() {
  const { loading } = useFunctions();

  if (!loading.data) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <h2 className="text-2xl font-heading">Loading Zen Razor</h2>
        <p className="text-muted-foreground">Please wait while we prepare your experience...</p>
      </div>
    </div>
  );
} 