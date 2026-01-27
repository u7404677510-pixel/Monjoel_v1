"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Star, Phone, CheckCircle } from "lucide-react";

// Prénoms français courants
const firstNames = [
  "Pierre", "Marie", "Jean", "Sophie", "Michel", "Catherine", "Philippe", "Isabelle",
  "Nicolas", "Nathalie", "Laurent", "Sandrine", "Christophe", "Valérie", "Stéphane",
  "Céline", "David", "Aurélie", "François", "Émilie", "Thomas", "Julie", "Julien",
  "Camille", "Antoine", "Claire", "Maxime", "Laura", "Alexandre", "Pauline"
];

// Villes principales IDF pour les notifications
const cities = [
  "Paris 15", "Paris 11", "Paris 18", "Paris 20", "Paris 10",
  "Boulogne-Billancourt", "Montreuil", "Saint-Denis", "Argenteuil", "Versailles",
  "Nanterre", "Créteil", "Vitry-sur-Seine", "Colombes", "Asnières-sur-Seine",
  "Courbevoie", "Aubervilliers", "Champigny", "Rueil-Malmaison", "Saint-Maur"
];

// Types de notifications
type NotificationType = "request" | "rating" | "call" | "completed";

interface Notification {
  id: number;
  type: NotificationType;
  name: string;
  city: string;
  service?: string;
  rating?: number;
  timeAgo: string;
}

const services = [
  "un serrurier", "un plombier", "un électricien",
  "une ouverture de porte", "une réparation de fuite",
  "un dépannage électrique", "un changement de serrure"
];

function generateNotification(): Notification {
  const types: NotificationType[] = ["request", "rating", "call", "completed"];
  const type = types[Math.floor(Math.random() * types.length)];
  const name = firstNames[Math.floor(Math.random() * firstNames.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const service = services[Math.floor(Math.random() * services.length)];
  const timeAgo = `il y a ${Math.floor(Math.random() * 15) + 1} min`;
  const rating = Math.random() > 0.3 ? 5 : 4;

  return {
    id: Date.now() + Math.random(),
    type,
    name,
    city,
    service,
    rating,
    timeAgo
  };
}

function NotificationContent({ notification }: { notification: Notification }) {
  switch (notification.type) {
    case "request":
      return (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-joel-violet/10 rounded-full flex items-center justify-center">
              <User size={16} className="text-joel-violet" />
            </div>
            <span className="font-semibold text-gray-900">{notification.name}</span>
            <span className="text-gray-500">à {notification.city}</span>
          </div>
          <p className="text-sm text-gray-600 ml-10">
            vient de demander {notification.service}
          </p>
        </>
      );

    case "rating":
      return (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
            </div>
            <span className="font-semibold text-gray-900">{notification.name}</span>
            <span className="text-gray-500">à {notification.city}</span>
          </div>
          <p className="text-sm text-gray-600 ml-10 flex items-center gap-1">
            a noté son intervention
            <span className="flex">
              {[...Array(notification.rating)].map((_, i) => (
                <Star key={i} size={12} className="text-yellow-500 fill-yellow-500" />
              ))}
            </span>
          </p>
        </>
      );

    case "call":
      return (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <Phone size={16} className="text-emerald-600" />
            </div>
            <span className="font-semibold text-gray-900">{notification.name}</span>
            <span className="text-gray-500">à {notification.city}</span>
          </div>
          <p className="text-sm text-gray-600 ml-10">
            vient d'appeler pour {notification.service}
          </p>
        </>
      );

    case "completed":
      return (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle size={16} className="text-emerald-600" />
            </div>
            <span className="font-semibold text-gray-900">{notification.name}</span>
            <span className="text-gray-500">à {notification.city}</span>
          </div>
          <p className="text-sm text-gray-600 ml-10">
            intervention terminée avec succès !
          </p>
        </>
      );
  }
}

export default function SocialProofNotifications() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const showNotification = useCallback(() => {
    if (hasInteracted) return;
    
    const newNotification = generateNotification();
    setNotification(newNotification);
    setIsVisible(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, [hasInteracted]);

  useEffect(() => {
    // First notification after 8 seconds
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 8000);

    // Subsequent notifications every 20-40 seconds
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 20000 + 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [showNotification]);

  const handleDismiss = () => {
    setIsVisible(false);
    setHasInteracted(true);
  };

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-20 left-4 z-40 max-w-[320px] bg-white rounded-xl shadow-2xl border border-gray-100 p-4 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={handleDismiss}
        >
          {/* Time badge */}
          <span className="absolute -top-2 -right-2 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            {notification.timeAgo}
          </span>

          <NotificationContent notification={notification} />

          {/* Dismiss hint */}
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            Cliquez pour fermer
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
