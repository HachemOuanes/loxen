export default function ConseilsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-extralight text-black mb-8 tracking-[-0.02em]">
            Conseils
          </h1>
          <div className="w-24 h-px bg-black/20 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Bénéficiez de nos conseils d'experts et de notre accompagnement technique. Cette page est en cours de développement.
          </p>
          
          <div className="mt-16">
            <a 
              href="/"
              className="inline-block px-8 py-3 border-2 border-black/20 text-black hover:bg-black hover:text-white transition-all duration-300 font-light tracking-wider uppercase"
            >
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}