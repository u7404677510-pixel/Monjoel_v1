import type { ReactElement } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Phone, ArrowRight } from "lucide-react";
import { blogArticles, getBlogArticleBySlug, getLatestBlogArticles, BlogArticle } from "@/lib/data/blog-articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getBlogArticleBySlug(resolvedParams.slug);
  
  if (!article) return {};
  
  return {
    title: article.title,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: {
      canonical: `https://monjoel.fr/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      url: `https://monjoel.fr/blog/${article.slug}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(article.title)}&trade=${article.category}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const categoryLabels: Record<BlogArticle["category"], { label: string; color: string }> = {
  plomberie: { label: "Plomberie", color: "bg-joel-mauve/15 text-joel-mauve" },
  serrurerie: { label: "Serrurerie", color: "bg-joel-violet/10 text-joel-violet" },
  electricite: { label: "Électricité", color: "bg-joel-yellow/20 text-joel-violet" },
  conseils: { label: "Conseils", color: "bg-joel-violet/10 text-joel-violet" },
};

// Simple markdown-like renderer (basic)
function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: ReactElement[] = [];
  let currentList: string[] = [];
  let isInTable = false;
  let tableRows: string[][] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={elements.length} className="list-disc list-inside space-y-2 mb-6 text-gray-600">
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const headers = tableRows[0];
      const body = tableRows.slice(2); // Skip header separator
      elements.push(
        <div key={elements.length} className="overflow-x-auto mb-6">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((cell, i) => (
                  <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                    {cell.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-sm text-gray-600 border-b">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      isInTable = false;
    }
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Table detection
    if (trimmedLine.startsWith("|") && trimmedLine.endsWith("|")) {
      flushList();
      isInTable = true;
      const cells = trimmedLine.split("|").filter(Boolean);
      if (!trimmedLine.includes("---")) {
        tableRows.push(cells);
      } else {
        tableRows.push(cells); // Include separator for parsing
      }
      continue;
    } else if (isInTable) {
      flushTable();
    }

    // Empty line
    if (!trimmedLine) {
      flushList();
      continue;
    }

    // Headers
    if (trimmedLine.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={elements.length} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          {trimmedLine.substring(3)}
        </h2>
      );
      continue;
    }

    if (trimmedLine.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={elements.length} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          {trimmedLine.substring(4)}
        </h3>
      );
      continue;
    }

    // List items
    if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      currentList.push(trimmedLine.substring(2));
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmedLine)) {
      currentList.push(trimmedLine.replace(/^\d+\.\s/, ""));
      continue;
    }

    // Alert boxes
    if (trimmedLine.startsWith("⚠️") || trimmedLine.startsWith("🚨")) {
      flushList();
      elements.push(
        <div key={elements.length} className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-amber-800">
          {trimmedLine}
        </div>
      );
      continue;
    }

    if (trimmedLine.startsWith("✅")) {
      flushList();
      elements.push(
        <div key={elements.length} className="bg-joel-violet/5 border border-joel-violet/20 rounded-xl p-4 mb-6 text-joel-violet">
          {trimmedLine}
        </div>
      );
      continue;
    }

    // CTA (phone emoji)
    if (trimmedLine.includes("📞")) {
      flushList();
      elements.push(
        <div key={elements.length} className="bg-joel-violet/10 rounded-xl p-6 my-6 text-center">
          <p className="text-lg font-semibold text-joel-violet">{trimmedLine}</p>
        </div>
      );
      continue;
    }

    // Bold text handling
    let processedLine = trimmedLine;
    processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Regular paragraph
    flushList();
    elements.push(
      <p 
        key={elements.length} 
        className="text-gray-600 mb-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: processedLine }}
      />
    );
  }

  flushList();
  flushTable();

  return elements;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = getBlogArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const category = categoryLabels[article.category];
  const relatedArticles = getLatestBlogArticles(3).filter(
    (a) => a.slug !== article.slug
  );

  // Compute wordCount from raw markdown content (approximation, suffisant pour Schema)
  const wordCount = article.content.trim().split(/\s+/).length;

  // Image OG dynamique (route /api/og rend une image 1200x630 brandée)
  const ogImage = `https://monjoel.fr/api/og?title=${encodeURIComponent(article.title)}&trade=${article.category}`;

  // articleSection humain à partir du label catégorie
  const articleSection = categoryLabels[article.category].label;

  // Extraire les FAQ implicites du contenu : on pioche les H3 commençant par une
  // question (terminée par "?") + paragraphe suivant. Limite à 5 pour rester clean.
  const extractFaqsFromMarkdown = (md: string): { q: string; a: string }[] => {
    const lines = md.trim().split("\n");
    const faqs: { q: string; a: string }[] = [];
    for (let i = 0; i < lines.length && faqs.length < 5; i++) {
      const l = lines[i].trim();
      if ((l.startsWith("### ") || l.startsWith("## ")) && l.includes("?")) {
        const q = l.replace(/^#+\s+/, "").trim();
        const answerLines: string[] = [];
        for (let j = i + 1; j < lines.length; j++) {
          const next = lines[j].trim();
          if (next.startsWith("#")) break;
          if (next) answerLines.push(next.replace(/\*\*/g, "").replace(/^[-*]\s+/, ""));
          if (answerLines.join(" ").length > 200) break;
        }
        const a = answerLines.join(" ").slice(0, 500).trim();
        if (a) faqs.push({ q, a });
      }
    }
    return faqs;
  };
  const faqs = extractFaqsFromMarkdown(article.content);

  // BlogPosting Schema premium : @id stable, image, wordCount, keywords,
  // articleSection, publisher relié à l'@id de l'organisation Joël.
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://monjoel.fr/blog/${article.slug}#article`,
        headline: article.title,
        description: article.metaDescription,
        image: [ogImage, "https://monjoel.fr/og-default.jpg"],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        author: {
          "@type": "Organization",
          "@id": "https://monjoel.fr/#organization",
          name: "Joël",
          url: "https://monjoel.fr",
        },
        publisher: { "@id": "https://monjoel.fr/#organization" },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://monjoel.fr/blog/${article.slug}`,
        },
        url: `https://monjoel.fr/blog/${article.slug}`,
        inLanguage: "fr-FR",
        articleSection,
        keywords: article.keywords.join(", "),
        wordCount,
        timeRequired: `PT${article.readTime}M`,
        isPartOf: { "@id": "https://monjoel.fr/blog#blog" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://monjoel.fr/blog/${article.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://monjoel.fr",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://monjoel.fr/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `https://monjoel.fr/blog/${article.slug}`,
          },
        ],
      },
      ...(faqs.length >= 2
        ? [
            {
              "@type": "FAQPage",
              "@id": `https://monjoel.fr/blog/${article.slug}#faq`,
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-joel-violet mb-6 transition-colors"
            >
              <ArrowLeft size={16} />
              Retour au blog
            </Link>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                {category.label}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Clock size={14} />
                {article.readTime} min de lecture
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar size={14} />
                {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h1>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            {renderContent(article.content)}
          </div>

          {/* CTA Box */}
          <div className="mt-12 bg-gradient-joel rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Besoin d'un artisan de confiance ?
            </h3>
            <p className="text-white/90 mb-6">
              Nos artisans interviennent 24h/24 en Île-de-France. Prix fixe garanti, sans surprise.
            </p>
            <a
              href="tel:+33141691008"
              className="inline-flex items-center gap-2 bg-white text-joel-violet font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-shadow"
            >
              <Phone size={20} />
              Appeler le 01 41 69 10 08
            </a>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Articles similaires
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="bg-white rounded-xl p-6 border border-gray-100 hover:border-joel-violet/30 hover:shadow-lg transition-all"
                  >
                    <span className={`inline-block px-2 py-1 rounded-sm text-xs font-medium mb-3 ${categoryLabels[related.category].color}`}>
                      {categoryLabels[related.category].label}
                    </span>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-joel-violet transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {related.excerpt}
                    </p>
                    <span className="flex items-center gap-1 text-joel-violet text-sm font-medium mt-4">
                      Lire <ArrowRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
