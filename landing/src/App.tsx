import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  CalendarCheck,
  Check,
  ChevronDown,
  Flame,
  Github,
  Globe,
  Languages as LanguagesIcon,
  MessageSquare,
  Mic,
  Refrigerator,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
} from 'lucide-react'
import {
  CONTENT,
  LANGUAGES,
  isLang,
  type Content,
  type Lang,
} from './content'

const TELEGRAM = 'https://t.me/AiFittyBot'
const REPO = 'https://github.com/IvanBurenin/fitty-ai'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

interface LandingValue {
  c: Content
  lang: Lang
  setLang: (lang: Lang) => void
}

const LandingContext = createContext<LandingValue | null>(null)

function useLanding(): LandingValue {
  const value = useContext(LandingContext)
  if (!value) throw new Error('Landing context is missing')
  return value
}

function detectLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const params = new URLSearchParams(window.location.search)
  const telegram = (
    window as unknown as {
      Telegram?: { WebApp?: { initDataUnsafe?: { user?: { language_code?: string } } } }
    }
  ).Telegram?.WebApp?.initDataUnsafe?.user?.language_code
  let stored: string | null = null
  try {
    stored = window.localStorage.getItem('fitty-lang')
  } catch {
    stored = null
  }
  const candidates = [params.get('lang'), stored, telegram, navigator.language]
  for (const value of candidates) {
    if (!value) continue
    const base = value.toLowerCase().replace('_', '-').split('-')[0]
    if (isLang(base)) return base
  }
  return 'en'
}

function setMeta(selector: string, attribute: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    const match = selector.match(/\[(name|property)="([^"]+)"\]/)
    if (match) element.setAttribute(match[1], match[2])
    document.head.appendChild(element)
  }
  element.setAttribute(attribute, value)
}

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, lineIndex) => (
        <span key={lineIndex}>
          {lineIndex > 0 ? <br /> : null}
          {line.split(/(\*[^*]+\*)/g).map((part, partIndex) =>
            part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
              <em key={partIndex}>{part.slice(1, -1)}</em>
            ) : (
              <span key={partIndex}>{part}</span>
            ),
          )}
        </span>
      ))}
    </>
  )
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('in')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add('in')
            observer.unobserve(node)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    const fallback = window.setTimeout(() => node.classList.add('in'), 3000)
    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function Phone({
  screen,
  alt,
  className = '',
}: {
  screen: string
  alt: string
  className?: string
}) {
  const { lang } = useLanding()
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen">
        <img src={asset(`screens/${lang}/${screen}.png`)} alt={alt} loading="lazy" />
      </div>
    </div>
  )
}

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="eyebrow-index">{index}</span>
      <span>{children}</span>
    </p>
  )
}

