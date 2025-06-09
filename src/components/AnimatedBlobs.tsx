
export const AnimatedBlobs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 animate-pulse-soft blur-3xl bg-gradient-to-r from-[#EE2373] to-[#EE2373]/70" 
           style={{ animationDelay: '0s', animationDuration: '8s' }} />
      
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full opacity-15 animate-pulse-soft blur-3xl bg-gradient-to-r from-[#B8FE96] to-[#B8FE96]/70" 
           style={{ animationDelay: '2s', animationDuration: '10s' }} />
      
      <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full opacity-20 animate-pulse-soft blur-3xl bg-gradient-to-r from-[#74AC53] to-[#74AC53]/70" 
           style={{ animationDelay: '4s', animationDuration: '12s' }} />
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 animate-pulse-soft blur-3xl bg-gradient-to-r from-[#EE2373] to-[#B8FE96]" 
           style={{ animationDelay: '6s', animationDuration: '14s' }} />
      
      <div className="absolute bottom-1/4 right-1/3 w-56 h-56 rounded-full opacity-15 animate-pulse-soft blur-3xl bg-gradient-to-r from-[#74AC53] to-[#EE2373]" 
           style={{ animationDelay: '8s', animationDuration: '9s' }} />
    </div>
  );
};
