import { listPremiumByKind } from "@/lib/seo/premium/registry";
import { buildServiceMetadata, ServicePageBody } from "@/lib/seo/premium/pageHelpers";

const TRADE_SLUG = "plombier";

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  // SEO post-désindexation 2026-05-04 : pre-build premium-only.
  // Avant : 116 villes × 17 services = 1972 pages pré-buildées (gaspillage)
  // Après : ~4 pages service premium plombier (gain build time -99%).
  // Les combinaisons non-premium sont rendues ISR + noindex.
  return listPremiumByKind("service")
    .filter((p) => p.trade === TRADE_SLUG && !!p.serviceSlug)
    .map((p) => ({ ville: p.citySlug, service: p.serviceSlug! }));
}

export async function generateMetadata(props: { params: Promise<{ ville: string; service: string }> }) {
  const params = await props.params;
  return buildServiceMetadata(TRADE_SLUG, params.ville, params.service);
}

export default async function Page(props: { params: Promise<{ ville: string; service: string }> }) {
  const params = await props.params;
  return <ServicePageBody tradeSlug={TRADE_SLUG} citySlug={params.ville} serviceSlug={params.service} />;
}
