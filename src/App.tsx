import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Brush,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Home,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Star,
} from 'lucide-react'
import {
  translations,
  detectLocale,
  stripLocale,
  withLocale,
  LOCALES,
  LOCALE_LABELS,
  type Locale,
  type Translations,
  type SeoPageDef,
} from './i18n'
import { blogByPath, richPageByPath, type BlogPost, type RichServicePage as RichServicePageData } from './content'

const DIRECT_FR_PATHS = ['/peinture-interieure-laval', '/peinture-exterieure-laval', '/soumission-peinture-laval']

const SERVICE_PATHS: Record<Locale, { interior: string; exterior: string; quote: string; blog: string }> = {
  fr: { interior: '/peinture-interieure-laval', exterior: '/peinture-exterieure-laval', quote: '/soumission-peinture-laval', blog: '/combien-coute-repeindre-maison-laval' },
  en: { interior: '/interior-painting-laval', exterior: '/exterior-painting-laval', quote: '/quote-painting-laval', blog: '/house-painting-cost-laval' },
  es: { interior: '/pintura-interior-laval', exterior: '/pintura-exterior-laval', quote: '/cotizacion-pintura-laval', blog: '/cuanto-cuesta-pintar-casa-laval' },
}

const COMPANY_NAME = 'Peinture Laval'
const PHONE_NUMBER = '(450) 367-5637'
const PHONE_LINK = 'tel:+14503675637'
const HERO_IMAGE = '/realisations/hero-residential-painting-laval.png'

const projectImages = [
  { image: '/realisations/chomedey-interieur-before-after.png', fallback: '/realisations/chomedey-interieur-before-after.svg' },
  { image: '/realisations/vimont-interieur-before-after.png', fallback: '/realisations/vimont-interieur-before-after.svg' },
  { image: '/realisations/sainte-dorothee-exterieur-before-after.png', fallback: '/realisations/sainte-dorothee-exterieur-before-after.svg' },
  { image: '/realisations/laval-chambre-before-after.png', fallback: '/realisations/chomedey-interieur-before-after.svg' },
  { image: '/realisations/chomedey-salle-bain-before-after.png', fallback: '/realisations/chomedey-interieur-before-after.svg' },
  { image: '/realisations/vimont-couloir-before-after.png', fallback: '/realisations/vimont-interieur-before-after.svg' },
  { image: '/realisations/laval-exterieur-garage-before-after.png', fallback: '/realisations/sainte-dorothee-exterieur-before-after.svg' },
  { image: '/realisations/fabreville-interieur-before-after.png', fallback: '/realisations/chomedey-interieur-before-after.svg' },
  { image: '/realisations/sainte-dorothee-interieur-before-after.png', fallback: '/realisations/chomedey-interieur-before-after.svg' },
]

const paintBrands = [
  { name: 'Benjamin Moore', logo: '/logos/benjamin-moore.svg' },
  { name: 'Sherwin-Williams', logo: '/logos/sherwin-williams.svg' },
  { name: 'Betonel', logo: '/logos/betonel.png' },
  { name: 'MFPEINTURE', logo: '/logos/mfpeinture.png' },
]

const LocaleCtx = createContext<Locale>('fr')
const useLocale = () => useContext(LocaleCtx)
const useT = (): Translations => translations[useLocale()]

function App() {
  const pathname = window.location.pathname
  const isDirectFr = DIRECT_FR_PATHS.includes(pathname)
  const locale = isDirectFr ? 'fr' : (detectLocale(pathname) ?? 'fr')
  const localPath = isDirectFr ? pathname : stripLocale(pathname)
  const t = translations[locale]

  const blogPost = blogByPath[localPath]
  const richPage = richPageByPath[localPath]
  const seoPage = !blogPost && !richPage ? t.seoPages.find((p) => p.path === localPath) : undefined

  const metaTitle = blogPost?.title ?? richPage?.title ?? seoPage?.title ?? `${COMPANY_NAME} | ${t.hero.h1}`
  const metaDescription = blogPost?.metaDescription ?? richPage?.metaDescription ?? seoPage?.description ?? t.hero.description
  const keywords = (blogPost?.keywords ?? richPage?.keywords ?? seoPage?.keywords ?? []).join(', ')

  useEffect(() => {
    if (!detectLocale(pathname) && !isDirectFr) {
      window.location.replace('/fr/')
      return
    }
    document.title = metaTitle
    setMeta('description', metaDescription)
    setMeta('keywords', keywords)
  }, [metaTitle, metaDescription, keywords, pathname, isDirectFr])

  if (!detectLocale(pathname) && !isDirectFr) return null

  return (
    <LocaleCtx.Provider value={locale}>
      <main className="min-h-screen bg-[#fffdf8] text-[#1f1b18]">
        <Schema seoPage={seoPage} blogPost={blogPost} />
        <Nav />
        {blogPost ? <BlogPage post={blogPost} locale={locale} /> :
         richPage ? <RichServicePageComponent page={richPage} locale={locale} /> :
         seoPage?.template === 'quote' ? <SoumissionPage page={seoPage} /> :
         seoPage ? <SeoLandingPage page={seoPage} /> :
         <HomePage />}
        <Footer />
        <MobileCallButton />
      </main>
    </LocaleCtx.Provider>
  )
}

