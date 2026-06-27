import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const COUNTDOWN_DURATION = 15;
const STORAGE_KEY = "bmb-install-prompt-dismissed";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(COUNTDOWN_DURATION);

  // Listen for the browser's install prompt event
  useEffect(() => {
    const alreadyDismissed = localStorage.getItem(STORAGE_KEY) === "true";
    if (alreadyDismissed) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsOpen(true);
      setSecondsRemaining(COUNTDOWN_DURATION);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || secondsRemaining <= 0) return;

    const timer = setTimeout(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, secondsRemaining]);

  // Auto-close when countdown reaches 0
  useEffect(() => {
    if (secondsRemaining === 0 && isOpen) {
      handleDismiss();
    }
  }, [secondsRemaining, isOpen]);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        localStorage.setItem(STORAGE_KEY, "true");
      }

      setDeferredPrompt(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Install prompt error:", error);
    }
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsOpen(false);
    setDeferredPrompt(null);
  }, []);

  if (!deferredPrompt || !isOpen) return null;

  const isCountingDown = secondsRemaining > 0;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isCountingDown) handleDismiss();
      }}
    >
      <DialogContent
        className="sm:max-w-sm"
        // Prevent closing by clicking outside during countdown
        onPointerDownOutside={(e) => {
          if (isCountingDown) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (isCountingDown) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Install App</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Get quick access to Bmb Tech tools. Install our app on your device for a faster
            experience.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:flex-row">
          <Button
            variant="ghost"
            onClick={handleDismiss}
            disabled={isCountingDown}
            className="flex-1"
          >
            Later
          </Button>
          <Button
            onClick={handleInstall}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isCountingDown ? `Install app (${secondsRemaining})` : "Install app"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InstallPrompt;