function LanguageSwitcher() {
  const { c, lang, setLang } = useLanding()
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, LANGUAGES.findIndex((item) => item.code === lang)),
  )
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const current =
    LANGUAGES.find((item) => item.code === lang) ?? LANGUAGES[0]

  useEffect(() => {
    if (!open) return
    const index = Math.max(
      0,
      LANGUAGES.findIndex((item) => item.code === lang),
    )
    setActiveIndex(index)
    const timer = window.setTimeout(() => {
      optionRefs.current[index]?.focus()
    }, 0)
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [lang, open])

  const close = (focusButton = true) => {
    setOpen(false)
    if (focusButton) buttonRef.current?.focus()
  }

  const choose = (code: Lang) => {
    setLang(code)
    close()
  }

  const move = (delta: number) => {
    const next = (activeIndex + delta + LANGUAGES.length) % LANGUAGES.length
    setActiveIndex(next)
    optionRefs.current[next]?.focus()
  }

  const onMenuKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      move(1)
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      move(-1)
      return
    }
    if (event.key === 'Home') {
      event.preventDefault()
      setActiveIndex(0)
      optionRefs.current[0]?.focus()
      return
    }
    if (event.key === 'End') {
      event.preventDefault()
      const last = LANGUAGES.length - 1
      setActiveIndex(last)
      optionRefs.current[last]?.focus()
      return
    }
    if (event.key === 'Tab') setOpen(false)
  }

  return (
    <div className="lang-switch" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${c.langLabel}: ${current.native}`}
        title={c.langLabel}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (
            event.key === 'ArrowDown' ||
            event.key === 'ArrowUp' ||
            event.key === 'Enter' ||
            event.key === ' '
          ) {
            event.preventDefault()
            setOpen(true)
          }
        }}
      >
        <Globe size={14} aria-hidden="true" />
        <span className="lang-current">{current.native}</span>
        <ChevronDown className="lang-chevron" size={13} aria-hidden="true" />
      </button>

      {open ? (
        <div
          className="lang-menu"
          role="listbox"
          aria-label={c.langLabel}
          onKeyDown={onMenuKeyDown}
        >
          {LANGUAGES.map((item, index) => (
            <button
              key={item.code}
              ref={(element) => {
                optionRefs.current[index] = element
              }}
              type="button"
              role="option"
              aria-selected={item.code === lang}
              tabIndex={-1}
              className={`lang-option${index === activeIndex ? ' is-active' : ''}`}
              onClick={() => choose(item.code)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="lang-native">{item.native}</span>
              <span className="lang-code">{item.short}</span>
              {item.code === lang ? (
                <Check className="lang-check" size={14} aria-hidden="true" />
              ) : (
                <span className="lang-check" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function Header() {
  const { c } = useLanding()
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Fitty home">
          <img src={asset('app-icon.png')} width={32} height={32} alt="" />
          <span>Fitty</span>
        </a>
        <nav className="nav" aria-label="Sections">
          <a href="#screens">{c.nav.app}</a>
          <a href="#ai">{c.nav.ai}</a>
          <a href="#recipes">{c.nav.recipes}</a>
          <a href="#languages">{c.nav.languages}</a>
          <a href="#faq">{c.nav.faq}</a>
        </nav>
        <div className="header-actions">
          <LanguageSwitcher />
          <a
            className="button button-primary header-cta"
            href={TELEGRAM}
            target="_blank"
            rel="noreferrer"
          >
            {c.headerCta}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  const { c } = useLanding()
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <Reveal>
            <p className="eyebrow">
              <span className="dot" aria-hidden="true" />
              {c.hero.eyebrow}
            </p>
            <h1>
              <Rich text={c.hero.title} />
            </h1>
            <p className="lede">{c.hero.lede}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={TELEGRAM} target="_blank" rel="noreferrer">
                {c.hero.cta}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a className="button button-ghost" href="#screens">
                {c.hero.secondary}
              </a>
            </div>
            <p className="hero-meta">{c.hero.meta}</p>
          </Reveal>
        </div>

        <Reveal className="hero-visual" delay={120}>
          <div className="hero-halo" aria-hidden="true" />
          <div className="float float-calories">
            <span className="float-label">{c.hero.floatLabel}</span>
            <strong>{c.hero.floatTitle}</strong>
            <span className="float-sub">{c.hero.floatSub}</span>
          </div>
          <div className="float float-ai">
            <Sparkles size={16} aria-hidden="true" />
            <span>{c.hero.floatAi}</span>
          </div>
          <div className="float float-badge" aria-hidden="true">
            <Camera size={18} />
          </div>
          <Phone
            screen="home"
            alt={`Fitty ${c.screens.items[0].label}`}
            className="hero-phone"
          />
        </Reveal>
      </div>
    </section>
  )
}

const PILLAR_ICONS = [Camera, Target, Refrigerator]

function Pillars() {
  const { c } = useLanding()
  return (
    <section className="section pillars-section">
      <div className="wrap">
        <Reveal>
          <SectionLabel index="01">{c.pillars.label}</SectionLabel>
          <h2 className="section-title">
            <Rich text={c.pillars.title} />
          </h2>
        </Reveal>
        <div className="pillars">
          {c.pillars.items.map((pillar, index) => {
            const Icon = PILLAR_ICONS[index] ?? Camera
            return (
              <Reveal key={pillar.title} delay={index * 90} className="pillar">
                <span className="pillar-icon" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Screens() {
  const { c } = useLanding()
  return (
    <section className="section screens-section" id="screens">
      <div className="wrap">
        <Reveal>
          <SectionLabel index="02">{c.screens.label}</SectionLabel>
          <div className="section-head">
            <h2 className="section-title">
              <Rich text={c.screens.title} />
            </h2>
            <p className="section-lead">{c.screens.lead}</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="screens-track" role="list">
            {c.screens.items.map((screen, index) => (
              <article className="screen-card" key={c.screenKeys[index]} role="listitem">
                <Phone
                  screen={c.screenKeys[index]}
                  alt={`Fitty ${screen.label} screen`}
                />
                <div className="screen-caption">
                  <span className="screen-label">{screen.label}</span>
                  <h3>{screen.title}</h3>
                  <p>{screen.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function AiSection() {
  const { c } = useLanding()
  return (
    <section className="section" id="ai">
      <div className="wrap split">
        <Reveal>
          <SectionLabel index="03">{c.ai.label}</SectionLabel>
          <h2 className="section-title">
            <Rich text={c.ai.title} />
          </h2>
          <p className="body-text">{c.ai.body}</p>
          <ul className="feature-list">
            {c.ai.features.map((feature, index) => {
              const Icon = [Camera, Mic, Refrigerator, MessageSquare][index] ?? Check
              return (
                <li key={feature}>
                  <Icon size={16} aria-hidden="true" /> {feature}
                </li>
              )
            })}
          </ul>
          <div className="prompts" aria-label={c.ai.label}>
            {c.ai.prompts.map((prompt) => (
              <span key={prompt}>{prompt}</span>
            ))}
          </div>
          <a className="text-link" href={TELEGRAM} target="_blank" rel="noreferrer">
            {c.ai.link} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal className="split-visual" delay={120}>
          <div className="soft-halo" aria-hidden="true" />
          <Phone screen="ai" alt={`Fitty ${c.screens.items[5].label}`} />
        </Reveal>
      </div>
    </section>
  )
}

function RecipesSection() {
  const { c } = useLanding()
  return (
    <section className="section section-tinted" id="recipes">
      <div className="wrap split split-reverse">
        <Reveal className="split-visual" delay={120}>
          <div className="soft-halo soft-halo-warm" aria-hidden="true" />
          <Phone screen="recipes" alt={`Fitty ${c.screens.items[3].label}`} />
        </Reveal>
        <Reveal>
          <SectionLabel index="04">{c.recipes.label}</SectionLabel>
          <h2 className="section-title">
            <Rich text={c.recipes.title} />
          </h2>
          <p className="body-text">{c.recipes.body}</p>
          <div className="mini-stats">
            {c.recipes.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <a className="text-link" href={TELEGRAM} target="_blank" rel="noreferrer">
            {c.recipes.link} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function ProgressSection() {
  const { c } = useLanding()
  const icons = [Scale, Flame, CalendarCheck, ShieldCheck]
  return (
    <section className="section" id="progress">
      <div className="wrap split">
        <Reveal>
          <SectionLabel index="05">{c.progress.label}</SectionLabel>
          <h2 className="section-title">
            <Rich text={c.progress.title} />
          </h2>
          <p className="body-text">{c.progress.body}</p>
          <div className="checkin-row">
            {c.progress.chips.map((chip, index) => {
              const Icon = icons[index] ?? Scale
              return (
                <span key={chip}>
                  <Icon size={16} aria-hidden="true" /> {chip}
                </span>
              )
            })}
          </div>
          <a className="text-link" href={TELEGRAM} target="_blank" rel="noreferrer">
            {c.progress.link} <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </Reveal>
        <Reveal className="split-visual" delay={120}>
          <div className="soft-halo" aria-hidden="true" />
          <Phone screen="progress" alt={`Fitty ${c.screens.items[4].label}`} />
        </Reveal>
      </div>
    </section>
  )
}

function Languages() {
  const { c, lang, setLang } = useLanding()
  return (
    <section className="section languages-section" id="languages">
      <div className="wrap">
        <Reveal>
          <SectionLabel index="06">{c.languages.label}</SectionLabel>
          <div className="languages-head">
            <h2 className="section-title">
              <Rich text={c.languages.title} />
            </h2>
            <p className="section-lead">{c.languages.lead}</p>
          </div>
          <ul className="languages">
            {LANGUAGES.map((language) => (
              <li key={language.code}>
                <button
                  type="button"
                  className={language.code === lang ? 'is-active' : ''}
                  onClick={() => setLang(language.code)}
                  aria-pressed={language.code === lang}
                >
                  <LanguagesIcon size={14} aria-hidden="true" />
                  {language.native}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

function Faq() {
  const { c } = useLanding()
  return (
    <section className="section" id="faq">
      <div className="wrap faq-grid">
        <Reveal>
          <SectionLabel index="07">{c.faq.label}</SectionLabel>
          <h2 className="section-title">
            <Rich text={c.faq.title} />
          </h2>
        </Reveal>
        <Reveal className="faq-list" delay={100}>
          {c.faq.items.map((item) => (
            <details key={item.q}>
              <summary>
                <span>{item.q}</span>
                <span className="faq-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Cta() {
  const { c } = useLanding()
  return (
    <section className="section cta-section">
      <div className="wrap">
        <Reveal className="cta">
          <div className="cta-glow" aria-hidden="true" />
          <p className="eyebrow eyebrow-light">{c.cta.eyebrow}</p>
          <h2>
            <Rich text={c.cta.title} />
          </h2>
          <p>{c.cta.body}</p>
          <a className="button button-light" href={TELEGRAM} target="_blank" rel="noreferrer">
            <Send size={16} aria-hidden="true" />
            {c.cta.button}
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  const { c } = useLanding()
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <img src={asset('app-icon.png')} width={28} height={28} alt="" />
          <div>
            <strong>Fitty</strong>
            <span>{c.footer.tagline}</span>
          </div>
        </div>
        <div className="footer-links">
          <a href={TELEGRAM} target="_blank" rel="noreferrer">
            {c.footer.telegram}
          </a>
          <a href={REPO} target="_blank" rel="noreferrer">
            <Github size={14} aria-hidden="true" /> {c.footer.github}
          </a>
          <a href="https://github.com/IvanBurenin" target="_blank" rel="noreferrer">
            {c.footer.author}
          </a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} Fitty</p>
      </div>
    </footer>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>(detectLang)
  const c = CONTENT[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = c.meta.title
    setMeta('meta[name="description"]', 'content', c.meta.description)
    setMeta('meta[property="og:title"]', 'content', c.meta.title)
    setMeta('meta[property="og:description"]', 'content', c.meta.description)
    setMeta('meta[property="og:locale"]', 'content', c.meta.ogLocale)
    setMeta('meta[name="twitter:title"]', 'content', c.meta.title)
    setMeta('meta[name="twitter:description"]', 'content', c.meta.description)
    try {
      window.localStorage.setItem('fitty-lang', lang)
    } catch {
      // Storage can be unavailable in embedded webviews.
    }
    const url = new URL(window.location.href)
    if (lang === 'en') url.searchParams.delete('lang')
    else url.searchParams.set('lang', lang)
    window.history.replaceState({}, '', url)
  }, [c, lang])

  return (
    <LandingContext.Provider value={{ c, lang, setLang }}>
      <Header />
      <main id="main">
        <Hero />
        <Pillars />
        <Screens />
        <AiSection />
        <RecipesSection />
        <ProgressSection />
        <Languages />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </LandingContext.Provider>
  )
}
