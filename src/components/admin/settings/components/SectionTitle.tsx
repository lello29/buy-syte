
import React from "react";
import { LucideIcon } from "lucide-react";

interface SectionTitleProps {
  icon: LucideIcon;
  title: string;
}

export const SectionTitle = ({ icon: Icon, title }: SectionTitleProps) => {
  return (
    <div className="flex items-center gap-2 text-lg font-semibold mt-8">
      <Icon className="h-5 w-5 text-primary" />
      <h2>{title}</h2>
    </div>
  );
};
