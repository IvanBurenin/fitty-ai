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
  ChevronLeft,
  ChevronRight,
  Flame,
  Github,
  Globe,
  Languages as LanguagesIcon,
  Maximize2,
  Menu,
  MessageSquare,
  Mic,
  Refrigerator,
  Scale,
  Send,
  ShieldCheck,
  Target,
  X,
} from 'lucide-react'
import {
  CONTENT,
  LANGUAGES,
  isLang,
  type Content,
  type Lang,
} from './content'
import { HERO_SLIDER } from './hero-slider'
import {
  GALLERY_UI,
  HOW,
  MID_CTA,
  STUDIO,
  TRUST,
} from './sections'

const TELEGRAM = 'https://t.me/AiFittyBot'
const REPO = 'https://github.com/IvanBurenin/fitty-ai'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

const DISH_IMAGES: Record<
  string,
  { src: string; srcSet: string; width: number; height: number }
> = {
  caesar: {
    src: 'dishes/caesar-860.webp',
    srcSet: 'dishes/caesar-430.webp 430w, dishes/caesar-860.webp 860w',
    width: 1200,
    height: 900,
  },
  borscht: {
    src: 'dishes/borscht-860.webp',
    srcSet: 'dishes/borscht-430.webp 430w, dishes/borscht-860.webp 860w',
    width: 1707,
    height: 1280,
  },
  bolognese: {
    src: 'dishes/bolognese.webp',
    srcSet: 'dishes/bolognese-430.webp 430w, dishes/bolognese.webp 571w',
    width: 571,
    height: 360,
  },
}

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
  priority = false,
  sizes = '(max-width: 600px) 218px, 320px',
}: {
  screen: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}) {
  const { lang } = useLanding()
  const base = `screens/${lang}/${screen}`
  return (
    <div className={`phone ${className}`}>
      <div className="phone-screen">
        <img
          src={asset(`${base}-780.webp`)}
          srcSet={`${asset(`${base}-480.webp`)} 480w, ${asset(`${base}-780.webp`)} 780w`}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={780}
          height={1688}
        />
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
        <span className="lang-short">{current.short}</span>
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
  const { c, lang } = useLanding()
  const [menuOpen, setMenuOpen] = useState(false)
  const studio = STUDIO[lang]
  const links = [
    ['#screens', c.nav.app],
    ['#ai', c.nav.ai],
    ['#recipes', c.nav.recipes],
    ['#progress', c.nav.progress],
    ['#languages', c.nav.languages],
    ['#studio', studio.label],
    ['#faq', c.nav.faq],
  ] as const

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Fitty home">
          <img
            src={asset('app-icon-64.webp')}
            srcSet={`${asset('app-icon-64.webp')} 64w, ${asset('app-icon-128.webp')} 128w`}
            sizes="32px"
            width={32}
            height={32}
            alt=""
          />
          <span>Fitty</span>
        </a>
        <nav className="nav" aria-label="Sections">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
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
          <a
            className="header-telegram"
            href={TELEGRAM}
            target="_blank"
            rel="noreferrer"
            aria-label={c.headerCta}
            title={c.headerCta}
          >
            <Send size={18} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Menu"
          >
            {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)}>
          <nav
            className="mobile-menu"
            id="mobile-nav"
            aria-label="Sections"
            onClick={(event) => event.stopPropagation()}
          >
            {links.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
            <a
              className="mobile-menu-cta"
              href={TELEGRAM}
              target="_blank"
              rel="noreferrer"
            >
              {c.headerCta}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

function DishSlider() {
  const { lang } = useLanding()
  const slider = HERO_SLIDER[lang]
  const [index, setIndex] = useState(0)
  const count = slider.dishes.length
  const dish = slider.dishes[index]

  const move = (delta: number) => {
    setIndex((current) => (current + delta + count) % count)
  }

  return (
    <div
      className="dish-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={slider.label}
    >
      <div className="dish-photo">
        <div
          className="dish-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slider.dishes.map((item, itemIndex) => {
            const image = DISH_IMAGES[item.key]
            return (
              <img
                key={item.key}
                className="dish-slide"
                src={asset(image?.src ?? `dishes/${item.key}.webp`)}
                srcSet={
                  image
                    ? image.srcSet
                        .split(', ')
                        .map((candidate) => {
                          const [path, descriptor] = candidate.split(' ')
                          return `${asset(path)} ${descriptor}`
                        })
                        .join(', ')
                    : undefined
                }
                sizes="(max-width: 560px) 100vw, 430px"
                width={image?.width}
                height={image?.height}
                alt={itemIndex === index ? item.name : ''}
                aria-hidden={itemIndex !== index}
                loading={itemIndex === 0 ? 'eager' : 'lazy'}
              />
            )
          })}
        </div>
      </div>

      <div className="dish-info" aria-live="polite">
        <div className="dish-title-row">
          <div>
            <div className="dish-name">{dish.name}</div>
            <div className="dish-portion">{dish.portion}</div>
          </div>
          <div className="dish-kcal">
            <strong>{dish.kcal}</strong>
            <span>{slider.kcalUnit}</span>
          </div>
        </div>

        <div className="dish-macros">
          <span>
            <small>{slider.protein}</small>
            <strong>{dish.protein}</strong>
          </span>
          <span>
            <small>{slider.fat}</small>
            <strong>{dish.fat}</strong>
          </span>
          <span>
            <small>{slider.carbs}</small>
            <strong>{dish.carbs}</strong>
          </span>
        </div>
      </div>

      <div className="dish-controls">
        <button
          type="button"
          className="dish-arrow"
          onClick={() => move(-1)}
          aria-label={slider.prev}
        >
          <ChevronLeft size={17} aria-hidden="true" />
        </button>
        <div className="dish-dots">
          {slider.dishes.map((item, itemIndex) => (
            <button
              key={item.key}
              type="button"
              className={`dish-dot${itemIndex === index ? ' active' : ''}`}
              onClick={() => setIndex(itemIndex)}
              aria-label={item.name}
              aria-current={itemIndex === index}
            />
          ))}
        </div>
        <button
          type="button"
          className="dish-arrow"
          onClick={() => move(1)}
          aria-label={slider.next}
        >
          <ChevronRight size={17} aria-hidden="true" />
        </button>
      </div>

      <div className="dish-floats" aria-hidden="true">
        <span className="dish-float dish-float-kcal">
          <strong>{dish.kcal}</strong>
          <small>{slider.kcalUnit}</small>
        </span>
        <span className="dish-float dish-float-protein">
          <small>{slider.protein}</small>
          <strong>{dish.protein}</strong>
        </span>
        <span className="dish-float dish-float-fat">
          <small>{slider.fat}</small>
          <strong>{dish.fat}</strong>
        </span>
        <span className="dish-float dish-float-carbs">
          <small>{slider.carbs}</small>
          <strong>{dish.carbs}</strong>
        </span>
      </div>
    </div>
  )
}