function Nav() {
  const t = useT()
  const locale = useLocale()
  const link = (path: string) => withLocale(locale, path)

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#D98723]/10 bg-[#fffdf8]/88 text-[#1f1b18] shadow-sm shadow-black/5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href={link('/')} className="flex items-center gap-3" aria-label={`${COMPANY_NAME} accueil`}>
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl">
            <img src="/logos/logo.png" alt="" className="h-full w-full object-contain" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-black leading-none tracking-tight sm:text-xl">{COMPANY_NAME}</span>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.22em] text-[#D98723] sm:block">{t.nav.subtitle}</span>
          </span>
        </a>
        <div className="hidden items-center gap-6 text-sm font-semibold text-[#1f1b18]/75 lg:flex">
          <a className="transition hover:text-[#D98723]" href={link('/')}>{t.nav.home}</a>
          <a className="transition hover:text-[#D98723]" href={link('/#services')}>{t.nav.services}</a>
          <a className="transition hover:text-[#D98723]" href={link(t.services.cards[0].href)}>{t.nav.interior}</a>
          <a className="transition hover:text-[#D98723]" href={link(t.services.cards[1].href)}>{t.nav.exterior}</a>
          <a className="transition hover:text-[#D98723]" href={link('/#realisations')}>{t.nav.projects}</a>
          <a className="transition hover:text-[#D98723]" href={link('/#avis')}>{t.nav.reviews}</a>
          <a className="transition hover:text-[#D98723]" href={link('/#contact')}>{t.nav.contact}</a>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {LOCALES.map((l) => (
              <a
                key={l}
                href={`/${l}/`}
                className={`rounded-lg px-2 py-1 text-xs font-black uppercase transition ${locale === l ? 'bg-[#D98723] text-white' : 'text-[#1f1b18]/45 hover:text-[#D98723]'}`}
              >
                {LOCALE_LABELS[l]}
              </a>
            ))}
          </div>
          <a href={PHONE_LINK} className="hidden items-center gap-2 rounded-full bg-[#D98723] px-5 py-3 text-sm font-black text-white shadow-xl shadow-[#D98723]/25 transition hover:bg-[#293540] sm:flex">
            <Phone className="h-4 w-4" />
            {t.nav.callNow}
          </a>
        </div>
      </div>
    </nav>
  )
}

function HomePage() {
  const t = useT()

  return (
    <>
      <Hero />
      <section className="border-y border-[#D98723]/20 bg-[#D98723] px-4 py-3 text-center text-sm font-black uppercase tracking-[0.16em] text-white">
        {t.announcement}
      </section>
      <ServicesSection />
      <WhyChooseSection />
      <InteriorSection />
      <ExteriorSection />
      <PricingSection />
      <ProjectsSection />
      <ReviewsSection />
      <FaqSection />
      <ContactSection />
    </>
  )
}

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const t = useT()
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  function updatePos(clientX: number) {
    if (!ref.current) return
    const { left, width } = ref.current.getBoundingClientRect()
    setPos(Math.max(2, Math.min(98, ((clientX - left) / width) * 100)))
  }

  useEffect(() => {
    const onUp = () => { dragging.current = false }
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-full cursor-col-resize select-none overflow-hidden rounded-[2rem] shadow-2xl shadow-black/50"
      style={{ aspectRatio: '1408/768' }}
      onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX) }}
      onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX) }}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
      onTouchStart={(e) => updatePos(e.touches[0].clientX)}
    >
      <img src={after} alt={t.slider.after} draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt={t.slider.before} draggable={false} className="pointer-events-none absolute left-0 top-0 h-full w-auto max-w-none" />
      </div>
      <div
        className="absolute inset-y-0 z-10 -translate-x-1/2"
        style={{ left: `${pos}%` }}
        onMouseDown={(e) => { e.stopPropagation(); dragging.current = true }}
        onTouchStart={(e) => { e.stopPropagation() }}
      >
        <div className="h-full w-px bg-white shadow-[0_0_12px_rgba(0,0,0,0.7)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-2xl shadow-black/50 ring-2 ring-white/30">
          <svg className="h-5 w-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-black uppercase tracking-widest text-white backdrop-blur-sm">{t.slider.before}</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-black uppercase tracking-widest text-white backdrop-blur-sm">{t.slider.after}</span>
    </div>
  )
}

function Hero() {
  const t = useT()
  const locale = useLocale()
  const sp = SERVICE_PATHS[locale]
  const heroLinks = ({
    fr: [
      { href: withLocale(locale, sp.interior), label: 'Peinture intérieure à Laval' },
      { href: withLocale(locale, sp.exterior), label: 'Peinture extérieure à Laval' },
      { href: withLocale(locale, sp.quote), label: 'Obtenir une soumission gratuite' },
    ],
    en: [
      { href: withLocale(locale, sp.interior), label: 'Interior painting in Laval' },
      { href: withLocale(locale, sp.exterior), label: 'Exterior painting in Laval' },
      { href: withLocale(locale, sp.quote), label: 'Get a free estimate' },
    ],
    es: [
      { href: withLocale(locale, sp.interior), label: 'Pintura interior en Laval' },
      { href: withLocale(locale, sp.exterior), label: 'Pintura exterior en Laval' },
      { href: withLocale(locale, sp.quote), label: 'Obtener presupuesto gratuito' },
    ],
  } as const)[locale]

  return (
    <section id="accueil" className="relative isolate overflow-hidden bg-[#f7f1e8] pb-16 text-[#1f1b18] lg:pb-20">
      <img src={HERO_IMAGE} alt="Peintre résidentiel travaillant dans une maison à Laval" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-[#fffdf8]/82" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_25%,rgba(90,98,115,0.20),transparent_40%),linear-gradient(180deg,rgba(255,253,248,0.72),rgba(247,241,232,0.96))]" />

      <div className="mx-auto max-w-4xl px-4 pt-32 text-center sm:px-6 lg:px-8 lg:pt-36">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D98723]/20 bg-white/80 px-4 py-2 text-sm font-bold text-[#293540] shadow-2xl shadow-black/10 backdrop-blur">
          <span aria-hidden="true">⭐⭐⭐⭐⭐</span>
          {t.hero.badge}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }} className="text-5xl font-black leading-[0.9] tracking-[-0.06em] text-[#1f1b18] sm:text-6xl lg:text-7xl">
          {t.hero.h1}
          <span className="mt-4 block text-3xl leading-none tracking-[-0.04em] text-[#D98723] sm:text-4xl lg:text-5xl">
            <motion.span className="inline-block rounded-3xl bg-[#D98723]/10 px-2 py-1 ring-1 ring-[#D98723]/25" animate={{ backgroundColor: ['rgba(217,135,35,0.08)', 'rgba(217,135,35,0.16)', 'rgba(217,135,35,0.08)'] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
              {t.hero.subheading}
            </motion.span>
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }} className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 text-[#3a332e] sm:text-xl">
          {t.hero.description}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }} className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {heroLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold text-[#D98723] underline underline-offset-2 transition hover:text-[#293540]">
              {l.label}
            </a>
          ))}
        </motion.div>
        <HeroButtons />
        <PhoneBar />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.5 }}
        className="mx-auto mt-14 flex max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D98723]/35 to-transparent" />
        <p className="text-2xl font-black uppercase tracking-[0.18em] text-[#D98723] sm:text-3xl">{t.hero.sliderLabel}</p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D98723]/35 to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="mt-4 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <div className="h-5 w-px bg-[#D98723]/60" />
          <svg className="h-5 w-5 text-[#D98723]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <BeforeAfterSlider before="/realisations/hero-avant.png" after="/realisations/hero-apres.png" />
      </motion.div>
    </section>
  )
}

