import { useEffect, useMemo, useState } from 'react'
import { PRODUCTS, SEED_REVIEWS, SPORTS } from './data'
import './styles.css'

const cop = (n) => '$ ' + n.toLocaleString('es-CO')
const NAV = [['todo', 'Todo'], ['mujer', 'Mujer'], ['hombre', 'Hombre'], ['ninos', 'Niños'], ['deportes', 'Deportes'], ['outlet', 'Outlet']]

function useStored(key, init) {
  const [v, set] = useState(() => { try { return JSON.parse(localStorage.getItem(key)) ?? init } catch { return init } })
  useEffect(() => localStorage.setItem(key, JSON.stringify(v)), [key, v])
  return [v, set]
}

function Art({ p, big }) {
  const [a, b] = p.colors
  return (
    <div className={'art' + (big ? ' art-big' : '')} style={{ background: `linear-gradient(135deg, ${a}33, ${a}11)` }}>
      {p.img ? <img src={p.img} alt={p.name} /> : (
        <svg viewBox="0 0 120 90" role="img" aria-label={p.name}>
          <path d="M8 62C8 42 30 46 44 30l14 10c12 10 32 6 46 18l8 8v8H8z" fill={a} />
          <path d="M8 74h104v6H8z" fill={b} />
        </svg>
      )}
    </div>
  )
}

const Stars = ({ n }) => <span className="stars" aria-label={`${n} de 5`}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
const avg = (rs) => (rs.length ? Math.round(rs.reduce((s, r) => s + r.stars, 0) / rs.length) : 0)

export default function App() {
  const [view, setView] = useState('todo')
  const [sport, setSport] = useState('')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useStored('ritmo-cart', [])
  const [mine, setMine] = useStored('ritmo-reviews', {})

  const reviewsOf = (id) => [...(mine[id] || []), ...(SEED_REVIEWS[id] || [])]
  const list = useMemo(() => PRODUCTS.filter((p) => {
    const okView = view === 'todo' || (view === 'deportes' ? !sport || p.sport === sport : view === 'outlet' ? p.old : p.cat === view)
    return okView && p.name.toLowerCase().includes(q.toLowerCase())
  }), [view, sport, q])

  const count = cart.reduce((s, i) => s + i.qty, 0)
  const total = cart.reduce((s, i) => s + i.qty * PRODUCTS.find((p) => p.id === i.id).price, 0)

  const add = (id, size) => {
    setCart((c) => {
      const f = c.find((i) => i.id === id && i.size === size)
      return f ? c.map((i) => (i === f ? { ...i, qty: i.qty + 1 } : i)) : [...c, { id, size, qty: 1 }]
    })
    setOpen(null); setCartOpen(true)
  }
  const change = (id, size, d) => setCart((c) => c.map((i) => (i.id === id && i.size === size ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0))

  return (
    <>
      <div className="promo">Envío gratis desde $ 300.000 · Paga en cuotas</div>
      <header className="top">
        <button className="logo" onClick={() => { setView('todo'); setSport('') }}>ritmo</button>
        <nav aria-label="Categorías">
          {NAV.map(([k, label]) => (
            <button key={k} className={view === k ? 'on' : ''} data-outlet={k === 'outlet'} onClick={() => { setView(k); setSport('') }}>{label}</button>
          ))}
        </nav>
        <input className="search" type="search" placeholder="Busca por producto…" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="cart-btn" onClick={() => setCartOpen(true)} aria-label="Abrir carrito">Bolsa <b>{count}</b></button>
      </header>

      <section className="hero">
        <div>
          <h1>Entrena hoy,<br />presume mañana.</h1>
          <p>Calzado, ropa y balones para correr, jugar y entrenar.</p>
          <button className="cta" onClick={() => setView('outlet')}>Ver ofertas</button>
        </div>
        <Art big p={PRODUCTS[0]} />
      </section>

      <main>
        <div className="head">
          <h2>{NAV.find(([k]) => k === view)[1]} <small>{list.length} productos</small></h2>
          {view === 'deportes' && (
            <div className="chips">
              {['', ...SPORTS].map((s) => <button key={s} className={sport === s ? 'on' : ''} onClick={() => setSport(s)}>{s || 'Todos'}</button>)}
            </div>
          )}
        </div>
        {list.length === 0 && <p className="empty">No encontramos productos. Prueba con otra búsqueda o categoría.</p>}
        <div className="grid">
          {list.map((p) => (
            <article key={p.id} className="card" onClick={() => setOpen(p)}>
              {p.old ? <span className="badge off">-{Math.round((1 - p.price / p.old) * 100)}%</span> : p.tag && <span className="badge">{p.tag}</span>}
              <Art p={p} />
              <h3>{p.name}</h3>
              <p className="muted">{p.cat === 'ninos' ? 'Niños' : p.cat === 'mujer' ? 'Mujer' : 'Hombre'} · {p.sport}</p>
              <p className="price">{cop(p.price)} {p.old && <s>{cop(p.old)}</s>}</p>
              <Stars n={avg(reviewsOf(p.id)) || 5} />
            </article>
          ))}
        </div>
      </main>
      <footer>© 2026 Ritmo Sports · Demo</footer>

      {open && <Detail p={open} reviews={reviewsOf(open.id)} onClose={() => setOpen(null)} onAdd={add}
        onReview={(r) => setMine((m) => ({ ...m, [open.id]: [r, ...(m[open.id] || [])] }))} />}
      {cartOpen && <Cart cart={cart} total={total} onClose={() => setCartOpen(false)} change={change} clear={() => setCart([])} />}
    </>
  )
}

function Detail({ p, reviews, onClose, onAdd, onReview }) {
  const [size, setSize] = useState('')
  const [f, setF] = useState({ name: '', stars: 5, text: '' })
  const submit = () => { if (f.name && f.text) { onReview(f); setF({ name: '', stars: 5, text: '' }) } }
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={onClose} aria-label="Cerrar">✕</button>
        <Art big p={p} />
        <div className="info">
          <h2>{p.name}</h2>
          <p className="price">{cop(p.price)} {p.old && <s>{cop(p.old)}</s>}</p>
          <h4>Talla</h4>
          <div className="chips">{p.sizes.map((s) => <button key={s} className={size === s ? 'on' : ''} onClick={() => setSize(s)}>{s}</button>)}</div>
          <button className="cta" disabled={!size} onClick={() => onAdd(p.id, size)}>{size ? 'Agregar a la bolsa' : 'Elige una talla'}</button>
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
    </div>
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