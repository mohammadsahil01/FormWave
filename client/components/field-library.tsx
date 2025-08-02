"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "@/types/form";
import {
  Type,
  Mail,
  FileText,
  ChevronDown,
  Circle,
  Square,
  Hash,
  Calendar,
  Upload,
} from "lucide-react";
import { useState } from "react";

interface FieldLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddField: (type: FormField["type"]) => void;
}

const fieldTypes = [
  {
    type: "text" as const,
    label: "Text Input",
    icon: Type,
    description: "Single line text input",
  },
  {
    type: "email" as const,
    label: "Email",
    icon: Mail,
    description: "Email address input",
  },
  {
    type: "textarea" as const,
    label: "Textarea",
    icon: FileText,
    description: "Multi-line text input",
  },
  {
    type: "select" as const,
    label: "Dropdown",
    icon: ChevronDown,
    description: "Dropdown selection",
  },
  {
    type: "radio" as const,
    label: "Radio Buttons",
    icon: Circle,
    description: "Single choice selection",
  },
  {
    type: "checkbox" as const,
    label: "Checkboxes",
    icon: Square,
    description: "Multiple choice selection",
  },
  {
    type: "number" as const,
    label: "Number",
    icon: Hash,
    description: "Numeric input",
  },
  {
    type: "date" as const,
    label: "Date",
    icon: Calendar,
    description: "Date picker",
  },
  {
    type: "file" as const,
    label: "File Upload",
    icon: Upload,
    description: "File upload input",
  },
];

export function FieldLibraryModal({
  isOpen,
  onClose,
  onAddField,
}: FieldLibraryModalProps) {
  const [isAdding, setIsAdding] = useState<string | null>(null);

  const handleAddField = (type: FormField["type"]) => {
    setIsAdding(type);
    onAddField(type);
    // Optional: auto-close after selection
    // onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-lg p-0 overflow-hidden"
        onInteractOutside={(e) => {
          if (isAdding) e.preventDefault(); // Prevent closing during async action
        }}
      >
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-lg">Add a Field</DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          <p className="text-sm text-muted-foreground mb-4">
            Choose a field type to add to your form.
          </p>

          <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
            {fieldTypes.map((fieldType) => {
              const Icon = fieldType.icon;
              return (
                <Button
                  key={fieldType.type}
                  variant="outline"
                  className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-primary/10 hover:border-primary border-border transition-all"
                  onClick={() => handleAddField(fieldType.type)}
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <div className="text-center">
                    <div className="font-medium text-sm text-foreground">
                      {fieldType.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {fieldType.description}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
