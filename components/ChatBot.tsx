"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone, ChevronRight, Bot, User } from "lucide-react";
import { useSiteConfig, formatPhoneForTel } from "@/lib/hooks/useSiteConfig";

type Step = "welcome" | "problem" | "location" | "quote" | "contact";

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
}

const problems = [
  { id: "fuite-eau", label: "🔧 Fuite d'eau", category: "plomberie", price: 89 },
  { id: "wc-bouche", label: "🔧 WC bouché", category: "plomberie", price: 79 },
  { id: "porte-claquee", label: "🔐 Porte claquée", category: "serrurerie", price: 89 },
  { id: "serrure-bloquee", label: "🔐 Serrure bloquée", category: "serrurerie", price: 99 },
  { id: "panne-courant", label: "⚡ Panne électrique", category: "electricite", price: 89 },
  { id: "disjoncteur", label: "⚡ Disjoncteur qui saute", category: "electricite", price: 79 },
  { id: "autre", label: "❓ Autre problème", category: "autre", price: 89 },
];

export default function ChatBot() {
  const { config } = useSiteConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<typeof problems[0] | null>(null);
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (content: string, delay: number = 500) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "bot", content },
      ]);
      setIsTyping(false);
    }, delay);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "user", content },
    ]);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      addBotMessage("Bonjour ! 👋 Je suis là pour vous aider à trouver un artisan rapidement.", 300);
      setTimeout(() => {
        addBotMessage("Quel problème rencontrez-vous ?", 800);
        setStep("problem");
      }, 1000);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleProblemSelect = (problem: typeof problems[0]) => {
    setSelectedProblem(problem);
    addUserMessage(problem.label);
    setTimeout(() => {
      addBotMessage(`D'accord, un problème de ${problem.label.split(" ")[1].toLowerCase()}.`);
      setTimeout(() => {
        addBotMessage("Dans quelle ville êtes-vous situé(e) ?");
        setStep("location");
      }, 800);
    }, 300);
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) return;

    addUserMessage(location);
    setTimeout(() => {
      addBotMessage(`Parfait, nous intervenons bien à ${location} ! 📍`);
      setTimeout(() => {
        if (selectedProblem) {
          addBotMessage(`Pour ce type d'intervention, notre tarif est de **${selectedProblem.price}€** (prix fixe, sans surprise).`);
          setTimeout(() => {
            addBotMessage("Souhaitez-vous être rappelé immédiatement ?");
            setStep("quote");
          }, 1000);
        }
      }, 800);
    }, 300);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;

    addUserMessage(`Mon numéro : ${phone}`);
    setTimeout(() => {
      addBotMessage("Merci ! Un artisan vous rappelle dans les 2 minutes. 📞");
      setStep("contact");
      
      // Track conversion
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "chatbot_lead",
          problem: selectedProblem?.id,
          location,
        });
      }
    }, 300);
  };

  const handleCallClick = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "click_to_call",
        phone_number: config.phone_number,
        placement: "chatbot",
      });
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={handleOpen}
            className="fixed bottom-24 right-4 z-40 w-14 h-14 bg-gradient-joel rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow group"
            aria-label="Ouvrir le chat"
          >
            <MessageCircle className="text-white" size={24} />
            {/* Notification dot */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-joel px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Assistant Joël</p>
                  <p className="text-white/80 text-xs">Répond en 2 min</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[320px] overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "bot" && (
                    <div className="w-8 h-8 bg-joel-violet/10 rounded-full flex-shrink-0 flex items-center justify-center">
                      <Bot size={16} className="text-joel-violet" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                      message.type === "user"
                        ? "bg-joel-violet text-white rounded-br-md"
                        : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100"
                    }`}
                  >
                    <p className="text-sm" dangerouslySetInnerHTML={{ 
                      __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                    }} />
                  </div>
                  {message.type === "user" && (
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center">
                      <User size={16} className="text-gray-600" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-joel-violet/10 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Bot size={16} className="text-joel-violet" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              {step === "problem" && (
                <div className="space-y-2">
                  {problems.map((problem) => (
                    <button
                      key={problem.id}
                      onClick={() => handleProblemSelect(problem)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-joel-violet/5 rounded-xl border border-gray-200 hover:border-joel-violet/30 transition-colors text-left"
                    >
                      <span className="text-sm font-medium text-gray-800">{problem.label}</span>
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              )}

              {step === "location" && (
                <form onSubmit={handleLocationSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: Paris 15, Boulogne..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-joel-violet focus:ring-2 focus:ring-joel-violet/20 outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-joel-violet text-white rounded-xl hover:bg-joel-violet/90 transition-colors"
                    aria-label="Envoyer"
                  >
                    <Send size={18} />
                  </button>
                </form>
              )}

              {step === "quote" && (
                <div className="space-y-3">
                  <a
                    href={`tel:${formatPhoneForTel(config.phone_number)}`}
                    onClick={handleCallClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    <Phone size={18} />
                    Appeler maintenant
                  </a>
                  <p className="text-center text-xs text-gray-500">ou</p>
                  <form onSubmit={handlePhoneSubmit} className="flex gap-2">
                    <input
                      type="tel"
                      placeholder="Votre numéro de téléphone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:border-joel-violet focus:ring-2 focus:ring-joel-violet/20 outline-none text-sm"
                    />
                    <button
                      type="submit"
                      className="px-4 py-3 bg-joel-violet text-white rounded-xl hover:bg-joel-violet/90 transition-colors"
                      aria-label="Envoyer mon numéro"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              )}

              {step === "contact" && (
                <div className="text-center py-4">
                  <p className="text-emerald-600 font-semibold mb-2">✅ Demande envoyée !</p>
                  <p className="text-sm text-gray-600">
                    Nous vous rappelons très vite.
                  </p>
                  <a
                    href={`tel:${formatPhoneForTel(config.phone_number)}`}
                    className="inline-flex items-center gap-2 mt-4 text-joel-violet font-medium"
                  >
                    <Phone size={16} />
                    {config.phone_number}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
