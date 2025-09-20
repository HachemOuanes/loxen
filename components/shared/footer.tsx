export function Footer() {
  const quickLinks = ["Produits", "Marques", "Inspirations", "Catalogues", "À Propos", "Contact"]

  return (
    <footer className="bg-foreground text-background py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="footerGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-center mb-16">
          <svg width="160" height="2" className="text-background/15">
            <line x1="0" y1="1" x2="160" y2="1" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          <div className="mx-8">
            <svg width="32" height="32" className="text-background/20">
              <circle cx="16" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="16" cy="16" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="16" cy="16" r="1" fill="currentColor" />
            </svg>
          </div>
          <svg width="160" height="2" className="text-background/15">
            <line x1="0" y1="1" x2="160" y2="1" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-light font-sans mb-6 tracking-[0.2em]">
              L<span className="text-background/60">O</span>X<span className="text-background/60">E</span>N
            </h3>
            <p className="text-background/60 leading-relaxed font-light text-lg tracking-wide max-w-sm">
              Transformer les visions architecturales avec des solutions premium d'aluminium et de façades.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-lg font-light mb-8 tracking-widest uppercase text-background/70">Liens Rapides</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-background/60 hover:text-background transition-colors duration-300 font-light text-lg tracking-wide"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-lg font-light mb-8 tracking-widest uppercase text-background/70">Se Connecter</h4>
            <div className="flex justify-center md:justify-start space-x-6">
              <a
                href="#"
                className="text-background/60 hover:text-background transition-colors duration-300 group"
                aria-label="Facebook"
              >
                <svg
                  width="24"
                  height="24"
                  className="group-hover:scale-110 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-background/60 hover:text-background transition-colors duration-300 group"
                aria-label="LinkedIn"
              >
                <svg
                  width="24"
                  height="24"
                  className="group-hover:scale-110 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="2"
                    y="9"
                    width="4"
                    height="12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="4"
                    cy="4"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-background/60 hover:text-background transition-colors duration-300 group"
                aria-label="Instagram"
              >
                <svg
                  width="24"
                  height="24"
                  className="group-hover:scale-110 transition-transform duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.5 6.5h.01"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <svg width="100" height="2" className="text-background/10">
              <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            <div className="mx-6">
              <svg width="6" height="6" className="text-background/20">
                <circle cx="3" cy="3" r="1" fill="currentColor" />
              </svg>
            </div>
            <svg width="100" height="2" className="text-background/10">
              <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
          <p className="text-background/40 font-light tracking-widest uppercase text-sm">
            © 2025 Loxen. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
