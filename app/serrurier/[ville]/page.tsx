import { citiesIDF, getPriorityCities } from "@/lib/data/cities-idf";
import { buildCityMetadata, CityPageBody } from "@/lib/seo/premium/pageHelpers";

const TRADE_SLUG = "serrurier";

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  // ISR : on pré-génère uniquement les villes prioritaires.
  // Les autres sont rendues à la demande (puis cachées 24h).
  return getPriorityCities().map((city) => ({ ville: city.slug }));
}

export async function generateMetadata(props: { params: Promise<{ ville: string }> }) {
  const params = await props.params;
  return buildCityMetadata(TRADE_SLUG, params.ville);
}

export default async function Page(props: { params: Promise<{ ville: string }> }) {
  const params = await props.params;
  return <CityPageBody tradeSlug={TRADE_SLUG} citySlug={params.ville} />;
}
