"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Phone, Clock, Shield, ChevronDown, MapPin, Calendar, User, Star } from "lucide-react";
import type { City } from "@/lib/data/cities-idf-types";
import { Trade, Service } from "@/lib/data/services-definition";
import { PremiumPageContent } from "@/lib/seo/premium/types";
import { getPersona } from "@/lib/seo/premium/personas";
import { Markdown } from "@/lib/seo/premium/renderMarkdown";
import type { ContextualLink } from "@/lib/seo/premium/contextualLinks";
import MidPageCTA from "@/components/MidPageCTA";
import Breadcrumbs from "@/components/Breadcrumbs";

// Lazy-load — modal devis ouvert seulement au clic CTA. Critique sur les 7869 pages premium SEO.
const QuickQuoteForm = dynamic(() => import("@/components/QuickQuoteForm"), {
  ssr: false,
});

interface PremiumPageRendererProps {
  content: PremiumPageContent;
  trade: Trade;
  city: City;
  service?: Service;
  /**
   * Liens contextuels (calculés serveur) à injecter DANS le corps des sections.
   * Map sectionIndex → ContextualLink. Renforce le maillage interne profond
   * (≠ menu/footer/breadcrumbs) — boost SEO de pertinence locale.
   */
  contextualLinks?: Map<number, ContextualLink>;
}

const PHONE = "01 41 69 10 08";
const PHONE_INTL = "+33141691008";

