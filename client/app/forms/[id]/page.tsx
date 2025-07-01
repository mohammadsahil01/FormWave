'use client';

import { useState, useEffect } from 'react';
import { FormPreview } from '@/components/form-preview';
import { FormField } from '@/types/form';

// Mock data - in real app, this would come from your API
const mockFormData = {
  id: '1',
  title: 'Customer Feedback Survey',
  description: 'Help us improve our services by sharing your feedback',
  fields: [
    {
      id: 'name',
      type: 'text' as const,
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
    },
    {
      id: 'email',
      type: 'email' as const,
      label: 'Email Address',
      placeholder: 'your.email@example.com',
      required: true,
    },
    {
      id: 'rating',
      type: 'radio' as const,
      label: 'How would you rate our service?',
      required: true,
      options: ['Excellent', 'Good', 'Average', 'Poor'],
    },
    {
      id: 'feedback',
      type: 'textarea' as const,
      label: 'Additional Comments',
      placeholder: 'Please share any additional feedback...',
      required: false,
    },
  ] as FormField[],
};

export default function PublicForm({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState(mockFormData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <FormPreview
        title={formData.title}
        description={formData.description}
        fields={formData.fields}
      />
    </div>
  );
}