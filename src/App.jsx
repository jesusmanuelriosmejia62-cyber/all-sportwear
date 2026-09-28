import { useEffect, useMemo, useState } from 'react'
import { PRODUCTS, SEED_REVIEWS, SPORTS } from './Data'
import './styles.css'

function parseHash() {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const [pathPart, queryPart] = raw.split('?')
  const query = Object.fromEntries(new URLSearchParams(queryPart || ''))
  const segments = pathPart.split('/').filter(Boolean)
  if (segments[0] === 'producto' && segments[1]) return { name: 'product', id: segments[1], query }
  if (segments[0] === 'categoria') return { name: 'home', view: segments[1] || 'todo', query }
  return { name: 'home', view: 'todo', query }
}

const catPath = (v, o = {}) => {
  const params = new URLSearchParams()
  if (o.sport) params.set('sport', o.sport)
  if (o.type) params.set('type', o.type)
  const qs = params.toString()
  return '/categoria/' + v + (qs ? '?' + qs : '')
}

function useHashRoute() {
  const [route, setRoute] = useState(parseHash)
  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  const navigate = (to) => {
    if (window.location.hash.replace(/^#/, '') === to) { setRoute(parseHash()); return }
    window.location.hash = to
  }
  return [route, navigate]
}

const cop = (n) => '$ ' + n.toLocaleString('es-CO')
const NAV = [['todo', 'Todo'], ['mujer', 'Mujer'], ['hombre', 'Hombre'], ['ninos', 'Niños'], ['deportes', 'Deportes'], ['outlet', 'Outlet']]
const img = (id, w = 1200) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`

function useStored(key, init) {
  const [v, set] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? init } catch { return init } })
  useEffect(() => localStorage.setItem(key, JSON.stringify(v)), [key, v])
  return [v, set]
}

function kind(p) {
  if (/Bal[oó]n/.test(p.name)) return 'ball'
  if (/Tenis|Zoom|Air/.test(p.name)) return 'shoe'
  return 'shirt'
}

function Art({ p, big }) {
  const [a, b] = p.colors
  const k = kind(p)
  const [broken, setBroken] = useState(false)
  const showPhoto = p.img && !broken
  return (
    <div className={'art' + (big ? ' art-big' : '')} style={!showPhoto ? { background: `linear-gradient(135deg, ${a}40, ${a}10)` } : undefined}>
      {showPhoto ? <img className="photo" src={p.img} alt={p.name} loading="lazy" onError={() => setBroken(true)} /> : (
        <svg viewBox="0 0 200 110" role="img" aria-label={p.name}>
          <ellipse cx="100" cy="100" rx="78" ry="5" fill="#0D1B3E" opacity=".15" />
          {k === 'shoe' && (<>
            <path d="M14 84C14 60 28 52 46 50L70 30C78 24 88 30 96 36C112 48 138 50 164 62C184 70 192 76 192 84Z" fill={a} />
            <path d="M150 58C172 66 190 74 192 84H150Z" fill={b} opacity=".35" />
            <path d="M70 30C74 20 84 18 92 24L96 36C88 30 78 24 70 30Z" fill={b} />
            <path d="M98 40l10 8M110 45l10 8M122 50l10 8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            <path d="M40 78C70 78 110 70 150 56" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M12 84H192V91H12Z" fill="#fff" />
            <path d="M12 91H192Q192 99 176 99H28Q12 99 12 91Z" fill={b} />
          </>)}
          {k === 'shirt' && (<>
            <path d="M70 14L100 26L130 14L168 34L152 62L138 54V96H62V54L48 62L32 34Z" fill={a} />
            <path d="M84 16Q100 38 116 16" stroke={b} strokeWidth="6" fill="none" />
            <path d="M32 34L48 62M168 34L152 62" stroke={b} strokeWidth="6" />
            <rect x="62" y="84" width="76" height="6" fill={b} opacity=".5" />
          </>)}
          {k === 'ball' && (<>
            <circle cx="100" cy="52" r="42" fill={a} />
            <polygon points="100,34 117,46 110,66 90,66 83,46" fill={b} />
            <path d="M100 34V12M117 46L140 38M110 66L124 86M90 66L76 86M83 46L60 38" stroke={b} strokeWidth="3" />
            <circle cx="100" cy="52" r="42" fill="none" stroke={b} strokeWidth="2" />
          </>)}
        </svg>
      )}
    </div>
  )
}

const Stars = ({ n }) => <span className="stars" aria-label={`${n} de 5`}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
const avg = (rs) => (rs.length ? Math.round(rs.reduce((s, r) => s + r.stars, 0) / rs.length) : 0)

const GALLERY = {
  shoe: [img('photo-1542291026-7eec264c27ff', 900), img('photo-1608231387042-66d1773070a5', 900), img('photo-1595950653106-6c9ebd614d3a', 900), img('photo-1552346154-21d32810aba3', 900)],
  shirt: [img('photo-1551028719-00167b16eac5', 900), img('photo-1556905055-8f358a7a47b2', 900), img('photo-1517466787929-bc90951d0974', 900)],
  ball: [img('photo-1614632537197-38a17061c2bd', 900), img('photo-1519861531473-9200262188bf', 900)],
}
const galleryFor = (p) => [...new Set([p.img, ...(GALLERY[kind(p)] || [])].filter(Boolean))].slice(0, 4)
const relatedFor = (p) => {
  const pool = PRODUCTS.filter((x) => x.id !== p.id)
  const same = pool.filter((x) => x.sport === p.sport || x.cat === p.cat)
  const rest = pool.filter((x) => !same.includes(x))
  return [...same, ...rest].slice(0, 8)
}

const TILES = [
  ['mujer', 'Mujer', img('photo-1518459031867-a89b944bffe4', 800)],
  ['hombre', 'Hombre', img('photo-1571008887538-b36bb32f4571', 800)],
  ['ninos', 'Niños', img('photo-1526232761682-d26e03ac148e', 800)],
  ['outlet', 'Outlet', img('photo-1556742049-0cfed4f6a45d', 800)],
]
const TICKER = ['Envío el mismo día en Bucaramanga', 'Cambios sin costo · 30 días', 'Tienda física en Bucaramanga', 'Recoge gratis en Cabecera del Llano']
const MEGA = ['mujer', 'hombre', 'ninos', 'deportes']
const TYPES = [['shoe', 'Calzado'], ['shirt', 'Ropa'], ['ball', 'Accesorios']]
const GRAD = { mujer: ['#FF5C8A', '#7C3AED'], hombre: ['#2F5BFF', '#0D1B3E'], ninos: ['#22C55E', '#0E7490'], deportes: ['#FF5A1F', '#7C2D12'] }

function TopBars() {
  return (<>
    <div className="promo">Tienda física en Bucaramanga</div>
    <div className="ticker"><div>{Array(3).fill(TICKER).flat().map((t, i) => <span key={i}>★ {t}</span>)}</div></div>
  </>)
}

function SiteHeader({ go, view = '', count, onCart, q, onQueryChange, onQuerySubmit }) {
  const [mega, setMega] = useState(null)
  return (
    <header className="top" onMouseLeave={() => setMega(null)}>
      <button className="logo" onClick={() => go('todo')}>
        <span className="wordmark">ritmo</span><small>BUCARAMANGA</small>
      </button>
      <nav aria-label="Categorías">
        {NAV.map(([k, label]) => (
          <button key={k} className={view === k ? 'on' : ''} data-outlet={k === 'outlet'} aria-expanded={mega === k}
            onMouseEnter={() => setMega(MEGA.includes(k) ? k : null)}
            onClick={() => (MEGA.includes(k) && mega !== k && window.matchMedia('(hover: none)').matches ? setMega(k) : go(k))}>
            {label}{MEGA.includes(k) && <i className="chev">⌄</i>}
          </button>
        ))}
      </nav>
      <input className="search" type="search" placeholder="Busca por producto…" value={q ?? ''}
        onChange={(e) => onQueryChange?.(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') onQuerySubmit?.(e.currentTarget.value) }} />
      <button className="cart-btn" onClick={onCart} aria-label="Abrir carrito">Bolsa <b>{count}</b></button>
      <div className={'mega' + (mega ? ' open' : '')}>{mega && <MegaMenu k={mega} go={(v, o) => { setMega(null); go(v, o) }} />}</div>
    </header>
  )
}

function Footer({ go }) {
  const [mail, setMail] = useState('')
  const [mailSent, setMailSent] = useState(false)
  const subscribe = (e) => { e.preventDefault(); if (mail.includes('@')) { setMailSent(true); setMail('') } }
  return (
    <footer className="site-footer">
      <div className="foot-grid">
        <div className="foot-brand">
          <span className="wordmark">ritmo</span>
          <p>La tienda deportiva de Bucaramanga. Calzado, ropa y accesorios para correr, jugar y entrenar todos los días.</p>
          <form className="newsletter" onSubmit={subscribe}>
            <input type="email" placeholder="Tu correo" value={mail} onChange={(e) => setMail(e.target.value)} />
            <button type="submit">{mailSent ? '¡Listo!' : 'Unirme'}</button>
          </form>
          <div className="social" style={{ marginTop: 16 }}>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram">IG</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook">FB</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="WhatsApp">WA</a>
          </div>
        </div>
        <div>
          <h5>Comprar</h5>
          {NAV.slice(1).map(([k, label]) => <a key={k} onClick={() => go(k)}>{label}</a>)}
        </div>
        <div>
          <h5>Ayuda</h5>
          <a onClick={(e) => e.preventDefault()}>Envíos</a>
          <a onClick={(e) => e.preventDefault()}>Cambios y devoluciones</a>
          <a onClick={(e) => e.preventDefault()}>Preguntas frecuentes</a>
          <a onClick={(e) => e.preventDefault()}>Contacto</a>
        </div>
        <div>
          <h5>Tienda</h5>
          <p>Cra 33 #45-12, Cabecera del Llano</p>
          <p>Bucaramanga, Santander</p>
          <p>Lun–Sáb · 9am–7pm</p>
          <p>300 000 0000</p>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Ritmo Sports · Demo de presentación</span>
        <span>Visa · Mastercard · PSE · Nequi</span>
      </div>
    </footer>
  )
}

function ProductGrid({ list, navigate }) {
  return (
    <div className="grid">
      {list.map((p) => (
        <article key={p.id} className="card" onClick={() => navigate('/producto/' + p.id)}>
          {p.old ? <span className="badge off">-{Math.round((1 - p.price / p.old) * 100)}%</span> : p.tag && <span className="badge">{p.tag}</span>}
          <Art p={p} />
          <div className="quickadd">Ver detalles</div>
          <div className="body">
            <h3>{p.name}</h3>
            <p className="muted">{p.cat === 'ninos' ? 'Niños' : p.cat === 'mujer' ? 'Mujer' : 'Hombre'} · {p.sport}</p>
            <div className="swatches">{p.colors.map((c, i) => <i key={i} style={{ background: c }} />)}</div>
            <p className="price">{cop(p.price)} {p.old && <s>{cop(p.old)}</s>}</p>
            <Stars n={avg([...(SEED_REVIEWS[p.id] || [])]) || 5} />
          </div>
        </article>
      ))}
    </div>
  )
}

function Home({ count, onCart, navigate }) {
  const [q, setQ] = useState('')
  const list = useMemo(() => PRODUCTS.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())), [q])
  const go = (v, o = {}) => navigate(catPath(v, o))

  return (
    <>
      <TopBars />
      <SiteHeader go={go} view="todo" count={count} onCart={onCart} q={q} onQueryChange={setQ} />

      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${img('photo-1461896836934-ffe607ba8211', 1600)})` }} />
        <div>
          <span className="kicker"><i /> Nueva colección · Bucaramanga</span>
          <h1>Entrena hoy,<br />presume mañana.</h1>
          <p>Calzado, ropa para correr, jugar y entrenar. Envío el mismo día en Bucaramanga y área metropolitana.</p>
          <div className="hero-cta">
            <button className="cta" onClick={() => go('outlet')}>Ver ofertas</button>
            <button className="ghost" onClick={() => go('todo')}>Explorar catálogo →</button>
          </div>
        </div>
        <div className="hero-side">
          <div className="hero-card">
            <Art big p={PRODUCTS[0]} />
            <b>{PRODUCTS[0].name}</b>
            <p>{cop(PRODUCTS[0].price)} · Recién llegado</p>
          </div>
        </div>
      </section>

      <div className="stats">
        <div><b>+500</b><span>Clientes en Bucaramanga</span></div>
        <div><b>4.8★</b><span>Calificación promedio</span></div>
        <div><b>48h</b><span>Envío nacional</span></div>
        <div><b>30 días</b><span>Cambios gratis</span></div>
      </div>

      <section className="tiles">
        <span className="eyebrow">Categorías</span>
        <h2>¿Para quién estás comprando?</h2>
        <div>
          {TILES.map(([k, t, photo]) => (
            <button key={k} className="tile" onClick={() => go(k)}>
              <img className="tile-bg" src={photo} alt="" loading="lazy" />
              <span>{t}</span><small>Ver colección →</small>
            </button>
          ))}
        </div>
      </section>

      <section className="feature">
        <img src={img('photo-1552674605-db6ffd4facb5', 1000)} alt="Colección running" loading="lazy" />
        <div className="txt">
          <span className="eyebrow">Nuevo lanzamiento</span>
          <h2>Colección Running 2026</h2>
          <p>Diseñada para el clima de Bucaramanga: transpirable, liviana y lista para tus rutas por el Parque del Agua o la Autopista.</p>
          <button className="cta" onClick={() => go('deportes', { sport: 'Running' })}>Ver colección running</button>
        </div>
      </section>

      <main>
        <div className="head">
          <h2>Todo <small>{list.length} productos</small></h2>
        </div>
        {list.length === 0 && <p className="empty">No encontramos productos. Prueba con otra búsqueda.</p>}
        <ProductGrid list={list} navigate={navigate} />
      </main>

      <section className="story">
        <div className="txt">
          <span className="eyebrow" style={{ color: '#FF3D1A' }}>Nuestra historia</span>
          <h2>Hecha en Bucaramanga, para moverte.</h2>
          <p>Somos una tienda deportiva local: asesoría de talla en persona, cambios sin vueltas y productos que aguantan el clima y las calles de la ciudad.</p>
          <button className="cta" onClick={() => go('todo')}>Visítanos en Cabecera del Llano</button>
        </div>
        <img src={img('photo-1517836357463-d25dfeac3438', 1000)} alt="Entrenamiento en Bucaramanga" loading="lazy" />
      </section>

      <Footer go={go} />
    </>
  )
}

