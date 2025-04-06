
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Use null as initial state to indicate "not determined yet"
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    // Initial check
    const checkMobile = () => {
      const isMobileView = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(isMobileView);
      console.log("Mobile status updated:", isMobileView);
    };
    
    // Run immediately
    checkMobile();
    
    // Add event listener with better media query approach
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      checkMobile();
    }

    try {
      // Modern browsers
      mql.addEventListener("change", onChange)
      
      // Cleanup
      return () => mql.removeEventListener("change", onChange)
    } catch (e) {
      // Fallback for older browsers
      console.warn("Using fallback for media query listeners");
      window.addEventListener("resize", onChange);
      
      // Cleanup
      return () => window.removeEventListener("resize", onChange);
    }
  }, [])

  return isMobile;
}
