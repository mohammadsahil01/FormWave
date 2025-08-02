"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Plus, FileText, BarChart3, Settings, Users } from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton,
} from "@clerk/nextjs";
import axiosClient from "@/lib/utils/axiosInstance";

export default function Dashboard() {
  const { getToken } = useAuth();
  const forms = [
    {
      id: 1,
      title: "Customer Feedback Survey",
      description: "Collect feedback from customers about our services",
      responses: 42,
      status: "published",
      createdAt: "2 days ago",
    },
    {
      id: 2,
      title: "Product Registration Form",
      description: "Register new products with warranty information",
      responses: 18,
      status: "draft",
      createdAt: "1 week ago",
    },
    {
      id: 3,
      title: "Employee Onboarding",
      description: "New employee information and documentation",
      responses: 7,
      status: "published",
      createdAt: "2 weeks ago",
    },
  ];

  const getProfile = async () => {
    const token = await getToken(); // ✅ This is correct

    try {
      const response = await axiosClient.get("/users/me/profile");
      console.log("Profile data:", response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      return;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  FormWave
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Templates
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Analytics
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Link href="/builder">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Form
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground">
            Create beautiful forms and collect responses with ease.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Responses
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/builder">
              <Card className="cursor-pointer hover:shadow-md transition-all hover:scale-105 border-border bg-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Plus className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">
                    Create Form
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Start from scratch
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Card className="cursor-pointer hover:shadow-md transition-all hover:scale-105 border-border bg-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium text-foreground mb-1">
                  Use Template
                </h3>
                <p className="text-sm text-muted-foreground">
                  Pre-built templates
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-all hover:scale-105 border-border bg-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium text-foreground mb-1">
                  View Analytics
                </h3>
                <p className="text-sm text-muted-foreground">Form insights</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-all hover:scale-105 border-border bg-card">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-medium text-foreground mb-1">Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Account settings
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Forms */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Recent Forms
            </h2>
            <Button
              onClick={async () => await getProfile()}
              variant="outline"
              size="sm"
            >
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {forms.map((form) => (
              <Card
                key={form.id}
                className="hover:shadow-md transition-shadow border-border bg-card"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {form.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            form.status === "published"
                              ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400"
                              : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400"
                          }`}
                        >
                          {form.status}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        {form.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{form.responses} responses</span>
                        <span>Created {form.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link href={`/builder?id=${form.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
