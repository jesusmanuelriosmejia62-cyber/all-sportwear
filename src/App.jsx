import { useEffect, useMemo, useState } from 'react'
import { NAV, PRODUCTS, SPORTS, STORE, TYPES, catLabel, cop } from './Data'
import './styles.css'
import './animations.css'

const asset = (p) => `${import.meta.env.BASE_URL}${p}`
const photo = (id, w = 1400) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

const PHOTOS = {
  hero: photo('photo-1431324155629-1a6deb1dec8d', 2000),
  hombre: photo('photo-1560272564-c83b66b1ad12', 1200),
  mujer: photo('photo-1518459031867-a89b944bffe4', 1200),
  ninos: photo('photo-1526232761682-d26e03ac148e', 1200),
  outlet: photo('photo-1551958219-acbc608c6377', 1200),
  duel: photo('photo-1543326727-cf6c39e8f84c', 900),
  jersey: photo('photo-1517466787929-bc90951d0974', 900),
  ball: photo('photo-1579952363873-27f3bade9f55', 900),
}

/* ───────── rutas por hash (funcionan en GitHub Pages) ───────── */
function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [pathPart, queryPart] = raw.split('?')
  const query = Object.fromEntries(new URLSearchParams(queryPart || ''))
  const seg = pathPart.split('/').filter(Boolean)
  if (seg[0] === 'producto' && seg[1]) return { name: 'product', id: seg[1] }
  if (seg[0] === 'categoria') return { name: 'category', view: seg[1] || 'todo', query }
  return { name: 'home' }
}

const catPath = (view, o = {}) => {
  const p = new URLSearchParams()
  Object.entries(o).forEach(([k, v]) => v && p.set(k, v))
  const qs = p.toString()
  return `/categoria/${view}${qs ? '?' + qs : ''}`
}

function useHashRoute() {
  const [route, setRoute] = useState(parseHash)
  useEffect(() => {
    const on = () => setRoute(parseHash())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  const navigate = (to) => {
    if (window.location.hash.replace(/^#/, '') === to) { setRoute(parseHash()); return }
    window.location.hash = to
  }
  return [route, navigate]
}

function useStored(key, init) {
  const [v, set] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? init } catch { return init } })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* almacenamiento bloqueado */ } }, [key, v])
  return [v, set]
}

