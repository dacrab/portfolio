/**
 * Custom cursor implementation for brutalist design
 * Tracks mouse movement and applies different styles based on interactions
 */

export function initCustomCursor(): (() => void) | null {
  // Only run on client and if custom cursor element exists
  if (typeof document === 'undefined') return null;
  
  const cursor = document.getElementById('brutalist-cursor');
  if (!cursor) return null;
  
  // Base cursor styles
  cursor.style.opacity = '0';
  setTimeout(() => {
    cursor.style.opacity = '1';
    cursor.style.transition = 'opacity 0.3s ease, transform 0.2s ease, width 0.3s ease, height 0.3s ease, border-radius 0.3s ease';
  }, 500);
  
  // Event handlers
  const updateCursor = (e: MouseEvent) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  };

  const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isClickable = 
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.closest('a') || 
      target.closest('button') ||
      target.classList.contains('clickable') ||
      target.closest('.clickable');
      
    if (isClickable) {
      cursor.classList.add('cursor-hover');
    }
  };

  const handleMouseOut = () => cursor.classList.remove('cursor-hover');
  const handleMouseDown = () => cursor.classList.add('cursor-click');
  const handleMouseUp = () => cursor.classList.remove('cursor-click');

  // Add event listeners
  document.addEventListener('mousemove', updateCursor);
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleMouseOut);
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mouseup', handleMouseUp);
  
  // Handle cursor visibility when leaving/entering the page
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
  
  // Return cleanup function
  return () => {
    document.removeEventListener('mousemove', updateCursor);
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
    document.removeEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
    });
  };
}

// Helper function to detect mobile devices
export function isMobile(): boolean {
  return typeof navigator !== 'undefined' ? 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) : 
    false;
} 