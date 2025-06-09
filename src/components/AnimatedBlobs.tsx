
export const AnimatedBlobs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50">
      {/* Primary Medical Blue Blob */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full opacity-15 animate-float blur-3xl bg-gradient-to-br from-primary via-blue-500 to-blue-600" 
           style={{ animationDelay: '0s', animationDuration: '8s' }} />
      
      {/* Healthcare Green Blob */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full opacity-12 animate-float blur-3xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500" 
           style={{ animationDelay: '2s', animationDuration: '10s' }} />
      
      {/* Accent Purple Blob */}
      <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full opacity-10 animate-float blur-3xl bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-500" 
           style={{ animationDelay: '4s', animationDuration: '12s' }} />
      
      {/* Center Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-8 animate-pulse-slow blur-3xl bg-gradient-to-br from-primary via-purple-500 to-emerald-400" 
           style={{ animationDelay: '6s', animationDuration: '14s' }} />
      
      {/* Small Accent Blob */}
      <div className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full opacity-12 animate-float blur-3xl bg-gradient-to-br from-rose-300 via-pink-400 to-purple-400" 
           style={{ animationDelay: '8s', animationDuration: '9s' }} />

      {/* Additional subtle blobs for depth */}
      <div className="absolute top-10 right-20 w-40 h-40 rounded-full opacity-8 animate-pulse-slow blur-3xl bg-gradient-to-br from-amber-300 to-orange-400" 
           style={{ animationDelay: '3s', animationDuration: '11s' }} />
      
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-10 animate-float blur-3xl bg-gradient-to-br from-teal-300 to-blue-400" 
           style={{ animationDelay: '5s', animationDuration: '13s' }} />
    </div>
  );
};
