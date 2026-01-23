/**
 * Utility function to scroll to the contact section on the home page
 * If already on home page, scrolls smoothly to #contact
 * If on another page, navigates to home page with #contact hash
 */
export function scrollToContact(e?: React.MouseEvent<HTMLAnchorElement>) {
  if (e) {
    e.preventDefault()
  }

  // Check if we're on the home page
  if (typeof window !== 'undefined') {
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html'
    
    if (isHomePage) {
      // Already on home page, scroll to contact section
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // Navigate to home page with contact hash
      window.location.href = '/#contact'
    }
  }
}
