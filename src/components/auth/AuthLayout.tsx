
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  footerText: string;
  footerLink: {
    text: string;
    to: string;
  };
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
  footerText,
  footerLink,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {title}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>

      <div className="mt-auto text-center py-4 text-sm text-gray-500">
        {footerText}{" "}
        <Link
          to={footerLink.to}
          className="font-medium text-primary hover:text-primary-focus"
        >
          {footerLink.text}
        </Link>
      </div>
    </div>
  );
};

export default AuthLayout;
