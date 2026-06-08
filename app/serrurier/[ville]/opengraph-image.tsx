/**
 * OG image dynamique par ville — route /serrurier/[ville].
 *
 * Convention Next.js App Router : ce fichier est colocalisé avec page.tsx
 * et génère automatiquement les meta og:image / twitter:image pour chaque
 * ville (Paris 1, Boulogne, Versailles, ...).
 *
 * URL générée : https://monjoel.fr/serrurier/{ville-slug}/opengraph-image
 *
 * DA Purple stricte (palette joel-violet/mauve/yellow), sync avec
 * app/serrurerie/opengraph-image.tsx.
 */

import { ImageResponse } from "next/og";
import { getCityBySlug } from "@/lib/data/cities-idf";

export const runtime = "edge";
export const alt = "Joël - Serrurier urgence Île-de-France · Prix fixe dès 89€";
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

function formatVilleSlug(slug: string): string {
  return slug
    .split("-")
    .map((part) => {
      if (/^\d+$/.test(part)) return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

export default async function Image({
  params,
}: {
  params: { ville: string };
}) {
  const city = getCityBySlug(params.ville);
  const cityName = city?.name ?? formatVilleSlug(params.ville);
  const dept = city?.department ?? "";
  const deptName = city?.departmentName ?? "Île-de-France";

  const cityFontSize = cityName.length > 14 ? 60 : cityName.length > 10 ? 72 : 84;

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
            padding: "60px 60px",
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
              Serrurerie urgence
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 110,
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
                marginTop: 18,
                fontSize: 32,
                fontWeight: 500,
                color: COLORS.whiteSoft,
                letterSpacing: "-0.01em",
              }}
            >
              Serrurier urgence à
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: cityFontSize,
                fontWeight: 800,
                color: COLORS.yellow,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
              }}
            >
              {cityName}
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 26,
                fontWeight: 400,
                color: COLORS.whiteSoft,
              }}
            >
              Ouverture 30 min · Prix fixe dès 89€
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              borderTop: `1px solid ${COLORS.divider}`,
              paddingTop: 22,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 22,
                fontWeight: 500,
                color: COLORS.whiteSoft,
                letterSpacing: "0.02em",
              }}
            >
              {dept && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 44,
                    height: 32,
                    padding: "0 10px",
                    borderRadius: 6,
                    backgroundColor: COLORS.yellow,
                    color: COLORS.violet,
                    fontWeight: 800,
                    fontSize: 20,
                  }}
                >
                  {dept}
                </div>
              )}
              <span>{deptName}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: COLORS.yellow,
                }}
              />
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: COLORS.yellow,
                  letterSpacing: "-0.01em",
                }}
              >
                01 41 69 10 08
              </div>
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
              marginTop: 32,
              fontSize: 22,
              fontWeight: 500,
              color: COLORS.whiteSoft,
              textAlign: "center",
            }}
          >
            monjoel.fr
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
