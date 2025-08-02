"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FormBuilder } from "@/components/form-builder";
import { FormPreview } from "@/components/form-preview";
import { ThemeToggle } from "@/components/theme-toggle";
import { FormField } from "@/types/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Settings, Share } from "lucide-react";
import Link from "next/link";

export default function Builder() {
  const [activeTab, setActiveTab] = useState<"builder" | "preview">("builder");
  const [fields, setFields] = useState<FormField[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) return;

      if (active.id !== over.id) {
        const oldIndex = fields.findIndex((field) => field.id === active.id);
        const newIndex = fields.findIndex((field) => field.id === over.id);

        setFields((fields) => arrayMove(fields, oldIndex, newIndex));
      }

      setActiveId(null);
    },
    [fields]
  );

  const addField = useCallback((type: FormField["type"]) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      placeholder: type === "text" ? "Enter text here..." : "",
      required: false,
      options:
        type === "select" || type === "radio" || type === "checkbox"
          ? ["Option 1", "Option 2"]
          : undefined,
    };

    setFields((prev) => [...prev, newField]);
  }, []);

  const updateField = useCallback((id: string, updates: Partial<FormField>) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, ...updates } : field))
    );
  }, []);

  const deleteField = useCallback((id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  }, []);

  const duplicateField = useCallback(
    (id: string) => {
      const field = fields.find((f) => f.id === id);
      if (field) {
        const newField = {
          ...field,
          id: `field-${Date.now()}`,
          label: `${field.label} (Copy)`,
        };
        const index = fields.findIndex((f) => f.id === id);
        setFields((prev) => [
          ...prev.slice(0, index + 1),
          newField,
          ...prev.slice(index + 1),
        ]);
      }
    },
    [fields]
  );
  console.log("Fields:", fields);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>

              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="text-lg font-semibold bg-transparent border-none outline-none focus:bg-muted px-2 py-1 rounded text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center bg-muted rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("builder")}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "builder"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Builder
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                    activeTab === "preview"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Preview
                </button>
              </div>

              <ThemeToggle />

              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>

              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>

              <Button size="sm">Save Form</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="md:hidden bg-card border-b border-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab("builder")}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "builder"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === "preview"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
          >
            <Eye className="w-4 h-4 inline mr-1" />
            Preview
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-8rem)]">
              {/* Builder Panel */}
              <div
                className={`${
                  activeTab === "builder" ? "block" : "hidden md:block"
                } bg-background`}
              >
                <FormBuilder
                  fields={fields}
                  onAddField={addField}
                  onUpdateField={updateField}
                  onDeleteField={deleteField}
                  onDuplicateField={duplicateField}
                />
              </div>

              {/* Preview Panel */}
              <div
                className={`bg-muted/30 ${
                  activeTab === "preview" ? "block" : "hidden md:block"
                }`}
              >
                <FormPreview
                  title={formTitle}
                  description={formDescription}
                  fields={fields}
                />
              </div>
            </div>
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
                Dragging field...
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
