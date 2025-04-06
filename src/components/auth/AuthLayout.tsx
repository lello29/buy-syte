
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText?: string;
  footerLink?: {
    text: string;
    to: string;
  };
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  title, 
  description, 
  children, 
  footerText,
  footerLink
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Store className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">{title}</CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {(footerText || footerLink) && (
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              {footerText}{" "}
              {footerLink && (
                <Link to={footerLink.to} className="text-primary hover:underline">
                  {footerLink.text}
                </Link>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthLayout;
