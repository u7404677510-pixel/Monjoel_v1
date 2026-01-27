import { Metadata } from "next";
import { notFound } from "next/navigation";
import { departmentsIDF, getDepartmentByCode } from "@/lib/data/departments-idf";
import { trades, getTradeBySlug, Trade } from "@/lib/data/services-definition";
import { getCitiesByDepartment } from "@/lib/data/cities-idf";
import DepartmentHero from "@/components/seo/DepartmentHero";
import DepartmentServices from "@/components/seo/DepartmentServices";
import DepartmentCities from "@/components/seo/DepartmentCities";
import DepartmentFAQ from "@/components/seo/DepartmentFAQ";
import OtherDepartments from "@/components/seo/OtherDepartments";
import FinalCTA from "@/components/sections/FinalCTA";
import ClientSchema from "@/components/ClientSchema";

interface PageProps {
  params: Promise<{ "metier-dept": string }>;
}

// Parse slug like "serrurier-75" or "plombier-92"
function parseSlug(slug: string): { tradeSlug: string; deptCode: string } | null {
  const match = slug.match(/^(plombier|serrurier|electricien)-(\d{2})$/);
  if (!match) return null;
  return { tradeSlug: match[1], deptCode: match[2] };
}

// Generate all static params
export async function generateStaticParams() {
  const params: { "metier-dept": string }[] = [];
  
  const tradesSlugs = ["plombier", "serrurier", "electricien"];
  const deptCodes = departmentsIDF.map(d => d.code);
  
  for (const trade of tradesSlugs) {
    for (const dept of deptCodes) {
      params.push({ "metier-dept": `${trade}-${dept}` });
    }
  }
  
  return params;
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const parsed = parseSlug(resolvedParams["metier-dept"]);
  if (!parsed) return {};
  
  const trade = getTradeBySlug(parsed.tradeSlug);
  const department = getDepartmentByCode(parsed.deptCode);
  
  if (!trade || !department) return {};
  
  const title = `${trade.slug === "serrurier" ? "Serrurier" : trade.slug === "plombier" ? "Plombier" : "Électricien"} ${department.fullName} | Urgence 24h/24 | Joël`;
  const description = `${trade.slug === "serrurier" ? "Serrurier" : trade.slug === "plombier" ? "Plombier" : "Électricien"} d'urgence en ${department.name} (${department.code}). Intervention rapide dans les ${department.cityCount} communes. Prix fixe garanti. Appelez le 01 72 68 22 02.`;
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://monjoel.fr/${parsed.tradeSlug}-${parsed.deptCode}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
      url: `https://monjoel.fr/${parsed.tradeSlug}-${parsed.deptCode}`,
    },
  };
}

// Generate LocalBusiness schema for department
function generateDepartmentSchema(trade: Trade, department: ReturnType<typeof getDepartmentByCode>) {
  if (!department) return null;
  
  const tradeName = trade.slug === "serrurier" ? "Serrurier" : trade.slug === "plombier" ? "Plombier" : "Électricien";
  
  return {
    "@context": "https://schema.org",
    "@type": trade.slug === "serrurier" ? "Locksmith" : trade.slug === "plombier" ? "Plumber" : "Electrician",
    "name": `Joël - ${tradeName} ${department.fullName}`,
    "description": `Service de ${trade.name.toLowerCase()} d'urgence en ${department.name}. Intervention 24h/24 dans les ${department.cityCount} communes du département.`,
    "telephone": "+33172682202",
    "url": `https://monjoel.fr/${trade.slug}-${department.code}`,
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": department.name,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": department.coordinates.lat,
      "longitude": department.coordinates.lng,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "2847",
    },
    "priceRange": "€€",
  };
}

export default async function DepartmentPage({ params }: PageProps) {
  const resolvedParams = await params;
  const parsed = parseSlug(resolvedParams["metier-dept"]);
  
  if (!parsed) {
    notFound();
  }
  
  const trade = getTradeBySlug(parsed.tradeSlug);
  const department = getDepartmentByCode(parsed.deptCode);
  
  if (!trade || !department) {
    notFound();
  }
  
  const cities = getCitiesByDepartment(parsed.deptCode);
  const schema = generateDepartmentSchema(trade, department);
  
  const tradeName = trade.slug === "serrurier" ? "Serrurier" : trade.slug === "plombier" ? "Plombier" : "Électricien";
  
  return (
    <>
      {schema && <ClientSchema schema={schema} id="department-schema" />}
      
      <DepartmentHero 
        trade={trade} 
        department={department}
        tradeName={tradeName}
      />
      
      <DepartmentServices 
        trade={trade} 
        department={department}
      />
      
      <DepartmentCities 
        trade={trade}
        department={department}
        cities={cities}
      />
      
      <DepartmentFAQ 
        trade={trade}
        department={department}
        tradeName={tradeName}
      />
      
      <OtherDepartments 
        currentDeptCode={department.code}
        tradeSlug={trade.slug}
      />
      
      <FinalCTA />
    </>
  );
}
