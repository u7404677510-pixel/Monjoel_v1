import { getPriorityCities } from "@/lib/data/cities-idf";
import { buildCityMetadata, CityPageBody } from "@/lib/seo/premium/pageHelpers";

const TRADE_SLUG = "plombier";

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  return getPriorityCities().map((city) => ({ ville: city.slug }));
}

export async function generateMetadata({ params }: { params: { ville: string } }) {
  return buildCityMetadata(TRADE_SLUG, params.ville);
}

export default function Page({ params }: { params: { ville: string } }) {
  return <CityPageBody tradeSlug={TRADE_SLUG} citySlug={params.ville} />;
}
