
import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout
      title="Crea un account"
      description="Inserisci i tuoi dati per creare un account"
      footerText="Hai già un account?"
      footerLink={{ text: "Accedi", to: "/login" }}
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
