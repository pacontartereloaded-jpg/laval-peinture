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

const COMPANY_NAME = 'Peinture Laval'
const PHONE_NUMBER = '(450) 367-5637'
const PHONE_LINK = 'tel:+14503675637'

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
  const locale = detectLocale(pathname) ?? 'fr'
  const localPath = stripLocale(pathname)
  const t = translations[locale]
  const page = t.seoPages.find((p) => p.path === localPath)
  const metaTitle = page?.title ?? `${COMPANY_NAME} | ${t.hero.h1}`
  const metaDescription = page?.description ?? t.hero.description

  useEffect(() => {
    if (!detectLocale(pathname)) {
      window.location.replace('/fr/')
      return
    }
    document.title = metaTitle
    setMeta('description', metaDescription)
    setMeta('keywords', page?.keywords.join(', ') ?? '')
  }, [metaTitle, metaDescription, page, pathname])

  if (!detectLocale(pathname)) return null

  return (
    <LocaleCtx.Provider value={locale}>
      <main className="min-h-screen bg-neutral-950 text-white">
        <Schema page={page} />
        <Nav />
        {page ? <SeoLandingPage page={page} /> : <HomePage />}
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
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href={link('/')} className="flex items-center gap-3" aria-label={`${COMPANY_NAME} accueil`}>
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl">
            <img src="/logos/logo.png" alt="" className="h-full w-full object-contain" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-black leading-none tracking-tight sm:text-xl">{COMPANY_NAME}</span>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300 sm:block">{t.nav.subtitle}</span>
          </span>
        </a>
        <div className="hidden items-center gap-6 text-sm font-semibold text-white/80 lg:flex">
          <a className="transition hover:text-white" href={link('/')}>{t.nav.home}</a>
          <a className="transition hover:text-white" href={link('/#services')}>{t.nav.services}</a>
          <a className="transition hover:text-white" href={link(t.services.cards[0].href)}>{t.nav.interior}</a>
          <a className="transition hover:text-white" href={link(t.services.cards[1].href)}>{t.nav.exterior}</a>
          <a className="transition hover:text-white" href={link('/#realisations')}>{t.nav.projects}</a>
          <a className="transition hover:text-white" href={link('/#avis')}>{t.nav.reviews}</a>
          <a className="transition hover:text-white" href={link('/#contact')}>{t.nav.contact}</a>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {LOCALES.map((l) => (
              <a
                key={l}
                href={`/${l}/`}
                className={`rounded-lg px-2 py-1 text-xs font-black uppercase transition ${locale === l ? 'bg-blue-700 text-white' : 'text-white/50 hover:text-white'}`}
              >
                {LOCALE_LABELS[l]}
              </a>
            ))}
          </div>
          <a href={PHONE_LINK} className="hidden items-center gap-2 rounded-full bg-blue-800 px-5 py-3 text-sm font-black text-white shadow-xl shadow-blue-900/25 transition hover:bg-blue-700 sm:flex">
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
      <section className="border-y border-blue-800/30 bg-blue-900 px-4 py-3 text-center text-sm font-black uppercase tracking-[0.16em] text-white">
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

  return (
    <section id="accueil" className="relative isolate overflow-hidden bg-neutral-950 pb-16 lg:pb-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_25%,rgba(30,64,175,0.28),transparent_40%),radial-gradient(circle_at_75%_80%,rgba(30,64,175,0.14),transparent_40%)]" />

      <div className="mx-auto max-w-4xl px-4 pt-32 text-center sm:px-6 lg:px-8 lg:pt-36">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-white/10 px-4 py-2 text-sm font-bold text-blue-200 shadow-2xl shadow-black/20 backdrop-blur">
          <span aria-hidden="true">⭐⭐⭐⭐⭐</span>
          {t.hero.badge}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }} className="text-5xl font-black leading-[0.9] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
          {t.hero.h1}
          <span className="mt-4 block text-3xl leading-none tracking-[-0.04em] text-blue-400 sm:text-4xl lg:text-5xl">
            <motion.span className="inline-block rounded-3xl bg-blue-400/10 px-2 py-1 ring-1 ring-blue-400/30" animate={{ backgroundColor: ['rgba(96,165,250,0.10)', 'rgba(96,165,250,0.22)', 'rgba(96,165,250,0.10)'] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
              {t.hero.subheading}
            </motion.span>
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }} className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-neutral-100 sm:text-xl">
          {t.hero.description}
        </motion.p>
        <HeroButtons />
        <PhoneBar />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.5 }}
        className="mx-auto mt-14 flex max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <p className="text-2xl font-black uppercase tracking-[0.18em] text-blue-300 sm:text-3xl">{t.hero.sliderLabel}</p>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
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
          <div className="h-5 w-px bg-blue-400/60" />
          <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
      <a href={PHONE_LINK} className="inline-flex items-center justify-center gap-3 rounded-full bg-blue-800 px-8 py-5 text-lg font-black text-white shadow-2xl shadow-blue-900/30 transition hover:-translate-y-0.5 hover:bg-blue-700">
        <Phone className="h-6 w-6" />
        {t.hero.callButton}
      </a>
      <a href={withLocale(locale, '/#contact')} className="inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-white/10 px-8 py-5 text-lg font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-neutral-950">
        {t.hero.quoteButton}
      </a>
    </motion.div>
  )
}

