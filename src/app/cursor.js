// Custom cursor functionality for desktop
export function initCustomCursor() {
  if (typeof window === 'undefined') return;
  
  const cursor = document.getElementById('brutalist-cursor');
  if (!cursor) return;

  const updateCursor = (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  };

  const handleMouseOver = (e) => {
    if ((e.target.tagName === 'A' || 
        e.target.tagName === 'BUTTON' || 
        e.target.closest('a') || 
        e.target.closest('button')) && 
        !e.target.classList.contains('brutalist-button')) {
      cursor.classList.add('cursor-hover');
    }
  };

  const handleMouseOut = () => {
    cursor.classList.remove('cursor-hover');
  };

  const handleMouseDown = () => {
    cursor.classList.add('cursor-click');
  };

  const handleMouseUp = () => {
    cursor.classList.remove('cursor-click');
  };

  document.addEventListener('mousemove', updateCursor);
  document.addEventListener('mouseover', handleMouseOver);
  document.addEventListener('mouseout', handleMouseOut);
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mouseup', handleMouseUp);

  return () => {
    document.removeEventListener('mousemove', updateCursor);
    document.removeEventListener('mouseover', handleMouseOver);
    document.removeEventListener('mouseout', handleMouseOut);
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp);
  };
} 