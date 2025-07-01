"use client";

import { FormField } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface FormPreviewProps {
  title: string;
  description: string;
  fields: FormField[];
}

export function FormPreview({ title, description, fields }: FormPreviewProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would send the data to your backend
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      key: field.id,
      required: field.required,
    };

    switch (field.type) {
      case "text":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-foreground">
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Input
              id={field.id}
              type="text"
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))
              }
              className="bg-background border-border"
              {...commonProps}
            />
          </div>
        );

      case "email":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-foreground">
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Input
              id={field.id}
              type="email"
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))
              }
              className="bg-background border-border"
              {...commonProps}
            />
          </div>
        );

      case "number":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-foreground">
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Input
              id={field.id}
              type="number"
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))
              }
              min={field.validation?.min}
              max={field.validation?.max}
              className="bg-background border-border"
              {...commonProps}
            />
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-foreground">
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))
              }
              className="bg-background border-border"
              {...commonProps}
            />
          </div>
        );

      case "select":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-foreground">
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Select
              value={formData[field.id] || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, [field.id]: value }))
              }
              {...commonProps}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue
                  placeholder={field.placeholder || "Select an option"}
                />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case "radio":
        return (
          <div className="space-y-3">
            <Label className="text-foreground">
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <RadioGroup
              value={formData[field.id] || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, [field.id]: value }))
              }
            >
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                  <Label
                    htmlFor={`${field.id}-${index}`}
                    className="text-foreground"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-3">
            <Label className="text-foreground">
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-${index}`}
                    checked={(formData[field.id] || []).includes(option)}
                    onCheckedChange={(checked) => {
                      const currentValues = formData[field.id] || [];
                      const newValues = checked
                        ? [...currentValues, option]
                        : currentValues.filter((v: string) => v !== option);
                      setFormData((prev) => ({
                        ...prev,
                        [field.id]: newValues,
                      }));
                    }}
                  />
                  <Label
                    htmlFor={`${field.id}-${index}`}
                    className="text-foreground"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case "date":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-foreground">
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Input
              id={field.id}
              type="date"
              value={formData[field.id] || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))
              }
              className="bg-background border-border"
              {...commonProps}
            />
          </div>
        );

      case "file":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} className="text-foreground">
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Input
              id={field.id}
              type="file"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.id]: e.target.files?.[0],
                }))
              }
              className="bg-background border-border"
              {...commonProps}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="max-w-2xl mx-auto p-6">
        {/* Form Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {title || "Untitled Form"}
            </h1>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>
        </div>

        {/* Form Content */}
        <Card className="shadow-lg border-border bg-card">
          <CardContent className="p-8">
            {fields.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <svg
                    className="mx-auto h-16 w-16"
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
                <h3 className="text-xl font-medium text-foreground mb-2">
                  No fields added yet
                </h3>
                <p className="text-muted-foreground">
                  Add fields from the builder to see your form preview
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {fields.map(renderField)}

                <div className="pt-6 border-t border-border">
                  <Button type="submit" className="w-full">
                    Submit Form
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by <span className="font-semibold">FormWave</span>
          </p>
        </div>
      </div>
    </div>
  );
}
