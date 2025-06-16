"use client";

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-destructive mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg text-muted-foreground mb-8">
              We encountered an unexpected error. Please try again.
            </p>
            {error?.digest && (
              <p className="text-sm text-muted-foreground mb-2">Error Digest: {error.digest}</p>
            )}
            <Button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
              size="lg"
            >
              Try again
            </Button>
            <p className="mt-4 text-sm">
                If the problem persists, please contact support or go to the <a href="/" className="text-primary hover:underline">Homepage</a>.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