export default function PremiumPageRenderer({ content, trade, city, service, contextualLinks }: PremiumPageRendererProps) {
  const persona = getPersona(content.authorPersona);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const formattedPubDate = formatDate(content.publishedAt);
  const formattedUpdDate = formatDate(content.updatedAt);

  return (
    <>
      {/* ============================================ */}
      {/* HERO PREMIUM avec auteur */}
      {/* ============================================ */}
      <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-joel-violet/5 via-white to-joel-mauve/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-joel-violet/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-joel-mauve/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-5 md:px-8">
          {/* Breadcrumb */}
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: trade.name, href: `/${trade.slug}` },
              ...(service
                ? [
                    { label: city.name, href: `/${trade.slug}/${city.slug}` },
                    { label: service.name },
                  ]
                : [{ label: city.name }]),
            ]}
          />

          {/* H1 + intro */}
          <h1 className="font-display text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {content.h1}
          </h1>

          {/* Auteur + dates → signal E-E-A-T */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-joel-violet/10 flex items-center justify-center text-joel-violet">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Par {persona.fullName}</p>
                <p className="text-xs text-gray-500">{persona.oneLineBio}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>Publié le {formattedPubDate}</span>
              {content.updatedAt !== content.publishedAt && <span>· Mis à jour le {formattedUpdDate}</span>}
            </div>
          </div>

          {/* Intro paragraph (texte rédactionnel) */}
          <div className="prose-lg text-gray-700 text-lg leading-relaxed mb-8 max-w-3xl">
            <Markdown>{content.introParagraph}</Markdown>
          </div>

          {/* CTA + Phone */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${PHONE_INTL}`}
              className="inline-flex items-center justify-center gap-2 bg-joel-violet text-white px-6 py-4 rounded-2xl font-semibold hover:bg-joel-violet/90 transition shadow-lg shadow-joel-violet/20"
            >
              <Phone className="w-5 h-5" />
              Appeler · {PHONE}
            </a>
            <button
              onClick={() => setShowQuoteModal(true)}
              className="inline-flex items-center justify-center gap-2 bg-white text-joel-violet border-2 border-joel-violet px-6 py-4 rounded-2xl font-semibold hover:bg-joel-violet/5 transition"
            >
              Devis instantané
            </button>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-joel-violet" /> Intervention ~30 min</span>
            <span className="inline-flex items-center gap-1.5"><Shield className="w-4 h-4 text-joel-violet" /> Prix fixe garanti</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-joel-violet" /> {city.name} ({city.postalCodes[0]})</span>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TABLE OF CONTENTS */}
      {/* ============================================ */}
      {content.sections.length > 2 && (
        <section className="py-8 border-y border-gray-100 bg-gray-50/50">
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">Sommaire</h2>
            <ol className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {content.sections.map((s, i) => (
                <li key={s.anchor} className="flex gap-2 text-gray-700 hover:text-joel-violet">
                  <span className="text-gray-400 font-mono">{String(i + 1).padStart(2, "0")}.</span>
                  <a href={`#${s.anchor}`} className="hover:underline">{s.title}</a>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* SECTIONS RÉDACTIONNELLES */}
      {/* + injection des liens contextuels (maillage interne profond) */}
      {/* ============================================ */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          {content.sections.map((sec, idx) => {
            const link = contextualLinks?.get(idx);
            return (
              <article key={sec.anchor} id={sec.anchor} className="mb-12 scroll-mt-24">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-5 border-l-4 border-joel-violet pl-4">
                  {sec.title}
                </h2>
                <div>
                  <Markdown>{sec.body}</Markdown>
                </div>
                {link && (
                  // Lien contextuel : phrase narrative en italique discret,
                  // intégrée à la suite de la section. Voix Joël, pas un encart.
                  // <div> (et non <p>) car Markdown génère son propre <p> interne.
                  <div className="mt-5 text-gray-600 italic text-base leading-relaxed border-l-2 border-joel-violet/30 pl-4 [&>p]:mb-0 [&>p]:italic [&>p]:text-gray-600">
                    <Markdown>{link.sentence}</Markdown>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA MI-PAGE — boost conversion entre sections rédac et bloc prix */}
      {/* ============================================ */}
      <MidPageCTA
        title={`Besoin d'un ${trade.name.toLowerCase()} à ${city.name} ?`}
        subtitle="Devis instantané · prix fixe annoncé avant intervention"
        placement={`premium_${trade.slug}_${city.slug}${service ? `_${service.slug}` : ""}`}
        trade={tradeToTradeType(trade.slug)}
      />

      {/* ============================================ */}
      {/* VRAIS PRIX VS ARNAQUES */}
      {/* ============================================ */}
      {content.vraisPrix.length > 0 && (
        <section id="vrais-prix" className="py-12 bg-gray-50 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Vrais prix à {city.name} (vs arnaques courantes)
            </h2>
            <p className="text-gray-600 mb-8">
              Voici la grille tarifaire de Joël à {city.name}, comparée aux pratiques abusives qu'on observe sur la zone.
            </p>
            <div className="space-y-3">
              {content.vraisPrix.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{p.service}</h3>
                    <span className="text-2xl font-bold text-joel-violet">{p.prixJoel}€ <span className="text-sm font-normal text-gray-500">TTC chez Joël</span></span>
                  </div>
                  <p className="text-sm text-red-700 mb-2">⚠️ Pratique abusive observée : <span className="font-semibold">{p.prixArnaqueur}</span></p>
                  <p className="text-sm text-gray-600">{p.pourquoi}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* FAQ LOCALE */}
      {/* ============================================ */}
      {content.faqLocale.length > 0 && (
        <section id="faq" className="py-12 md:py-16 scroll-mt-24">
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Questions fréquentes — {service ? `${service.name} à ${city.name}` : `${trade.name} à ${city.name}`}
            </h2>
            <div className="space-y-3">
              {content.faqLocale.map((item, i) => {
                const open = openFaqIdx === i;
                return (
                  <div key={i} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIdx(open ? null : i)}
                      className="w-full flex justify-between items-start gap-4 p-5 text-left hover:bg-gray-50 transition"
                    >
                      <span className="font-semibold text-gray-900">{item.question}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && (
                      <div className="px-5 pb-5 text-gray-700 leading-relaxed">
                        <Markdown>{item.answer}</Markdown>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* TÉMOIGNAGES GÉOLOCALISÉS */}
      {/* ============================================ */}
      {content.temoignages.length > 0 && (
        <section id="temoignages" className="py-12 md:py-16 bg-linear-to-br from-joel-violet/5 to-joel-mauve/5 scroll-mt-24">
          <div className="max-w-5xl mx-auto px-5 md:px-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Ils nous ont fait confiance à {city.name}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {content.temoignages.map((t, i) => (
                <figure key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className={`w-4 h-4 ${k < t.rating ? "fill-joel-yellow text-joel-yellow" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 italic mb-4 leading-relaxed">« {t.texte} »</blockquote>
                  <figcaption className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-900 not-italic">{t.auteur}</span> · {t.quartierOuRue} · {formatDate(t.date)}
                    <br />
                    <span className="text-joel-violet">{t.serviceRendered}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* INTERNAL LINKING CONTEXTUEL */}
      {/* ============================================ */}
      {content.internalLinks.length > 0 && (
        <section className="py-10 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-5 md:px-8">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-4">À lire aussi</h2>
            <ul className="space-y-2">
              {content.internalLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.url} className="text-joel-violet hover:underline font-medium">
                    → {l.anchor}
                  </Link>
                  {l.contexte && <p className="text-sm text-gray-500 ml-5">{l.contexte}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="py-14 md:py-16 bg-joel-violet text-white">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Besoin d'un {trade.name.toLowerCase()} à {city.name} maintenant ?
          </h2>
          <p className="opacity-90 mb-6">
            Prix annoncé avant intervention. Artisan vérifié. 24h/24 sans majoration.
          </p>
          <a
            href={`tel:${PHONE_INTL}`}
            className="inline-flex items-center gap-2 bg-white text-joel-violet px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-50 transition"
          >
            <Phone className="w-5 h-5" />
            {PHONE}
          </a>
        </div>
      </section>

      {/* ============================================ */}
      {/* MODAL DEVIS */}
      {/* ============================================ */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowQuoteModal(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowQuoteModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">✕</button>
            <QuickQuoteForm variant="modal" onClose={() => setShowQuoteModal(false)} defaultService={service?.slug} trade={tradeToTradeType(trade.slug)} />
          </div>
        </div>
      )}
    </>
  );
}

function tradeToTradeType(slug: string): "serrurerie" | "plomberie" | "electricite" | undefined {
  if (slug === "serrurier") return "serrurerie";
  if (slug === "plombier") return "plomberie";
  if (slug === "electricien") return "electricite";
  return undefined;
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}
