
import React from "react";

export const ShopBenefitsCard: React.FC = () => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 border border-blue-200">
      <p className="font-medium mb-2">Vantaggi dell'account negozio:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Crea il tuo catalogo prodotti</li>
        <li>Gestisci ordini e clienti</li>
        <li>Crea offerte personalizzate</li>
        <li>Accesso a strumenti di analisi</li>
        <li>Assistenza AI per il tuo business</li>
      </ul>
    </div>
  );
};
