"use client";

import { useState } from "react";
import { FormField } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Trash2 } from "lucide-react";

interface FieldEditorProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onClose: () => void;
}

export function FieldEditor({ field, onUpdate, onClose }: FieldEditorProps) {
  const [localField, setLocalField] = useState(field);

  const handleUpdate = (updates: Partial<FormField>) => {
    const updatedField = { ...localField, ...updates };
    setLocalField(updatedField);
    onUpdate(updates);
  };

  const addOption = () => {
    const newOptions = [
      ...(localField.options || []),
      `Option ${(localField.options?.length || 0) + 1}`,
    ];
    handleUpdate({ options: newOptions });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(localField.options || [])];
    newOptions[index] = value;
    handleUpdate({ options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = localField.options?.filter((_, i) => i !== index) || [];
    handleUpdate({ options: newOptions });
  };

  const hasOptions = ["select", "radio", "checkbox"].includes(field.type);
  const hasValidation = ["text", "email", "number", "textarea"].includes(
    field.type
  );

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Edit Field</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="hover:bg-muted"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
        {/* Basic Settings */}
        <Card className="border-border bg-background">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Basic Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="label" className="text-foreground">
                Field Label
              </Label>
              <Input
                id="label"
                value={localField.label}
                onChange={(e) => handleUpdate({ label: e.target.value })}
                placeholder="Enter field label"
                className="bg-background border-border"
              />
            </div>

            {field.type !== "checkbox" && (
              <div className="space-y-2">
                <Label htmlFor="placeholder" className="text-foreground">
                  Placeholder Text
                </Label>
                <Input
                  id="placeholder"
                  value={localField.placeholder || ""}
                  onChange={(e) =>
                    handleUpdate({ placeholder: e.target.value })
                  }
                  placeholder="Enter placeholder text"
                  className="bg-background border-border"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-foreground">Required Field</Label>
                <p className="text-sm text-muted-foreground">
                  Users must fill this field
                </p>
              </div>
              <Switch
                checked={localField.required}
                onCheckedChange={(checked) =>
                  handleUpdate({ required: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Options */}
        {hasOptions && (
          <Card className="border-border bg-background">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {localField.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="bg-background border-border"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOption(index)}
                      disabled={localField.options!.length <= 1}
                      className="hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addOption}
                className="w-full border-border hover:bg-primary/5"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Validation */}
        {hasValidation && (
          <Card className="border-border bg-background">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Validation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {field.type === "text" || field.type === "textarea" ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="minLength" className="text-foreground">
                        Min Length
                      </Label>
                      <Input
                        id="minLength"
                        type="number"
                        value={localField.validation?.min || ""}
                        onChange={(e) =>
                          handleUpdate({
                            validation: {
                              ...localField.validation,
                              min: e.target.value
                                ? parseInt(e.target.value)
                                : undefined,
                            },
                          })
                        }
                        placeholder="0"
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxLength" className="text-foreground">
                        Max Length
                      </Label>
                      <Input
                        id="maxLength"
                        type="number"
                        value={localField.validation?.max || ""}
                        onChange={(e) =>
                          handleUpdate({
                            validation: {
                              ...localField.validation,
                              max: e.target.value
                                ? parseInt(e.target.value)
                                : undefined,
                            },
                          })
                        }
                        placeholder="∞"
                        className="bg-background border-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pattern" className="text-foreground">
                      Pattern (Regex)
                    </Label>
                    <Input
                      id="pattern"
                      value={localField.validation?.pattern || ""}
                      onChange={(e) =>
                        handleUpdate({
                          validation: {
                            ...localField.validation,
                            pattern: e.target.value,
                          },
                        })
                      }
                      placeholder="^[a-zA-Z0-9]*$"
                      className="bg-background border-border"
                    />
                  </div>
                </>
              ) : field.type === "number" ? (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="minValue" className="text-foreground">
                      Min Value
                    </Label>
                    <Input
                      id="minValue"
                      type="number"
                      value={localField.validation?.min || ""}
                      onChange={(e) =>
                        handleUpdate({
                          validation: {
                            ...localField.validation,
                            min: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          },
                        })
                      }
                      placeholder="0"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxValue" className="text-foreground">
                      Max Value
                    </Label>
                    <Input
                      id="maxValue"
                      type="number"
                      value={localField.validation?.max || ""}
                      onChange={(e) =>
                        handleUpdate({
                          validation: {
                            ...localField.validation,
                            max: e.target.value
                              ? parseInt(e.target.value)
                              : undefined,
                          },
                        })
                      }
                      placeholder="∞"
                      className="bg-background border-border"
                    />
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        )}

        {/* Field Info */}
        <Card className="border-border bg-background">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Field Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Field Type
                </span>
                <Badge variant="outline" className="capitalize border-border">
                  {field.type}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Field ID</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  {field.id}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
