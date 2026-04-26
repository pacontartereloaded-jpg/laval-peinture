export type FAQItem = { q: string; a: string }

export type BlogSection = {
  h2: string
  paragraphs: string[]
  list?: string[]
}

export type BlogPost = {
  locale: 'fr' | 'en' | 'es'
  path: string
  title: string
  metaDescription: string
  keywords: string[]
  h1: string
  lead: string
  sections: BlogSection[]
  faq: FAQItem[]
  ctaHeading: string
  ctaBody: string
}

export type ServiceStep = { num: string; title: string; body: string }
export type ServiceBenefit = { title: string; body: string }

export type RichServicePage = {
  locale: 'fr' | 'en' | 'es'
  path: string
  title: string
  metaDescription: string
  keywords: string[]
  eyebrow: string
  h1: string
  lead: string
  processHeading: string
  steps: ServiceStep[]
  benefitsHeading: string
  benefits: ServiceBenefit[]
  sections: { h2: string; body: string }[]
  faq: FAQItem[]
  ctaHeading: string
  ctaBody: string
}
