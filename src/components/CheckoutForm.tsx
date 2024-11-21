"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/app/providers";

export default function CheckoutForm({
  amount,
  productName,
}: {
  amount: number;
  productName: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { language } = useLanguage();


  return (
    <form className="space-y-4">
      <div className="p-4 border border-gray-300 rounded-md">
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <Button type="submit" disabled={!stripe || processing} className="w-full">
        {processing
          ? language === "pt-BR"
            ? "Processando..."
            : "Processing..."
          : `Pay R$${amount.toFixed(2)}`}
      </Button>
    </form>
  );
}
