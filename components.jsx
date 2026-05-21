/* global React */
const { useState, useEffect, useRef } = React;

// =====================================================================
// PRIMITIVES
// =====================================================================

const WHATSAPP_LINK = 'https://wa.me/554899552868';
const EMAIL_COMERCIAL = 'comercial@fertali.com.br';
const ENDERECO_FABRICA = 'R. da Independência - Naspolini, Morro da Fumaça - SC, 88837-000';
const WHATSAPP_LABEL = '+55 48 9955-2868';
const MAPS_LINK = 'https://www.google.com/maps/search/?api=1&query=R.%20da%20Independ%C3%AAncia%20-%20Naspolini%2C%20Morro%20da%20Fuma%C3%A7a%20-%20SC%2C%2088837-000';

const Marquee = ({ children, speed = 40, reverse = false }) => {
  const items = Array(6).fill(children);
  return (
    <div className="marquee" style={{ ['--speed']: `${speed}s`, ['--dir']: reverse ? 'reverse' : 'normal' }}>
      <div className="marquee__track">
        {items.map((c, i) => (
          <span className="marquee__item" key={i}>{c}<span className="marquee__sep">●</span></span>
        ))}
      </div>
      <div className="marquee__track" aria-hidden="true">
        {items.map((c, i) => (
          <span className="marquee__item" key={i}>{c}<span className="marquee__sep">●</span></span>
        ))}
      </div>
    </div>
  );
};

