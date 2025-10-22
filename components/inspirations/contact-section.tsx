import { CtaSection } from '@/components/shared/cta-section'

interface ContactSectionProps {
  title: string
  description: string
  contactLink: string
  contactCta: string
}

export function ContactSection({ title, description, contactLink, contactCta }: ContactSectionProps) {
  return (
    <CtaSection
      title={title}
      description={description}
      contactLink={contactLink}
      contactCta={contactCta}
    />
  )
}
