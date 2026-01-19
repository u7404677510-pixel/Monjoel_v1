import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  generateAllDepartmentSlugs,
  parseDepartmentSlug,
  generateDepartmentPageContent,
} from "@/lib/seo/department-content";
import { generateDepartmentSchema } from "@/lib/seo/schema-generator";
import ClientSchema from "@/components/ClientSchema";
import DepartmentHero from "@/components/seo/DepartmentHero";
import DepartmentCities from "@/components/seo/DepartmentCities";
import DepartmentServices from "@/components/seo/DepartmentServices";
import DepartmentFAQ from "@/components/seo/DepartmentFAQ";
import OtherDepartments from "@/components/seo/OtherDepartments";
import FinalCTA from "@/components/sections/FinalCTA";

interface DepartmentPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Génère les 24 pages statiques (3 métiers × 8 départements)
 */
export async function generateStaticParams() {
  return generateAllDepartmentSlugs();
}

/**
 * Génère les metadata dynamiques pour chaque page département
 */
export async function generateMetadata({
  params,
}: DepartmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseDepartmentSlug(slug);

  if (!parsed) {
    return {
      title: "Page non trouvée | Joël",
    };
  }

  const content = generateDepartmentPageContent(parsed.tradeSlug, parsed.deptCode);

  if (!content) {
    return {
      title: "Page non trouvée | Joël",
    };
  }

  const BASE_URL = "https://monjoel.fr";

  return {
    title: content.seoTitle,
    description: content.metaDescription,
    keywords: [
      `${content.trade?.slug} ${content.department.name}`,
      `${content.trade?.slug} ${content.department.code}`,
      `dépannage ${content.department.name}`,
      `urgence ${content.trade?.slug} ${content.department.code}`,
      ...content.department.mainCities.slice(0, 5).map(
        (city) => `${content.trade?.slug} ${city}`
      ),
    ],
    alternates: {
      canonical: content.canonical,
    },
    openGraph: {
      title: content.seoTitle,
      description: content.metaDescription,
      url: content.canonical,
      siteName: "Joël",
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seoTitle,
      description: content.metaDescription,
    },
  };
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { slug } = await params;
  const parsed = parseDepartmentSlug(slug);

  // Si le slug ne correspond pas à un format département valide, 404
  if (!parsed) {
    notFound();
  }

  const content = generateDepartmentPageContent(parsed.tradeSlug, parsed.deptCode);

  // Si le contenu n'a pas pu être généré, 404
  if (!content) {
    notFound();
  }

  // Générer le schema LocalBusiness pour le département
  const localBusinessSchema = generateDepartmentSchema(
    content.trade!.slug,
    content.department.name,
    content.department.code,
    content.services
  );

  // Nom du métier pour affichage
  const tradeName =
    content.trade?.slug === "plombier"
      ? "Plombier"
      : content.trade?.slug === "electricien"
      ? "Électricien"
      : "Serrurier";

  return (
    <>
      {/* Schema.org JSON-LD */}
      <ClientSchema schema={localBusinessSchema} />

      {/* Hero section */}
      <DepartmentHero content={content} />

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            {content.introduction}
          </p>
        </div>
      </section>

      {/* Cities grid */}
      <DepartmentCities
        cities={content.cities}
        department={content.department}
        tradeSlug={content.trade!.slug}
      />

      {/* Services available */}
      <DepartmentServices
        services={content.services}
        department={content.department}
        tradeSlug={content.trade!.slug}
      />

      {/* FAQ */}
      <DepartmentFAQ
        faqItems={content.faq}
        department={content.department}
        tradeName={tradeName}
      />

      {/* Other departments (maillage) */}
      <OtherDepartments
        currentDepartment={content.department}
        otherDepartments={content.otherDepartments}
        tradeSlug={content.trade!.slug}
      />

      {/* Final CTA */}
      <FinalCTA />
    </>
  );
}
