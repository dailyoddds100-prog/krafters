import React, { createContext, useContext } from "react";
import { usePromoCountdown, PromoState } from "../utils/promoCountdown";

const PromoContext = createContext<PromoState | null>(null);

export const PromoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const promo = usePromoCountdown();
  return <PromoContext.Provider value={promo}>{children}</PromoContext.Provider>;
};

export function usePromo(): PromoState {
  const context = useContext(PromoContext);
  if (!context) {
    throw new Error("usePromo must be used within a PromoProvider");
  }
  return context;
}
