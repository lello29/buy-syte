
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface DatePickerProps {
  id?: string;
  label: string;
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  description?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ id, label, date, onSelect, description }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={"outline"}
            className="w-full justify-start text-left font-normal"
          >
            <Calendar className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP")
            ) : (
              <span>Seleziona data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={onSelect}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
