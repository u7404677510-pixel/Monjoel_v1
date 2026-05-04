import { listPremiumByKind } from "@/lib/seo/premium/registry";
import { buildCityMetadata, CityPageBody } from "@/lib/seo/premium/pageHelpers";

const TRADE_SLUG = "serrurier";

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  // SEO post-désindexation 2026-05-04 : pre-build premium-only.
  // Les villes non-premium sont rendues ISR à la demande, marquées noindex.
  return listPremiumByKind("city")
    .filter((p) => p.trade === TRADE_SLUG)
    .map((p) => ({ ville: p.citySlug }));
}

export async function generateMetadata(props: { params: Promise<{ ville: string }> }) {
  const params = await props.params;
  return buildCityMetadata(TRADE_SLUG, params.ville);
}

export default async function Page(props: { params: Promise<{ ville: string }> }) {
  const params = await props.params;
  return <CityPageBody tradeSlug={TRADE_SLUG} citySlug={params.ville} />;
}
