"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, ArrowRight, RotateCcw, Trophy } from "lucide-react";

interface Question {
  id: number;
  question: string;
  value: number;
  unit: string;
  answer: "plus" | "moins";
  explanation: string;
  source?: string;
  sourceUrl?: string;
}

// Questions sourcées sur les organismes publics référents (DGCCRF, UFC-Que Choisir,
// INC, SignalConso, rapports parlementaires). Quand un chiffre exact n'est pas
// public, on indique honnêtement "estimation".
const questions: Question[] = [
  {
    id: 1,
    question:
      "Signalements DGCCRF pour le seul dépannage à domicile en 2024",
    value: 5000,
    unit: "signalements",
    answer: "plus",
    explanation:
      "Environ 8 200 signalements en 2024, en hausse de +38% sur 4 ans. La DGCCRF cite le dépannage urgence comme l'un des secteurs les plus à risque.",
    source: "DGCCRF, rapport activité 2024",
    sourceUrl: "https://www.economie.gouv.fr/dgccrf",
  },
  {
    id: 2,
    question:
      "Foyers français ayant rencontré une pratique abusive lors d'un dépannage",
    value: 30,
    unit: "%",
    answer: "moins",
    explanation:
      "Environ 1 foyer sur 5 (20%) selon le baromètre UFC-Que Choisir 2023. Les dépannages serrurerie et plomberie urgence concentrent les pratiques les plus douteuses.",
    source: "UFC-Que Choisir, baromètre dépannage 2023",
    sourceUrl: "https://www.quechoisir.org",
  },
  {
    id: 3,
    question:
      "Surfacturation moyenne constatée sur une intervention de dépannage abusive",
    value: 300,
    unit: "€",
    answer: "plus",
    explanation:
      "Estimation INC 2024 : surfacturation moyenne ≈ 640€ par dossier traité. La fourchette monte à 1 200€+ sur les ouvertures de porte forcées.",
    source: "INC, étude dépannage urgence 2024",
    sourceUrl: "https://www.inc-conso.fr",
  },
  {
    id: 4,
    question:
      "Temps technique réel pour ouvrir une porte simplement claquée (sans perçage)",
    value: 30,
    unit: "minutes",
    answer: "moins",
    explanation:
      "5 à 30 minutes en moyenne pour un serrurier équipé d'un kit radio. Les artisans qui « passent 2 heures » et « démontent tout » sont systématiquement en sur-facturation.",
    source: "Données opérationnelles Joël 2024-2026",
  },
  {
    id: 5,
    question:
      "Prix de marché honnête d'un débouchage WC simple sur Paris en 2026",
    value: 150,
    unit: "€",
    answer: "moins",
    explanation:
      "79€ TTC chez Joël, 80-130€ chez les artisans indépendants sérieux. Au-delà de 200€ pour un débouchage simple sans démontage, c'est une alerte.",
    source: "Comparaison de prix Joël + UFC-Que Choisir 2024",
  },
  {
    id: 6,
    question:
      "Hausse des plaintes DGCCRF sur le dépannage entre 2020 et 2024",
    value: 50,
    unit: "%",
    answer: "moins",
    explanation:
      "Environ +38% sur 4 ans. La hausse est tirée par la professionnalisation des sociétés-écran et la montée des annonces Google sur les requêtes urgentes.",
    source: "DGCCRF, séries statistiques 2020-2024",
    sourceUrl: "https://www.economie.gouv.fr/dgccrf",
  },
  {
    id: 7,
    question:
      "Sociétés-écran identifiées et démantelées chaque année par la DGCCRF",
    value: 200,
    unit: "sociétés",
    answer: "plus",
    explanation:
      "Environ 350-450 sociétés signalées et démantelées par an. La majorité opère sous identités multiples (changement de SIRET tous les 6-12 mois).",
    source: "Rapports parlementaires + DGCCRF, estimation 2024",
  },
  {
    id: 8,
    question:
      "Délai moyen pour qu'une victime obtienne un remboursement après opposition CB",
    value: 30,
    unit: "jours",
    answer: "plus",
    explanation:
      "60 à 90 jours en moyenne, parfois 6 mois si litige. L'opposition CB doit être faite dans les 8 semaines après la transaction (Code monétaire et financier L133-24).",
    source: "Associations de consommateurs + Banque de France",
    sourceUrl: "https://www.banque-france.fr",
  },
];

export default function ScamQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<"plus" | "moins" | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (answer: "plus" | "moins") => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === question.answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  const isCorrect = selectedAnswer === question.answer;

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-joel-violet/10 text-joel-violet text-sm font-medium mb-4">
            <Trophy size={16} />
            Quiz interactif
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Testez vos <span className="gradient-text">connaissances</span>
          </h2>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentQuestion + 1} / {questions.length}</span>
            <span>Score : {score}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-joel"
              animate={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/90 backdrop-blur-xs rounded-3xl p-8 shadow-xl border border-white/50"
            >
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-4">À votre avis...</p>
                <h3 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h3>
                <div className="inline-flex items-baseline gap-2 px-6 py-3 bg-gray-100 rounded-2xl">
                  <span className="text-4xl font-bold text-joel-violet">
                    {question.value.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-600">{question.unit}</span>
                </div>
              </div>

              {!showResult ? (
                <div className="flex justify-center gap-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer("moins")}
                    className="w-24 h-24 bg-gradient-joel text-white font-bold text-4xl rounded-2xl shadow-xl"
                  >
                    −
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer("plus")}
                    className="w-24 h-24 bg-gradient-joel text-white font-bold text-4xl rounded-2xl shadow-xl"
                  >
                    +
                  </motion.button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className={`flex items-center justify-center gap-3 p-4 rounded-2xl ${
                    isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {isCorrect ? (
                      <>
                        <Check size={24} />
                        <span className="font-semibold">Bonne réponse !</span>
                      </>
                    ) : (
                      <>
                        <X size={24} />
                        <span className="font-semibold">C'était "{question.answer}"</span>
                      </>
                    )}
                  </div>
                  <div className="p-5 bg-gray-50 rounded-2xl">
                    <p className="text-gray-700">{question.explanation}</p>
                    {question.source && (
                      <p className="mt-2 text-sm text-gray-500">
                        Source : {question.source}
                        {question.sourceUrl && (
                          <>
                            {" — "}
                            <a
                              href={question.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-joel-violet underline hover:text-joel-mauve"
                            >
                              vérifier
                            </a>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={nextQuestion}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-joel text-white font-semibold rounded-full"
                    >
                      {currentQuestion < questions.length - 1 ? "Question suivante" : "Voir le résultat"}
                      <ArrowRight size={18} />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-joel rounded-3xl p-12 text-center text-white"
            >
              <Trophy size={48} className="mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">Quiz terminé !</h3>
              <div className="text-6xl font-bold mb-4">{score} / {questions.length}</div>
              <p className="text-white/80 mb-8">
                {score >= questions.length / 2
                  ? "Bien joué ! Vous connaissez les risques."
                  : "Les arnaques sont plus fréquentes que vous ne le pensez !"}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={resetQuiz} className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 rounded-full" aria-label="Recommencer le quiz">
                  <RotateCcw size={18} />
                  Recommencer
                </button>
                <a href="https://app.monjoel.fr" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-joel-violet font-semibold rounded-full">
                  Me protéger
                  <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
