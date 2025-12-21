export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Static violet blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-joel-violet/20 to-joel-mauve/10 rounded-full blur-3xl" />
      
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-br from-joel-mauve/15 to-joel-violet/10 rounded-full blur-3xl" />
      
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-br from-joel-violet/10 to-joel-mauve/15 rounded-full blur-3xl" />

      {/* Yellow accent blobs */}
      <div className="absolute top-1/4 right-1/3 w-48 h-48 bg-joel-yellow/10 rounded-full blur-3xl" />
      
      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-joel-yellow/15 rounded-full blur-2xl" />

      {/* Additional subtle blobs for depth */}
      <div className="absolute top-2/3 right-10 w-40 h-40 bg-joel-violet/8 rounded-full blur-3xl" />
      
      <div className="absolute top-10 left-1/3 w-56 h-56 bg-joel-mauve/8 rounded-full blur-3xl" />
    </div>
  );
}