/* ───────── ilustraciones neutras de producto ───────── */
function Garment({ kind, a, b }) {
  const edge = '#00000026'
  switch (kind) {
    case 'shirt': return (<>
      <path d="M62 34 88 24Q100 40 112 24L138 34 172 64 152 88 138 78V164H62V78L48 88 28 64Z" fill={a} stroke={edge} />
      <path d="M88 24Q100 44 112 24" fill="none" stroke={b} strokeWidth="6" strokeLinecap="round" />
      <path d="M28 64 48 88M172 64 152 88" stroke={b} strokeWidth="7" strokeLinecap="round" />
      <rect x="62" y="108" width="76" height="12" fill={b} opacity=".9" />
    </>)
    case 'shorts': return (<>
      <path d="M50 50H150L160 146H108L100 100 92 146H40Z" fill={a} stroke={edge} />
      <rect x="50" y="50" width="100" height="14" fill={b} />
      <path d="M62 70 54 140M138 70 146 140" stroke={b} strokeWidth="5" strokeLinecap="round" />
    </>)
    case 'hoodie': return (<>
      <path d="M62 44 84 32Q100 56 116 32L138 44 178 108 156 122 140 102V166H60V102L44 122 22 108Z" fill={a} stroke={edge} />
      <path d="M84 32Q100 12 116 32Q100 60 84 32Z" fill={b} opacity=".55" />
      <path d="M92 58V84M108 58V84" stroke={b} strokeWidth="3" strokeLinecap="round" />
      <path d="M72 128H128L122 150H78Z" fill={b} opacity=".35" />
    </>)
    case 'shoe': return (<>
      <path d="M24 128C22 106 30 88 46 84L58 82C64 80 68 76 70 68L74 56C76 50 84 50 90 56C100 68 112 78 128 84C150 92 174 98 186 112C192 120 190 128 186 130H28Z" fill={a} stroke={edge} />
      <path d="M46 84C52 92 64 94 76 90L74 60" fill="none" stroke={b} strokeWidth="3" opacity=".5" />
      <path d="M94 70l12 10M104 78l12 10M114 86l12 10" stroke={b} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M36 116C76 118 128 108 178 114" fill="none" stroke={b} strokeWidth="5" strokeLinecap="round" />
      <path d="M22 130H190Q192 138 184 138H28Q20 138 22 130Z" fill={b} />
      {[40, 62, 84, 124, 146, 168].map((x) => <path key={x} d={`M${x} 138l3 8 3-8Z`} fill={b} />)}
    </>)
    case 'ball': return (<>
      <circle cx="100" cy="100" r="62" fill="#fff" stroke="#111" strokeWidth="3" />
      <polygon points="100,70 126,89 116,119 84,119 74,89" fill={b} />
      <path d="M100 70V40M126 89 152 80M116 119 134 144M84 119 66 144M74 89 48 80" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <path d="M152 80 164 100 154 124 134 144M48 80 36 100 46 124 66 144M100 40 126 44M100 40 74 44" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="100" r="62" fill="none" stroke={a === '#FFFFFF' ? '#111' : a} strokeWidth="3" />
    </>)
    case 'socks': return (<>
      <path d="M58 24H98V108L136 132Q148 142 142 156 134 168 116 162L66 142Q52 136 52 120Z" fill={a} stroke={edge} />
      <rect x="58" y="24" width="40" height="16" fill={b} />
      <rect x="58" y="52" width="40" height="8" fill={b} opacity=".7" />
      <path d="M104 30H142V104L164 118Q172 126 168 138 160 148 146 142L120 130" fill={a} stroke={edge} opacity=".85" />
      <rect x="104" y="30" width="38" height="14" fill={b} opacity=".85" />
    </>)
    default: return null
  }
}

function Art({ p, color = 0, className = '' }) {
  const col = p.colors[color] || p.colors[0]
  if (col.img) return <div className={'art ' + className}><img src={col.img} alt={p.name} loading="lazy" /></div>
  return (
    <div className={'art ' + className}>
      <svg viewBox="0 0 200 200" role="img" aria-label={`${p.name}, ${col.n}`}>
        <ellipse cx="100" cy="176" rx="64" ry="5" fill="#000" opacity=".08" />
        <Garment kind={p.kind} a={col.a} b={col.b} />
      </svg>
    </div>
  )
}

/* ───────── piezas comunes ───────── */
const BagIcon = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>)
const SearchIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>)

/* Menú desplegable a todo el ancho: se abre al pasar el mouse (o al tocar en el celular). */
function MegaMenu({ k, go }) {
  const label = NAV.find(([x]) => x === k)[1]
  const big = [[`Ver todo · ${label}`, {}], ...TYPES.map(([t, n]) => [n, { type: t }])]
  let i = 0
  const item = (cls, text, o) => <button key={text} className={cls} style={{ '--i': i++ }} onClick={() => go(k, o)}>{text}</button>
  return (
    <div className="mega" role="menu" aria-label={label}>
      <div className="mega-in">
        <div className="mega-col wide">
          <p className="mega-title" style={{ '--i': i++ }}>Compra {label.toLowerCase()}</p>
          {big.map(([t, o]) => item('mega-big', t, o))}
        </div>
        <div className="mega-col">
          <p className="mega-title" style={{ '--i': i++ }}>Por deporte</p>
          {SPORTS.map((s) => item('mega-small', s, { sport: s }))}
          <button className="mega-small alt" style={{ '--i': i++ }} onClick={() => go('outlet')}>Ver outlet</button>
        </div>
      </div>
    </div>
  )
}

