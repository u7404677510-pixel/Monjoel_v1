"use client";

import Script from "next/script";

interface ClientSchemaProps {
  schema: object;
  id?: string;
}

/**
 * Client component for rendering Schema.org JSON-LD
 * This allows hub pages to remain server components for better SEO
 */
export default function ClientSchema({ schema, id = "schema-jsonld" }: ClientSchemaProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
