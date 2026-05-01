import { getPriorityCities } from "@/lib/data/cities-idf";
import { electriciteServices } from "@/lib/data/services-definition";
import { buildServiceMetadata, ServicePageBody } from "@/lib/seo/premium/pageHelpers";

const TRADE_SLUG = "electricien";

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  const params: { ville: string; service: string }[] = [];
  for (const city of getPriorityCities()) {
    for (const service of electriciteServices) {
      params.push({ ville: city.slug, service: service.slug });
    }
  }
  return params;
}

export async function generateMetadata(props: { params: Promise<{ ville: string; service: string }> }) {
  const params = await props.params;
  return buildServiceMetadata(TRADE_SLUG, params.ville, params.service);
}

export default async function Page(props: { params: Promise<{ ville: string; service: string }> }) {
  const params = await props.params;
  return <ServicePageBody tradeSlug={TRADE_SLUG} citySlug={params.ville} serviceSlug={params.service} />;
}