function CategoryPage({ count, onCart, route, navigate }) {
  const view = route.view
  const sport = route.query.sport || ''
  const type = route.query.type || ''
  const [q, setQ] = useState('')

  useEffect(() => { window.scrollTo(0, 0) }, [view, sport, type])

  const list = useMemo(() => PRODUCTS.filter((p) => {
    const okView = view === 'deportes' || (view === 'outlet' ? p.old : p.cat === view)
    return okView && (!type || kind(p) === type) && (!sport || p.sport === sport) && p.name.toLowerCase().includes(q.toLowerCase())
  }), [view, sport, type, q])

  const go = (v, o = {}) => navigate(catPath(v, o))
  const label = NAV.find(([k]) => k === view)?.[1] || view

  return (
    <>
      <TopBars />
      <SiteHeader go={go} view={view} count={count} onCart={onCart} q={q} onQueryChange={setQ} />

      <div className="catpage">
        <button className="back" onClick={() => go('todo')}>← Volver al catálogo</button>
        <div className="head">
          <h2>{label} <small>{list.length} productos</small></h2>
          {(type || sport) && <button className="pill" onClick={() => go(view)}>{[TYPES.find(([t]) => t === type)?.[1], sport].filter(Boolean).join(' · ')} ✕</button>}
          {view === 'deportes' && (
            <div className="chips">
              {['', ...SPORTS].map((s) => <button key={s} className={sport === s ? 'on' : ''} onClick={() => go('deportes', { sport: s, type })}>{s || 'Todos'}</button>)}
            </div>
          )}
        </div>
        {list.length === 0 && <p className="empty">No encontramos productos. Prueba con otra búsqueda o categoría.</p>}
        <ProductGrid list={list} navigate={navigate} />
      </div>

      <Footer go={go} />
    </>
  )
}

