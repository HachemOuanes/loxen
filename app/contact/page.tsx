export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-extralight text-black mb-8 tracking-[-0.02em]">
            Nous Contacter
          </h1>
          <div className="w-24 h-px bg-black/20 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Parlons de votre projet. Notre équipe d'experts est à votre disposition pour vous accompagner dans toutes vos réalisations architecturales.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-extralight text-black mb-6 tracking-[-0.02em]">
                Envoyez-nous un message
              </h2>
              <div className="w-16 h-px bg-black/20 mb-8"></div>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light text-gray-600 tracking-wider uppercase mb-2">
                    Prénom
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-0 py-3 text-black bg-transparent border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-colors duration-300 font-light"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-600 tracking-wider uppercase mb-2">
                    Nom
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-0 py-3 text-black bg-transparent border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-colors duration-300 font-light"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-light text-gray-600 tracking-wider uppercase mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  className="w-full px-0 py-3 text-black bg-transparent border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-colors duration-300 font-light"
                  placeholder="votre@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-light text-gray-600 tracking-wider uppercase mb-2">
                  Société
                </label>
                <input 
                  type="text" 
                  className="w-full px-0 py-3 text-black bg-transparent border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-colors duration-300 font-light"
                  placeholder="Nom de votre société (optionnel)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-light text-gray-600 tracking-wider uppercase mb-2">
                  Type de projet
                </label>
                <select className="w-full px-0 py-3 text-black bg-transparent border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-colors duration-300 font-light">
                  <option value="">Sélectionnez un type de projet</option>
                  <option value="facade">Façades et bardages</option>
                  <option value="interior">Aménagement intérieur</option>
                  <option value="renovation">Rénovation</option>
                  <option value="neuf">Construction neuve</option>
                  <option value="consulting">Conseil technique</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-light text-gray-600 tracking-wider uppercase mb-2">
                  Message
                </label>
                <textarea 
                  rows={4}
                  className="w-full px-0 py-3 text-black bg-transparent border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-colors duration-300 font-light resize-none"
                  placeholder="Décrivez votre projet et vos besoins..."
                />
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-12 py-4 border-2 border-black/20 bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300 font-light tracking-wider uppercase rounded-none"
                >
                  Envoyer le message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-extralight text-black mb-6 tracking-[-0.02em]">
                Informations de contact
              </h2>
              <div className="w-16 h-px bg-black/20 mb-8"></div>
            </div>
            
            {/* Office */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-light text-black mb-3 tracking-wide uppercase">
                  Bureau Principal
                </h3>
                <div className="space-y-2 text-gray-600 font-light">
                  <p>123 Avenue des Architectes</p>
                  <p>75001 Paris, France</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-light text-black mb-3 tracking-wide uppercase">
                  Téléphone
                </h3>
                <div className="space-y-1 text-gray-600 font-light">
                  <p>+33 (0)1 23 45 67 89</p>
                  <p className="text-sm text-gray-500">Lundi - Vendredi, 9h - 18h</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-light text-black mb-3 tracking-wide uppercase">
                  Email
                </h3>
                <div className="space-y-1 text-gray-600 font-light">
                  <p>contact@loxen.fr</p>
                  <p className="text-sm text-gray-500">Réponse sous 24h</p>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-gray-50 p-8 -mx-4 sm:mx-0">
              <h3 className="text-lg font-light text-black mb-4 tracking-wide uppercase">
                Nos Services
              </h3>
              <ul className="space-y-2 text-gray-600 font-light">
                <li>• Conseil en solutions architecturales</li>
                <li>• Étude technique personnalisée</li>
                <li>• Accompagnement projet</li>
                <li>• Support installation</li>
                <li>• Service après-vente</li>
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-black text-white p-8 -mx-4 sm:mx-0">
              <h3 className="text-lg font-light mb-4 tracking-wide uppercase">
                Besoin d'un devis ?
              </h3>
              <p className="text-white/80 font-light mb-6 leading-relaxed">
                Obtenez une estimation personnalisée pour votre projet en quelques clics.
              </p>
              <a 
                href="/catalogues"
                className="inline-block px-8 py-3 border-2 border-white/30 bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300 font-light tracking-wider uppercase rounded-none"
              >
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}