import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { blogArticles, BlogArticle } from "@/lib/data/blog-articles";

export const metadata: Metadata = {
  title: "Blog | Conseils dépannage plomberie, serrurerie, électricité",
  description: "Conseils pratiques et guides pour vos problèmes de plomberie, serrurerie et électricité. Que faire en cas d'urgence, prix du marché, arnaques à éviter.",
  alternates: {
    canonical: "https://monjoel.fr/blog",
    languages: {
      "fr-FR": "https://monjoel.fr/blog",
      "x-default": "https://monjoel.fr/blog",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monjoel.fr/blog",
    siteName: "Joël",
    title: "Blog | Conseils dépannage plomberie, serrurerie, électricité",
    description: "Conseils pratiques et guides pour vos problèmes de plomberie, serrurerie et électricité.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Conseils dépannage Joël",
    description: "Conseils pratiques pour vos urgences plomberie, serrurerie et électricité.",
  },
};

const categoryLabels: Record<BlogArticle["category"], { label: string; color: string }> = {
  plomberie: { label: "Plomberie", color: "bg-blue-100 text-blue-700" },
  serrurerie: { label: "Serrurerie", color: "bg-emerald-100 text-emerald-700" },
  electricite: { label: "Électricité", color: "bg-amber-100 text-amber-700" },
  conseils: { label: "Conseils", color: "bg-purple-100 text-purple-700" },
};

function BlogCard({ article }: { article: BlogArticle }) {
  const category = categoryLabels[article.category];
  
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-joel-violet/30 hover:shadow-xl transition-all"
    >
      {/* Image placeholder with gradient */}
      <div className="h-48 bg-linear-to-br from-joel-violet/20 to-joel-mauve/20 flex items-center justify-center">
        <span className="text-6xl opacity-50">
          {article.category === "plomberie" ? "🔧" : 
           article.category === "serrurerie" ? "🔐" : 
           article.category === "electricite" ? "⚡" : "📋"}
        </span>
      </div>
      
      <div className="p-6">
        {/* Category & Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${category.color}`}>
            {category.label}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={12} />
            {article.readTime} min
          </span>
        </div>
        
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-joel-violet transition-colors line-clamp-2">
          {article.title}
        </h2>
        
        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar size={12} />
            {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1 text-joel-violet font-medium text-sm group-hover:gap-2 transition-all">
            Lire <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const sortedArticles = [...blogArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Schema Blog : index agrégé pointant vers chaque article (Schema.org Blog + ItemList)
  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://monjoel.fr/blog#blog",
        url: "https://monjoel.fr/blog",
        name: "Blog Joël - Conseils dépannage plomberie, serrurerie, électricité",
        description:
          "Guides et conseils d'experts artisans pour vos urgences à domicile en Île-de-France. Prix du marché, anti-arnaques, dépannage 24h/24.",
        inLanguage: "fr-FR",
        publisher: { "@id": "https://monjoel.fr/#organization" },
        blogPost: sortedArticles.map((a) => ({
          "@type": "BlogPosting",
          "@id": `https://monjoel.fr/blog/${a.slug}#article`,
          headline: a.title,
          url: `https://monjoel.fr/blog/${a.slug}`,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt || a.publishedAt,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://monjoel.fr/blog#breadcrumb",
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
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
          <div className="max-w-3xl">
            <span className="inline-block bg-joel-violet/10 text-joel-violet px-4 py-2 rounded-full text-sm font-medium mb-4">
              Blog & Conseils
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Guides et conseils pour vos{" "}
              <span className="gradient-text">urgences à domicile</span>
            </h1>
            <p className="text-lg text-gray-600">
              Découvrez nos articles pratiques : que faire en cas d'urgence, les prix du marché, 
              et comment éviter les arnaques en plomberie, serrurerie et électricité.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-joel py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Un problème urgent ?
          </h2>
          <p className="text-white/90 mb-8">
            Nos artisans interviennent 24h/24 en Île-de-France. Prix fixe garanti.
          </p>
          <a
            href="tel:+33141691008"
            className="inline-flex items-center gap-2 bg-white text-joel-violet font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-shadow"
          >
            📞 Appeler le 01 41 69 10 08
          </a>
        </div>
      </section>
    </div>
  );
}