const Reveal = ({ children, delay = 0, as: Tag = 'div', className = '', style = {} }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <Tag ref={ref} className={`reveal ${shown ? 'reveal--in' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  );
};

const Placeholder = ({ label, ratio = '4/3', accent = false, dense = false }) => (
  <div className={`ph ${accent ? 'ph--accent' : ''} ${dense ? 'ph--dense' : ''}`} style={{ aspectRatio: ratio }}>
    <div className="ph__stripes" />
    <div className="ph__corner ph__corner--tl">+</div>
    <div className="ph__corner ph__corner--tr">+</div>
    <div className="ph__corner ph__corner--bl">+</div>
    <div className="ph__corner ph__corner--br">+</div>
    <div className="ph__label">{label}</div>
  </div>
);

const Tag = ({ children, accent = false }) => (
  <span className={`tag ${accent ? 'tag--accent' : ''}`}>
    <span className="tag__dot" />
    {children}
  </span>
);

// =====================================================================
// NAV
// =====================================================================

const Nav = ({ headline }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__logo">
          <img src="assets/logo-f.png" alt="Fertali" className="nav__logo-mark" />
          <span className="nav__logo-text">
            <strong>FERTALI</strong>
            <em>INDUSTRIAL</em>
          </span>
        </a>
        <div className="nav__links">
          <a href="#sobre">Sobre</a>
          <a href="#produtos">Produtos</a>
          <a href="#servicos">Serviços</a>
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
        </div>
        <a href={WHATSAPP_LINK} className="nav__cta" target="_blank" rel="noopener noreferrer">
          Fale conosco <span className="nav__cta-arrow">→</span>
        </a>
      </div>
    </nav>
  );
};

// =====================================================================
// HERO VARIATIONS
// =====================================================================

const HeroTypography = ({ headline, subhead }) => (
  <header className="hero hero--type" id="top">
    <div className="hero__grid-bg" />
    <div className="hero__noise" />

    <div className="hero__topbar">
      <span>FERTALI / IND. {new Date().getFullYear()}</span>
      <span className="hero__topbar-mid">CORTE · DOBRA</span>
      <span>BR · SP · MG · GO</span>
    </div>

    <img src="assets/logo-f.png" alt="" className="hero__giant-f" />

    <div className="hero__content">
      <Reveal as="div" className="hero__eyebrow">
        <span className="hero__eyebrow-bar" />
        Indústria de ferro · desde 2026
      </Reveal>

      <Reveal as="h1" className="hero__title" delay={120}>
        {headline.split('\n').map((line, i) => (
          <span className="hero__title-line" key={i}>{line}</span>
        ))}
      </Reveal>

      <Reveal as="p" className="hero__sub" delay={260}>
        {subhead}
      </Reveal>

      <Reveal as="div" className="hero__actions" delay={380}>
        <a href="#produtos" className="btn btn--primary">
          Ver catálogo
          <span className="btn__arrow">→</span>
        </a>
        <a href={WHATSAPP_LINK} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
          Falar com a fábrica
        </a>
      </Reveal>

    </div>

    <div className="hero__bottom">
      <span className="hero__scroll">↓ ROLE</span>
      <span className="hero__coords">23°32'S · 46°38'W</span>
    </div>
  </header>
);

const HeroSplit = ({ headline, subhead }) => (
  <header className="hero hero--split" id="top">
    <div className="hero__grid-bg" />
    <div className="hero-split__left">
      <Reveal as="div" className="hero__eyebrow">
        <span className="hero__eyebrow-bar" />
        Indústria de ferro · desde 1998
      </Reveal>
      <Reveal as="h1" className="hero__title hero__title--split" delay={120}>
        {headline.split('\n').map((line, i) => (
          <span className="hero__title-line" key={i}>{line}</span>
        ))}
      </Reveal>
      <Reveal as="p" className="hero__sub" delay={260}>{subhead}</Reveal>
      <Reveal as="div" className="hero__actions" delay={380}>
        <a href="#produtos" className="btn btn--primary">Ver catálogo<span className="btn__arrow">→</span></a>
        <a href={WHATSAPP_LINK} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">Falar com a fábrica</a>
      </Reveal>
    </div>
    <div className="hero-split__right">
      <Placeholder label="FOTO · LINHA DE PRODUÇÃO" ratio="3/4" />
      <div className="hero-split__meta">
        <div><span>01 /</span> CORTE</div>
        <div><span>02 /</span> DOBRA</div>
        <div><span>03 /</span> MONTAGEM</div>

      </div>
    </div>
  </header>
);

const HeroFullbleed = ({ headline, subhead }) => (
  <header className="hero hero--full" id="top">
    <div className="hero-full__bg">
      <Placeholder label="FÁBRICA · FULL BLEED" ratio="16/9" />
      <div className="hero-full__veil" />
    </div>
    <div className="hero-full__content">
      <Reveal as="div" className="hero__eyebrow hero__eyebrow--light">
        <span className="hero__eyebrow-bar" />
        Indústria de ferro · desde 1998
      </Reveal>
      <Reveal as="h1" className="hero__title" delay={120}>
        {headline.split('\n').map((line, i) => (
          <span className="hero__title-line" key={i}>{line}</span>
        ))}
      </Reveal>
      <Reveal as="p" className="hero__sub" delay={260}>{subhead}</Reveal>
      <Reveal as="div" className="hero__actions" delay={380}>
        <a href="#produtos" className="btn btn--primary">Ver catálogo<span className="btn__arrow">→</span></a>
        <a href={WHATSAPP_LINK} className="btn btn--ghost btn--ghost-light" target="_blank" rel="noopener noreferrer">Falar com a fábrica</a>
      </Reveal>
    </div>
  </header>
);

const Hero = ({ variant, headline, subhead }) => {
  if (variant === 'split') return <HeroSplit headline={headline} subhead={subhead} />;
  if (variant === 'full') return <HeroFullbleed headline={headline} subhead={subhead} />;
  return <HeroTypography headline={headline} subhead={subhead} />;
};

// =====================================================================
// MARQUEE STRIP
// =====================================================================

const Strip = () => (
  <section className="strip">
    <Marquee speed={45}>
      <span>DOBRA</span>
      <span>CORTE</span>
    </Marquee>
  </section> 
);

// =====================================================================
// SOBRE
// =====================================================================

const Sobre = () => (
  <section className="section sobre" id="sobre">
    <div className="section__head">
      <span className="section__num">01 — SOBRE</span>
      <h2 className="section__title">
        <span>Tecnologia, precisão e eficiência</span>
        <span className="section__title-accent">para transformar metal em solução.</span>
      </h2>
    </div>

    <div className="sobre__grid">
      <Reveal as="div" className="sobre__lead">
        <p>
          A <strong>Fertali Industrial</strong> é especializada em corte e dobra de chapas e tubos, oferecendo
          soluções técnicas para diferentes demandas industriais e estruturais.
        </p>
        <p>
          Combinando tecnologia, precisão e compromisso com a qualidade, atuamos no processamento
          de metais como aço carbono, inox e alumínio, garantindo peças com alto padrão de acabamento
          e desempenho.
        </p>
        <p>
          Nossa estrutura é preparada para atender projetos de diferentes complexidades, entregando
          agilidade, confiabilidade e suporte técnico em cada etapa do processo.
        </p>
        <p>
          Além dos serviços de corte e dobra, a Fertali também atua com fornecimento de chapas e tubos.
        </p>
      </Reveal>

      <Reveal as="div" className="sobre__media" delay={200}>
        <img
          className="sobre__photo"
          src="uploads/corte-ferro.jpg"
          alt="Corte de ferro em processo industrial"
        />
      </Reveal>

      <Reveal as="div" className="sobre__pillars" delay={300}>
        <div className="pillar">
          <div className="pillar__num">/01</div>
          <h3>Corte e dobra especializados</h3>
          <p>Processos técnicos para chapas e tubos com precisão e repetibilidade industrial.</p>
        </div>
        <div className="pillar">
          <div className="pillar__num">/02</div>
          <h3>Qualidade de acabamento</h3>
          <p>Atendimento em aço carbono, inox e alumínio com alto padrão de desempenho.</p>
        </div>
        <div className="pillar">
          <div className="pillar__num">/03</div>
          <h3>Agilidade e suporte técnico</h3>
          <p>Estrutura pronta para projetos complexos e fornecimento de chapas e tubos.</p>
        </div>
      </Reveal>
    </div>
  </section>
);

// =====================================================================
// PRODUTOS
// =====================================================================

const PRODUCTS = [
  { code: 'P-01', name: 'Estruturas metálicas', desc: 'Galpões, mezaninos, coberturas industriais e treliças sob projeto.', tag: 'industrial', image: 'uploads/estrutura-metalica.jpg' },
  { code: 'P-02', name: 'Esquadrias de ferro', desc: 'Portas, janelas, portões e gradis em aço maciço, sob medida.', tag: 'arquitetônico', image: 'uploads/esquadria_ferro.jpg' },
  { code: 'P-03', name: 'Perfis e barras', desc: 'Cantoneiras, vigas U, I, H, tubos e barras chatas, cortados na medida.', tag: 'matéria-prima', image: 'uploads/perfis-ferros.jpg' },
  { code: 'P-04', name: 'Peças sob desenho', desc: 'Caldeiraria pesada e peças usinadas a partir de projeto técnico.', tag: 'sob medida', image: 'uploads/pecas-sob-desenho.jpg' },
  { code: 'P-05', name: 'Escadas e guarda-corpos', desc: 'Estruturas circuladas, escadas marinheiro, plataformas e mezaninos.', tag: 'industrial', image: 'uploads/escada-ferro.jpg' },
  { code: 'P-06', name: 'Serralheria de obra', desc: 'Detalhes em ferro para construção: vergas, pilares, ferragens.', tag: 'civil', image: 'uploads/corte-fero2.jpg' },
];

const Produtos = () => {
  const [active, setActive] = useState(0);
  return (
    <section className="section produtos" id="produtos">
      <div className="section__head">
        <span className="section__num">02 — PRODUTOS</span>
        <h2 className="section__title">
          <span>O catálogo</span>
          <span className="section__title-accent">do ferro.</span>
        </h2>
      </div>

      <div className="produtos__layout">
        <div className="produtos__list">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.code}
              className={`prod-row ${active === i ? 'prod-row--active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="prod-row__code">{p.code}</span>
              <span className="prod-row__name">{p.name}</span>
              <span className="prod-row__tag">{p.tag}</span>
              <span className="prod-row__arrow">→</span>
            </button>
          ))}
        </div>

        <div className="produtos__preview">
          <div className="prod-preview">
            <img
              className="prod-preview__image"
              src={PRODUCTS[active].image}
              alt={PRODUCTS[active].name}
            />
            <div className="prod-preview__meta">
              <div className="prod-preview__code">{PRODUCTS[active].code}</div>
              <h3 className="prod-preview__name">{PRODUCTS[active].name}</h3>
              <p className="prod-preview__desc">{PRODUCTS[active].desc}</p>
              <a href="#contato" className="btn btn--primary btn--sm">
                Pedir cotação <span className="btn__arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// =====================================================================
