import { City } from "@/lib/data/cities-idf";
import { Trade, Service } from "@/lib/data/services-definition";
import { FAQItem } from "@/lib/seo/city-content";
import {
  generateAllSchemas,
  generateServiceSchemas,
} from "@/lib/seo/schema-generator";

interface LocalSchemaProps {
  trade: Trade;
  city: City;
  faqItems: FAQItem[];
  service?: Service;
}

export default function LocalSchema({
  trade,
  city,
  faqItems,
  service,
}: LocalSchemaProps) {
  const schemaJson = service
    ? generateServiceSchemas(trade, service, city, faqItems)
    : generateAllSchemas(trade, city, faqItems);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaJson }}
    />
  );
}