function Hero() {
  const { c } = useLanding()
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <Reveal>
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
          </Reveal>
        </div>

        <Reveal className="hero-visual" delay={120}>
          <div className="hero-halo" aria-hidden="true" />
          <DishSlider />
        </Reveal>
      </div>
    </section>
  )
}

const PILLAR_ICONS = [Camera, Target, Refrigerator]

function HowItWorks() {
  const { lang } = useLanding()
  const how = HOW[lang]
  return (
    <section className="section how-section" id="how">
      <div className="wrap">
        <Reveal>
          <SectionLabel index="02">{how.label}</SectionLabel>
          <div className="section-head">
            <h2 className="section-title">{how.title}</h2>
            <p className="section-lead">{how.lead}</p>
          </div>
        </Reveal>
        <div className="how-steps">
          {how.steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 90} className="how-step">
              <span className="how-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <a className="button button-dark" href={TELEGRAM} target="_blank" rel="noreferrer">
            {how.cta}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

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

function ScreensGallery() {
  const { c, lang } = useLanding()
  const ui = GALLERY_UI[lang]
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const count = c.screens.items.length
  const current = c.screens.items[active]
  const swipeStart = useRef<number | null>(null)

  const move = (delta: number) => {
    setActive((value) => (value + delta + count) % count)
  }

  useEffect(() => {
    if (lightbox === null) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null)
      if (event.key === 'ArrowLeft') {
        setLightbox((value) => (value === null ? null : (value - 1 + count) % count))
      }
      if (event.key === 'ArrowRight') {
        setLightbox((value) => (value === null ? null : (value + 1) % count))
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [lightbox, count])

  return (
    <section className="section screens-section" id="screens">
      <div className="wrap">
        <Reveal>
          <SectionLabel index="03">{c.screens.label}</SectionLabel>
          <div className="section-head">
            <h2 className="section-title">
              <Rich text={c.screens.title} />
            </h2>
            <p className="section-lead">{c.screens.lead}</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div
            className="screens-gallery"
            role="region"
            aria-roledescription="carousel"
            aria-label={c.screens.label}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault()
                move(-1)
              }
              if (event.key === 'ArrowRight') {
                event.preventDefault()
                move(1)
              }
              if (event.key === 'Home') {
                event.preventDefault()
                setActive(0)
              }
              if (event.key === 'End') {
                event.preventDefault()
                setActive(count - 1)
              }
            }}
          >
            <div className="screens-stage">
              <button
                type="button"
                className="screens-featured"
                onClick={() => setLightbox(active)}
                aria-label={`${ui.view}: ${current.label}`}
                onTouchStart={(event) => {
                  swipeStart.current = event.touches[0]?.clientX ?? null
                }}
                onTouchEnd={(event) => {
                  if (swipeStart.current === null) return
                  const end = event.changedTouches[0]?.clientX ?? swipeStart.current
                  const delta = end - swipeStart.current
                  swipeStart.current = null
                  if (Math.abs(delta) > 40) move(delta > 0 ? -1 : 1)
                }}
              >
                <Phone
                  screen={c.screenKeys[active]}
                  alt={current.label}
                  priority={active === 0}
                  sizes="(max-width: 600px) 260px, 340px"
                />
                <span className="screens-expand">
                  <Maximize2 size={15} aria-hidden="true" /> {ui.view}
                </span>
              </button>
              <div className="screens-stage-controls">
                <button
                  type="button"
                  className="screens-arrow"
                  onClick={() => move(-1)}
                  aria-label={ui.prev}
                >
                  <ChevronLeft size={17} aria-hidden="true" />
                </button>
                <span>
                  {active + 1} / {count}
                </span>
                <button
                  type="button"
                  className="screens-arrow"
                  onClick={() => move(1)}
                  aria-label={ui.next}
                >
                  <ChevronRight size={17} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="screens-list" role="tablist" aria-label={c.screens.label}>
              {c.screens.items.map((screen, index) => (
                <button
                  key={c.screenKeys[index]}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  className={`screens-list-item${index === active ? ' active' : ''}`}
                  onClick={() => setActive(index)}
                >
                  <span className="screens-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="screens-list-copy">
                    <span>{screen.label}</span>
                    <strong>{screen.title}</strong>
                  </span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
          <p className="screens-hint">{ui.hint}</p>
        </Reveal>
      </div>

      {lightbox !== null ? (
        <div
          className="screen-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={c.screens.items[lightbox].label}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightbox(null)
          }}
        >
          <button
            type="button"
            className="screen-lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label={ui.close}
            autoFocus
          >
            <X size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="screen-lightbox-arrow prev"
            onClick={() => setLightbox((value) => (value === null ? null : (value - 1 + count) % count))}
            aria-label={ui.prev}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <div className="screen-lightbox-stage">
            <Phone
              screen={c.screenKeys[lightbox]}
              alt={c.screens.items[lightbox].label}
              priority
              sizes="(max-width: 600px) 86vw, 390px"
            />
            <div className="screen-lightbox-caption">
              <span>{c.screens.items[lightbox].label}</span>
              <strong>{c.screens.items[lightbox].title}</strong>
            </div>
          </div>
          <button
            type="button"
            className="screen-lightbox-arrow next"
            onClick={() => setLightbox((value) => (value === null ? null : (value + 1) % count))}
            aria-label={ui.next}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </section>
  )
}

function AiSection() {
  const { c } = useLanding()
  return (
    <section className="section" id="ai">
      <div className="wrap split">
        <Reveal>
          <SectionLabel index="04">{c.ai.label}</SectionLabel>
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
          <SectionLabel index="05">{c.recipes.label}</SectionLabel>
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
          <SectionLabel index="06">{c.progress.label}</SectionLabel>
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
          <SectionLabel index="07">{c.languages.label}</SectionLabel>
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
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="section" id="faq">
      <div className="wrap faq-grid">
        <Reveal>
          <SectionLabel index="09">{c.faq.label}</SectionLabel>
          <h2 className="section-title">
            <Rich text={c.faq.title} />
          </h2>
        </Reveal>
        <Reveal className="faq-list" delay={100}>
          {c.faq.items.map((item, index) => {
            const expanded = open === index
            return (
              <div className={`faq-item${expanded ? ' open' : ''}`} key={item.q}>
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={expanded}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  <span>{item.q}</span>
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </button>
                <div
                  className="faq-answer"
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-hidden={!expanded}
                >
                  <div className="faq-answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

function Studio() {
  const { lang } = useLanding()
  const studio = STUDIO[lang]
  return (
    <section className="section studio-section" id="studio">
      <div className="wrap">
        <Reveal>
          <SectionLabel index="08">{studio.label}</SectionLabel>
          <div className="studio-grid">
            <div className="studio-brand">
              <svg className="studio-mark" viewBox="0 0 40 32" aria-hidden="true">
                <path d="M0 32 L40 0 L40 32 Z" fill="currentColor" />
              </svg>
              <div>
                <h2 className="studio-title">
                  ESPADA
                  <br />
                  ENTERTAINMENT
                </h2>
                <p className="studio-tagline">{studio.tagline}</p>
              </div>
            </div>

            <div className="studio-copy">
              <p className="studio-statement">{studio.title}</p>

              <div className="studio-stats">
                {studio.stats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="studio-projects">
                <p className="studio-projects-label">{studio.projectsLabel}</p>
                <ul className="studio-projects-list">
                  {studio.projects.map((project) => (
                    <li key={project.name}>
                      <a
                        className="studio-project"
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="studio-project-mark" aria-hidden="true">
                          {project.icon === 'espada' ? (
                            <svg viewBox="0 0 40 32">
                              <path d="M0 32 L40 0 L40 32 Z" fill="currentColor" />
                            </svg>
                          ) : (
                            <img
                              src={asset(
                                project.icon === 'tracky'
                                  ? 'tracky-icon.webp'
                                  : project.icon === 'yoggy'
                                    ? 'yoggy-icon.webp'
                                    : 'app-icon-128.webp'
                              )}
                              alt=""
                              width={34}
                              height={34}
                            />
                          )}
                        </span>
                        <span className="studio-project-name">{project.name}</span>
                        <span className="studio-project-role">{project.role}</span>
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="studio-links">
                <a href="https://www.youtube.com/@espadasportsru" target="_blank" rel="noreferrer">
                  <span className="studio-link-icon">▶</span>
                  {studio.youtubeLabel} <span>{studio.youtubeHandle}</span>
                </a>
                <a href={REPO} target="_blank" rel="noreferrer">
                  <Github size={15} aria-hidden="true" />
                  {studio.githubLabel}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Trust() {
  const { lang } = useLanding()
  const trust = TRUST[lang]
  return (
    <section className="section trust-section" id="about">
      <div className="wrap">
        <Reveal className="trust-band">
          <div className="trust-copy">
            <SectionLabel index="10">{trust.label}</SectionLabel>
            <h2>{trust.title}</h2>
            <p>{trust.body}</p>
          </div>
          <div className="trust-side">
            <span className="trust-version">{trust.version}</span>
            <div className="trust-links">
              <a href={asset('privacy.html')}>{trust.privacy}</a>
              <a href={asset('terms.html')}>{trust.terms}</a>
              <a href="https://github.com/IvanBurenin/fitty-ai/issues" target="_blank" rel="noreferrer">
                {trust.contact}
              </a>
              <a href={REPO} target="_blank" rel="noreferrer">
                <Github size={14} aria-hidden="true" /> {trust.github}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function MidCta() {
  const { lang } = useLanding()
  const mid = MID_CTA[lang]
  return (
    <section className="section mid-cta-section">
      <div className="wrap">
        <Reveal className="mid-cta">
          <div>
            <p className="eyebrow eyebrow-light">{mid.title}</p>
            <p className="mid-cta-body">{mid.body}</p>
          </div>
          <a className="button button-light" href={TELEGRAM} target="_blank" rel="noreferrer">
            <Send size={16} aria-hidden="true" />
            {mid.button}
          </a>
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
          <div className="cta-qr">
            <img
              src={asset('telegram-qr.webp')}
              width={92}
              height={92}
              alt="@AiFittyBot QR code"
              loading="lazy"
            />
            <div>
              <strong>@AiFittyBot</strong>
              <span>t.me/AiFittyBot</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  const { c, lang } = useLanding()
  const trust = TRUST[lang]
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <img
            src={asset('app-icon-64.webp')}
            srcSet={`${asset('app-icon-64.webp')} 64w, ${asset('app-icon-128.webp')} 128w`}
            sizes="28px"
            width={28}
            height={28}
            alt=""
          />
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
          <a href={asset('privacy.html')}>{trust.privacy}</a>
          <a href={asset('terms.html')}>{trust.terms}</a>
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
        <HowItWorks />
        <ScreensGallery />
        <MidCta />
        <AiSection />
        <RecipesSection />
        <ProgressSection />
        <Languages />
        <Studio />
        <Faq />
        <Trust />
        <Cta />
      </main>
      <Footer />
    </LandingContext.Provider>
  )
}
