
import React from "react";
import Header from "@/components/Header";
import DahejForm from "@/components/DahejForm";
import AdPlaceholder from "@/components/AdPlaceholder";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen py-4 px-4 container max-w-md mx-auto">
      <Header />
      <AdPlaceholder position="top" />
      <div className="my-6">
        <DahejForm />
      </div>
      <AdPlaceholder position="bottom" />
    </div>
  );
};

export default Index;