function HeroButtons() {
  const t = useT()
  const locale = useLocale()

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }} className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <a href={PHONE_LINK} className="inline-flex items-center justify-center gap-3 rounded-full bg-[#D98723] px-8 py-5 text-lg font-black text-white shadow-2xl shadow-[#D98723]/30 transition hover:-translate-y-0.5 hover:bg-[#293540]">
        <Phone className="h-6 w-6" />
        {t.hero.callButton}
      </a>
      <a href={withLocale(locale, '/#contact')} className="inline-flex items-center justify-center rounded-full border-2 border-[#D98723]/70 bg-white/70 px-8 py-5 text-lg font-black text-[#293540] backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#D98723] hover:text-white">
        {t.hero.quoteButton}
      </a>
    </motion.div>
  )
}

function PhoneBar() {
  return (
    <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.36 }} className="mx-auto mt-8 max-w-2xl rounded-[2rem] border border-[#D98723]/20 bg-white/86 p-5 shadow-2xl shadow-black/15 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#D98723]">Call us now:</p>
          <div className="mt-1 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, -18, 18, -14, 14, -8, 8, 0] }}
              transition={{ duration: 0.65, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
              className="shrink-0"
            >
              <Phone className="h-8 w-8 text-[#D98723] sm:h-10 sm:w-10 lg:h-11 lg:w-11" />
            </motion.div>
            <motion.a
              href={PHONE_LINK}
              className="block whitespace-nowrap text-4xl font-black tracking-tight text-[#1f1b18] sm:text-5xl lg:text-6xl"
              animate={{
                filter: [
                  'drop-shadow(0 0 0px rgba(217,135,35,0))',
                  'drop-shadow(0 0 14px rgba(217,135,35,0.75))',
                  'drop-shadow(0 0 0px rgba(217,135,35,0))',
                ],
              }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
            >
              {PHONE_NUMBER}
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ServicesSection() {
  const t = useT()
  const locale = useLocale()

  return (
    <section id="services" className="bg-stone-100 px-4 py-12 text-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 md:grid-cols-4">
          {t.services.stats.map((stat) => (
            <div key={stat} className="rounded-3xl border border-stone-200 bg-white p-5 text-center shadow-xl shadow-stone-900/5">
              <p className="text-lg font-black tracking-tight">{stat}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#D98723]">{t.services.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{t.services.h2}</h2>
          <p className="mt-4 text-lg leading-8 text-neutral-700">{t.services.description}</p>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {t.services.cards.map((service, i) => {
            const Icon = [Brush, Home, ShieldCheck][i]
            return (
              <a key={service.title} href={withLocale(locale, service.href)} className="group rounded-[2rem] border border-stone-200 bg-white p-6 shadow-2xl shadow-stone-900/8 transition hover:-translate-y-1 hover:shadow-stone-900/15">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1f1b18] text-[#f7f1e8] transition group-hover:bg-[#D98723] group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <h2 className="mt-5 text-2xl font-black tracking-tight">{service.title}</h2>
                <p className="mt-3 text-base leading-7 text-neutral-600">{service.description}</p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function WhyChooseSection() {
  const t = useT()

  return (
    <section className="bg-[#293540] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#BF7839]">{t.whyChoose.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{t.whyChoose.h2}</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-200">{t.whyChoose.description}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.whyChoose.items.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/10 p-4 font-black backdrop-blur">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-[#BF7839]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/15 bg-white/8 p-6 shadow-2xl shadow-black/30">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#BF7839]">{t.whyChoose.brands.eyebrow}</p>
          <h3 className="mt-3 text-3xl font-black tracking-tight">{t.whyChoose.brands.h3}</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {paintBrands.map((brand) => (
              <div key={brand.name} className="flex min-h-24 items-center justify-center rounded-3xl border border-white/10 bg-white px-5 shadow-xl shadow-black/20">
                <img src={brand.logo} alt={brand.name} className="max-h-12 max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function InteriorSection() {
  const t = useT()
  const locale = useLocale()

  return (
    <section id="interieur" className="bg-white px-4 py-16 text-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[2rem] bg-neutral-950 p-6 text-white shadow-2xl shadow-neutral-950/20 lg:p-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#D98723] text-white">
            <Brush className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-4xl font-black tracking-tight">{t.interior.h2}</h2>
          <p className="mt-4 text-lg leading-8 text-neutral-200">{t.interior.description}</p>
          <a href={withLocale(locale, t.interior.href)} className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#D98723] px-7 py-4 font-black text-white">
            {t.interior.cta}
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.interior.processPoints.map((point) => (
            <div key={point} className="rounded-3xl border border-stone-200 bg-stone-50 p-5">
              <CheckCircle2 className="h-6 w-6 text-[#D98723]" />
              <p className="mt-4 font-bold leading-7 text-neutral-800">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExteriorSection() {
  const t = useT()
  const locale = useLocale()
  const extCta = locale === 'fr' ? 'En savoir plus sur la peinture extérieure →' : locale === 'en' ? 'Learn more about exterior painting →' : 'Saber más sobre pintura exterior →'

  return (
    <section id="exterieur" className="bg-[#1f1b18] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#BF7839]">{t.exterior.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{t.exterior.h2}</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-200">{t.exterior.description}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {t.exterior.items.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/10 p-5 font-black backdrop-blur">{item}</div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-[#BF7839]/30 bg-[#D98723] p-7 text-white shadow-2xl shadow-black/30">
          <ShieldCheck className="h-12 w-12" />
          <h3 className="mt-5 text-3xl font-black tracking-tight">{t.exterior.card.h3}</h3>
          <p className="mt-3 text-lg font-semibold leading-8">{t.exterior.card.description}</p>
          <a href={withLocale(locale, SERVICE_PATHS[locale].exterior)} className="mt-5 inline-flex items-center font-black text-white underline underline-offset-2 transition hover:text-blue-200">
            {extCta}
          </a>
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const t = useT()
  const [filter, setFilter] = useState<'all' | 'interior' | 'exterior'>('all')

  const projects = t.projects.items.map((item, i) => ({ ...item, ...projectImages[i] }))
  const filtered = filter === 'all' ? projects : projects.filter((p) => p.typeKey === filter)
  const typeLabel = (key: 'interior' | 'exterior') => key === 'interior' ? t.projects.typeInterior : t.projects.typeExterior

  return (
    <section id="realisations" className="bg-[#fffdf8] px-4 py-20 text-[#1f1b18] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#D98723]">{t.projects.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{t.projects.h2}</h2>
            <p className="mt-3 max-w-2xl text-lg text-neutral-300">{t.projects.description}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            {([['all', t.projects.filterAll], ['interior', t.projects.filterInterior], ['exterior', t.projects.filterExterior]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full px-5 py-2 text-sm font-black transition ${filter === key ? 'bg-blue-700 text-white' : 'border border-white/20 bg-white/5 text-white/70 hover:bg-white/10'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="group rounded-[2rem] bg-neutral-900 shadow-2xl shadow-black/40 [transform:translateZ(0)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-[2rem] bg-gradient-to-br from-neutral-950 via-blue-950 to-blue-800">
                <img
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = project.fallback }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 flex gap-2">
                  <span className="rounded-full bg-blue-700/90 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white backdrop-blur">
                    {t.projects.badge}
                  </span>
                  <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white/80 backdrop-blur">
                    {typeLabel(project.typeKey)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black tracking-tight">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href={PHONE_LINK} className="inline-flex items-center gap-3 rounded-full bg-blue-800 px-8 py-4 font-black text-white shadow-xl shadow-blue-900/30 transition hover:bg-blue-700">
            <Phone className="h-5 w-5" />
            {t.projects.cta}
          </a>
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const t = useT()
  const locale = useLocale()
  const blogLabel = locale === 'fr' ? 'Guide complet : coût pour repeindre une maison à Laval →' : locale === 'en' ? 'Full guide: house painting cost in Laval →' : 'Guía completa: costo de pintar una casa en Laval →'

  return (
    <section className="bg-[#293540] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#BF7839]">{t.pricing.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{t.pricing.h2}</h2>
          {t.pricing.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-lg leading-8 text-neutral-200">{p}</p>
          ))}
          <a href={withLocale(locale, SERVICE_PATHS[locale].blog)} className="mt-5 inline-flex items-center text-sm font-bold text-[#BF7839] underline underline-offset-2 transition hover:text-white">
            {blogLabel}
          </a>
        </div>
        <div className="rounded-[2rem] border border-[#BF7839]/30 bg-[#f7f1e8] p-7 text-[#1f1b18] shadow-2xl shadow-black/30">
          <h3 className="text-3xl font-black tracking-tight">{t.pricing.card.h3}</h3>
          <p className="mt-4 text-lg font-semibold leading-8">{t.pricing.card.description}</p>
          <a href={PHONE_LINK} className="mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-neutral-950 px-7 py-4 font-black text-white">
            <Phone className="h-5 w-5" />
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </section>
  )
}

function ReviewsSection() {
  const t = useT()

  return (
    <section id="avis" className="bg-white px-4 py-16 text-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={t.reviews.eyebrow} title={t.reviews.h2} />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {t.reviews.items.map((review) => (
            <article key={review.name} className="rounded-[2rem] border border-stone-200 bg-stone-50 p-6 shadow-xl shadow-stone-900/5">
              <Quote className="h-8 w-8 text-blue-500" />
              <div className="mt-4 flex text-blue-500" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <p className="mt-4 text-lg font-semibold leading-8">"{review.text}"</p>
              <p className="mt-5 font-black">{review.name}</p>
              <p className="text-sm font-bold text-neutral-500">{review.area}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection() {
  const t = useT()
  const locale = useLocale()
  const sp = SERVICE_PATHS[locale]
  const seeAlsoLabel = locale === 'fr' ? 'Voir aussi :' : locale === 'en' ? 'See also:' : 'Ver también:'
  const faqLinks = ({
    fr: [
      { href: withLocale(locale, sp.interior), label: 'Peinture intérieure à Laval' },
      { href: withLocale(locale, sp.exterior), label: 'Peinture extérieure à Laval' },
      { href: withLocale(locale, sp.quote), label: 'Soumission gratuite en 24h' },
    ],
    en: [
      { href: withLocale(locale, sp.interior), label: 'Interior painting in Laval' },
      { href: withLocale(locale, sp.exterior), label: 'Exterior painting in Laval' },
      { href: withLocale(locale, sp.quote), label: 'Free estimate in 24h' },
    ],
    es: [
      { href: withLocale(locale, sp.interior), label: 'Pintura interior en Laval' },
      { href: withLocale(locale, sp.exterior), label: 'Pintura exterior en Laval' },
      { href: withLocale(locale, sp.quote), label: 'Presupuesto gratuito en 24h' },
    ],
  } as const)[locale]

  return (
    <section className="bg-stone-100 px-4 py-16 text-neutral-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow={t.faq.eyebrow} title={t.faq.h2} />
        <div className="mt-8 grid gap-4">
          {t.faq.items.map((faq) => (
            <details key={faq.question} className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-900/5">
              <summary className="cursor-pointer text-xl font-black">{faq.question}</summary>
              <p className="mt-4 text-lg leading-8 text-neutral-700">{faq.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-sm font-black text-neutral-500">{seeAlsoLabel}</span>
          {faqLinks.map((link) => (
            <a key={link.href} href={link.href} className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const t = useT()
  const locale = useLocale()

  return (
    <section id="contact" className="bg-neutral-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">

          {/* Info */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-blue-300">
              <MapPin className="h-4 w-4" />
              {t.contact.badge}
            </div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{t.contact.h2}</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-200">{t.contact.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {t.contact.areas.map((area) => (
                <a key={area.label} href={withLocale(locale, area.path)} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black transition hover:bg-white/20">
                  {area.label}
                </a>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white/10 p-4">
                <Clock className="h-6 w-6 text-blue-400" />
                <p className="mt-3 font-black">{t.contact.response}</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4">
                <CalendarCheck className="h-6 w-6 text-blue-400" />
                <p className="mt-3 font-black">{t.contact.quote}</p>
              </div>
            </div>
            <a href={PHONE_LINK} className="mt-8 inline-flex items-center gap-3 rounded-full bg-blue-800 px-8 py-5 text-lg font-black text-white shadow-2xl shadow-blue-900/25 transition hover:bg-blue-700">
              <Phone className="h-6 w-6" />
              {PHONE_NUMBER}
            </a>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const t = useT()
  const f = t.form
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', projectType: '', message: '' })

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '900ee076-e36c-4e43-aa30-95e1419f0141',
          subject: `Nouvelle soumission — ${form.name}`,
          from_name: form.name,
          ...form,
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputCls = 'w-full rounded-2xl border border-white/15 bg-white/8 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30'
  const labelCls = 'mb-1.5 block text-sm font-bold text-blue-200'

  if (status === 'success') {
    return (
      <div className="flex h-full items-center justify-center rounded-[2rem] border border-green-500/30 bg-green-500/10 p-10 text-center">
        <div>
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-400" />
          <p className="mt-5 text-xl font-black text-white">{f.success}</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 lg:p-8">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-400">{f.eyebrow}</p>
      <h3 className="mt-2 text-2xl font-black tracking-tight">{f.h2}</h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>{f.name.label} *</label>
          <input required className={inputCls} placeholder={f.name.placeholder} value={form.name} onChange={set('name')} />
        </div>
        <div>
          <label className={labelCls}>{f.email.label} *</label>
          <input required type="email" className={inputCls} placeholder={f.email.placeholder} value={form.email} onChange={set('email')} />
        </div>
        <div>
          <label className={labelCls}>{f.phone.label}</label>
          <input type="tel" className={inputCls} placeholder={f.phone.placeholder} value={form.phone} onChange={set('phone')} />
        </div>
        <div>
          <label className={labelCls}>{f.projectType.label}</label>
          <select className={inputCls + ' bg-neutral-900'} value={form.projectType} onChange={set('projectType')}>
            <option value="">{f.projectType.placeholder}</option>
            {f.projectType.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className={labelCls}>{f.message.label}</label>
        <textarea rows={4} className={inputCls + ' resize-none'} placeholder={f.message.placeholder} value={form.message} onChange={set('message')} />
      </div>

      {status === 'error' && (
        <p className="mt-4 rounded-2xl bg-red-500/15 px-4 py-3 text-sm font-bold text-red-300">{f.error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-5 w-full rounded-full bg-blue-800 py-4 text-base font-black text-white shadow-xl transition hover:bg-blue-700 disabled:opacity-60"
      >
        {status === 'sending' ? f.submitting : f.submit}
      </button>
    </form>
  )
}

function SeoLandingPage({ page }: { page: SeoPageDef }) {
  const t = useT()

  return (
    <>
      <section className="bg-neutral-950 px-4 pb-14 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-400">{page.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">{page.h1}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-neutral-200">{page.intro}</p>
            <HeroButtons />
            <PhoneBar />
          </div>
          <div className="rounded-[2rem] border border-blue-500/30 bg-white/10 p-6 shadow-2xl shadow-black/40">
            <ShieldCheck className="h-12 w-12 text-blue-400" />
            <h2 className="mt-5 text-3xl font-black">{t.seoLanding.trustCard.h2}</h2>
            <p className="mt-3 leading-8 text-neutral-200">{t.seoLanding.trustCard.description}</p>
          </div>
        </div>
      </section>
      <section className="bg-white px-4 py-16 text-neutral-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {page.sections.map((section) => (
            <article key={section.heading} className="rounded-[2rem] border border-stone-200 bg-stone-50 p-7">
              <h2 className="text-3xl font-black tracking-tight">{section.heading}</h2>
              <p className="mt-4 text-lg leading-9 text-neutral-700">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
      <ServicesSection />
      <WhyChooseSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
    </>
  )
}

function SoumissionPage({ page }: { page: SeoPageDef }) {
  const t = useT()
  return (
    <>
      <section className="bg-neutral-950 px-4 pb-14 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb crumbs={[{ label: page.eyebrow }]} />
          <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-400">{page.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">{page.h1}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-neutral-200">{page.intro}</p>
        </div>
      </section>
      <section className="bg-neutral-950 px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-6">
            {page.sections.map((section) => (
              <article key={section.heading} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
                <h2 className="text-2xl font-black tracking-tight text-white">{section.heading}</h2>
                <p className="mt-3 leading-8 text-neutral-300">{section.body}</p>
              </article>
            ))}
            <div className="rounded-[2rem] border border-blue-500/30 bg-blue-900/30 p-7">
              <ShieldCheck className="h-10 w-10 text-blue-400" />
              <h2 className="mt-4 text-2xl font-black">{t.seoLanding.trustCard.h2}</h2>
              <p className="mt-3 leading-8 text-neutral-200">{t.seoLanding.trustCard.description}</p>
              <PhoneBar />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <WhyChooseSection />
      <FaqSection />
    </>
  )
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-700">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{title}</h2>
    </div>
  )
}

function MobileCallButton() {
  return (
    <a href={PHONE_LINK} className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-center gap-3 rounded-full bg-[#D98723] px-6 py-4 text-base font-black text-white shadow-2xl shadow-black/40 sm:hidden">
      <Phone className="h-5 w-5" />
      {PHONE_NUMBER}
    </a>
  )
}

function Schema({ seoPage, blogPost }: { seoPage?: SeoPageDef; blogPost?: BlogPost }) {
  const locale = useLocale()
  const t = useT()
  const basePath = seoPage?.path ?? blogPost?.path ?? '/'
  const url = `https://peinturelaval.ca${withLocale(locale, basePath)}`
  const schema: object[] = [
    { '@context': 'https://schema.org', '@type': ['LocalBusiness', 'HousePainter'], name: COMPANY_NAME, telephone: '+14503675637', areaServed: ['Laval', 'Chomedey', 'Sainte-Dorothée', 'Vimont'], url: 'https://peinturelaval.ca', address: { '@type': 'PostalAddress', addressLocality: 'Laval', addressRegion: 'QC', addressCountry: 'CA' }, priceRange: '$$' },
  ]
  if (blogPost) {
    schema.push({ '@context': 'https://schema.org', '@type': 'Article', headline: blogPost.h1, description: blogPost.metaDescription, url, author: { '@type': 'Organization', name: COMPANY_NAME }, publisher: { '@type': 'Organization', name: COMPANY_NAME } })
    schema.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: blogPost.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })
  } else {
    schema.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faq.items.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) })
    if (seoPage) schema.push({ '@context': 'https://schema.org', '@type': 'Service', name: seoPage.h1, description: seoPage.description, provider: { '@type': 'HousePainter', name: COMPANY_NAME }, areaServed: seoPage.area ?? 'Laval' })
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

function BlogPage({ post, locale }: { post: BlogPost; locale: string }) {
  const localeHref = (path: string) => `/${locale}${path}`
  const serviceLinks: Record<string, { fr: string; en: string; es: string }> = {
    interior: { fr: '/peinture-interieure-laval', en: '/interior-painting-laval', es: '/pintura-interior-laval' },
    exterior: { fr: '/peinture-exterieure-laval', en: '/exterior-painting-laval', es: '/pintura-exterior-laval' },
    quote: { fr: '/soumission-peinture-laval', en: '/quote-painting-laval', es: '/cotizacion-pintura-laval' },
  }
  const links = {
    interior: localeHref(serviceLinks.interior[locale as 'fr' | 'en' | 'es'] ?? serviceLinks.interior.fr),
    exterior: localeHref(serviceLinks.exterior[locale as 'fr' | 'en' | 'es'] ?? serviceLinks.exterior.fr),
    quote: localeHref(serviceLinks.quote[locale as 'fr' | 'en' | 'es'] ?? serviceLinks.quote.fr),
  }
  const internalLinkLabels: Record<string, { interior: string; exterior: string; quote: string }> = {
    fr: { interior: 'Peinture intérieure à Laval →', exterior: 'Peinture extérieure à Laval →', quote: 'Obtenez une soumission gratuite →' },
    en: { interior: 'Interior painting in Laval →', exterior: 'Exterior painting in Laval →', quote: 'Get a free estimate →' },
    es: { interior: 'Pintura interior en Laval →', exterior: 'Pintura exterior en Laval →', quote: 'Obtener presupuesto gratuito →' },
  }
  const ll = internalLinkLabels[locale] ?? internalLinkLabels.fr

  return (
    <>
      <section className="bg-neutral-950 px-4 pb-10 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb crumbs={[{ label: locale === 'fr' ? 'Guide de prix' : locale === 'en' ? 'Pricing guide' : 'Guía de precios' }]} />
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-400">Peinture Laval</p>
          <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">{post.h1}</h1>
          <p className="mt-6 text-xl leading-9 text-neutral-300">{post.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={links.interior} className="rounded-full border border-blue-500/40 px-4 py-2 text-sm font-bold text-blue-300 transition hover:bg-blue-900/40">{ll.interior}</a>
            <a href={links.exterior} className="rounded-full border border-blue-500/40 px-4 py-2 text-sm font-bold text-blue-300 transition hover:bg-blue-900/40">{ll.exterior}</a>
            <a href={links.quote} className="rounded-full border border-blue-500/40 px-4 py-2 text-sm font-bold text-blue-300 transition hover:bg-blue-900/40">{ll.quote}</a>
          </div>
        </div>
      </section>

      <article className="bg-neutral-950 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          {post.sections.map((section) => (
            <section key={section.h2}>
              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{section.h2}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="leading-8 text-neutral-300">{p}</p>
                ))}
              </div>
              {section.list && (
                <ul className="mt-5 space-y-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-neutral-200">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>

      <section className="bg-neutral-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-black tracking-tight">FAQ</h2>
          <div className="mt-8 space-y-6">
            {post.faq.map((item) => (
              <div key={item.q} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-black text-white">{item.q}</h3>
                <p className="mt-3 leading-7 text-neutral-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices excludePath={post.path} />
      <section className="bg-blue-950 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{post.ctaHeading}</h2>
            <p className="mt-4 text-lg leading-8 text-blue-100">{post.ctaBody}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={links.interior} className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10">{ll.interior}</a>
              <a href={links.exterior} className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10">{ll.exterior}</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}

function RichServicePageComponent({ page, locale }: { page: RichServicePageData; locale: string }) {
  const serviceLinks: Record<string, { fr: string; en: string; es: string }> = {
    interior: { fr: '/fr/peinture-interieure-laval', en: '/en/interior-painting-laval', es: '/es/pintura-interior-laval' },
    exterior: { fr: '/fr/peinture-exterieure-laval', en: '/en/exterior-painting-laval', es: '/es/pintura-exterior-laval' },
    quote: { fr: '/fr/soumission-peinture-laval', en: '/en/quote-painting-laval', es: '/es/cotizacion-pintura-laval' },
    blog: { fr: '/fr/combien-coute-repeindre-maison-laval', en: '/en/house-painting-cost-laval', es: '/es/cuanto-cuesta-pintar-casa-laval' },
  }
  const loc = locale as 'fr' | 'en' | 'es'
  const crossLinks = [
    { href: serviceLinks.interior[loc], label: locale === 'fr' ? 'Peinture intérieure' : locale === 'en' ? 'Interior painting' : 'Pintura interior' },
    { href: serviceLinks.exterior[loc], label: locale === 'fr' ? 'Peinture extérieure' : locale === 'en' ? 'Exterior painting' : 'Pintura exterior' },
    { href: serviceLinks.blog[loc], label: locale === 'fr' ? 'Prix et estimations' : locale === 'en' ? 'Costs & estimates' : 'Precios y presupuestos' },
  ].filter((l) => !l.href.includes(page.path))

  return (
    <>
      <section className="bg-neutral-950 px-4 pb-14 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-center">
          <div>
            <Breadcrumb crumbs={[{ label: page.eyebrow }]} />
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-400">{page.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">{page.h1}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-neutral-200">{page.lead}</p>
            <HeroButtons />
            <PhoneBar />
          </div>
          <div className="space-y-3">
            {crossLinks.map((l) => (
              <a key={l.href} href={l.href} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-bold text-blue-300 transition hover:bg-white/10">
                <Brush className="h-4 w-4 shrink-0" />{l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{page.processHeading}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.steps.map((step) => (
              <div key={step.num} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <span className="text-4xl font-black text-blue-700">{step.num}</span>
                <h3 className="mt-3 text-lg font-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-neutral-400">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{page.benefitsHeading}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {page.benefits.map((b) => (
              <div key={b.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
                <h3 className="text-xl font-black text-white">{b.title}</h3>
                <p className="mt-3 leading-7 text-neutral-300">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-neutral-950 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {page.sections.map((s) => (
            <article key={s.h2} className="rounded-[2rem] border border-stone-200 bg-stone-50 p-7">
              <h2 className="text-2xl font-black tracking-tight">{s.h2}</h2>
              <p className="mt-4 leading-8 text-neutral-700">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-neutral-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">FAQ</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {page.faq.map((item) => (
              <div key={item.q} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-black text-white">{item.q}</h3>
                <p className="mt-2 text-sm leading-7 text-neutral-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices excludePath={page.path} />
      <section className="bg-blue-950 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{page.ctaHeading}</h2>
            <p className="mt-4 text-lg leading-8 text-blue-100">{page.ctaBody}</p>
            <PhoneBar />
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}

function Breadcrumb({ crumbs }: { crumbs: { label: string; href?: string }[] }) {
  const locale = useLocale()
  const homeLabel = locale === 'fr' ? 'Accueil' : locale === 'en' ? 'Home' : 'Inicio'
  const allCrumbs = [{ label: homeLabel, href: withLocale(locale, '/') }, ...crumbs]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allCrumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `https://peinturelaval.ca${crumb.href}` } : {}),
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav aria-label={locale === 'fr' ? "Fil d'Ariane" : locale === 'en' ? 'Breadcrumb' : 'Ruta de navegación'} className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-neutral-500">
          {allCrumbs.map((crumb, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true" className="text-neutral-700">›</span>}
              {crumb.href ? (
                <a href={crumb.href} className="transition hover:text-blue-400">{crumb.label}</a>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

function RelatedServices({ excludePath }: { excludePath: string }) {
  const locale = useLocale()
  const sp = SERVICE_PATHS[locale]

  const allLinks = ({
    fr: [
      { href: withLocale(locale, sp.interior), label: 'Peinture intérieure à Laval', desc: 'Murs, plafonds, moulures et finition premium' },
      { href: withLocale(locale, sp.exterior), label: 'Peinture extérieure à Laval', desc: 'Façades, boiseries, portes et revêtements' },
      { href: withLocale(locale, sp.quote), label: 'Obtenir une soumission gratuite', desc: 'Réponse garantie en 24h, sans frais' },
      { href: withLocale(locale, sp.blog), label: 'Coût pour repeindre une maison à Laval', desc: 'Guide de prix et estimations détaillées' },
    ],
    en: [
      { href: withLocale(locale, sp.interior), label: 'Interior painting in Laval', desc: 'Walls, ceilings, moldings and premium finishing' },
      { href: withLocale(locale, sp.exterior), label: 'Exterior painting in Laval', desc: 'Facades, woodwork, doors and siding' },
      { href: withLocale(locale, sp.quote), label: 'Get a free estimate', desc: 'Response guaranteed within 24h, no fee' },
      { href: withLocale(locale, sp.blog), label: 'House painting cost in Laval', desc: 'Pricing guide and detailed estimates' },
    ],
    es: [
      { href: withLocale(locale, sp.interior), label: 'Pintura interior en Laval', desc: 'Paredes, techos, molduras y acabados premium' },
      { href: withLocale(locale, sp.exterior), label: 'Pintura exterior en Laval', desc: 'Fachadas, carpintería, puertas y revestimientos' },
      { href: withLocale(locale, sp.quote), label: 'Obtener presupuesto gratuito', desc: 'Respuesta garantizada en 24h, sin coste' },
      { href: withLocale(locale, sp.blog), label: 'Costo de pintar una casa en Laval', desc: 'Guía de precios y estimaciones detalladas' },
    ],
  } as const)[locale]

  const heading = locale === 'fr' ? 'Services connexes' : locale === 'en' ? 'Related services' : 'Servicios relacionados'
  const links = allLinks.filter((l) => !l.href.includes(excludePath))

  return (
    <section className="border-t border-white/10 bg-neutral-950 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{heading}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-blue-500/40 hover:bg-white/10">
              <p className="font-black text-white transition group-hover:text-blue-300">{link.label}</p>
              <p className="mt-1 text-sm text-neutral-400">{link.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const locale = useLocale()
  const sp = SERVICE_PATHS[locale]

  const content = ({
    fr: {
      servicesLabel: 'Services',
      areasLabel: 'Secteurs desservis',
      services: [
        { href: withLocale(locale, '/'), label: 'Peintre Laval' },
        { href: withLocale(locale, sp.interior), label: 'Peinture intérieure Laval' },
        { href: withLocale(locale, sp.exterior), label: 'Peinture extérieure Laval' },
        { href: withLocale(locale, sp.quote), label: 'Soumission peinture Laval' },
        { href: withLocale(locale, sp.blog), label: 'Prix peinture Laval' },
        { href: withLocale(locale, '/peinture-residentielle-laval'), label: 'Peinture résidentielle Laval' },
      ],
      areas: [
        { href: withLocale(locale, '/peintre-chomedey'), label: 'Peintre Chomedey' },
        { href: withLocale(locale, '/peintre-vimont'), label: 'Peintre Vimont' },
        { href: withLocale(locale, '/peinture-sainte-dorothee'), label: 'Peintre Sainte-Dorothée' },
        { href: withLocale(locale, '/peintre-laval'), label: 'Peintre à Laval' },
      ],
      tagline: 'Service de peinture résidentielle à Laval, Chomedey, Vimont et Sainte-Dorothée.',
      copyright: `© ${new Date().getFullYear()} Peinture Laval. Tous droits réservés.`,
    },
    en: {
      servicesLabel: 'Services',
      areasLabel: 'Areas served',
      services: [
        { href: withLocale(locale, '/'), label: 'Painter Laval' },
        { href: withLocale(locale, sp.interior), label: 'Interior Painting Laval' },
        { href: withLocale(locale, sp.exterior), label: 'Exterior Painting Laval' },
        { href: withLocale(locale, sp.quote), label: 'Painting Quote Laval' },
        { href: withLocale(locale, sp.blog), label: 'Painting Cost Laval' },
        { href: withLocale(locale, '/residential-painting-laval'), label: 'Residential Painting Laval' },
      ],
      areas: [
        { href: withLocale(locale, '/painter-chomedey'), label: 'Painter Chomedey' },
        { href: withLocale(locale, '/painter-vimont'), label: 'Painter Vimont' },
        { href: withLocale(locale, '/painting-sainte-dorothee'), label: 'Painter Sainte-Dorothée' },
        { href: withLocale(locale, '/painter-laval'), label: 'Painter in Laval' },
      ],
      tagline: 'Residential painting service in Laval, Chomedey, Vimont and Sainte-Dorothée.',
      copyright: `© ${new Date().getFullYear()} Peinture Laval. All rights reserved.`,
    },
    es: {
      servicesLabel: 'Servicios',
      areasLabel: 'Sectores atendidos',
      services: [
        { href: withLocale(locale, '/'), label: 'Pintor Laval' },
        { href: withLocale(locale, sp.interior), label: 'Pintura Interior Laval' },
        { href: withLocale(locale, sp.exterior), label: 'Pintura Exterior Laval' },
        { href: withLocale(locale, sp.quote), label: 'Cotización Pintura Laval' },
        { href: withLocale(locale, sp.blog), label: 'Precio Pintura Laval' },
        { href: withLocale(locale, '/pintura-residencial-laval'), label: 'Pintura Residencial Laval' },
      ],
      areas: [
        { href: withLocale(locale, '/pintor-chomedey'), label: 'Pintor Chomedey' },
        { href: withLocale(locale, '/pintor-vimont'), label: 'Pintor Vimont' },
        { href: withLocale(locale, '/pintura-sainte-dorothee'), label: 'Pintor Sainte-Dorothée' },
        { href: withLocale(locale, '/pintor-laval'), label: 'Pintor en Laval' },
      ],
      tagline: 'Servicio de pintura residencial en Laval, Chomedey, Vimont y Sainte-Dorothée.',
      copyright: `© ${new Date().getFullYear()} Peinture Laval. Todos los derechos reservados.`,
    },
  } as const)[locale]

  return (
    <footer className="border-t border-white/10 bg-neutral-950 px-4 pb-8 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <a href={withLocale(locale, '/')} className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl">
                <img src="/logos/logo.png" alt="" className="h-full w-full object-contain" aria-hidden="true" />
              </span>
              <span className="text-lg font-black text-white">{COMPANY_NAME}</span>
            </a>
            <p className="text-sm leading-6 text-neutral-400">{content.tagline}</p>
            <a href={PHONE_LINK} className="mt-4 inline-flex items-center gap-2 font-black text-blue-400 transition hover:text-blue-300">
              <Phone className="h-4 w-4" />
              {PHONE_NUMBER}
            </a>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-blue-400">{content.servicesLabel}</h3>
            <ul className="space-y-2">
              {content.services.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm font-semibold text-neutral-300 transition hover:text-white">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-blue-400">{content.areasLabel}</h3>
            <ul className="space-y-2">
              {content.areas.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm font-semibold text-neutral-300 transition hover:text-white">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-neutral-500">
          {content.copyright}
        </div>
      </div>
    </footer>
  )
}

function setMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

export default App
