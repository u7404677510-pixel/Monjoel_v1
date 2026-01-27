import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Trade-specific colors and icons
const tradeConfig: Record<string, { color: string; icon: string; gradient: string }> = {
  serrurier: {
    color: "#7055A7",
    icon: "🔐",
    gradient: "linear-gradient(135deg, #7055A7 0%, #9E76EC 100%)",
  },
  plombier: {
    color: "#3B82F6",
    icon: "🔧",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
  },
  electricien: {
    color: "#F59E0B",
    icon: "⚡",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
  },
  default: {
    color: "#7055A7",
    icon: "🏠",
    gradient: "linear-gradient(135deg, #7055A7 0%, #9E76EC 100%)",
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const title = searchParams.get("title") || "Joël - Dépannage d'urgence";
  const subtitle = searchParams.get("subtitle") || "Paris & Île-de-France";
  const trade = searchParams.get("trade") || "default";
  const city = searchParams.get("city") || "";
  
  const config = tradeConfig[trade] || tradeConfig.default;
  
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: config.gradient,
          padding: "60px",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)",
          }}
        />
        
        {/* Logo/Brand */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "60px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "48px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            Joël
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "8px 16px",
              borderRadius: "24px",
              fontSize: "18px",
              color: "white",
            }}
          >
            Dépannage d'urgence
          </div>
        </div>
        
        {/* Trade icon */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "60px",
            fontSize: "80px",
          }}
        >
          {config.icon}
        </div>
        
        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "80%",
          }}
        >
          <div
            style={{
              fontSize: city ? "56px" : "64px",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            {title}
          </div>
          
          {subtitle && (
            <div
              style={{
                fontSize: "32px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {subtitle}
            </div>
          )}
          
          {/* USPs */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.2)",
                padding: "12px 20px",
                borderRadius: "12px",
                fontSize: "20px",
                color: "white",
              }}
            >
              ✓ Prix fixe garanti
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.2)",
                padding: "12px 20px",
                borderRadius: "12px",
                fontSize: "20px",
                color: "white",
              }}
            >
              ✓ Intervention 30 min
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.2)",
                padding: "12px 20px",
                borderRadius: "12px",
                fontSize: "20px",
                color: "white",
              }}
            >
              ✓ 24h/24 • 7j/7
            </div>
          </div>
        </div>
        
        {/* Phone number */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "60px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "white",
            padding: "16px 28px",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ fontSize: "28px" }}>📞</div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: config.color,
            }}
          >
            01 72 68 22 02
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
