/**
 * Skeleton de chargement pendant l'attribution A/B
 * Évite le flash de contenu
 */
export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-white shadow-sm" />
      
      {/* Hero skeleton */}
      <div className="h-[70vh] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <div className="h-8 w-48 bg-gray-400/50 rounded-full mx-auto" />
          <div className="h-12 w-80 bg-gray-400/50 rounded-lg mx-auto" />
          <div className="h-6 w-64 bg-gray-400/50 rounded-lg mx-auto" />
          <div className="h-14 w-56 bg-gray-400/50 rounded-xl mx-auto mt-8" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
