"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField } from "@/types/form";
import { FieldLibraryModal } from "./field-library";
import { FieldEditor } from "./field-editor";
import { SortableField } from "./sortable-field";
import { useState } from "react";

interface FormBuilderProps {
  fields: FormField[];
  onAddField: (type: FormField["type"]) => void;
  onUpdateField: (id: string, updates: Partial<FormField>) => void;
  onDeleteField: (id: string) => void;
  onDuplicateField: (id: string) => void;
}

export function FormBuilder({
  fields,
  onAddField,
  onUpdateField,
  onDeleteField,
  onDuplicateField,
}: FormBuilderProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const selectedField = fields.find((field) => field.id === selectedFieldId);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  return (
    <div className="h-full flex bg-background">
      {/* Main Builder Area */}
      <div className="flex-1 p-6 overflow-y-auto scrollbar-thin">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Form Builder
            </h2>
            <p className="text-muted-foreground text-sm">
              Drag and drop fields to build your form, or click to add them.
            </p>
          </div>

          {/* Form Fields */}
          <div className="mt-8">
            <h3 className="text-md font-medium text-foreground mb-4">
              Form Fields
            </h3>

            {fields.length === 0 ? (
              <Card className="border-dashed border-2 border-border bg-card">
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground mb-4">
                    <svg
                      className="mx-auto h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Start building your form
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Add fields from the library above to get started.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {fields.map((field) => (
                  <SortableField
                    key={field.id}
                    field={field}
                    isSelected={selectedFieldId === field.id}
                    onSelect={() => setSelectedFieldId(field.id)}
                    onDelete={() => onDeleteField(field.id)}
                    onDuplicate={() => onDuplicateField(field.id)}
                  />
                ))}
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setIsLibraryOpen(true)}>
                + Add Field
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Field Editor Sidebar */}
      {selectedField && (
        <div className="w-80 border-l border-border bg-card">
          <FieldEditor
            field={selectedField}
            onUpdate={(updates) => onUpdateField(selectedField.id, updates)}
            onClose={() => setSelectedFieldId(null)}
          />
        </div>
      )}

      {/* Field Library */}
      <FieldLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onAddField={(type) => {
          // Your existing logic
          onAddField(type);
        }}
      />
    </div>
  );
}
