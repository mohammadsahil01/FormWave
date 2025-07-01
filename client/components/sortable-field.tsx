'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField } from '@/types/form';
import {
  GripVertical,
  Settings,
  Copy,
  Trash2,
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

interface SortableFieldProps {
  field: FormField;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const fieldIcons = {
  text: Type,
  email: Mail,
  textarea: FileText,
  select: ChevronDown,
  radio: Circle,
  checkbox: Square,
  number: Hash,
  date: Calendar,
  file: Upload,
};

export function SortableField({
  field,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
}: SortableFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = fieldIcons[field.type];

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`cursor-pointer transition-all border-border bg-card ${
        isDragging ? 'opacity-50' : ''
      } ${
        isSelected ? 'ring-2 ring-primary border-primary/30' : 'hover:shadow-md hover:scale-[1.02]'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <button
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4" />
          </button>

          <Icon className="w-5 h-5 text-muted-foreground" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium text-foreground truncate">{field.label}</h4>
              {field.required && (
                <span className="text-destructive text-sm">*</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground capitalize">{field.type}</p>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onSelect();
              }}
              className="hover:bg-primary/10"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              className="hover:bg-primary/10"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}