// SERVIÇOS / PROCESSOS
// =====================================================================

const PROCESSES = [
  { step: '01', name: 'Briefing & Engenharia', desc: 'Recebemos seu desenho ou levantamos as medidas em campo. Engenharia interna gera o projeto executivo.' },
  { step: '02', name: 'Corte & Conformação', desc: 'Plasma CNC, guilhotina e dobradeira hidráulica. Tolerância milimétrica em série ou unitário.' },
  { step: '03', name: 'Solda & Montagem', desc: 'Solda MIG, TIG e arco submerso. Pré-montagem em fábrica para garantir o encaixe em obra.' },
  { step: '04', name: 'Acabamento', desc: 'Jateamento, primer, pintura epóxi ou galvanização a fogo conforme a aplicação.' },
  { step: '05', name: 'Logística & Içamento', desc: 'Frota própria, prancha, munck e equipe especializada para içamento e instalação.' },
];

const Servicos = () => (
  <section className="section servicos" id="servicos">
    <div className="section__head">
      <span className="section__num">03 — PROCESSO</span>
      <h2 className="section__title">
        <span>Da chapa</span>
        <span className="section__title-accent">à entrega.</span>
      </h2>
    </div>

    <div className="processo">
      {PROCESSES.map((p, i) => (
        <Reveal as="div" key={p.step} className="processo__row" delay={i * 80}>
          <div className="processo__step">{p.step}</div>
          <div className="processo__name">{p.name}</div>
          <div className="processo__desc">{p.desc}</div>
          <div className="processo__bar"><div className="processo__bar-fill" /></div>
        </Reveal>
      ))}
    </div>
  </section>
);

