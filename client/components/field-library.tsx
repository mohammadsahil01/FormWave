'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField } from '@/types/form';
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
} from 'lucide-react';

interface FieldLibraryProps {
  onAddField: (type: FormField['type']) => void;
}

const fieldTypes = [
  {
    type: 'text' as const,
    label: 'Text Input',
    icon: Type,
    description: 'Single line text input',
  },
  {
    type: 'email' as const,
    label: 'Email',
    icon: Mail,
    description: 'Email address input',
  },
  {
    type: 'textarea' as const,
    label: 'Textarea',
    icon: FileText,
    description: 'Multi-line text input',
  },
  {
    type: 'select' as const,
    label: 'Dropdown',
    icon: ChevronDown,
    description: 'Dropdown selection',
  },
  {
    type: 'radio' as const,
    label: 'Radio Buttons',
    icon: Circle,
    description: 'Single choice selection',
  },
  {
    type: 'checkbox' as const,
    label: 'Checkboxes',
    icon: Square,
    description: 'Multiple choice selection',
  },
  {
    type: 'number' as const,
    label: 'Number',
    icon: Hash,
    description: 'Numeric input',
  },
  {
    type: 'date' as const,
    label: 'Date',
    icon: Calendar,
    description: 'Date picker',
  },
  {
    type: 'file' as const,
    label: 'File Upload',
    icon: Upload,
    description: 'File upload input',
  },
];

export function FieldLibrary({ onAddField }: FieldLibraryProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg">Field Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {fieldTypes.map((fieldType) => {
            const Icon = fieldType.icon;
            return (
              <Button
                key={fieldType.type}
                variant="outline"
                className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-primary/5 hover:border-primary/30 transition-all hover:scale-105 border-border"
                onClick={() => onAddField(fieldType.type)}
              >
                <Icon className="w-5 h-5 text-muted-foreground" />
                <div className="text-center">
                  <div className="font-medium text-sm text-foreground">{fieldType.label}</div>
                  <div className="text-xs text-muted-foreground hidden lg:block">
                    {fieldType.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}