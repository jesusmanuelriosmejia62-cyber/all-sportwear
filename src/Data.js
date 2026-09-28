// Para fotos reales agrega img: 'https://...' o '/img/archivo.jpg' en cada producto.
// Las fotos actuales son de stock (Unsplash) solo como EJEMPLO para la presentación al cliente.
export const SPORTS = ['Running', 'Fútbol', 'Gimnasio', 'Básquet']
const CALZ = ['6', '7', '8', '9', '10', '11']
const ROPA = ['S', 'M', 'L', 'XL']
const NINO = ['4', '5', '6', '7']
const ph = (id) => `https://images.unsplash.com/${id}?q=80&w=900&auto=format&fit=crop`

export const PRODUCTS = [
  { id: 1, name: 'Zoom Veloz 11', cat: 'hombre', sport: 'Running', price: 799950, colors: ['#2F5BFF', '#0D1B3E'], sizes: CALZ, tag: 'Nuevo', img: ph('photo-1542291026-7eec264c27ff') },
  { id: 2, name: 'Zoom Veloz 11 Mujer', cat: 'mujer', sport: 'Running', price: 799950, colors: ['#FF5C8A', '#3B1130'], sizes: CALZ, tag: 'Nuevo', img: ph('photo-1595950653106-6c9ebd614d3a') },
  { id: 3, name: 'Air Clásico 07', cat: 'hombre', sport: 'Gimnasio', price: 679950, colors: ['#DDE3F0', '#8792AB'], sizes: CALZ, img: ph('photo-1552346154-21d32810aba3') },
  { id: 4, name: 'Chaqueta Z.N.E.', cat: 'mujer', sport: 'Gimnasio', price: 389900, colors: ['#6B7280', '#1F2937'], sizes: ROPA, img: ph('photo-1551028719-00167b16eac5') },
  { id: 5, name: 'Buzo Z.N.E. Hombre', cat: 'hombre', sport: 'Gimnasio', price: 429900, old: 549900, colors: ['#4B5563', '#111827'], sizes: ROPA, img: ph('photo-1556905055-8f358a7a47b2') },
  { id: 6, name: 'Camiseta Selección', cat: 'hombre', sport: 'Fútbol', price: 349900, colors: ['#FFD028', '#1D4ED8'], sizes: ROPA, tag: 'Más vendido', img: ph('photo-1517466787929-bc90951d0974') },
  { id: 7, name: 'Balón Latir No. 5', cat: 'hombre', sport: 'Fútbol', price: 129500, old: 161900, colors: ['#F472B6', '#7C3AED'], sizes: ['Única'], img: ph('photo-1614632537197-38a17061c2bd') },
  { id: 8, name: 'Balón Baloncesto Pro No. 7', cat: 'mujer', sport: 'Básquet', price: 87900, old: 175900, colors: ['#F59E0B', '#7C2D12'], sizes: ['Única'], img: ph('photo-1519861531473-9200262188bf') },
  { id: 9, name: 'Tenis Lite Run Negro', cat: 'hombre', sport: 'Running', price: 71910, old: 209900, colors: ['#111827', '#F3F4F6'], sizes: CALZ, img: ph('photo-1608231387042-66d1773070a5') },
  { id: 10, name: 'Tenis Kids Salto', cat: 'ninos', sport: 'Básquet', price: 259900, colors: ['#22C55E', '#064E3B'], sizes: NINO, img: ph('photo-1618886614638-80e3c103d31a') },
  { id: 11, name: 'Conjunto Junior FC', cat: 'ninos', sport: 'Fútbol', price: 219900, old: 289900, colors: ['#EF4444', '#7F1D1D'], sizes: NINO, img: ph('photo-1560012057-4372e14c5085') },
  { id: 12, name: 'Licra Studio Mujer', cat: 'mujer', sport: 'Gimnasio', price: 149900, colors: ['#A78BFA', '#312E81'], sizes: ROPA, tag: 'Nuevo', img: ph('photo-1506629082955-511b1aa562c8') },
]

export const SEED_REVIEWS = {
  1: [{ name: 'Camila R.', stars: 5, text: 'Muy livianos, los usé para mi primera media maratón por el Parque del Agua.' }],
  6: [{ name: 'Andrés P.', stars: 5, text: 'Llegó rápido a Cabecera y la tela es excelente.' }, { name: 'Laura M.', stars: 4, text: 'Talla true to size, recomendada.' }],
  9: [{ name: 'Jorge T.', stars: 4, text: 'Por este precio es una ganga.' }],
}
