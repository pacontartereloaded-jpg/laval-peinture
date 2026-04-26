export type Locale = 'fr' | 'en' | 'es'
export const LOCALES: readonly Locale[] = ['fr', 'en', 'es'] as const
export const DEFAULT_LOCALE: Locale = 'fr'
export const LOCALE_LABELS: Record<Locale, string> = { fr: 'FR', en: 'EN', es: 'ES' }

export function detectLocale(pathname: string): Locale | null {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale
  }
  return null
}

export function stripLocale(pathname: string): string {
  const locale = detectLocale(pathname)
  if (!locale) return pathname
  return pathname.slice(`/${locale}`.length) || '/'
}

export function withLocale(locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${p}`
}

export type SeoPageDef = {
  path: string
  title: string
  h1: string
  eyebrow: string
  description: string
  intro: string
  sections: { heading: string; body: string }[]
  keywords: string[]
  area?: string
}

export type Translations = {
  locale: Locale
  nav: {
    home: string
    services: string
    interior: string
    exterior: string
    projects: string
    reviews: string
    contact: string
    callNow: string
    subtitle: string
  }
  hero: {
    badge: string
    h1: string
    subheading: string
    description: string
    callButton: string
    quoteButton: string
    sliderLabel: string
  }
  announcement: string
  services: {
    eyebrow: string
    h2: string
    description: string
    stats: string[]
    cards: { title: string; description: string; href: string }[]
  }
  whyChoose: {
    eyebrow: string
    h2: string
    description: string
    items: string[]
    brands: { eyebrow: string; h3: string }
  }
  interior: {
    h2: string
    description: string
    cta: string
    processPoints: string[]
    href: string
  }
  exterior: {
    eyebrow: string
    h2: string
    description: string
    items: string[]
    card: { h3: string; description: string }
  }
  projects: {
    eyebrow: string
    h2: string
    description: string
    filterAll: string
    filterInterior: string
    filterExterior: string
    badge: string
    cta: string
    typeInterior: string
    typeExterior: string
    items: { title: string; description: string; alt: string; typeKey: 'interior' | 'exterior' }[]
  }
  pricing: {
    eyebrow: string
    h2: string
    paragraphs: string[]
    card: { h3: string; description: string }
  }
  reviews: {
    eyebrow: string
    h2: string
    items: { name: string; area: string; text: string }[]
  }
  faq: {
    eyebrow: string
    h2: string
    items: { question: string; answer: string }[]
  }
  contact: {
    badge: string
    h2: string
    description: string
    response: string
    quote: string
    areas: { label: string; path: string }[]
  }
  seoLanding: {
    trustCard: { h2: string; description: string }
  }
  slider: { before: string; after: string }
  form: {
    eyebrow: string
    h2: string
    name: { label: string; placeholder: string }
    email: { label: string; placeholder: string }
    phone: { label: string; placeholder: string }
    projectType: { label: string; placeholder: string; options: string[] }
    message: { label: string; placeholder: string }
    submit: string
    submitting: string
    success: string
    error: string
  }
  seoPages: SeoPageDef[]
}

// ─── FRANÇAIS ────────────────────────────────────────────────────────────────

const fr: Translations = {
  locale: 'fr',
  nav: {
    home: 'Accueil',
    services: 'Services',
    interior: 'Peinture Intérieure',
    exterior: 'Peinture Extérieure',
    projects: 'Réalisations',
    reviews: 'Avis',
    contact: 'Contact',
    callNow: 'Appelez Maintenant',
    subtitle: 'Peinture résidentielle',
  },
  hero: {
    badge: 'Recommandé par les propriétaires à Laval',
    h1: 'Peintres Professionnels à Laval',
    subheading: 'Soumissions Gratuites en 24h',
    description: 'Peinture Laval est une entreprise de peinture résidentielle à Laval spécialisée en peinture intérieure, extérieure et finition haut de gamme.',
    callButton: 'Appeler Maintenant',
    quoteButton: 'Obtenir une Soumission Gratuite',
    sliderLabel: 'Peignez votre pièce',
  },
  announcement: 'Places limitées cette semaine pour nouveaux projets.',
  services: {
    eyebrow: 'Services de peinture résidentielle',
    h2: 'Une entreprise locale structurée pour livrer un résultat premium.',
    description: 'Peinture Laval aide les propriétaires de Laval à augmenter la valeur de leur maison avec une finition durable, un chantier propre et une réponse rapide.',
    stats: ['Soumissions gratuites', 'Travail soigné et professionnel', 'Service résidentiel de confiance', 'Équipe assurée'],
    cards: [
      { title: 'Peinture intérieure', description: 'Murs, plafonds, moulures et finition haut de gamme pour maisons à Laval.', href: '/peinture-interieure-laval' },
      { title: 'Peinture extérieure', description: 'Revêtements, portes, boiseries et façades protégées contre le climat du Québec.', href: '/peinture-exterieure-laval' },
      { title: 'Peinture résidentielle', description: 'Service complet pour propriétaires qui veulent un chantier propre et fiable.', href: '/peinture-residentielle-laval' },
    ],
  },
  whyChoose: {
    eyebrow: 'Confiance locale',
    h2: 'Pourquoi choisir notre entreprise de peinture à Laval',
    description: 'Un service résidentiel sérieux, pensé pour les propriétaires qui veulent une estimation claire, un chantier propre et une finition durable sans promesses exagérées.',
    items: ['Soumissions gratuites', 'Travaux garantis', 'Produits Benjamin Moore / Sherwin Williams', 'Équipe assurée'],
    brands: { eyebrow: 'Produits de peinture', h3: 'Marques reconnues pour une finition professionnelle.' },
  },
  interior: {
    h2: 'Peinture Intérieure à Laval',
    description: 'Murs, plafonds, cages d\'escalier, moulures, portes et finition complète pour maisons, condos et propriétés haut de gamme.',
    cta: 'En savoir plus',
    href: '/peinture-interieure-laval',
    processPoints: [
      'Protection complète des planchers, meubles et surfaces',
      'Préparation professionnelle: sablage, réparation et apprêt',
      'Peintures premium adaptées aux maisons du Québec',
      'Inspection finale avant livraison du chantier',
    ],
  },
  exterior: {
    eyebrow: 'Protection extérieure Québec',
    h2: 'Peinture Extérieure conçue pour durer face au climat local.',
    description: 'Préparation, apprêt, peinture de revêtement, boiseries, portes, contours et façades. Une approche professionnelle pour protéger et rehausser l\'apparence de votre maison.',
    items: ['Façades', 'Boiseries', 'Portes extérieures'],
    card: { h3: 'Service résidentiel de confiance', description: 'Une équipe fiable, organisée et orientée propreté pour des projets résidentiels avec moins de stress et plus de confiance.' },
  },
  projects: {
    eyebrow: 'Avant / Après',
    h2: 'Nos réalisations à Laval',
    description: 'Chaque projet montre la transformation réelle: même angle, même pièce, avant et après notre intervention.',
    filterAll: 'Tous',
    filterInterior: 'Intérieur',
    filterExterior: 'Extérieur',
    badge: 'Avant / Après',
    cta: 'Obtenir une soumission gratuite',
    typeInterior: 'Intérieur',
    typeExterior: 'Extérieur',
    items: [
      { title: 'Salon familial à Chomedey', description: 'Salon résidentiel repeint en tons chauds neutres, finition propre et lumineuse.', alt: 'Avant après peinture intérieure résidentielle à Chomedey Laval', typeKey: 'interior' },
      { title: 'Cuisine et aire ouverte à Vimont', description: 'Cuisine et aire ouverte modernisées avec murs pâles, moulures nettes et rendu naturel.', alt: 'Avant après peinture maison à Vimont Laval', typeKey: 'interior' },
      { title: 'Façade résidentielle à Sainte-Dorothée', description: 'Extérieur sobre et réaliste avec boiseries rafraîchies et meilleure apparence de rue.', alt: 'Avant après peinture extérieure à Sainte-Dorothée Laval', typeKey: 'exterior' },
      { title: 'Chambre principale à Laval', description: 'Chambre repeinte en gris-bleu apaisant avec moulures blanches et finition nette.', alt: 'Avant après peinture chambre résidentielle à Laval', typeKey: 'interior' },
      { title: 'Salle de bain à Chomedey', description: 'Salle de bain transformée avec blanc brillant, lignes nettes et apparence fraîche.', alt: 'Avant après peinture salle de bain à Chomedey Laval', typeKey: 'interior' },
      { title: 'Couloir et escalier à Vimont', description: 'Corridor et cage d\'escalier rafraîchis avec murs blancs et plinthes impeccables.', alt: 'Avant après peinture couloir escalier à Vimont Laval', typeKey: 'interior' },
      { title: 'Garage et façade à Laval', description: 'Porte de garage et façade extérieure repeintes en anthracite avec contours blancs.', alt: 'Avant après peinture extérieure garage à Laval', typeKey: 'exterior' },
      { title: 'Aire de vie à Fabreville', description: 'Salon et salle à manger ouverts repeints en lin chaud avec un résultat lumineux.', alt: 'Avant après peinture intérieure à Fabreville Laval', typeKey: 'interior' },
      { title: 'Bureau à domicile à Sainte-Dorothée', description: 'Bureau intérieur repeint en vert sauge doux, atmosphère calme et professionnelle.', alt: 'Avant après peinture bureau résidentiel à Sainte-Dorothée', typeKey: 'interior' },
    ],
  },
  pricing: {
    eyebrow: 'Budget et soumission',
    h2: 'Prix de peinture à Laval',
    paragraphs: [
      'Le prix d\'un projet de peinture à Laval dépend de la superficie, de l\'état des surfaces, du nombre de pièces, de la préparation nécessaire, du type de peinture et du niveau de finition désiré. Plutôt que d\'afficher un prix générique, nous préparons une soumission gratuite et claire selon votre projet réel.',
      'Une peinture intérieure simple peut demander moins de préparation qu\'un projet avec plafonds, moulures, portes, cages d\'escalier ou réparations murales. Pour l\'extérieur, le prix varie aussi selon l\'accès, le revêtement, les boiseries et l\'état de la surface.',
    ],
    card: { h3: 'Obtenir un prix précis', description: 'Appelez maintenant pour expliquer votre projet et recevoir une estimation gratuite en 24h.' },
  },
  reviews: {
    eyebrow: 'Avis clients',
    h2: 'Une réputation locale bâtie sur la confiance.',
    items: [
      { name: 'Marie L.', area: 'Laval', text: 'Service impeccable, équipe ponctuelle et résultat très propre. La maison paraît neuve.' },
      { name: 'Daniel R.', area: 'Chomedey', text: 'Soumission rapide, chantier protégé et finition haut de gamme. Je recommande sans hésiter.' },
      { name: 'Nathalie B.', area: 'Vimont', text: 'Ils ont repeint l\'intérieur complet. Travail sérieux, communication claire et prix honnête.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    h2: 'Questions fréquentes sur la peinture à Laval.',
    items: [
      { question: 'Combien coûte un peintre à Laval?', answer: 'Le prix dépend de la superficie, de la préparation, du nombre de couches et du type de finition. Peinture Laval offre une soumission gratuite en 24h pour donner un prix clair avant le début des travaux.' },
      { question: 'Offrez-vous des soumissions gratuites?', answer: 'Oui. Vous pouvez appeler Peinture Laval au (450) 367-5637 pour obtenir une soumission gratuite pour peinture intérieure, extérieure ou résidentielle à Laval.' },
      { question: 'Faites-vous la peinture intérieure et extérieure?', answer: 'Oui. L\'équipe réalise la peinture intérieure, la peinture extérieure, les murs, plafonds, moulures, portes, boiseries, façades et projets résidentiels complets.' },
      { question: 'Quels secteurs de Laval desservez-vous?', answer: 'Nous desservons Laval, Chomedey, Sainte-Dorothée, Vimont et les quartiers résidentiels avoisinants pour les projets de peinture résidentielle.' },
    ],
  },
  contact: {
    badge: 'Service à Laval et environs',
    h2: 'Contactez Peinture Laval pour une soumission gratuite.',
    description: 'Peintre Laval, peinture Laval, peinture résidentielle Laval et services locaux disponibles à Laval, Chomedey, Sainte-Dorothée et Vimont.',
    response: 'Réponse rapide aujourd\'hui',
    quote: 'Soumission gratuite en 24h',
    areas: [
      { label: 'Laval', path: '/peintre-laval' },
      { label: 'Chomedey', path: '/peintre-chomedey' },
      { label: 'Sainte-Dorothée', path: '/peinture-sainte-dorothee' },
      { label: 'Vimont', path: '/peintre-vimont' },
    ],
  },
  seoLanding: {
    trustCard: { h2: 'Entreprise locale de confiance', description: 'Service professionnel, soumission gratuite en 24h et appel direct au (450) 367-5637.' },
  },
  slider: { before: 'Avant', after: 'Après' },
  form: {
    eyebrow: 'Soumission gratuite',
    h2: 'Décrivez votre projet',
    name: { label: 'Nom complet', placeholder: 'Jean Tremblay' },
    email: { label: 'Courriel', placeholder: 'jean@exemple.com' },
    phone: { label: 'Téléphone (optionnel)', placeholder: '(450) 000-0000' },
    projectType: { label: 'Type de projet', placeholder: 'Choisir...', options: ['Peinture intérieure', 'Peinture extérieure', 'Intérieur + extérieur', 'Autre'] },
    message: { label: 'Détails du projet (optionnel)', placeholder: 'Ex: 3 pièces à peindre, couleurs choisies...' },
    submit: 'Envoyer la demande',
    submitting: 'Envoi en cours...',
    success: 'Demande envoyée ! Nous vous répondrons dans les 24h.',
    error: 'Échec de l\'envoi. Appelez-nous directement au (450) 367-5637.',
  },
  seoPages: [
    {
      path: '/peintre-laval',
      title: 'Peintre Laval | Peinture Laval',
      h1: 'Peintre Laval pour maisons, condos et propriétés résidentielles',
      eyebrow: 'Peintre professionnel à Laval',
      description: 'Peinture Laval est une entreprise de peintres professionnels à Laval spécialisée en peinture résidentielle, intérieure et extérieure. Soumission gratuite en 24h.',
      intro: 'Si vous cherchez un peintre à Laval fiable, propre et orienté finition premium, Peinture Laval aide les propriétaires à transformer leur maison avec une approche structurée. Notre équipe met l\'accent sur la préparation, la protection du chantier, la communication claire et une finition uniforme.',
      sections: [
        { heading: 'Un peintre local qui comprend les maisons de Laval', body: 'Les maisons de Laval ont des besoins variés: murs intérieurs à rafraîchir, plafonds marqués, moulures à moderniser, façades exposées au climat québécois. Notre méthode vise à réduire le stress du propriétaire tout en livrant un résultat professionnel.' },
        { heading: 'Soumission rapide et travaux bien organisés', body: 'Chaque projet commence par une discussion claire sur les surfaces, les couleurs, la préparation requise, les délais et le budget. Vous obtenez une soumission gratuite en 24h, puis une équipe organisée protège les lieux et travaille avec attention.' },
      ],
      keywords: ['peintre laval', 'peinture laval', 'peintres professionnels laval'],
      area: 'Laval',
    },
    {
      path: '/peinture-interieure-laval',
      title: 'Peinture Intérieure Laval | Peinture Laval',
      h1: 'Peinture intérieure à Laval avec finition haut de gamme',
      eyebrow: 'Murs, plafonds, moulures et escaliers',
      description: 'Service de peinture intérieure à Laval pour maisons et condos. Murs, plafonds, moulures, portes et finition résidentielle premium. Appelez (450) 367-5637.',
      intro: 'La peinture intérieure change immédiatement l\'ambiance d\'une maison. Peinture Laval réalise les projets intérieurs avec une priorité claire: préparation minutieuse, lignes nettes, protection complète et résultat durable.',
      sections: [
        { heading: 'Préparation avant peinture intérieure', body: 'Une belle finition commence avant la première couche. Nous protégeons les planchers et meubles, réparons les petites imperfections, sablons les surfaces nécessaires et appliquons l\'apprêt lorsque requis.' },
        { heading: 'Peinture intérieure pour propriétaires exigeants', body: 'Notre service couvre les chambres, salons, cuisines, corridors, cages d\'escalier, plafonds, moulures et portes. Nous aidons aussi à choisir des finis adaptés aux pièces très utilisées.' },
      ],
      keywords: ['peinture intérieure laval', 'peintre intérieur laval', 'peinture maison laval'],
      area: 'Laval',
    },
    {
      path: '/peinture-exterieure-laval',
      title: 'Peinture Extérieure Laval | Peinture Laval',
      h1: 'Peinture extérieure à Laval pour protéger et valoriser votre maison',
      eyebrow: 'Façades, boiseries, portes et revêtements',
      description: 'Peinture extérieure à Laval pour maisons résidentielles. Préparation, apprêt, façades, portes, boiseries et finition durable adaptée au climat du Québec.',
      intro: 'La peinture extérieure doit être belle, mais surtout résistante. À Laval, les surfaces subissent l\'humidité, le gel, le soleil et les variations de température. Peinture Laval prépare chaque surface avec soin.',
      sections: [
        { heading: 'Une approche adaptée au climat local', body: 'Nous évaluons l\'état de la surface, les zones écaillées, l\'humidité, le type de revêtement et les réparations nécessaires. Une bonne préparation réduit les risques de décollement prématuré.' },
        { heading: 'Améliorer l\'apparence et la valeur de la propriété', body: 'Une façade bien peinte donne une impression immédiate de maison entretenue. Notre équipe intervient sur portes, boiseries, contours, balcons, façades pour créer un résultat cohérent.' },
      ],
      keywords: ['peinture extérieure laval', 'peintre extérieur laval', 'peinture maison extérieure laval'],
      area: 'Laval',
    },
    {
      path: '/peinture-residentielle-laval',
      title: 'Peinture Résidentielle Laval | Peinture Laval',
      h1: 'Peinture résidentielle à Laval pour propriétaires qui veulent un résultat fiable',
      eyebrow: 'Service complet intérieur et extérieur',
      description: 'Entreprise de peinture résidentielle à Laval pour projets intérieurs, extérieurs, rénovations et rafraîchissements de maisons. Soumission gratuite en 24h.',
      intro: 'Peinture Laval est conçue pour les propriétaires qui veulent un service clair, rapide et professionnel. Nous prenons en charge les projets de peinture résidentielle avec une approche premium.',
      sections: [
        { heading: 'Un seul contact pour votre projet résidentiel', body: 'Que vous prépariez une maison pour la vente, rénoviez une propriété familiale ou modernisiez plusieurs pièces, notre équipe structure le projet pour respecter les délais.' },
        { heading: 'Peinture résidentielle orientée valeur', body: 'Les couleurs, les finis et la qualité d\'application influencent la perception d\'une maison. Nous aidons à obtenir un rendu propre, moderne et durable.' },
      ],
      keywords: ['peinture résidentielle laval', 'entreprise peinture laval', 'peintre résidentiel laval'],
      area: 'Laval',
    },
    {
      path: '/peintre-chomedey',
      title: 'Peintre Chomedey | Peinture Laval',
      h1: 'Peintre à Chomedey pour projets résidentiels propres et rapides',
      eyebrow: 'Service local à Chomedey',
      description: 'Peintre à Chomedey pour peinture intérieure, extérieure et résidentielle. Soumission gratuite en 24h avec Peinture Laval.',
      intro: 'Peinture Laval dessert Chomedey avec des services de peinture résidentielle pour maisons, condos et propriétés familiales. Notre équipe se déplace rapidement pour évaluer votre projet.',
      sections: [
        { heading: 'Peinture intérieure à Chomedey', body: 'Nous réalisons murs, plafonds, moulures, escaliers, portes et espaces de vie avec une attention particulière à la propreté du chantier.' },
        { heading: 'Peinture extérieure à Chomedey', body: 'Pour les façades, boiseries et portes extérieures, nous privilégions une préparation adaptée aux surfaces et au climat.' },
      ],
      keywords: ['peintre chomedey', 'peinture chomedey', 'peintre laval chomedey'],
      area: 'Chomedey',
    },
    {
      path: '/peintre-vimont',
      title: 'Peintre Vimont | Peinture Laval',
      h1: 'Peintre à Vimont pour peinture résidentielle haut de gamme',
      eyebrow: 'Service local à Vimont',
      description: 'Peintre à Vimont pour peinture intérieure et extérieure résidentielle. Appelez Peinture Laval pour une soumission gratuite.',
      intro: 'Les propriétaires de Vimont peuvent compter sur Peinture Laval pour des travaux de peinture propres, organisés et durables.',
      sections: [
        { heading: 'Projet intérieur à Vimont', body: 'Nous protégeons les espaces, réparons les petites imperfections et appliquons les couches nécessaires pour obtenir un fini propre.' },
        { heading: 'Projet extérieur à Vimont', body: 'Notre service extérieur aide à protéger et rehausser l\'apparence des façades, boiseries et portes exposées aux conditions locales.' },
      ],
      keywords: ['peintre vimont', 'peinture vimont', 'peintre résidentiel vimont'],
      area: 'Vimont',
    },
    {
      path: '/peinture-sainte-dorothee',
      title: 'Peintre Sainte-Dorothée | Peinture Laval',
      h1: 'Peintre à Sainte-Dorothée pour maisons résidentielles',
      eyebrow: 'Service local à Sainte-Dorothée',
      description: 'Peintre à Sainte-Dorothée pour peinture intérieure, extérieure et finition résidentielle. Soumission gratuite en 24h.',
      intro: 'Peinture Laval accompagne les propriétaires de Sainte-Dorothée avec un service de peinture résidentielle fiable et orienté satisfaction.',
      sections: [
        { heading: 'Peinture intérieure à Sainte-Dorothée', body: 'Murs, plafonds, moulures et portes sont préparés avec soin pour obtenir une finition propre et moderne.' },
        { heading: 'Peinture extérieure à Sainte-Dorothée', body: 'Nous aidons à protéger les surfaces extérieures et à améliorer l\'apparence globale de la propriété.' },
      ],
      keywords: ['peintre sainte-dorothée', 'peinture sainte-dorothée', 'peintre sainte dorothee'],
      area: 'Sainte-Dorothée',
    },
  ],
}

// ─── ENGLISH ─────────────────────────────────────────────────────────────────

const en: Translations = {
  locale: 'en',
  nav: {
    home: 'Home',
    services: 'Services',
    interior: 'Interior Painting',
    exterior: 'Exterior Painting',
    projects: 'Projects',
    reviews: 'Reviews',
    contact: 'Contact',
    callNow: 'Call Now',
    subtitle: 'Residential painting',
  },
  hero: {
    badge: 'Recommended by homeowners in Laval',
    h1: 'Professional Painters in Laval',
    subheading: 'Free Estimates in 24h',
    description: 'Peinture Laval is a residential painting company in Laval specializing in interior painting, exterior painting and premium finishing.',
    callButton: 'Call Now',
    quoteButton: 'Get a Free Estimate',
    sliderLabel: 'Paint your room',
  },
  announcement: 'Limited spots this week for new projects.',
  services: {
    eyebrow: 'Residential painting services',
    h2: 'A local company built to deliver premium results.',
    description: 'Peinture Laval helps Laval homeowners increase their home\'s value with durable finishing, a clean job site and a fast response.',
    stats: ['Free estimates', 'Meticulous and professional work', 'Trusted residential service', 'Insured team'],
    cards: [
      { title: 'Interior Painting', description: 'Walls, ceilings, moldings and premium finishing for homes in Laval.', href: '/interior-painting-laval' },
      { title: 'Exterior Painting', description: 'Siding, doors, woodwork and facades protected against Quebec\'s climate.', href: '/exterior-painting-laval' },
      { title: 'Residential Painting', description: 'Complete service for homeowners who want a clean and reliable job site.', href: '/residential-painting-laval' },
    ],
  },
  whyChoose: {
    eyebrow: 'Local trust',
    h2: 'Why choose our painting company in Laval',
    description: 'A serious residential service designed for homeowners who want a clear estimate, a clean job site and lasting results — no empty promises.',
    items: ['Free estimates', 'Guaranteed work', 'Benjamin Moore / Sherwin Williams products', 'Insured team'],
    brands: { eyebrow: 'Paint products', h3: 'Trusted brands for a professional finish.' },
  },
  interior: {
    h2: 'Interior Painting in Laval',
    description: 'Walls, ceilings, staircases, moldings, doors and complete finishing for houses, condos and premium properties.',
    cta: 'Learn more',
    href: '/interior-painting-laval',
    processPoints: [
      'Complete protection of floors, furniture and surfaces',
      'Professional preparation: sanding, repairs and primer',
      'Premium paints adapted to Quebec homes',
      'Final inspection before project handover',
    ],
  },
  exterior: {
    eyebrow: 'Quebec exterior protection',
    h2: 'Exterior Painting built to withstand the local climate.',
    description: 'Preparation, primer, siding paint, woodwork, doors, trim and facades. A professional approach to protect and enhance the look of your home.',
    items: ['Facades', 'Woodwork', 'Exterior doors'],
    card: { h3: 'Trusted residential service', description: 'A reliable, organized and cleanliness-focused team for residential projects with less stress and more confidence.' },
  },
  projects: {
    eyebrow: 'Before / After',
    h2: 'Our projects in Laval',
    description: 'Each project shows the real transformation: same angle, same room, before and after our work.',
    filterAll: 'All',
    filterInterior: 'Interior',
    filterExterior: 'Exterior',
    badge: 'Before / After',
    cta: 'Get a free estimate',
    typeInterior: 'Interior',
    typeExterior: 'Exterior',
    items: [
      { title: 'Family living room in Chomedey', description: 'Living room repainted in warm neutral tones, clean and bright finish.', alt: 'Before after interior residential painting in Chomedey Laval', typeKey: 'interior' },
      { title: 'Kitchen and open area in Vimont', description: 'Kitchen and open area modernized with light walls, crisp moldings and natural look.', alt: 'Before after house painting in Vimont Laval', typeKey: 'interior' },
      { title: 'Residential facade in Sainte-Dorothée', description: 'Clean exterior with refreshed woodwork and improved street appeal.', alt: 'Before after exterior painting in Sainte-Dorothée Laval', typeKey: 'exterior' },
      { title: 'Master bedroom in Laval', description: 'Bedroom repainted in calming grey-blue with white moldings and clean finish.', alt: 'Before after bedroom painting in Laval', typeKey: 'interior' },
      { title: 'Bathroom in Chomedey', description: 'Bathroom transformed with bright white, crisp lines and fresh appearance.', alt: 'Before after bathroom painting in Chomedey Laval', typeKey: 'interior' },
      { title: 'Hallway and staircase in Vimont', description: 'Hallway and staircase refreshed with white walls and flawless baseboards.', alt: 'Before after hallway staircase painting in Vimont Laval', typeKey: 'interior' },
      { title: 'Garage and facade in Laval', description: 'Garage door and exterior facade repainted in charcoal with white trim.', alt: 'Before after exterior garage painting in Laval', typeKey: 'exterior' },
      { title: 'Living area in Fabreville', description: 'Open living and dining room repainted in warm linen with bright result.', alt: 'Before after interior painting in Fabreville Laval', typeKey: 'interior' },
      { title: 'Home office in Sainte-Dorothée', description: 'Interior office repainted in soft sage green, calm and professional atmosphere.', alt: 'Before after office painting in Sainte-Dorothée', typeKey: 'interior' },
    ],
  },
  pricing: {
    eyebrow: 'Budget and estimate',
    h2: 'Painting prices in Laval',
    paragraphs: [
      'The cost of a painting project in Laval depends on the surface area, condition of surfaces, number of rooms, preparation needed, type of paint and desired finish level. Rather than posting a generic price, we prepare a free and clear estimate based on your actual project.',
      'A simple interior paint job may require less preparation than a project involving ceilings, moldings, doors, staircases or wall repairs. For exteriors, the price also varies based on access, siding, woodwork and surface condition.',
    ],
    card: { h3: 'Get an accurate price', description: 'Call now to describe your project and receive a free estimate within 24 hours.' },
  },
  reviews: {
    eyebrow: 'Client reviews',
    h2: 'A local reputation built on trust.',
    items: [
      { name: 'Marie L.', area: 'Laval', text: 'Impeccable service, punctual team and very clean results. The house looks brand new.' },
      { name: 'Daniel R.', area: 'Chomedey', text: 'Quick estimate, protected job site and premium finish. I recommend without hesitation.' },
      { name: 'Nathalie B.', area: 'Vimont', text: 'They repainted the entire interior. Serious work, clear communication and honest pricing.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    h2: 'Frequently asked questions about painting in Laval.',
    items: [
      { question: 'How much does a painter cost in Laval?', answer: 'The price depends on the surface area, preparation, number of coats and type of finish. Peinture Laval offers a free estimate within 24h to give you a clear price before work begins.' },
      { question: 'Do you offer free estimates?', answer: 'Yes. You can call Peinture Laval at (450) 367-5637 to get a free estimate for interior, exterior or residential painting in Laval.' },
      { question: 'Do you do both interior and exterior painting?', answer: 'Yes. The team handles interior painting, exterior painting, walls, ceilings, moldings, doors, woodwork, facades and complete residential projects.' },
      { question: 'Which areas of Laval do you serve?', answer: 'We serve Laval, Chomedey, Sainte-Dorothée, Vimont and surrounding residential neighbourhoods for painting projects.' },
    ],
  },
  contact: {
    badge: 'Serving Laval and neighbourhoods',
    h2: 'Contact Peinture Laval for a free estimate.',
    description: 'Painter Laval, painting Laval, residential painting Laval and local services available in Laval, Chomedey, Sainte-Dorothée and Vimont.',
    response: 'Fast response today',
    quote: 'Free estimate in 24h',
    areas: [
      { label: 'Laval', path: '/painter-laval' },
      { label: 'Chomedey', path: '/painter-chomedey' },
      { label: 'Sainte-Dorothée', path: '/painting-sainte-dorothee' },
      { label: 'Vimont', path: '/painter-vimont' },
    ],
  },
  seoLanding: {
    trustCard: { h2: 'Trusted local company', description: 'Professional service, free estimate in 24h and direct call at (450) 367-5637.' },
  },
  slider: { before: 'Before', after: 'After' },
  form: {
    eyebrow: 'Free estimate',
    h2: 'Describe your project',
    name: { label: 'Full name', placeholder: 'John Smith' },
    email: { label: 'Email', placeholder: 'john@example.com' },
    phone: { label: 'Phone (optional)', placeholder: '(450) 000-0000' },
    projectType: { label: 'Project type', placeholder: 'Choose...', options: ['Interior painting', 'Exterior painting', 'Interior + exterior', 'Other'] },
    message: { label: 'Project details (optional)', placeholder: 'e.g. 3 rooms to paint, colours already chosen...' },
    submit: 'Send request',
    submitting: 'Sending...',
    success: 'Request sent! We will get back to you within 24h.',
    error: 'Failed to send. Please call us directly at (450) 367-5637.',
  },
  seoPages: [
    {
      path: '/painter-laval',
      title: 'Painter Laval | Peinture Laval',
      h1: 'Painter in Laval for houses, condos and residential properties',
      eyebrow: 'Professional painter in Laval',
      description: 'Peinture Laval is a team of professional painters in Laval specializing in residential, interior and exterior painting. Free estimate in 24h.',
      intro: 'Looking for a reliable, clean and premium-focused painter in Laval? Peinture Laval helps homeowners transform their homes with a structured approach — careful preparation, site protection, clear communication and a uniform finish.',
      sections: [
        { heading: 'A local painter who understands Laval homes', body: 'Laval homes have varied needs: interior walls to refresh, marked ceilings, moldings to modernize, facades exposed to Quebec\'s climate. Our method aims to reduce homeowner stress while delivering professional results.' },
        { heading: 'Quick estimate and well-organized work', body: 'Every project starts with a clear discussion about surfaces, colours, required preparation, timelines and budget. You get a free estimate within 24h, then an organized team protects the space and works with careful attention to visible details.' },
      ],
      keywords: ['painter laval', 'painting laval', 'professional painters laval'],
      area: 'Laval',
    },
    {
      path: '/interior-painting-laval',
      title: 'Interior Painting Laval | Peinture Laval',
      h1: 'Interior painting in Laval with premium finishing',
      eyebrow: 'Walls, ceilings, moldings and staircases',
      description: 'Interior painting service in Laval for houses and condos. Walls, ceilings, moldings, doors and premium residential finishing. Call (450) 367-5637.',
      intro: 'Interior painting immediately changes the feel of a home. Peinture Laval carries out interior projects with a clear priority: careful preparation, clean lines, complete protection and lasting results. We work in occupied homes with a clean, respectful and efficient method.',
      sections: [
        { heading: 'Preparation before interior painting', body: 'A beautiful finish starts before the first coat. We protect floors and furniture, repair small imperfections, sand necessary surfaces and apply primer when required. This preparation helps achieve a smoother and more durable finish.' },
        { heading: 'Interior painting for demanding homeowners', body: 'Our service covers bedrooms, living rooms, kitchens, hallways, staircases, ceilings, moldings and doors. We also help choose finishes suited to high-traffic areas, humid zones and spaces where lighting affects the final look.' },
      ],
      keywords: ['interior painting laval', 'interior painter laval', 'house painting laval'],
      area: 'Laval',
    },
    {
      path: '/exterior-painting-laval',
      title: 'Exterior Painting Laval | Peinture Laval',
      h1: 'Exterior painting in Laval to protect and enhance your home',
      eyebrow: 'Facades, woodwork, doors and siding',
      description: 'Exterior painting in Laval for residential homes. Preparation, primer, facades, doors, woodwork and durable finish adapted to Quebec\'s climate.',
      intro: 'Exterior paint must be beautiful but above all durable. In Laval, surfaces face humidity, frost, sun and temperature swings. Peinture Laval carefully prepares every surface to achieve a clean, adherent and lasting exterior finish.',
      sections: [
        { heading: 'An approach adapted to the local climate', body: 'We assess the surface condition, peeling areas, moisture, type of siding and required repairs. Good preparation reduces the risk of premature peeling and improves paint adhesion.' },
        { heading: 'Improving the appearance and value of the property', body: 'A well-painted facade gives an immediate impression of a well-maintained home. Our team works on doors, woodwork, trim, balconies, facades and exterior elements to create a cohesive and professional result.' },
      ],
      keywords: ['exterior painting laval', 'exterior painter laval', 'house exterior painting laval'],
      area: 'Laval',
    },
    {
      path: '/residential-painting-laval',
      title: 'Residential Painting Laval | Peinture Laval',
      h1: 'Residential painting in Laval for homeowners who want reliable results',
      eyebrow: 'Complete interior and exterior service',
      description: 'Residential painting company in Laval for interior, exterior, renovation and home refresh projects. Free estimate in 24h.',
      intro: 'Peinture Laval is designed for homeowners who want a clear, fast and professional service. We handle residential painting projects with a premium approach: site protection, serious preparation, careful finishing and direct communication.',
      sections: [
        { heading: 'One contact for your residential project', body: 'Whether you\'re preparing a home for sale, renovating a family property or modernizing several rooms, our team structures the project to meet deadlines and minimize disruption to your daily routine.' },
        { heading: 'Residential painting focused on value', body: 'Colours, finishes and application quality influence the perception of a home. We help achieve a clean, modern and durable result that improves the overall appearance of the property.' },
      ],
      keywords: ['residential painting laval', 'painting company laval', 'residential painter laval'],
      area: 'Laval',
    },
    {
      path: '/painter-chomedey',
      title: 'Painter Chomedey | Peinture Laval',
      h1: 'Painter in Chomedey for clean and fast residential projects',
      eyebrow: 'Local service in Chomedey',
      description: 'Painter in Chomedey for interior, exterior and residential painting. Free estimate in 24h with Peinture Laval.',
      intro: 'Peinture Laval serves Chomedey with residential painting services for houses, condos and family properties. Our team moves quickly to assess your project, recommend the right preparation and deliver a professional finish.',
      sections: [
        { heading: 'Interior painting in Chomedey', body: 'We handle walls, ceilings, moldings, staircases, doors and living spaces with particular attention to job site cleanliness and finishing lines.' },
        { heading: 'Exterior painting in Chomedey', body: 'For facades, woodwork and exterior doors, we prioritize preparation suited to the surfaces and climate for better durability.' },
      ],
      keywords: ['painter chomedey', 'painting chomedey', 'painter laval chomedey'],
      area: 'Chomedey',
    },
    {
      path: '/painter-vimont',
      title: 'Painter Vimont | Peinture Laval',
      h1: 'Painter in Vimont for premium residential painting',
      eyebrow: 'Local service in Vimont',
      description: 'Painter in Vimont for interior and exterior residential painting. Call Peinture Laval for a free estimate.',
      intro: 'Vimont homeowners can count on Peinture Laval for clean, organized and lasting painting work. We help modernize homes with a uniform finish and serious preparation.',
      sections: [
        { heading: 'Interior project in Vimont', body: 'We protect spaces, repair small imperfections and apply the necessary coats to achieve a clean finish in living areas.' },
        { heading: 'Exterior project in Vimont', body: 'Our exterior service helps protect and enhance the appearance of facades, woodwork and doors exposed to local conditions.' },
      ],
      keywords: ['painter vimont', 'painting vimont', 'residential painter vimont'],
      area: 'Vimont',
    },
    {
      path: '/painting-sainte-dorothee',
      title: 'Painter Sainte-Dorothée | Peinture Laval',
      h1: 'Painter in Sainte-Dorothée for residential homes',
      eyebrow: 'Local service in Sainte-Dorothée',
      description: 'Painter in Sainte-Dorothée for interior, exterior and residential finishing. Free estimate in 24h.',
      intro: 'Peinture Laval supports Sainte-Dorothée homeowners with a reliable, premium and satisfaction-focused residential painting service. Every project is planned to protect your home and deliver a careful result.',
      sections: [
        { heading: 'Interior painting in Sainte-Dorothée', body: 'Walls, ceilings, moldings and doors are carefully prepared to achieve a clean and modern finish suited to residential homes.' },
        { heading: 'Exterior painting in Sainte-Dorothée', body: 'We help protect exterior surfaces and improve the overall appearance of the property with professional application.' },
      ],
      keywords: ['painter sainte-dorothee', 'painting sainte-dorothee', 'residential painter sainte-dorothee'],
      area: 'Sainte-Dorothée',
    },
  ],
}

// ─── ESPAÑOL ─────────────────────────────────────────────────────────────────

const es: Translations = {
  locale: 'es',
  nav: {
    home: 'Inicio',
    services: 'Servicios',
    interior: 'Pintura Interior',
    exterior: 'Pintura Exterior',
    projects: 'Realizaciones',
    reviews: 'Opiniones',
    contact: 'Contacto',
    callNow: 'Llamar Ahora',
    subtitle: 'Pintura residencial',
  },
  hero: {
    badge: 'Recomendado por propietarios en Laval',
    h1: 'Pintores Profesionales en Laval',
    subheading: 'Presupuestos Gratuitos en 24h',
    description: 'Peinture Laval es una empresa de pintura residencial en Laval especializada en pintura interior, exterior y acabados de alta gama.',
    callButton: 'Llamar Ahora',
    quoteButton: 'Obtener Presupuesto Gratis',
    sliderLabel: 'Pinta tu habitación',
  },
  announcement: 'Lugares limitados esta semana para nuevos proyectos.',
  services: {
    eyebrow: 'Servicios de pintura residencial',
    h2: 'Una empresa local estructurada para entregar resultados premium.',
    description: 'Peinture Laval ayuda a los propietarios de Laval a aumentar el valor de su hogar con un acabado duradero, obra limpia y respuesta rápida.',
    stats: ['Presupuestos gratuitos', 'Trabajo cuidadoso y profesional', 'Servicio residencial de confianza', 'Equipo asegurado'],
    cards: [
      { title: 'Pintura Interior', description: 'Paredes, techos, molduras y acabados premium para casas en Laval.', href: '/pintura-interior-laval' },
      { title: 'Pintura Exterior', description: 'Revestimientos, puertas, carpintería y fachadas protegidas contra el clima de Quebec.', href: '/pintura-exterior-laval' },
      { title: 'Pintura Residencial', description: 'Servicio completo para propietarios que quieren una obra limpia y confiable.', href: '/pintura-residencial-laval' },
    ],
  },
  whyChoose: {
    eyebrow: 'Confianza local',
    h2: 'Por qué elegir nuestra empresa de pintura en Laval',
    description: 'Un servicio residencial serio, pensado para propietarios que quieren un presupuesto claro, obra limpia y acabado duradero sin promesas exageradas.',
    items: ['Presupuestos gratuitos', 'Trabajos garantizados', 'Productos Benjamin Moore / Sherwin Williams', 'Equipo asegurado'],
    brands: { eyebrow: 'Productos de pintura', h3: 'Marcas reconocidas para un acabado profesional.' },
  },
  interior: {
    h2: 'Pintura Interior en Laval',
    description: 'Paredes, techos, escaleras, molduras, puertas y acabado completo para casas, condos y propiedades de alta gama.',
    cta: 'Saber más',
    href: '/pintura-interior-laval',
    processPoints: [
      'Protección completa de pisos, muebles y superficies',
      'Preparación profesional: lijado, reparaciones y imprimación',
      'Pinturas premium adaptadas a las casas de Quebec',
      'Inspección final antes de entregar la obra',
    ],
  },
  exterior: {
    eyebrow: 'Protección exterior Quebec',
    h2: 'Pintura Exterior diseñada para durar frente al clima local.',
    description: 'Preparación, imprimación, pintura de revestimiento, carpintería, puertas, marcos y fachadas. Un enfoque profesional para proteger y realzar el aspecto de su casa.',
    items: ['Fachadas', 'Carpintería', 'Puertas exteriores'],
    card: { h3: 'Servicio residencial de confianza', description: 'Un equipo fiable, organizado y enfocado en la limpieza para proyectos residenciales con menos estrés y más confianza.' },
  },
  projects: {
    eyebrow: 'Antes / Después',
    h2: 'Nuestras realizaciones en Laval',
    description: 'Cada proyecto muestra la transformación real: mismo ángulo, misma habitación, antes y después de nuestra intervención.',
    filterAll: 'Todos',
    filterInterior: 'Interior',
    filterExterior: 'Exterior',
    badge: 'Antes / Después',
    cta: 'Obtener presupuesto gratuito',
    typeInterior: 'Interior',
    typeExterior: 'Exterior',
    items: [
      { title: 'Salón familiar en Chomedey', description: 'Salón repintado en tonos cálidos neutros, acabado limpio y luminoso.', alt: 'Antes después pintura interior residencial en Chomedey Laval', typeKey: 'interior' },
      { title: 'Cocina y área abierta en Vimont', description: 'Cocina y área abierta modernizadas con paredes claras, molduras limpias y aspecto natural.', alt: 'Antes después pintura casa en Vimont Laval', typeKey: 'interior' },
      { title: 'Fachada residencial en Sainte-Dorothée', description: 'Exterior sobrio con carpintería renovada y mejor aspecto de calle.', alt: 'Antes después pintura exterior en Sainte-Dorothée Laval', typeKey: 'exterior' },
      { title: 'Dormitorio principal en Laval', description: 'Dormitorio repintado en gris-azul apacible con molduras blancas y acabado limpio.', alt: 'Antes después pintura dormitorio residencial en Laval', typeKey: 'interior' },
      { title: 'Baño en Chomedey', description: 'Baño transformado con blanco brillante, líneas limpias y aspecto fresco.', alt: 'Antes después pintura baño en Chomedey Laval', typeKey: 'interior' },
      { title: 'Pasillo y escalera en Vimont', description: 'Pasillo y caja de escalera renovados con paredes blancas y zócalos impecables.', alt: 'Antes después pintura pasillo escalera en Vimont Laval', typeKey: 'interior' },
      { title: 'Garaje y fachada en Laval', description: 'Puerta de garaje y fachada exterior repintadas en antracita con marcos blancos.', alt: 'Antes después pintura exterior garaje en Laval', typeKey: 'exterior' },
      { title: 'Zona de estar en Fabreville', description: 'Salón y comedor abiertos repintados en lino cálido con resultado luminoso.', alt: 'Antes después pintura interior en Fabreville Laval', typeKey: 'interior' },
      { title: 'Oficina en casa en Sainte-Dorothée', description: 'Oficina interior repintada en verde salvia suave, ambiente tranquilo y profesional.', alt: 'Antes después pintura oficina residencial en Sainte-Dorothée', typeKey: 'interior' },
    ],
  },
  pricing: {
    eyebrow: 'Presupuesto y estimación',
    h2: 'Precios de pintura en Laval',
    paragraphs: [
      'El costo de un proyecto de pintura en Laval depende de la superficie, el estado de los materiales, el número de habitaciones, la preparación necesaria, el tipo de pintura y el nivel de acabado deseado. En lugar de mostrar un precio genérico, preparamos un presupuesto gratuito y claro según su proyecto real.',
      'Una pintura interior simple puede requerir menos preparación que un proyecto con techos, molduras, puertas, escaleras o reparaciones de paredes. Para el exterior, el precio también varía según el acceso, el revestimiento, la carpintería y el estado de la superficie.',
    ],
    card: { h3: 'Obtener un precio preciso', description: 'Llame ahora para explicar su proyecto y recibir una estimación gratuita en 24 horas.' },
  },
  reviews: {
    eyebrow: 'Opiniones de clientes',
    h2: 'Una reputación local construida sobre la confianza.',
    items: [
      { name: 'Marie L.', area: 'Laval', text: 'Servicio impecable, equipo puntual y resultado muy limpio. La casa parece nueva.' },
      { name: 'Daniel R.', area: 'Chomedey', text: 'Presupuesto rápido, obra protegida y acabado de alta gama. Lo recomiendo sin dudar.' },
      { name: 'Nathalie B.', area: 'Vimont', text: 'Repintaron el interior completo. Trabajo serio, comunicación clara y precio honesto.' },
    ],
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    h2: 'Preguntas frecuentes sobre pintura en Laval.',
    items: [
      { question: '¿Cuánto cuesta un pintor en Laval?', answer: 'El precio depende de la superficie, la preparación, el número de capas y el tipo de acabado. Peinture Laval ofrece un presupuesto gratuito en 24h para dar un precio claro antes de comenzar los trabajos.' },
      { question: '¿Ofrecen presupuestos gratuitos?', answer: 'Sí. Puede llamar a Peinture Laval al (450) 367-5637 para obtener un presupuesto gratuito para pintura interior, exterior o residencial en Laval.' },
      { question: '¿Hacen pintura interior y exterior?', answer: 'Sí. El equipo realiza pintura interior, pintura exterior, paredes, techos, molduras, puertas, carpintería, fachadas y proyectos residenciales completos.' },
      { question: '¿Qué sectores de Laval cubren?', answer: 'Cubrimos Laval, Chomedey, Sainte-Dorothée, Vimont y los barrios residenciales cercanos para proyectos de pintura residencial.' },
    ],
  },
  contact: {
    badge: 'Servicio en Laval y alrededores',
    h2: 'Contacte a Peinture Laval para un presupuesto gratuito.',
    description: 'Pintor Laval, pintura Laval, pintura residencial Laval y servicios locales disponibles en Laval, Chomedey, Sainte-Dorothée y Vimont.',
    response: 'Respuesta rápida hoy',
    quote: 'Presupuesto gratuito en 24h',
    areas: [
      { label: 'Laval', path: '/pintor-laval' },
      { label: 'Chomedey', path: '/pintor-chomedey' },
      { label: 'Sainte-Dorothée', path: '/pintura-sainte-dorothee' },
      { label: 'Vimont', path: '/pintor-vimont' },
    ],
  },
  seoLanding: {
    trustCard: { h2: 'Empresa local de confianza', description: 'Servicio profesional, presupuesto gratuito en 24h y llamada directa al (450) 367-5637.' },
  },
  slider: { before: 'Antes', after: 'Después' },
  form: {
    eyebrow: 'Presupuesto gratuito',
    h2: 'Describa su proyecto',
    name: { label: 'Nombre completo', placeholder: 'Juan García' },
    email: { label: 'Correo electrónico', placeholder: 'juan@ejemplo.com' },
    phone: { label: 'Teléfono (opcional)', placeholder: '(450) 000-0000' },
    projectType: { label: 'Tipo de proyecto', placeholder: 'Elegir...', options: ['Pintura interior', 'Pintura exterior', 'Interior + exterior', 'Otro'] },
    message: { label: 'Detalles del proyecto (opcional)', placeholder: 'Ej: 3 habitaciones a pintar, colores ya elegidos...' },
    submit: 'Enviar solicitud',
    submitting: 'Enviando...',
    success: 'Solicitud enviada. Le responderemos en 24h.',
    error: 'Error al enviar. Llámenos directamente al (450) 367-5637.',
  },
  seoPages: [
    {
      path: '/pintor-laval',
      title: 'Pintor Laval | Peinture Laval',
      h1: 'Pintor en Laval para casas, condos y propiedades residenciales',
      eyebrow: 'Pintor profesional en Laval',
      description: 'Peinture Laval es una empresa de pintores profesionales en Laval especializada en pintura residencial, interior y exterior. Presupuesto gratuito en 24h.',
      intro: '¿Busca un pintor en Laval confiable, limpio y orientado a un acabado premium? Peinture Laval ayuda a los propietarios a transformar su hogar con un enfoque estructurado — preparación cuidadosa, protección de la obra y comunicación clara.',
      sections: [
        { heading: 'Un pintor local que conoce las casas de Laval', body: 'Las casas de Laval tienen necesidades variadas: paredes interiores a renovar, techos marcados, molduras a modernizar, fachadas expuestas al clima de Quebec. Nuestro método busca reducir el estrés del propietario.' },
        { heading: 'Presupuesto rápido y trabajos bien organizados', body: 'Cada proyecto comienza con una conversación clara sobre superficies, colores, preparación necesaria, plazos y presupuesto. Recibe un presupuesto gratuito en 24h.' },
      ],
      keywords: ['pintor laval', 'pintura laval', 'pintores profesionales laval'],
      area: 'Laval',
    },
    {
      path: '/pintura-interior-laval',
      title: 'Pintura Interior Laval | Peinture Laval',
      h1: 'Pintura interior en Laval con acabado de alta gama',
      eyebrow: 'Paredes, techos, molduras y escaleras',
      description: 'Servicio de pintura interior en Laval para casas y condos. Paredes, techos, molduras, puertas y acabado residencial premium. Llame al (450) 367-5637.',
      intro: 'La pintura interior transforma inmediatamente el ambiente de un hogar. Peinture Laval realiza proyectos interiores con una prioridad clara: preparación minuciosa, líneas limpias, protección completa y resultado duradero.',
      sections: [
        { heading: 'Preparación antes de la pintura interior', body: 'Un bello acabado comienza antes de la primera capa. Protegemos pisos y muebles, reparamos pequeñas imperfecciones, lijamos las superficies necesarias y aplicamos imprimación cuando se requiere.' },
        { heading: 'Pintura interior para propietarios exigentes', body: 'Nuestro servicio cubre dormitorios, salones, cocinas, pasillos, cajas de escalera, techos, molduras y puertas. También ayudamos a elegir acabados adaptados a zonas de alto tráfico.' },
      ],
      keywords: ['pintura interior laval', 'pintor interior laval', 'pintura casa laval'],
      area: 'Laval',
    },
    {
      path: '/pintura-exterior-laval',
      title: 'Pintura Exterior Laval | Peinture Laval',
      h1: 'Pintura exterior en Laval para proteger y valorizar su casa',
      eyebrow: 'Fachadas, carpintería, puertas y revestimientos',
      description: 'Pintura exterior en Laval para casas residenciales. Preparación, imprimación, fachadas, puertas, carpintería y acabado duradero adaptado al clima de Quebec.',
      intro: 'La pintura exterior debe ser bonita pero sobre todo resistente. En Laval, las superficies soportan humedad, heladas, sol y cambios de temperatura. Peinture Laval prepara cada superficie con cuidado.',
      sections: [
        { heading: 'Un enfoque adaptado al clima local', body: 'Evaluamos el estado de la superficie, las zonas descascaradas, la humedad, el tipo de revestimiento y las reparaciones necesarias. Una buena preparación reduce los riesgos de desprendimiento prematuro.' },
        { heading: 'Mejorar el aspecto y el valor de la propiedad', body: 'Una fachada bien pintada da una impresión inmediata de casa bien mantenida. Trabajamos en puertas, carpintería, marcos, balcones y fachadas para crear un resultado coherente.' },
      ],
      keywords: ['pintura exterior laval', 'pintor exterior laval', 'pintura casa exterior laval'],
      area: 'Laval',
    },
    {
      path: '/pintura-residencial-laval',
      title: 'Pintura Residencial Laval | Peinture Laval',
      h1: 'Pintura residencial en Laval para propietarios que quieren resultados confiables',
      eyebrow: 'Servicio completo interior y exterior',
      description: 'Empresa de pintura residencial en Laval para proyectos interiores, exteriores, renovaciones y refrescamientos de casas. Presupuesto gratuito en 24h.',
      intro: 'Peinture Laval está diseñada para propietarios que quieren un servicio claro, rápido y profesional. Gestionamos proyectos de pintura residencial con un enfoque premium.',
      sections: [
        { heading: 'Un solo contacto para su proyecto residencial', body: 'Ya sea que prepare una casa para la venta, renueve una propiedad familiar o modernice varias habitaciones, nuestro equipo estructura el proyecto para respetar los plazos.' },
        { heading: 'Pintura residencial orientada al valor', body: 'Los colores, los acabados y la calidad de aplicación influyen en la percepción de un hogar. Ayudamos a obtener un resultado limpio, moderno y duradero.' },
      ],
      keywords: ['pintura residencial laval', 'empresa pintura laval', 'pintor residencial laval'],
      area: 'Laval',
    },
    {
      path: '/pintor-chomedey',
      title: 'Pintor Chomedey | Peinture Laval',
      h1: 'Pintor en Chomedey para proyectos residenciales limpios y rápidos',
      eyebrow: 'Servicio local en Chomedey',
      description: 'Pintor en Chomedey para pintura interior, exterior y residencial. Presupuesto gratuito en 24h con Peinture Laval.',
      intro: 'Peinture Laval sirve Chomedey con servicios de pintura residencial para casas, condos y propiedades familiares. Nuestro equipo se desplaza rápidamente para evaluar su proyecto.',
      sections: [
        { heading: 'Pintura interior en Chomedey', body: 'Realizamos paredes, techos, molduras, escaleras, puertas y espacios de vida con especial atención a la limpieza de la obra.' },
        { heading: 'Pintura exterior en Chomedey', body: 'Para fachadas, carpintería y puertas exteriores, priorizamos una preparación adaptada a las superficies y al clima.' },
      ],
      keywords: ['pintor chomedey', 'pintura chomedey', 'pintor laval chomedey'],
      area: 'Chomedey',
    },
    {
      path: '/pintor-vimont',
      title: 'Pintor Vimont | Peinture Laval',
      h1: 'Pintor en Vimont para pintura residencial de alta gama',
      eyebrow: 'Servicio local en Vimont',
      description: 'Pintor en Vimont para pintura interior y exterior residencial. Llame a Peinture Laval para un presupuesto gratuito.',
      intro: 'Los propietarios de Vimont pueden contar con Peinture Laval para trabajos de pintura limpios, organizados y duraderos.',
      sections: [
        { heading: 'Proyecto interior en Vimont', body: 'Protegemos los espacios, reparamos pequeñas imperfecciones y aplicamos las capas necesarias para obtener un acabado limpio.' },
        { heading: 'Proyecto exterior en Vimont', body: 'Nuestro servicio exterior ayuda a proteger y realzar el aspecto de fachadas, carpintería y puertas expuestas a las condiciones locales.' },
      ],
      keywords: ['pintor vimont', 'pintura vimont', 'pintor residencial vimont'],
      area: 'Vimont',
    },
    {
      path: '/pintura-sainte-dorothee',
      title: 'Pintor Sainte-Dorothée | Peinture Laval',
      h1: 'Pintor en Sainte-Dorothée para casas residenciales',
      eyebrow: 'Servicio local en Sainte-Dorothée',
      description: 'Pintor en Sainte-Dorothée para pintura interior, exterior y acabado residencial. Presupuesto gratuito en 24h.',
      intro: 'Peinture Laval acompaña a los propietarios de Sainte-Dorothée con un servicio de pintura residencial confiable y orientado a la satisfacción.',
      sections: [
        { heading: 'Pintura interior en Sainte-Dorothée', body: 'Paredes, techos, molduras y puertas se preparan con cuidado para obtener un acabado limpio y moderno.' },
        { heading: 'Pintura exterior en Sainte-Dorothée', body: 'Ayudamos a proteger las superficies exteriores y a mejorar el aspecto general de la propiedad con aplicación profesional.' },
      ],
      keywords: ['pintor sainte-dorothee', 'pintura sainte-dorothee', 'pintor residencial sainte-dorothee'],
      area: 'Sainte-Dorothée',
    },
  ],
}

export const translations: Record<Locale, Translations> = { fr, en, es }