// =====================================================================
// PROJETOS
// =====================================================================

const PROJECTS = [
  { code: 'PRJ-2024-118', name: 'Galpão Logístico — Cajamar/SP', cat: 'Estrutura metálica', size: '8.400 m²', span: 'wide' },
  { code: 'PRJ-2024-091', name: 'Portão Industrial — Betim/MG', cat: 'Esquadria pesada', size: '12 × 6 m' },
  { code: 'PRJ-2023-077', name: 'Mezanino Fábrica — Goiânia/GO', cat: 'Estrutura + escada', size: '1.200 m²' },
  { code: 'PRJ-2023-052', name: 'Cobertura Pátio — Hortolândia/SP', cat: 'Treliça espacial', size: '3.100 m²', span: 'wide' },
  { code: 'PRJ-2023-014', name: 'Escada Marinheiro — Paulínia/SP', cat: 'Serralheria industrial', size: '24 m' },
  { code: 'PRJ-2022-203', name: 'Residência — Alphaville/SP', cat: 'Esquadria arquitetônica', size: 'sob medida' },
];

const Projetos = () => (
  <section className="section projetos" id="projetos">
    <div className="section__head">
      <span className="section__num">04 — PROJETOS</span>
      <h2 className="section__title">
        <span>Obras que</span>
        <span className="section__title-accent">já levam nossa marca.</span>
      </h2>
    </div>

    <div className="projetos__grid">
      {PROJECTS.map((p, i) => (
        <Reveal as="article" key={p.code} className={`proj ${p.span === 'wide' ? 'proj--wide' : ''}`} delay={i * 80}>
          <div className="proj__media">
            <Placeholder label={p.code} ratio="4/3" />
            <span className="proj__cat">{p.cat}</span>
          </div>
          <div className="proj__meta">
            <span className="proj__code">{p.code}</span>
            <h3 className="proj__name">{p.name}</h3>
            <span className="proj__size">{p.size}</span>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

// =====================================================================
// CTA + FOOTER
// =====================================================================

const CTA = () => (
  <section className="cta" id="contato">
    <div className="cta__inner">
      <div className="cta__eyebrow">— FALE COM A FÁBRICA</div>
      <h2 className="cta__title">
        Manda seu projeto.<br/>
        <span className="cta__title-accent">Devolvemos em ferro.</span>
      </h2>
      <p className="cta__sub">
        Orçamento em até 48h úteis. Atendemos do anteprojeto à instalação final, em todo território nacional.
      </p>
      <div className="cta__contacts">
        <a href={WHATSAPP_LINK} className="cta__contact" target="_blank" rel="noopener noreferrer">
          <span className="cta__contact-label">Comercial</span>
          <span className="cta__contact-val">{WHATSAPP_LABEL}</span>
        </a>
        <a href={`mailto:${EMAIL_COMERCIAL}`} className="cta__contact">
          <span className="cta__contact-label">E-mail</span>
          <span className="cta__contact-val">{EMAIL_COMERCIAL}</span>
        </a>
        <a href={MAPS_LINK} className="cta__contact" target="_blank" rel="noopener noreferrer">
          <span className="cta__contact-label">Fábrica</span>
          <span className="cta__contact-val">{ENDERECO_FABRICA}</span>
        </a>
      </div>
    </div>
  </section>
);

const SocialIcon = ({ kind }) => {
  const paths = {
    in: <><rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M7 10v7M7 7.5v.01M11 17v-4a2 2 0 0 1 4 0v4M11 13v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></>,
    ig: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6"/><circle cx="17" cy="7" r="1" fill="currentColor"/></>,
    wa: <path d="M20 12a8 8 0 0 1-12.1 6.9L4 20l1.2-3.7A8 8 0 1 1 20 12Z M9 9.5c.2 1.5 1.7 3.3 3.5 4.3.7.4 1.3.4 1.8 0l.6-.6c.2-.2.5-.2.7 0l1.3 1c.2.2.2.5 0 .7-.6.7-1.4 1.1-2.3 1.1-3 0-6-3-6-6 0-.9.4-1.7 1.1-2.3.2-.2.5-.2.7 0l1 1.3c.2.2.2.5 0 .7l-.6.6c-.4.5-.4 1.1 0 1.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></>,
  };
  return <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">{paths[kind]}</svg>;
};

const Footer = () => (
  <footer className="footer" id="contato-footer">
    <div className="footer__inner">
      <div className="footer__cols">
        <div className="footer__brand">
          <a href="#top" className="footer__logo">
            <img src="assets/logo-f.png" alt="" className="footer__mark" />
            <span className="footer__logo-text">
              <strong>Fertali</strong>
              <em>INDUSTRIAL</em>
            </span>
          </a>
          <p className="footer__desc">
            Indústria verticalizada de ferro e estruturas metálicas. Da chapa bruta à instalação em obra — engenharia, forja e precisão sob o mesmo teto.
          </p>
        </div>

        <div className="footer__col">
          <div className="footer__label">Navegação</div>
          <a href="#sobre">Sobre</a>
          <a href="#produtos">Produtos</a>
          <a href="#servicos">Serviços</a>
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
        </div>

        <div className="footer__col">
          <div className="footer__label">Contato</div>
          <a href={`mailto:${EMAIL_COMERCIAL}`}>{EMAIL_COMERCIAL}</a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">{WHATSAPP_LABEL}</a>
          <span>{ENDERECO_FABRICA}</span>
        </div>

        <div className="footer__col">
          <div className="footer__label">Redes sociais</div>
          <div className="footer__socials">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer__social"><SocialIcon kind="wa" /></a>
            <a href={`mailto:${EMAIL_COMERCIAL}`} aria-label="E-mail" className="footer__social"><SocialIcon kind="mail" /></a>
          </div>
        </div>
      </div>

      <div className="footer__rule" />

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Fertali Industrial. Todos os direitos reservados.</span>
        <span>CNPJ 00.000.000/0001-00 · Morro da Fumaça / Brasil</span>
      </div>
    </div>
  </footer>
);

// =====================================================================
// WHATSAPP FLOAT
// =====================================================================

const WhatsAppFloat = () => (
  <a
    href={WHATSAPP_LINK}
    className="wa-float"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar pelo WhatsApp"
  >
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <path d="M20 12a8 8 0 0 1-12.1 6.9L4 20l1.2-3.7A8 8 0 1 1 20 12Z M9 9.5c.2 1.5 1.7 3.3 3.5 4.3.7.4 1.3.4 1.8 0l.6-.6c.2-.2.5-.2.7 0l1.3 1c.2.2.2.5 0 .7-.6.7-1.4 1.1-2.3 1.1-3 0-6-3-6-6 0-.9.4-1.7 1.1-2.3.2-.2.5-.2.7 0l1 1.3c.2.2.2.5 0 .7l-.6.6c-.4.5-.4 1.1 0 1.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  </a>
);

// =====================================================================
// EXPORTS
// =====================================================================

Object.assign(window, {
  Nav, Hero, Strip, Sobre, Produtos, Servicos, Projetos, CTA, Footer, WhatsAppFloat,
});
