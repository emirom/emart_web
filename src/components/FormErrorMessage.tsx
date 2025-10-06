"use client";

interface FormErrorMessageProps {
  message?: string;
}

export function FormErrorMessage({ message }: FormErrorMessageProps) {
  if (!message) return null;

  return <p className="text-destructive text-sm mt-1">{message}</p>;
}
