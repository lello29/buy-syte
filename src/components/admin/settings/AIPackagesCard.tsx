
import React from "react";
import { CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { AIPackagesCardContent } from "./ai-packages/AIPackagesCardContent";

export function AIPackagesCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Pacchetti AI
        </CardTitle>
        <CardDescription>
          Gestisci i pacchetti di crediti AI disponibili per i negozi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AIPackagesCardContent />
      </CardContent>
    </Card>
  );
}
