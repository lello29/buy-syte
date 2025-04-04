
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Package, ShoppingBag, Store } from "lucide-react";
import ActivityItem from "./ActivityItem";

const RecentActivitiesCard: React.FC = () => {
  const activities = [
    {
      icon: <User className="h-4 w-4" />,
      iconBackgroundColor: "bg-blue-100",
      iconColor: "text-blue-700",
      text: "Nuovo utente registrato",
      timeAgo: "2 ore fa"
    },
    {
      icon: <Package className="h-4 w-4" />,
      iconBackgroundColor: "bg-green-100",
      iconColor: "text-green-700",
      text: "5 nuovi prodotti aggiunti",
      timeAgo: "3 ore fa"
    },
    {
      icon: <ShoppingBag className="h-4 w-4" />,
      iconBackgroundColor: "bg-amber-100",
      iconColor: "text-amber-700",
      text: "Nuovo ordine completato",
      timeAgo: "5 ore fa"
    },
    {
      icon: <Store className="h-4 w-4" />,
      iconBackgroundColor: "bg-purple-100",
      iconColor: "text-purple-700",
      text: "Nuovo negozio registrato",
      timeAgo: "6 ore fa"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attività recenti</CardTitle>
        <CardDescription>Ultime azioni sulla piattaforma</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <ActivityItem
              key={index}
              icon={activity.icon}
              iconBackgroundColor={activity.iconBackgroundColor}
              iconColor={activity.iconColor}
              text={activity.text}
              timeAgo={activity.timeAgo}
            />
          ))}
        </ul>
        <Button variant="ghost" size="sm" className="w-full mt-4">
          Visualizza tutte le attività
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentActivitiesCard;
