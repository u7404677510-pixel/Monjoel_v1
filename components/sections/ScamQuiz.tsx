"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { useSiteConfig } from "@/lib/hooks/useSiteConfig";
import { yellowPunctuation } from "@/components/ui/Title";

interface Question {
  id: number;
  question: string;
  value: number;
  unit: string;
  answer: "plus" | "moins";
  explanation: string;
  source?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Nombre de plaintes pour arnaques au dépannage déposées chaque année en France",
    value: 10000,
    unit: "plaintes",
    answer: "plus",
    explanation: "Plus de 15 000 plaintes sont déposées chaque année pour des arnaques au dépannage à domicile.",
    source: "DGCCRF",
  },
  {
    id: 2,
    question: "Pourcentage de Français ayant déjà payé trop cher un dépannage d'urgence",
    value: 50,
    unit: "%",
    answer: "plus",
    explanation: "70% des Français estiment avoir déjà payé trop cher pour un dépannage d'urgence.",
    source: "UFC-Que Choisir",
  },
  {
    id: 3,
    question: "Prix moyen facturé pour une ouverture de porte par un serrurier malhonnête",
    value: 500,
    unit: "€",
    answer: "plus",
    explanation: "Les serruriers malhonnêtes facturent en moyenne 800€ à 1500€, alors que le prix juste est de 80€ à 150€.",
  },
  {
    id: 4,
    question: "Temps moyen pour déboucher une canalisation simple",
    value: 30,
    unit: "minutes",
    answer: "moins",
    explanation: "Un débouchage simple prend généralement 15 à 20 minutes. Méfiez-vous des factures pour plusieurs heures.",
  },
  {
    id: 5,
    question: "Nombre de faux artisans identifiés chaque année en France",
    value: 1000,
    unit: "faux artisans",
    answer: "plus",
    explanation: "Plus de 3 000 faux artisans sont identifiés chaque année.",
    source: "Ministère de l'Économie",
  },
];

export default function ScamQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<"plus" | "moins" | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { config } = useSiteConfig();

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
            {yellowPunctuation("Quiz interactif")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {yellowPunctuation("Testez vos ")}
            <span className="gradient-text">{yellowPunctuation("connaissances")}</span>
          </h2>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{yellowPunctuation(`Question ${currentQuestion + 1} / ${questions.length}`)}</span>
            <span>{yellowPunctuation(`Score : ${score}`)}</span>
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
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
            >
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-4">{yellowPunctuation("À votre avis...")}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {yellowPunctuation(question.question)}
                </h3>
                <div className="inline-flex items-baseline gap-2 px-6 py-3 bg-gray-100 rounded-2xl">
                  <span className="text-4xl font-bold text-joel-violet">
                    {question.value.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-600">{question.unit}</span>
                </div>
              </div>

              {!showResult ? (
                <div className="flex justify-center gap-6">
                  {/* MOINS à gauche */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer("moins")}
                    className="w-24 h-24 bg-gradient-joel text-white font-bold text-4xl rounded-2xl shadow-xl"
                  >
                    −
                  </motion.button>
                  {/* PLUS à droite */}
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
                        <span className="font-semibold">{yellowPunctuation("Bonne réponse !")}</span>
                      </>
                    ) : (
                      <>
                        <X size={24} />
                        <span className="font-semibold">{yellowPunctuation(`C'était "${question.answer}"`)}</span>
                      </>
                    )}
                  </div>
                  <div className="p-5 bg-gray-50 rounded-2xl">
                    <p className="text-gray-700">{yellowPunctuation(question.explanation)}</p>
                    {question.source && (
                      <p className="mt-2 text-sm text-gray-500">
                        {yellowPunctuation(`Source : ${question.source}`)}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={nextQuestion}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-joel text-white font-semibold rounded-full"
                    >
                      {yellowPunctuation(currentQuestion < questions.length - 1 ? "Question suivante" : "Voir le résultat")}
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
              <h3 className="text-3xl font-bold mb-4">{yellowPunctuation("Quiz terminé !")}</h3>
              <div className="text-6xl font-bold mb-4">{score} / {questions.length}</div>
              <p className="text-white/80 mb-8">
                {yellowPunctuation(
                  score >= questions.length / 2
                    ? "Bien joué ! Vous connaissez les risques."
                    : "Les pratiques douteuses sont plus fréquentes que vous ne le pensez !"
                )}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button onClick={resetQuiz} className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 rounded-full">
                  <RotateCcw size={18} />
                  {yellowPunctuation("Recommencer")}
                </button>
                <a href={config.cta_devis_url} className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-joel-violet font-semibold rounded-full">
                  {yellowPunctuation("Obtenir mon devis")}
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
