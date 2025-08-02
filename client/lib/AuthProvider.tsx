"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { setAuthToken } from "./utils/axiosInstance";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const setToken = async () => {
      if (isSignedIn) {
        const token = await getToken();
        if (token) {
          setAuthToken(token);
        }
      }
    };

    setToken();
  }, [isSignedIn]);

  return <>{children}</>;
}
