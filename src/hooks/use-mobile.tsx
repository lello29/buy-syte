
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [initialized, setInitialized] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Initial check
    const checkMobile = () => {
      const isMobileView = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(isMobileView);
      
      if (!initialized) {
        console.log("Mobile detection initialized:", isMobileView);
        setInitialized(true);
      }
    };
    
    // Run immediately
    checkMobile();
    
    // Add event listener
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
  }, [initialized])

  return isMobile
}