function PhoneBar() {
  return (
    <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.36 }} className="mx-auto mt-8 max-w-2xl rounded-[2rem] border border-blue-500/30 bg-neutral-950/78 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-300">Call us now:</p>
          <div className="mt-1 flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, -18, 18, -14, 14, -8, 8, 0] }}
              transition={{ duration: 0.65, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
              className="shrink-0"
            >
              <Phone className="h-8 w-8 text-blue-400 sm:h-10 sm:w-10 lg:h-11 lg:w-11" />
            </motion.div>
            <motion.a
              href={PHONE_LINK}
              className="block whitespace-nowrap text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
              animate={{
                filter: [
                  'drop-shadow(0 0 0px rgba(96,165,250,0))',
                  'drop-shadow(0 0 14px rgba(96,165,250,0.9))',
                  'drop-shadow(0 0 0px rgba(96,165,250,0))',
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
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-700">{t.services.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{t.services.h2}</h2>
          <p className="mt-4 text-lg leading-8 text-neutral-700">{t.services.description}</p>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {t.services.cards.map((service, i) => {
            const Icon = [Brush, Home, ShieldCheck][i]
            return (
              <a key={service.title} href={withLocale(locale, service.href)} className="group rounded-[2rem] border border-stone-200 bg-white p-6 shadow-2xl shadow-stone-900/8 transition hover:-translate-y-1 hover:shadow-stone-900/15">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-950 text-blue-400 transition group-hover:bg-blue-700 group-hover:text-white">
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
    <section className="bg-neutral-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-400">{t.whyChoose.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{t.whyChoose.h2}</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-200">{t.whyChoose.description}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {t.whyChoose.items.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/10 p-4 font-black backdrop-blur">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-blue-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-blue-500/20 bg-white/5 p-6 shadow-2xl shadow-black/30">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-400">{t.whyChoose.brands.eyebrow}</p>
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
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-700 text-white">
            <Brush className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-4xl font-black tracking-tight">{t.interior.h2}</h2>
          <p className="mt-4 text-lg leading-8 text-neutral-200">{t.interior.description}</p>
          <a href={withLocale(locale, t.interior.href)} className="mt-7 inline-flex items-center gap-3 rounded-full bg-blue-700 px-7 py-4 font-black text-white">
            {t.interior.cta}
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.interior.processPoints.map((point) => (
            <div key={point} className="rounded-3xl border border-stone-200 bg-stone-50 p-5">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
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

  return (
    <section id="exterieur" className="bg-stone-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-400">{t.exterior.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{t.exterior.h2}</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-200">{t.exterior.description}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {t.exterior.items.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/10 p-5 font-black backdrop-blur">{item}</div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-blue-500/30 bg-blue-800 p-7 text-white shadow-2xl shadow-black/30">
          <ShieldCheck className="h-12 w-12" />
          <h3 className="mt-5 text-3xl font-black tracking-tight">{t.exterior.card.h3}</h3>
          <p className="mt-3 text-lg font-semibold leading-8">{t.exterior.card.description}</p>
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
    <section id="realisations" className="bg-neutral-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-400">{t.projects.eyebrow}</p>
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

  return (
    <section className="bg-neutral-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-400">{t.pricing.eyebrow}</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{t.pricing.h2}</h2>
          {t.pricing.paragraphs.map((p, i) => (
            <p key={i} className="mt-4 text-lg leading-8 text-neutral-200">{p}</p>
          ))}
        </div>
        <div className="rounded-[2rem] border border-blue-500/30 bg-blue-800 p-7 text-white shadow-2xl shadow-black/30">
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
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
    <a href={PHONE_LINK} className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-center gap-3 rounded-full bg-blue-800 px-6 py-4 text-base font-black text-white shadow-2xl shadow-black/40 sm:hidden">
      <Phone className="h-5 w-5" />
      {PHONE_NUMBER}
    </a>
  )
}

function Schema({ page }: { page?: SeoPageDef }) {
  const locale = useLocale()
  const t = useT()
  const url = `https://peinturelaval.ca${withLocale(locale, page?.path ?? '/')}`
  const schema = [
    { '@context': 'https://schema.org', '@type': ['LocalBusiness', 'HousePainter'], name: COMPANY_NAME, telephone: '+14503675637', areaServed: ['Laval', 'Chomedey', 'Sainte-Dorothée', 'Vimont'], url, address: { '@type': 'PostalAddress', addressLocality: 'Laval', addressRegion: 'QC', addressCountry: 'CA' }, priceRange: '$$' },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faq.items.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
    ...(page ? [{ '@context': 'https://schema.org', '@type': 'Service', name: page.h1, description: page.description, provider: { '@type': 'HousePainter', name: COMPANY_NAME, telephone: '+14503675637' }, areaServed: page.area ?? 'Laval' }] : []),
  ]
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
