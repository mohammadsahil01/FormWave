'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { ArrowLeft, Download, Eye, Users, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Analytics() {
  const [selectedForm] = useState({
    id: 1,
    title: 'Customer Feedback Survey',
    responses: 156,
    views: 324,
    conversionRate: 48.1,
    createdAt: '2024-01-15',
  });

  const responseData = [
    { date: '2024-01-20', responses: 12 },
    { date: '2024-01-21', responses: 18 },
    { date: '2024-01-22', responses: 23 },
    { date: '2024-01-23', responses: 15 },
    { date: '2024-01-24', responses: 31 },
    { date: '2024-01-25', responses: 28 },
    { date: '2024-01-26', responses: 29 },
  ];

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
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
                <p className="text-sm text-muted-foreground">{selectedForm.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Link href={`/forms/${selectedForm.id}`}>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Form
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedForm.responses}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Form Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedForm.views}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedForm.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">
                +2.3% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2m 34s</div>
              <p className="text-xs text-muted-foreground">
                -15s from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Response Chart */}
        <Card className="mb-8 border-border bg-card">
          <CardHeader>
            <CardTitle>Response Trends</CardTitle>
            <CardDescription>Daily responses over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {responseData.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-2">
                  <div
                    className="bg-primary rounded-t-sm transition-all duration-200 hover:bg-primary/80"
                    style={{
                      height: `${(data.responses / Math.max(...responseData.map(d => d.responses))) * 200}px`,
                      width: '40px',
                    }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {new Date(data.date).getDate()}
                  </span>
                  <span className="text-xs font-medium">{data.responses}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Responses */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Recent Responses</CardTitle>
            <CardDescription>Latest form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, name: 'John Doe', email: 'john@example.com', rating: 'Excellent', time: '2 minutes ago' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', rating: 'Good', time: '15 minutes ago' },
                { id: 3, name: 'Bob Johnson', email: 'bob@example.com', rating: 'Excellent', time: '1 hour ago' },
                { id: 4, name: 'Alice Brown', email: 'alice@example.com', rating: 'Average', time: '2 hours ago' },
                { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', rating: 'Good', time: '3 hours ago' },
              ].map((response) => (
                <div key={response.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                      {response.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{response.name}</p>
                      <p className="text-sm text-muted-foreground">{response.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge 
                      variant={
                        response.rating === 'Excellent' ? 'default' :
                        response.rating === 'Good' ? 'secondary' :
                        'outline'
                      }
                    >
                      {response.rating}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{response.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}