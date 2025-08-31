"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="py-32 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 relative">
          <div className="flex items-center justify-center mb-12">
            <svg width="120" height="2" className="text-background/20">
              <line x1="0" y1="1" x2="120" y2="1" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div className="mx-8">
              <svg width="24" height="24" className="text-background/30">
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>
            <svg width="120" height="2" className="text-background/20">
              <line x1="0" y1="1" x2="120" y2="1" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          <h2 className="text-5xl md:text-7xl font-light font-sans mb-8 leading-[0.9] tracking-tight">
            Nous <span className="font-extralight italic text-background/70">Contacter</span>
          </h2>

          <p className="text-xl md:text-2xl text-background/60 max-w-3xl mx-auto leading-relaxed font-extralight tracking-wide">
            Prêt à transformer votre vision architecturale ? Discutons de votre projet.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-base font-light text-background/70 tracking-widest uppercase text-sm">
                      Nom
                    </label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-transparent border-0 border-b border-background/20 text-background placeholder:text-background/40 focus:border-background/60 h-14 rounded-none px-0 text-lg font-light focus-visible:ring-0"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-base font-light text-background/70 tracking-widest uppercase text-sm">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-transparent border-0 border-b border-background/20 text-background placeholder:text-background/40 focus:border-background/60 h-14 rounded-none px-0 text-lg font-light focus-visible:ring-0"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-base font-light text-background/70 tracking-widest uppercase text-sm">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Parlez-nous de votre projet..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-transparent border-0 border-b border-background/20 text-background placeholder:text-background/40 focus:border-background/60 resize-none rounded-none px-0 text-lg font-light focus-visible:ring-0"
                    required
                  />
                </div>
                <div className="pt-8">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-background text-foreground hover:bg-background/90 h-14 px-12 font-light tracking-widest uppercase text-sm transition-all duration-500 rounded-none border-0"
                  >
                    Envoyer Message
                  </Button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-10">
                <div className="group">
                  <div className="flex items-start space-x-6">
                    <div className="mt-2">
                      <svg width="20" height="20" className="text-background/40" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <polyline
                          points="22,6 12,13 2,6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-light text-background/70 mb-2 tracking-widest uppercase text-sm">Email</h3>
                      <p className="text-background text-lg font-light">info@loxen.com</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start space-x-6">
                    <div className="mt-2">
                      <svg width="20" height="20" className="text-background/40" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-light text-background/70 mb-2 tracking-widest uppercase text-sm">
                        Téléphone
                      </h3>
                      <p className="text-background text-lg font-light">+44 20 7123 4567</p>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <div className="flex items-start space-x-6">
                    <div className="mt-2">
                      <svg width="20" height="20" className="text-background/40" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-light text-background/70 mb-2 tracking-widest uppercase text-sm">Studio</h3>
                      <p className="text-background text-lg font-light leading-relaxed">
                        123 Architecture Street
                        <br />
                        Londres, UK EC1A 1BB
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div className="flex items-center justify-center">
                  <svg width="80" height="2" className="text-background/20">
                    <line x1="0" y1="1" x2="80" y2="1" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                  <div className="mx-6">
                    <svg width="8" height="8" className="text-background/30">
                      <circle cx="4" cy="4" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <svg width="80" height="2" className="text-background/20">
                    <line x1="0" y1="1" x2="80" y2="1" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>
                <p className="text-background/50 text-sm mt-6 tracking-widest uppercase text-center font-light">
                  Réponse sous 24 heures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
