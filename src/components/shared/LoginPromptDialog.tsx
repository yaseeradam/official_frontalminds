
"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface LoginPromptDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginPromptDialog({ isOpen, onOpenChange }: LoginPromptDialogProps) {
  const router = useRouter();

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-headline text-glow">Authentication Required</AlertDialogTitle>
          <AlertDialogDescription>
            You need to be logged in to access this feature. Please log in or create an account to continue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-between gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => {
                onOpenChange(false);
                router.push('/signup');
            }}>
              Sign Up
            </Button>
            <Button onClick={() => {
                onOpenChange(false);
                router.push('/login');
            }}>
              Login
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
