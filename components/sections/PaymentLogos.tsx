import Image from "next/image";
import { Shield, Phone } from "lucide-react";

interface PaymentLogosProps {
  variant?: "light" | "dark";
  showMicrocopy?: boolean;
}

const paymentMethods = [
  { name: "CB", logo: "/logos/payments/cb.svg" },
  { name: "Visa", logo: "/logos/payments/visa.svg" },
  { name: "Mastercard", logo: "/logos/payments/mastercard.svg" },
  { name: "Apple Pay", logo: "/logos/payments/apple-pay.svg" },
];

export default function PaymentLogos({ variant = "light", showMicrocopy = true }: PaymentLogosProps) {
  const isDark = variant === "dark";

  return (
    <div className={`${isDark ? "" : "border-t border-gray-100"} pt-3`}>
      {/* Logos + microcopy sur la même ligne */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Cartes de paiement — chacune dans un badge blanc arrondi */}
        {paymentMethods.map((pm) => (
          <div
            key={pm.name}
            title={pm.name}
            className="flex items-center justify-center bg-white border border-gray-200 rounded-md px-2 py-1 shadow-sm"
            style={{ minWidth: 40, height: 28 }}
          >
            <Image
              src={pm.logo}
              alt={pm.name}
              width={36}
              height={20}
              className="w-auto object-contain"
              style={{ maxHeight: 18 }}
            />
          </div>
        ))}

        {/* Microcopy à droite des logos */}
        {showMicrocopy && (
          <span className={`hidden sm:inline text-xs ${isDark ? "text-white/40" : "text-gray-400"} ml-1`}>
            · Paiement après intervention · Numéro non surtaxé
          </span>
        )}
      </div>

      {/* Mobile — microcopy seule sous les logos */}
      {showMicrocopy && (
        <div className="sm:hidden flex items-center gap-2 mt-1.5">
          <span className={`text-[10px] ${isDark ? "text-white/40" : "text-gray-400"}`}>
            Paiement après intervention · Numéro non surtaxé
          </span>
        </div>
      )}
    </div>
  );
}
