/**
 * OG image dédiée à la route /serrurerie — DA Purple.
 *
 * Convention Next.js App Router : un fichier opengraph-image.tsx
 * par segment de route génère automatiquement les meta og:image / twitter:image.
 *
 * URL générée : https://monjoel.fr/serrurerie/opengraph-image
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Joël - Serrurier urgence Paris & Île-de-France · Porte claquée, blindage, ouverture sans casse dès 89€";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = {
  violet: "#7055A7",
  mauve: "#9E76EC",
  violetDeep: "#5a4087",
  yellow: "#F5D547",
  white: "#FFFFFF",
  whiteSoft: "rgba(255,255,255,0.85)",
  divider: "rgba(255,255,255,0.18)",
};

const SYSTEM_FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundImage: `linear-gradient(135deg, ${COLORS.violet} 0%, ${COLORS.mauve} 70%, ${COLORS.violetDeep} 100%)`,
          fontFamily: SYSTEM_FONT,
          color: COLORS.white,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60%",
            height: "70%",
            backgroundImage:
              "radial-gradient(ellipse at top right, rgba(245,213,71,0.22) 0%, rgba(245,213,71,0) 60%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "60%",
            padding: "70px 60px",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: COLORS.yellow,
                color: COLORS.violet,
                padding: "10px 22px",
                borderRadius: "999px",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Serrurerie
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 140,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: COLORS.white,
              }}
            >
              <span>Jo</span>
              <span style={{ color: COLORS.yellow }}>ë</span>
              <span>l</span>
            </div>
            <div
              style={{
                marginTop: 22,
                fontSize: 38,
                fontWeight: 500,
                color: COLORS.white,
                letterSpacing: "-0.01em",
              }}
            >
              Serrurier urgence Paris & IDF
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 26,
                fontWeight: 400,
                color: COLORS.whiteSoft,
              }}
            >
              Porte claquée, blindage, ouverture sans casse · dès 89€
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              borderTop: `1px solid ${COLORS.divider}`,
              paddingTop: 24,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: COLORS.yellow,
              }}
            />
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: COLORS.yellow,
                letterSpacing: "-0.01em",
              }}
            >
              01 41 69 10 08
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "40%",
            padding: "60px 40px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 360,
              height: 360,
              borderRadius: "50%",
              backgroundColor: COLORS.yellow,
              boxShadow: "0 0 0 12px rgba(245,213,71,0.22)",
            }}
          >
            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: COLORS.violet,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              Prix fixe
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 30,
                fontWeight: 600,
                color: COLORS.violet,
                letterSpacing: "0.02em",
              }}
            >
              Sans arnaque
            </div>
            <div
              style={{
                marginTop: 4,
                fontSize: 20,
                fontWeight: 500,
                color: COLORS.violetDeep,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              24h/24
            </div>
          </div>

          <div
            style={{
              marginTop: 36,
              fontSize: 22,
              fontWeight: 500,
              color: COLORS.whiteSoft,
              textAlign: "center",
            }}
          >
            monjoel.fr/serrurerie
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