function Header({ view = '', count, onCart, go: goTo }) {
  const [q, setQ] = useState('')
  const [shrunk, setShrunk] = useState(false)
  const [mega, setMega] = useState(null)
  const go = (v, o) => { setMega(null); goTo(v, o) }
  const submit = (e) => { e.preventDefault(); go('todo', { q: q.trim() }) }
  useEffect(() => {
    const on = (e) => e.key === 'Escape' && setMega(null)
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [])
  useEffect(() => {
    const on = () => {
      setShrunk(window.scrollY > 40)
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      document.documentElement.style.setProperty('--p', String(Math.min(1, window.scrollY / max)))
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (<>
    <div className="announce">Envíos en Ocaña y a todo el país · Pide por WhatsApp</div>
    {mega && <div className="mega-backdrop" onClick={() => setMega(null)} />}
    <header className={'top' + (shrunk ? ' shrunk' : '') + (mega ? ' open' : '')} onMouseLeave={() => setMega(null)}>
      <a className="brand" href="#/" aria-label={`${STORE.name} — inicio`}><img src={asset('logo.png')} alt="" width="52" height="52" /></a>
      <nav aria-label="Categorías">
        {NAV.map(([k, label]) => (
          <button key={k} className={(view === k ? 'on' : '') + (mega === k ? ' hot' : '')} aria-expanded={mega === k}
            onMouseEnter={() => setMega(k)} onFocus={() => setMega(k)}
            onClick={() => (window.matchMedia('(hover: none)').matches && mega !== k ? setMega(k) : go(k))}>{label}</button>
        ))}
      </nav>
      <form className="search" onSubmit={submit} role="search">
        <SearchIcon />
        <input type="search" placeholder="Buscar" aria-label="Buscar productos" value={q} onChange={(e) => setQ(e.target.value)} />
      </form>
      <button className="bag" onClick={onCart} aria-label={`Abrir bolsa, ${count} productos`}>
        <BagIcon />{count > 0 && <b key={count}>{count}</b>}
      </button>
      {mega && <MegaMenu key={mega} k={mega} go={go} />}
    </header>
  </>)
}

function Footer({ go }) {
  const wa = `https://wa.me/${STORE.whatsapp}`
  return (
    <footer className="site-footer">
      <div className="foot-grid">
        <div>
          <h5>Comprar</h5>
          {NAV.map(([k, label]) => <button key={k} onClick={() => go(k)}>{label}</button>)}
        </div>
        <div>
          <h5>Ayuda</h5>
          <a href={wa} target="_blank" rel="noreferrer">Pedir por WhatsApp</a>
          <span>Cambios en 30 días</span>
          <span>Envíos a todo el país</span>
        </div>
        <div>
          <h5>Tienda</h5>
          <span>{STORE.city}</span>
          <span>Lun–Sáb · 9am–7pm</span>
        </div>
        <div className="foot-logo">
          <img src={asset('logo.png')} alt="All Sport — tienda deportiva" width="96" height="96" loading="lazy" />
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 {STORE.name} · Tienda deportiva · {STORE.city}</span>
        <span>Catálogo de ejemplo — precios y fotos por confirmar</span>
      </div>
    </footer>
  )
}

const Marquee = ({ items, reverse, outline }) => (
  <div className={'marquee' + (outline ? ' outline' : '')} aria-hidden="true">
    <div className={'marquee-track' + (reverse ? ' rev' : '')}>
      {[0, 1].map((k) => <div key={k}>{items.map((t, i) => <span key={i}>{t}<i>✦</i></span>)}</div>)}
    </div>
  </div>
)

function ProductCard({ p, navigate, i = 0 }) {
  const [ci, setCi] = useState(0)
  return (
    <article className="card reveal" style={{ '--d': i % 4 }}>
      <button className="card-main" onClick={() => navigate('/producto/' + p.id)} aria-label={p.name}>
        {p.old ? <span className="badge sale">-{Math.round((1 - p.price / p.old) * 100)}%</span> : p.tag && <span className="badge">{p.tag}</span>}
        <Art p={p} color={ci} />
      </button>
      {p.colors.length > 1 && (
        <div className="dots" aria-label="Colores">
          {p.colors.map((c, i) => <button key={i} className={i === ci ? 'on' : ''} style={{ background: c.a }} title={c.n} aria-label={c.n} onClick={() => setCi(i)} />)}
        </div>
      )}
      <div className="card-info">
        <h3>{p.name}</h3>
        <p className="muted">{catLabel(p.cat)} · {p.sport}</p>
        <p className="price">{cop(p.price)} {p.old && <s>{cop(p.old)}</s>}</p>
      </div>
    </article>
  )
}

const Grid = ({ list, navigate }) => (
  <div className="grid">{list.map((p, i) => <ProductCard key={p.id} p={p} navigate={navigate} i={i} />)}</div>
)

/* ───────── páginas ───────── */
function Home({ go, navigate, ...hdr }) {
  const news = PRODUCTS.filter((p) => p.tag || p.old).slice(0, 8)
  const tiles = [['hombre', 'Hombre', PHOTOS.hombre], ['mujer', 'Mujer', PHOTOS.mujer], ['ninos', 'Niños', PHOTOS.ninos], ['outlet', 'Outlet', PHOTOS.outlet]]
  const story = [
    ['Ropa', 'Camisetas y conjuntos', PHOTOS.jersey, { type: 'ropa' }],
    ['Calzado', 'Guayos y tenis', PHOTOS.duel, { type: 'calzado' }],
    ['Accesorios', 'Balones y medias', PHOTOS.ball, { type: 'accesorios' }],
  ]
  return (<>
    <Header go={go} {...hdr} />
    <section className="hero">
      <img className="hero-bg" src={PHOTOS.hero} alt="" />
      <div className="hero-copy">
        <p className="eyebrow intro" style={{ '--d': 0 }}>Tienda deportiva · {STORE.city}</p>
        <h1 aria-label="Tu equipo empieza aquí">
          <span className="hline" aria-hidden="true"><span style={{ '--d': 1 }}>Tu equipo</span></span>
          <span className="hline" aria-hidden="true"><span style={{ '--d': 2 }}>empieza aquí</span></span>
        </h1>
        <p className="lead intro" style={{ '--d': 3 }}>Camisetas, guayos, balones y ropa para entrenar. Pide por WhatsApp y te lo llevamos.</p>
        <div className="row intro" style={{ '--d': 4 }}>
          <button className="pill light" onClick={() => go('todo')}>Comprar</button>
          <button className="pill ghost-light" onClick={() => go('outlet')}>Ver outlet</button>
        </div>
      </div>
      <span className="scroll-cue" aria-hidden="true">Scroll</span>
    </section>

    <Marquee items={['All Sport', 'Tienda deportiva', 'Ocaña', 'Camisetas', 'Guayos', 'Balones']} />

    <section className="tiles" aria-label="Categorías">
      {tiles.map(([k, t, src], i) => (
        <button key={k} className="tile reveal" style={{ '--d': i % 2 }} onClick={() => go(k)}>
          <img src={src} alt="" loading="lazy" />
          <span className="tile-copy"><small>Para</small><b>{t}</b><i className="pill light sm">Ver todo</i></span>
        </button>
      ))}
    </section>

    <section className="section">
      <div className="sec-head reveal"><h2>Lo nuevo y en oferta</h2><button className="link" onClick={() => go('todo')}>Ver todo →</button></div>
      <div className="rail">{news.map((p, i) => <ProductCard key={p.id} p={p} navigate={navigate} i={i} />)}</div>
    </section>

    <section className="section editorial">
      <p className="label reveal">{STORE.city.toUpperCase()}</p>
      <div className="triptych">
        {story.map(([t, sub, src, o], i) => (
          <figure key={t} className="reveal clip" style={{ '--d': i }}>
            <img src={src} alt="" loading="lazy" />
            <figcaption><span>{t}<br /><em>{sub}</em></span><button className="link caps" onClick={() => go('todo', o)}>Explorar →</button></figcaption>
          </figure>
        ))}
      </div>
    </section>

    <section className="services">
      <div className="reveal" style={{ '--d': 0 }}><b>Pide por WhatsApp</b><p>Elige tus productos, arma tu bolsa y envíanos el pedido en un mensaje.</p></div>
      <div className="reveal" style={{ '--d': 1 }}><b>Cambios en 30 días</b><p>¿No te quedó la talla? Lo cambiamos sin costo.</p></div>
      <div className="reveal" style={{ '--d': 2 }}><b>Envíos a todo el país</b><p>Entregas en Ocaña y envíos nacionales.</p></div>
    </section>
    <Marquee outline reverse items={['All Sport', 'Juega en grande', 'All Sport', 'Tu equipo']} />
    <Footer go={go} />
  </>)
}

function Category({ route, go, navigate, ...hdr }) {
  const { view, query } = route
  const type = query.type || ''
  const sport = query.sport || ''
  const q = query.q || ''
  const [sort, setSort] = useState('rel')
  useEffect(() => { window.scrollTo(0, 0) }, [view, type, sport, q])

  const list = useMemo(() => {
    const l = PRODUCTS.filter((p) =>
      (view === 'todo' || (view === 'outlet' ? p.old : p.cat === view || p.cat === 'unisex')) &&
      (!type || p.type === type) && (!sport || p.sport === sport) &&
      p.name.toLowerCase().includes(q.toLowerCase()))
    if (sort === 'asc') l.sort((a, b) => a.price - b.price)
    if (sort === 'desc') l.sort((a, b) => b.price - a.price)
    return l
  }, [view, type, sport, q, sort])

  const title = q ? `Resultados para “${q}”` : NAV.find(([k]) => k === view)?.[1] || 'Todo'
  const set = (o) => go(view, { type, sport, q, ...o })

  return (<>
    <Header go={go} view={view} {...hdr} />
    <main className="catpage">
      <div className="cat-head">
        <h1>{title} <small>{list.length} productos</small></h1>
        <label className="sort">Ordenar
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="rel">Destacados</option><option value="asc">Precio: menor a mayor</option><option value="desc">Precio: mayor a menor</option>
          </select>
        </label>
      </div>
      <div className="filters">
        <div className="chips" role="group" aria-label="Tipo">
          {[['', 'Todo'], ...TYPES].map(([k, l]) => <button key={k} className={type === k ? 'on' : ''} onClick={() => set({ type: k })}>{l}</button>)}
        </div>
        <div className="chips" role="group" aria-label="Deporte">
          {['', ...SPORTS].map((s) => <button key={s} className={sport === s ? 'on' : ''} onClick={() => set({ sport: s })}>{s || 'Todos los deportes'}</button>)}
        </div>
      </div>
      {list.length === 0 ? <p className="empty">No encontramos productos con esos filtros.</p> : <Grid list={list} navigate={navigate} />}
    </main>
    <Footer go={go} />
  </>)
}

function ProductPage({ id, go, navigate, onAdd, ...hdr }) {
  const p = PRODUCTS.find((x) => String(x.id) === id)
  const [size, setSize] = useState('')
  const [ci, setCi] = useState(0)
  useEffect(() => { window.scrollTo(0, 0) }, [id]) // el estado se reinicia solo: la página se remonta por producto (key en App)

  if (!p) return (<><Header go={go} {...hdr} /><main className="catpage"><p className="empty">No encontramos ese producto.</p><button className="pill dark" onClick={() => go('todo')}>Ver catálogo</button></main><Footer go={go} /></>)

  const col = p.colors[ci]
  const related = PRODUCTS.filter((x) => x.id !== p.id && (x.type === p.type || x.sport === p.sport)).slice(0, 4)
  const msg = encodeURIComponent(`Hola ${STORE.name}, quiero ${p.name} (${col.n})${size ? ', talla ' + size : ''}. Precio: ${cop(p.price)}`)

  return (<>
    <Header go={go} {...hdr} />
    <main className="pdp">
      <nav className="crumbs" aria-label="Ruta"><button onClick={() => go('todo')}>Todo</button> / <button onClick={() => go(p.cat === 'unisex' ? 'todo' : p.cat)}>{catLabel(p.cat)}</button> / <span>{p.name}</span></nav>
      <div className="pdp-top">
        <div className="pdp-art"><Art p={p} color={ci} className="big" /></div>
        <div className="pdp-info">
          {p.tag && <p className="eyebrow dark">{p.tag}</p>}
          <h1>{p.name}</h1>
          <p className="muted">{catLabel(p.cat)} · {p.sport}</p>
          <p className="price lg">{cop(p.price)} {p.old && <s>{cop(p.old)}</s>}</p>

          <h4>Color <span className="muted">{col.n}</span></h4>
          <div className="dots lg">{p.colors.map((c, i) => <button key={i} className={i === ci ? 'on' : ''} style={{ background: c.a }} aria-label={c.n} title={c.n} onClick={() => setCi(i)} />)}</div>

          <h4>Talla</h4>
          <div className="sizes" role="radiogroup" aria-label="Talla">
            {p.sizes.map((s) => <button key={s} role="radio" aria-checked={size === s} className={size === s ? 'on' : ''} onClick={() => setSize(s)}>{s}</button>)}
          </div>

          <button className="pill dark wide" disabled={!size} onClick={() => onAdd(p.id, size, ci)}>{size ? 'Agregar a la bolsa' : 'Elige una talla'}</button>
          <a className="pill outline wide" href={`https://wa.me/${STORE.whatsapp}?text=${msg}`} target="_blank" rel="noreferrer">Preguntar por WhatsApp</a>

          <details open><summary>Descripción</summary><p>{p.desc}</p></details>
          <details><summary>Envíos y cambios</summary><p>Entregas en Ocaña y envíos a todo el país. Cambios de talla sin costo durante 30 días con la etiqueta puesta.</p></details>
        </div>
      </div>
      {related.length > 0 && (
        <section className="section flush">
          <div className="sec-head"><h2>También te puede gustar</h2></div>
          <Grid list={related} navigate={navigate} />
        </section>
      )}
    </main>
    <Footer go={go} />
  </>)
}

function Cart({ cart, total, onClose, change, clear }) {
  const [step, setStep] = useState('bag')
  const [d, setD] = useState({ name: '', addr: '' })
  useEffect(() => {
    const on = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [onClose])

  const lines = cart.map((i) => ({ ...i, p: PRODUCTS.find((x) => x.id === i.id) })).filter((l) => l.p)
  const send = () => {
    const body = lines.map((l) => `• ${l.qty} × ${l.p.name} (${l.p.colors[l.ci ?? 0].n}), talla ${l.size} — ${cop(l.p.price * l.qty)}`).join('\n')
    const text = `Hola ${STORE.name}, quiero hacer este pedido:\n${body}\n\nTotal: ${cop(total)}\nNombre: ${d.name}\nDirección: ${d.addr}`
    window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setStep('done')
  }

  return (
    <div className="overlay" onClick={onClose}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Bolsa" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head"><h2>{step === 'bag' ? 'Tu bolsa' : step === 'info' ? 'Datos de entrega' : '¡Listo!'}</h2><button className="x" onClick={onClose} aria-label="Cerrar">✕</button></div>

        {step === 'done' && (<div className="drawer-body"><p>Se abrió WhatsApp con tu pedido. Envía el mensaje y te confirmamos disponibilidad, envío y forma de pago.</p><button className="pill dark wide" onClick={() => { clear(); onClose() }}>Seguir comprando</button></div>)}

        {step === 'bag' && (<>
          <div className="drawer-body">
            {lines.length === 0 && <p className="muted">Tu bolsa está vacía.</p>}
            {lines.map((l) => (
              <div className="line" key={l.id + l.size + (l.ci ?? 0)}>
                <Art p={l.p} color={l.ci ?? 0} />
                <div>
                  <b>{l.p.name}</b>
                  <p className="muted">{l.p.colors[l.ci ?? 0].n} · Talla {l.size}</p>
                  <p>{cop(l.p.price * l.qty)}</p>
                  <div className="qty"><button onClick={() => change(l, -1)} aria-label="Quitar uno">−</button><span>{l.qty}</span><button onClick={() => change(l, 1)} aria-label="Agregar uno">+</button></div>
                </div>
              </div>
            ))}
          </div>
          {lines.length > 0 && <div className="drawer-foot"><p className="sum">Total <b>{cop(total)}</b></p><button className="pill dark wide" onClick={() => setStep('info')}>Continuar</button></div>}
        </>)}

        {step === 'info' && (<>
          <div className="drawer-body form">
            <label>Nombre<input value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} autoComplete="name" /></label>
            <label>Dirección o barrio<input value={d.addr} onChange={(e) => setD({ ...d, addr: e.target.value })} autoComplete="street-address" /></label>
            <p className="muted">Enviaremos tu pedido por WhatsApp para confirmar el pago y la entrega.</p>
          </div>
          <div className="drawer-foot"><p className="sum">Total <b>{cop(total)}</b></p>
            <button className="pill dark wide" disabled={!d.name.trim() || !d.addr.trim()} onClick={send}>Enviar pedido por WhatsApp</button>
            <button className="link" onClick={() => setStep('bag')}>← Volver a la bolsa</button></div>
        </>)}
      </aside>
    </div>
  )
}

export default function App() {
  const [route, navigate] = useHashRoute()
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useStored('allsport-cart', [])

  // Aparición al hacer scroll: todo lo marcado con .reveal entra con animación.
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal:not(.in)')]
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  })

  const valid = cart.filter((i) => PRODUCTS.some((p) => p.id === i.id))
  const count = valid.reduce((s, i) => s + i.qty, 0)
  const total = valid.reduce((s, i) => s + i.qty * PRODUCTS.find((p) => p.id === i.id).price, 0)

  const same = (a, b) => a.id === b.id && a.size === b.size && (a.ci ?? 0) === (b.ci ?? 0)
  const add = (id, size, ci = 0) => {
    setCart((c) => {
      const f = c.find((i) => same(i, { id, size, ci }))
      return f ? c.map((i) => (i === f ? { ...i, qty: i.qty + 1 } : i)) : [...c, { id, size, ci, qty: 1 }]
    })
    setCartOpen(true)
  }
  const change = (line, d) => setCart((c) => c.map((i) => (same(i, line) ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0))

  const nav = (to) => { setCartOpen(false); navigate(to) }
  const go = (view, o) => nav(catPath(view, o))
  const hdr = { count, onCart: () => setCartOpen(true), go, navigate: nav }

  const pageKey = route.name === 'product' ? 'p' + route.id : route.name === 'category' ? 'c' + route.view : 'home'
  return (<>
    <div className="page" key={pageKey}>
      {route.name === 'product' ? <ProductPage id={route.id} onAdd={add} {...hdr} />
        : route.name === 'category' ? <Category route={route} {...hdr} />
          : <Home {...hdr} />}
    </div>
    {cartOpen && <Cart cart={cart} total={total} onClose={() => setCartOpen(false)} change={change} clear={() => setCart([])} />}
  </>)
}