function ProductPage({ id, navigate, count, onCart, reviewsOf, onAdd, onReview }) {
  const p = PRODUCTS.find((x) => String(x.id) === id)
  const [size, setSize] = useState('')
  const [idx, setIdx] = useState(0)
  const [f, setF] = useState({ name: '', stars: 5, text: '' })

  useEffect(() => { setIdx(0); setSize(''); window.scrollTo(0, 0) }, [id])

  if (!p) {
    return (
      <>
        <TopBars />
        <SiteHeader go={(v, o) => navigate(catPath(v, o))} count={count} onCart={onCart} />
        <main><p className="empty">No encontramos ese producto. <button className="pill" onClick={() => navigate(catPath('todo'))}>Volver al catálogo</button></p></main>
        <Footer go={(v, o) => navigate(catPath(v, o))} />
      </>
    )
  }

  const gallery = galleryFor(p)
  const related = relatedFor(p)
  const reviews = reviewsOf(p.id)
  const submit = () => { if (f.name && f.text) { onReview(p.id, f); setF({ name: '', stars: 5, text: '' }) } }
  const next = () => setIdx((i) => (i + 1) % gallery.length)
  const prev = () => setIdx((i) => (i - 1 + gallery.length) % gallery.length)
  const go = (v, o = {}) => navigate(catPath(v, o))

  return (
    <>
      <TopBars />
      <SiteHeader go={go} count={count} onCart={onCart} />

      <div className="pdp">
        <button className="back" onClick={() => navigate(catPath('todo'))}>← Volver al catálogo</button>
        <div className="pdp-top">
          <div className="pdp-gallery">
            <div className="thumbs">
              {gallery.map((src, i) => (
                <button key={i} className={'thumb' + (i === idx ? ' on' : '')} onClick={() => setIdx(i)}>
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
            <div className="pdp-main">
              <img src={gallery[idx]} alt={p.name} />
              {gallery.length > 1 && (<>
                <button className="nav prev" onClick={prev} aria-label="Foto anterior">‹</button>
                <button className="nav next" onClick={next} aria-label="Foto siguiente">›</button>
              </>)}
            </div>
          </div>
          <div className="pdp-info">
            {p.tag && <span className="eyebrow">{p.tag}</span>}
            <h2>{p.name}</h2>
            <p className="muted">{p.cat === 'ninos' ? 'Niños' : p.cat === 'mujer' ? 'Mujer' : 'Hombre'} · {p.sport}</p>
            <p className="price">{cop(p.price)} {p.old && <s>{cop(p.old)}</s>}</p>
            <h4>Colores</h4>
            <div className="swatches lg">{p.colors.map((c, i) => <i key={i} style={{ background: c }} />)}</div>
            <h4>Talla</h4>
            <div className="chips">{p.sizes.map((s) => <button key={s} className={size === s ? 'on' : ''} onClick={() => setSize(s)}>{s}</button>)}</div>
            <button className="cta wide" disabled={!size} onClick={() => onAdd(p.id, size)}>{size ? 'Agregar a la bolsa' : 'Elige una talla'}</button>
            <p className="ship-note">Envío: recoge gratis en tienda (Cabecera del Llano) o envío el mismo día en Bucaramanga.</p>
          </div>
        </div>

        {p.desc && (
          <div className="pdp-desc">
            <h4>Descripción</h4>
            <p>{p.desc}</p>
          </div>
        )}

        {related.length > 0 && (
          <div className="pdp-related">
            <h4>También te puede interesar</h4>
            <div className="rel-row">
              {related.map((r) => (
                <button key={r.id} className="rel-card" onClick={() => navigate('/producto/' + r.id)}>
                  <Art p={r} />
                  <b>{r.name}</b><span>{cop(r.price)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pdp-reviews">
          <h4>Comentarios ({reviews.length})</h4>
          <div className="reviews">
            {reviews.length === 0 && <p className="muted">Sé el primero en comentar.</p>}
            {reviews.map((r, i) => <div key={i} className="review"><b>{r.name}</b> <Stars n={r.stars} /><p>{r.text}</p></div>)}
          </div>
          <div className="rform">
            <input placeholder="Tu nombre" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            <select value={f.stars} onChange={(e) => setF({ ...f, stars: +e.target.value })}>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} estrellas</option>)}</select>
            <textarea placeholder="Escribe tu comentario" value={f.text} onChange={(e) => setF({ ...f, text: e.target.value })} />
            <button onClick={submit}>Publicar comentario</button>
          </div>
        </div>
      </div>

      <Footer go={go} />
    </>
  )
}

function Cart({ cart, total, onClose, change, clear }) {
  const [step, setStep] = useState('cart')
  const [d, setD] = useState({ name: '', email: '', addr: '' })
  const ok = d.name && d.email.includes('@') && d.addr
  return (
    <div className="overlay" onClick={onClose}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={onClose} aria-label="Cerrar">✕</button>
        {step === 'done' ? (
          <div className="done"><h2>¡Pedido confirmado!</h2><p>Enviamos el resumen a {d.email}.</p><button className="cta" onClick={() => { clear(); onClose() }}>Seguir comprando</button></div>
        ) : (
          <>
            <h2>{step === 'cart' ? 'Tu bolsa' : 'Datos de envío y pago'}</h2>
            {cart.length === 0 && <p className="empty">Tu bolsa está vacía.</p>}
            {step === 'cart' && cart.map((i) => {
              const p = PRODUCTS.find((x) => x.id === i.id)
              return (
                <div className="line" key={i.id + i.size}>
                  <Art p={p} />
                  <div><b>{p.name}</b><p className="muted">Talla {i.size} · {cop(p.price)}</p>
                    <div className="qty"><button onClick={() => change(i.id, i.size, -1)}>−</button>{i.qty}<button onClick={() => change(i.id, i.size, 1)}>+</button></div></div>
                </div>
              )
            })}
            {step === 'pay' && (
              <div className="rform">
                <input placeholder="Nombre completo" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} />
                <input placeholder="Correo" value={d.email} onChange={(e) => setD({ ...d, email: e.target.value })} />
                <input placeholder="Dirección de envío" value={d.addr} onChange={(e) => setD({ ...d, addr: e.target.value })} />
                <p className="muted">Pago simulado. En la versión final se conecta Wompi, Mercado Pago o Stripe.</p>
              </div>
            )}
            {cart.length > 0 && (
              <div className="total">
                <p>Total <b>{cop(total)}</b></p>
                {step === 'cart'
                  ? <button className="cta" onClick={() => setStep('pay')}>Ir a pagar</button>
                  : <button className="cta" disabled={!ok} onClick={() => setStep('done')}>Pagar {cop(total)}</button>}
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  )
}

function MegaMenu({ k, go }) {
  const label = NAV.find(([x]) => x === k)[1]
  const feat = PRODUCTS.find((p) => (k === 'deportes' ? p.id === 6 : p.cat === k)) || PRODUCTS[0]
  const Link = ({ t, o, all }) => <button className={all ? 'all' : ''} onClick={() => go(k, o)}>{t}</button>
  return (
    <div className="mega-in">
      {k === 'deportes'
        ? SPORTS.map((sp) => (
          <div className="mcol" key={sp}>
            <h4>{sp}</h4>
            {TYPES.map(([t, n]) => <Link key={t} t={n} o={{ sport: sp, type: t }} />)}
            <Link all t={'Ver ' + sp} o={{ sport: sp }} />
          </div>
        ))
        : (<>
          <div className="mcol"><h4>Calzado</h4>{SPORTS.map((sp) => <Link key={sp} t={sp} o={{ type: 'shoe', sport: sp }} />)}<Link all t="Todo calzado" o={{ type: 'shoe' }} /></div>
          <div className="mcol"><h4>Ropa</h4>{SPORTS.map((sp) => <Link key={sp} t={sp} o={{ type: 'shirt', sport: sp }} />)}<Link all t="Toda la ropa" o={{ type: 'shirt' }} /></div>
          <div className="mcol"><h4>Accesorios</h4><Link t="Balones" o={{ type: 'ball' }} /><Link all t="Todo accesorios" o={{ type: 'ball' }} /></div>
          <div className="mcol"><h4>Destacado</h4><Link t="Novedades" o={{}} /><Link t="Los más vendidos" o={{}} /><Link all t={'Ver todo ' + label.toLowerCase()} o={{}} /></div>
        </>)}
      <button className="feat" style={{ background: `linear-gradient(135deg, ${GRAD[k][0]}, ${GRAD[k][1]})` }} onClick={() => go(k)}>
        <Art p={{ ...feat, colors: ['#ffffff', '#0D1B3E'] }} />
        <b>{label.toUpperCase()}</b><small>Una vida en equipo →</small>
      </button>
    </div>
  )
}

export default function App() {
  const [route, navigate] = useHashRoute()
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useStored('ritmo-cart', [])
  const [mine, setMine] = useStored('ritmo-reviews', {})

  const reviewsOf = (id) => [...(mine[id] || []), ...(SEED_REVIEWS[id] || [])]
  const onReview = (id, r) => setMine((m) => ({ ...m, [id]: [r, ...(m[id] || [])] }))

  const count = cart.reduce((s, i) => s + i.qty, 0)
  const total = cart.reduce((s, i) => s + i.qty * PRODUCTS.find((p) => p.id === i.id).price, 0)

  const add = (id, size) => {
    setCart((c) => {
      const f = c.find((i) => i.id === id && i.size === size)
      return f ? c.map((i) => (i === f ? { ...i, qty: i.qty + 1 } : i)) : [...c, { id, size, qty: 1 }]
    })
    setCartOpen(true)
  }
  const change = (id, size, d) => setCart((c) => c.map((i) => (i.id === id && i.size === size ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0))

  const onCart = () => setCartOpen(true)

  return (
    <>
      {route.name === 'product'
        ? <ProductPage id={route.id} navigate={navigate} count={count} onCart={onCart} reviewsOf={reviewsOf} onAdd={add} onReview={onReview} />
        : route.view === 'todo'
          ? <Home navigate={navigate} count={count} onCart={onCart} />
          : <CategoryPage route={route} navigate={navigate} count={count} onCart={onCart} />}
      {cartOpen && <Cart cart={cart} total={total} onClose={() => setCartOpen(false)} change={change} clear={() => setCart([])} />}
    </>
  )
}
