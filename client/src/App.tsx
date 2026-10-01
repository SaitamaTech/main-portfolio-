import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleArrowOutUpRight,
  Code2,
  Command,
  Database,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  MoveUpRight,
  Network,
  Orbit,
  PanelTop,
  Phone,
  Play,
  Plus,
  Send,
  Sparkles,
  TerminalSquare,
  X,
  Zap,
} from "lucide-react";
import {
  categories,
  journey,
  processStages,
  profile,
  projects,
  services,
  skills,
  type Project,
} from "./data/portfolio";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormState = { name: "", email: "", subject: "", message: "" };

function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`logo-lockup${compact ? " logo-lockup--compact" : ""}`}>
      <span className="logo-mark" aria-hidden="true">
        <span className="logo-orbit logo-orbit--red" />
        <span className="logo-orbit logo-orbit--blue" />
        <span className="logo-core" />
      </span>
      {!compact && <span className="logo-wordmark">Saitama<span>Tech</span></span>}
    </span>
  );
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label__index">{index}</span>
      <span className="section-label__line" />
      <span>{children}</span>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual project-visual--${project.visual}`} aria-label={`${project.name} system preview`}>
      <div className="visual-grid" />
      <div className="visual-scanline" />
      <div className="visual-window">
        <div className="visual-window__bar"><span /><span /><span /><small>{project.id}.system</small></div>
        {project.visual === "businux" ? (
          <div className="businux-visual">
            <div className="visual-command"><span>›</span> create an invoice for Johnson<span className="typing-caret" /></div>
            <div className="visual-response"><Check size={12} /> Invoice created</div>
            <div className="visual-response"><Check size={12} /> PDF generated</div>
            <div className="visual-response"><Check size={12} /> Customer notified</div>
            <div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" />
          </div>
        ) : project.visual === "cinevault" ? (
          <div className="cinevault-visual">
            <div className="cinevault-cover cinevault-cover--one"><span>01</span></div>
            <div className="cinevault-cover cinevault-cover--two"><span>02</span></div>
            <div className="cinevault-cover cinevault-cover--three"><span>03</span></div>
            <div className="cinevault-caption"><span>DISCOVER / SAVE / RETURN</span><strong>the next story</strong></div>
          </div>
        ) : (
          <div className="northstar-visual">
            <div className="northstar-ring ring-one" /><div className="northstar-ring ring-two" />
            <div className="northstar-axis axis-x" /><div className="northstar-axis axis-y" />
            <div className="northstar-node node-one" /><div className="northstar-node node-two" /><div className="northstar-node node-three" />
            <div className="northstar-readout"><span>MARKET / SIGNAL</span><strong>northstar</strong><small>client · server · shared</small></div>
          </div>
        )}
      </div>
      <div className="visual-footer"><span>SAITAMATECH / {project.number}</span><span>VIEW_SYSTEM <ArrowUpRight size={12} /></span></div>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <article className="project-card interactive-target" onClick={() => onOpen(project)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onOpen(project); } }} tabIndex={0} role="button" aria-label={`Open ${project.name} project details`}>
      <div className="project-card__meta"><span>{project.number} / 03</span><span>{project.eyebrow}</span></div>
      <div className="project-card__body">
        <div className="project-card__copy">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="tag-row">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
          <div className="project-card__cta">Open case study <ArrowUpRight size={17} /></div>
        </div>
        <ProjectVisual project={project} />
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
        <button ref={closeButton} className="icon-button modal-close interactive-target" onClick={onClose} aria-label="Close project details"><X size={20} /></button>
        <div className="project-modal__top"><span>{project.number} / SELECTED WORK</span><span>{project.eyebrow}</span></div>
        <div className="project-modal__heading"><div><h2 id="project-modal-title">{project.name}</h2><p>{project.overview}</p></div><a className="button button--primary interactive-target" href={project.repo} target="_blank" rel="noreferrer">View repository <ExternalLink size={16} /></a></div>
        <ProjectVisual project={project} />
        <div className="modal-grid">
          <div><span className="modal-label">Problem</span><p>{project.problem}</p></div>
          <div><span className="modal-label">Solution</span><p>{project.solution}</p></div>
          <div><span className="modal-label">Architecture</span><p className="architecture-line">{project.architecture}</p></div>
          <div><span className="modal-label">Repository note</span><p>{project.note}</p></div>
        </div>
        <div className="modal-features"><span className="modal-label">Verified signals</span><div>{project.features.map((feature) => <span key={feature}><Check size={14} />{feature}</span>)}</div></div>
        <div className="modal-footer"><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="text-link interactive-target" href={project.repo} target="_blank" rel="noreferrer">Inspect source <ArrowRight size={16} /></a></div>
      </div>
    </div>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 50, y: 22 });
  const [cursorHover, setCursorHover] = useState(false);
  const [activeProcess, setActiveProcess] = useState(1);
  const [activeTech, setActiveTech] = useState(skills[0]);
  const [category, setCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [form, setForm] = useState(initialForm);
  const [formState, setFormState] = useState<"idle" | "error" | "sent">("idle");
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      setPointer({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 });
      const target = event.target as HTMLElement;
      setCursorHover(Boolean(target.closest("a, button, [role='button'], .interactive-target")));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", Boolean(selectedProject || mobileOpen));
    return () => document.body.classList.remove("is-locked");
  }, [selectedProject, mobileOpen]);

  const filteredSkills = useMemo(() => category === "All" ? skills : skills.filter((skill) => skill.category === category), [category]);
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject || "Project enquiry for SaitamaTech")}&body=${encodeURIComponent(`Hi Israel,\n\n${form.message || "I would like to discuss a project."}\n\nFrom ${form.name || "a potential collaborator"}`)}`;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) || !form.subject.trim() || !form.message.trim()) {
      setFormState("error");
      return;
    }
    setFormState("sent");
  };

  return (
    <div className="site-shell" style={{ "--pointer-x": `${pointer.x}%`, "--pointer-y": `${pointer.y}%` } as React.CSSProperties}>
      <div className="cursor-dot" aria-hidden="true" /><div className={`cursor-ring${cursorHover ? " cursor-ring--active" : ""}`} aria-hidden="true" />
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div className="ambient-glow ambient-glow--pointer" aria-hidden="true" />

      <header className={`site-nav${scrolled ? " site-nav--scrolled" : ""}`}>
        <a className="nav-brand interactive-target" href="#home" onClick={() => scrollTo("home")} aria-label="SaitamaTech home"><LogoMark /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {["about", "skills", "projects", "services", "saitama", "contact"].map((item, index) => <a className="nav-link interactive-target" href={`#${item}`} key={item} onClick={() => scrollTo(item)}><span>0{index + 1}</span>{item === "saitama" ? "SaitamaTech" : item}</a>)}
        </nav>
        <div className="nav-status"><span className="status-dot" /> Building in public</div>
        <button className="menu-toggle icon-button interactive-target" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen}><Menu size={22} /></button>
      </header>
      {mobileOpen && <div className="mobile-nav"><div className="mobile-nav__inner"><div className="mobile-nav__label">Navigate / SaitamaTech</div>{["home", "about", "skills", "projects", "services", "saitama", "contact"].map((item, index) => <a key={item} href={`#${item}`} onClick={() => scrollTo(item)}><span>0{index + 1}</span>{item === "saitama" ? "SaitamaTech" : item}</a>)}<div className="mobile-nav__footer">Available for thoughtful builds <span className="status-dot" /></div></div></div>}

      <main ref={mainRef}>
        <section className="hero section-shell" id="home">
          <div className="hero__grid" aria-hidden="true" /><div className="hero__noise" aria-hidden="true" />
          <div className="hero__content">
            <Reveal><div className="eyebrow"><span className="eyebrow__signal" /> SAITAMATECH / INDEPENDENT SOFTWARE STUDIO</div></Reveal>
            <Reveal delay={90}><h1>Build <em>serious</em><br /><span>software</span> with intent.</h1></Reveal>
            <Reveal delay={180}><p className="hero__lede">I’m <strong>Israel Lawal</strong> — a Full-Stack Developer, AI Engineer, and Software Architect designing intelligent digital products through SaitamaTech.</p></Reveal>
            <Reveal delay={260}><div className="hero__actions"><button className="button button--primary interactive-target" onClick={() => scrollTo("projects")}>View my work <ArrowDownRight size={17} /></button><button className="button button--ghost interactive-target" onClick={() => scrollTo("contact")}>Let's work together <ArrowRight size={16} /></button><a className="button button--icon interactive-target" href={profile.github} target="_blank" rel="noreferrer" aria-label="Open SaitamaTech GitHub"><Github size={18} /></a></div></Reveal>
            <Reveal delay={340}><div className="hero__footnote"><span>Based in Nigeria / building globally</span><span className="hero__scroll-cue"><span /> Scroll to explore</span></div></Reveal>
          </div>
          <div className="hero__system" aria-label="Interactive system preview">
            <div className="system-card system-card--main"><div className="system-card__top"><span className="system-card__dots"><i /><i /><i /></span><span>israel-lawal / system.map</span><span>LIVE</span></div><div className="system-card__body"><div className="system-card__title"><span>01</span><strong>Ideas in.<br /><em>Products</em> out.</strong></div><div className="system-lines"><span style={{ width: "82%" }} /><span style={{ width: "58%" }} /><span style={{ width: "71%" }} /><span style={{ width: "38%" }} /></div><div className="system-card__node"><span className="pulse-ring" /><span className="system-node-dot" /><div><span>CORE / SAITAMATECH</span><strong>intelligent systems</strong></div></div></div><div className="system-card__bottom"><span>ARCHITECTURE</span><span>DEVELOPMENT</span><span>INTELLIGENCE</span></div></div>
            <div className="floating-chip floating-chip--top"><Sparkles size={13} /><span>Product thinking</span></div><div className="floating-chip floating-chip--bottom"><span className="status-dot" /> available for meaningful work</div>
          </div>
          <div className="hero__side-label">01 — / INTRODUCTION</div>
        </section>

        <section className="intro section-shell section-shell--light" id="about">
          <div className="section-aside"><SectionLabel index="02">The approach</SectionLabel><p>Software should feel obvious on the surface because the thinking underneath is clear.</p></div>
          <div className="intro__content"><Reveal><h2>Building ideas<br /><em>into real products.</em></h2></Reveal><Reveal delay={100}><p className="intro__lead">SaitamaTech is where product ideas become structured, responsive, intelligent systems. The work moves across full-stack development, AI engineering, SaaS, web applications, APIs, databases, and the architecture that lets each piece hold together.</p></Reveal><Reveal delay={180}><div className="process-rail" role="tablist" aria-label="Product development process">{processStages.map((stage, index) => <button key={stage.name} className={`process-step interactive-target${activeProcess === index ? " is-active" : ""}`} onClick={() => setActiveProcess(index)} role="tab" aria-selected={activeProcess === index}><span>{stage.index}</span><strong>{stage.name}</strong><i /></button>)}</div><div className="process-detail"><span>ACTIVE SYSTEM STAGE / {processStages[activeProcess].index}</span><p>{processStages[activeProcess].detail}</p></div></Reveal></div>
        </section>

        <section className="skills section-shell" id="skills">
          <div className="section-heading"><SectionLabel index="03">Capabilities</SectionLabel><Reveal><h2>A stack with<br /><em>a point of view.</em></h2></Reveal><p>Technologies are not trophies. They are the tools behind a clearer product, sourced from the work visible in the repositories.</p></div>
          <div className="skills__layout"><div className="skill-categories"><div className="category-tabs" role="tablist" aria-label="Skill categories">{categories.map((item) => <button key={item} className={`category-tab interactive-target${category === item ? " is-active" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="skill-list">{filteredSkills.map((skill) => <button key={skill.name} className={`skill-item interactive-target${activeTech.name === skill.name ? " is-active" : ""}`} onClick={() => setActiveTech(skill)}><span>{skill.name}</span><small>{skill.category}</small><ArrowUpRight size={15} /></button>)}</div></div><div className="tech-detail"><div className="tech-detail__orb"><div className="tech-detail__ring ring-a" /><div className="tech-detail__ring ring-b" /><div className="tech-detail__core"><Orbit size={29} /><span>TECH / {activeTech.category.toUpperCase()}</span></div><span className="tech-detail__satellite satellite-a" /><span className="tech-detail__satellite satellite-b" /></div><span className="modal-label">Selected technology</span><h3>{activeTech.name}</h3><p>{activeTech.detail}</p><div className="related"><span>Related projects</span><div>{activeTech.related.map((item) => <span key={item}>{item}</span>)}</div></div></div></div>
        </section>

        <section className="work section-shell section-shell--light" id="projects">
          <div className="section-heading section-heading--row"><div><SectionLabel index="04">Selected work</SectionLabel><Reveal><h2>Products with<br /><em>a point of view.</em></h2></Reveal></div><div className="section-heading__note"><span>01 — 03</span><p>A selection of products and systems built through SaitamaTech. Explore the source, not the surface.</p></div></div>
          <div className="project-stack">{projects.map((project, index) => <Reveal key={project.id} delay={index * 90}><ProjectCard project={project} onOpen={setSelectedProject} /></Reveal>)}</div><div className="work__footer"><span>MORE SYSTEMS / MORE SIGNAL</span><a className="button button--outline interactive-target" href={profile.github} target="_blank" rel="noreferrer">View more projects <Github size={16} /></a></div>
        </section>

        <section className="journey section-shell" id="journey">
          <div className="section-aside"><SectionLabel index="05">The journey</SectionLabel><p>No titles manufactured. Just the progression from learning to shipping — and the company that grew around it.</p></div>
          <div className="journey__content"><Reveal><h2>Keep moving<br /><em>towards useful.</em></h2></Reveal><div className="journey-line" aria-label="Development journey">{journey.map((item, index) => <div className={`journey-step${index === journey.length - 1 ? " journey-step--last" : ""}`} key={item.label}><span className="journey-step__dot">{String(index + 1).padStart(2, "0")}</span><div><h3>{item.label}</h3><p>{item.detail}</p></div></div>)}</div></div>
        </section>

        <section className="saitama section-shell section-shell--accent" id="saitama"><div className="saitama__glow" aria-hidden="true" /><div className="saitama__mark"><LogoMark compact /><div className="saitama__orbit orbit-large" /><div className="saitama__orbit orbit-small" /></div><div className="saitama__content"><SectionLabel index="06">The company</SectionLabel><Reveal><h2>Saitama<span>Tech</span></h2></Reveal><p className="saitama__tagline">Building the future,<br /><em>one product at a time.</em></p><p>SaitamaTech is Israel Lawal’s technology brand and company focused on building software products, AI-powered applications, and digital solutions with a clear path from idea to impact.</p><div className="founder-line"><span>Founder</span><strong>Israel Lawal</strong><ArrowUpRight size={18} /></div></div></section>

        <section className="services section-shell" id="services"><div className="section-heading"><SectionLabel index="07">What I build</SectionLabel><Reveal><h2>Good systems make<br /><em>ambition usable.</em></h2></Reveal></div><div className="service-grid">{services.map((service, index) => <Reveal key={service.number} delay={index * 60}><article className="service-card interactive-target"><div className="service-card__top"><span>{service.number}</span><ArrowUpRight size={18} /></div><h3>{service.title}</h3><p>{service.body}</p><span className="service-card__signal">SAITAMATECH / SERVICE</span></article></Reveal>)}</div></section>

        <section className="universe section-shell section-shell--light" id="universe"><div className="section-heading section-heading--row"><div><SectionLabel index="08">Technology universe</SectionLabel><Reveal><h2>Everything<br /><em>connects.</em></h2></Reveal></div><p className="section-heading__note">Hover or tap a node to see the relationship between tools, categories, and the products they help shape.</p></div><div className="universe__layout"><div className="universe-map"><div className="universe-map__grid" /><div className="universe-core"><LogoMark compact /><span>ISRAEL / SAITAMATECH</span></div>{skills.slice(0, 12).map((skill, index) => { const angle = (index / 12) * 360; return <button key={skill.name} className={`universe-node node-${index + 1} interactive-target`} style={{ "--angle": `${angle}deg` } as React.CSSProperties} onClick={() => setActiveTech(skill)} aria-label={`Show ${skill.name} details`}><span>{skill.name}</span><i /></button>; })}</div><div className="universe-detail"><span className="modal-label">Current node</span><div className="universe-detail__title"><span className="universe-detail__icon"><Network size={20} /></span><h3>{activeTech.name}</h3></div><p>{activeTech.detail}</p><div className="universe-detail__meta"><span>Category <strong>{activeTech.category}</strong></span><span>Related <strong>{activeTech.related[0]}</strong></span></div><div className="universe-detail__line"><span /><span /></div></div></div></section>

        <section className="github section-shell" id="github"><div className="github__mark"><Github size={31} /></div><div><SectionLabel index="09">Open source & code</SectionLabel><Reveal><h2>The source is<br /><em>part of the story.</em></h2></Reveal><p>Explore the repositories behind the work, follow the experiments, and see how the systems evolve in public.</p></div><a className="button button--primary interactive-target" href={profile.github} target="_blank" rel="noreferrer">Visit SaitamaTech on GitHub <ExternalLink size={16} /></a></section>

        <section className="contact section-shell section-shell--light" id="contact"><div className="contact__heading"><SectionLabel index="10">Start a conversation</SectionLabel><Reveal><h2>Let's build something<br /><em>exceptional.</em></h2></Reveal><p>Have an idea, product, or technical challenge? Let’s turn it into something real.</p><div className="contact-links"><a href={`mailto:${profile.email}`} className="contact-link interactive-target"><Mail size={17} /><span>{profile.email}</span><ArrowUpRight size={15} /></a><a href={`tel:${profile.phone}`} className="contact-link interactive-target"><Phone size={17} /><span>{profile.phone}</span><ArrowUpRight size={15} /></a><a href={profile.whatsapp} target="_blank" rel="noreferrer" className="contact-link interactive-target"><MessageCircle size={17} /><span>WhatsApp</span><ArrowUpRight size={15} /></a></div></div><form className="contact-form" onSubmit={handleSubmit} noValidate><div className="form-intro"><span>01 / CONTACT FORM</span><p>Send a note. Your message will open in your email client after validation.</p></div><label><span>Name</span><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Your name" autoComplete="name" /></label><label><span>Email</span><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@company.com" autoComplete="email" /></label><label><span>Subject</span><input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="What are we building?" /></label><label><span>Message</span><textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell me a little about the idea..." rows={5} /></label>{formState === "error" && <p className="form-message form-message--error" role="alert">Please complete every field with a valid email before continuing.</p>}{formState === "sent" && <div className="form-message form-message--success" role="status"><Check size={16} /><span>Your note is ready. Choose your preferred handoff below.</span><div><a href={mailto} className="text-link interactive-target">Open email <Mail size={15} /></a><a href={profile.whatsapp} target="_blank" rel="noreferrer" className="text-link interactive-target">Open WhatsApp <MessageCircle size={15} /></a></div></div>}<button type="submit" className="button button--primary button--full interactive-target">{formState === "sent" ? "Message validated" : "Send message"} <Send size={16} /></button><span className="form-note">No server-side email service is configured — this form never pretends to send.</span></form></section>
      </main>

      <footer className="site-footer"><div className="footer-top"><a href="#home" onClick={() => scrollTo("home")} className="interactive-target"><LogoMark /></a><span>Built by Israel Lawal.</span><div className="footer-links"><a href={profile.github} target="_blank" rel="noreferrer" className="interactive-target">GitHub <ExternalLink size={13} /></a><a href={profile.whatsapp} target="_blank" rel="noreferrer" className="interactive-target">WhatsApp <ExternalLink size={13} /></a><a href={`mailto:${profile.email}`} className="interactive-target">Email <ExternalLink size={13} /></a></div></div><div className="footer-bottom"><span>© 2026 SaitamaTech. All rights reserved.</span><span>Designed for systems that matter.</span></div></footer>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}

export default App;
