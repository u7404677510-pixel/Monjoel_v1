import Image from "next/image";
import { Shield, Phone } from "lucide-react";

interface PaymentLogosProps {
  variant?: "light" | "dark";
  showMicrocopy?: boolean;
}

const paymentMethods = [
  { name: "CB", logo: "/logos/payments/cb.svg", width: 44, height: 28 },
  { name: "Visa", logo: "/logos/payments/visa.svg", width: 54, height: 28 },
  { name: "Mastercard", logo: "/logos/payments/mastercard.svg", width: 48, height: 28 },
  { name: "Apple Pay", logo: "/logos/payments/apple-pay.svg", width: 56, height: 28 },
];

export default function PaymentLogos({ variant = "light", showMicrocopy = true }: PaymentLogosProps) {
  const isDark = variant === "dark";

  return (
    <div className={`${isDark ? "" : "border-t border-gray-100"} pt-3`}>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* Logos paiement */}
        <div className="flex items-center gap-2 flex-wrap">
          {paymentMethods.map((pm) => (
            <div
              key={pm.name}
              className={`flex items-center justify-center rounded-md overflow-hidden ${
                isDark ? "opacity-70 hover:opacity-100" : "opacity-80 hover:opacity-100"
              } transition-opacity`}
              title={pm.name}
            >
              <Image
                src={pm.logo}
                alt={pm.name}
                width={pm.width}
                height={pm.height}
                className="h-7 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Séparateur */}
        {showMicrocopy && (
          <div className={`hidden sm:flex items-center gap-3 text-xs ${isDark ? "text-white/50" : "text-gray-400"} flex-wrap`}>
            <span className={isDark ? "text-white/20" : "text-gray-200"}>|</span>
            <span className="flex items-center gap-1">
              <Shield size={11} className={isDark ? "text-white/50" : "text-gray-400"} />
              Paiement après intervention
            </span>
            <span className="flex items-center gap-1">
              <Phone size={11} className={isDark ? "text-white/50" : "text-gray-400"} />
              Numéro non surtaxé
            </span>
          </div>
        )}
      </div>

      {/* Version mobile — microcopy simplifiée */}
      {showMicrocopy && (
        <p className={`sm:hidden text-[10px] mt-1.5 ${isDark ? "text-white/40" : "text-gray-400"}`}>
          Paiement après intervention · Appel gratuit · Numéro non surtaxé
        </p>
      )}
    </div>
  );
}
