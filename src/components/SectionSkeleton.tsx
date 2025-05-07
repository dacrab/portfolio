import { memo } from "react";

interface SectionSkeletonProps {
  id?: string;
  height?: string;
}

/**
 * SectionSkeleton component - Used as a loading placeholder for lazy-loaded sections
 * Maintains the same dimensions as the actual section to prevent layout shift
 * Now updated with brutalist design elements for consistency
 */
const SectionSkeleton = memo(function SectionSkeleton({
  id,
  height = "py-16 md:py-28",
}: SectionSkeletonProps) {
  return (
    <section
      id={id}
      className={`${height} relative overflow-hidden bg-[var(--background)]`}
      aria-hidden="true"
    >
      {/* Brutalist background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(0,0,0,0.03)_1.5px,transparent_1.5px)] bg-[size:50px_50px] pointer-events-none"></div>
      
      {/* Brutalist decorative elements */}
      <div className="absolute top-20 left-10 w-8 h-40 bg-[var(--accent)] opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-8 h-40 bg-[var(--foreground)] opacity-20"></div>
      
      <div className="brutalist-container mx-auto relative z-10 px-6">
        {/* Brutalist section header skeleton */}
        <div className="mb-16">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-[var(--accent)] opacity-30 mr-6 animate-pulse"></div>
            <div className="h-10 w-64 bg-[var(--foreground)] opacity-20 animate-pulse"></div>
          </div>
          <div className="ml-16">
            <div className="w-32 h-2 bg-[var(--accent)] opacity-30 mb-10"></div>
            <div className="h-5 w-80 bg-[var(--foreground)] opacity-15 animate-pulse"></div>
          </div>
        </div>

        {/* Main content skeleton with brutalist styling */}
        <div className="max-w-6xl mx-auto">
          {/* Brutalist decoration elements */}
          <div className="absolute left-0 top-1/3 w-4 h-20 bg-[var(--accent-secondary)] opacity-20"></div>
          <div className="absolute right-0 top-16 w-12 h-2 bg-[var(--accent)] opacity-20"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <div className="brutalist-box border-4 border-[var(--foreground)] opacity-10 relative h-80 animate-pulse">
                <div className="absolute top-0 left-0 w-1/3 h-2 bg-[var(--accent)] opacity-40"></div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[var(--foreground)]"></div>
              </div>
            </div>
            
            <div className="md:col-span-7 mt-12 md:mt-0">
              <div className="brutalist-card border-4 border-[var(--foreground)] opacity-10 relative p-10 animate-pulse">
                <div className="absolute top-0 right-0 w-2 h-16 bg-[var(--accent-secondary)] opacity-40"></div>
                <div className="space-y-6">
                  <div className="h-6 w-full bg-[var(--foreground)] opacity-20"></div>
                  <div className="h-4 w-full bg-[var(--foreground)] opacity-15"></div>
                  <div className="h-4 w-5/6 bg-[var(--foreground)] opacity-15"></div>
                  <div className="h-4 w-4/6 bg-[var(--foreground)] opacity-15"></div>
                  
                  <div className="h-1 w-full bg-[var(--accent)] opacity-20 my-10"></div>
                  
                  <div className="grid grid-cols-3 gap-6 pt-6">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i} 
                        className="border-3 border-[var(--foreground)] opacity-20 h-32"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SectionSkeleton; 