// Para fotos reales agrega img: 'https://...' o '/img/archivo.jpg' en cada producto.
export const SPORTS = ['Running', 'Fútbol', 'Gimnasio', 'Básquet']
const CALZ = ['6', '7', '8', '9', '10', '11']
const ROPA = ['S', 'M', 'L', 'XL']
const NINO = ['4', '5', '6', '7']

export const PRODUCTS = [
  { id: 1, name: 'Zoom Veloz 11', cat: 'hombre', sport: 'Running', price: 799950, colors: ['#2F5BFF', '#0D1B3E'], sizes: CALZ, tag: 'Nuevo' },
  { id: 2, name: 'Zoom Veloz 11 Mujer', cat: 'mujer', sport: 'Running', price: 799950, colors: ['#FF5C8A', '#3B1130'], sizes: CALZ, tag: 'Nuevo' },
  { id: 3, name: 'Air Clásico 07', cat: 'hombre', sport: 'Gimnasio', price: 679950, colors: ['#DDE3F0', '#8792AB'], sizes: CALZ },
  { id: 4, name: 'Chaqueta Z.N.E.', cat: 'mujer', sport: 'Gimnasio', price: 389900, colors: ['#6B7280', '#1F2937'], sizes: ROPA },
  { id: 5, name: 'Buzo Z.N.E. Hombre', cat: 'hombre', sport: 'Gimnasio', price: 429900, old: 549900, colors: ['#4B5563', '#111827'], sizes: ROPA },
  { id: 6, name: 'Camiseta Selección', cat: 'hombre', sport: 'Fútbol', price: 349900, colors: ['#FFD028', '#1D4ED8'], sizes: ROPA, tag: 'Más vendido' },
  { id: 7, name: 'Balón Latir No. 5', cat: 'hombre', sport: 'Fútbol', price: 129500, old: 161900, colors: ['#F472B6', '#7C3AED'], sizes: ['Única'] },
  { id: 8, name: 'Balón Baloncesto Pro No. 7', cat: 'mujer', sport: 'Básquet', price: 87900, old: 175900, colors: ['#F59E0B', '#7C2D12'], sizes: ['Única'] },
  { id: 9, name: 'Tenis Lite Run Negro', cat: 'hombre', sport: 'Running', price: 71910, old: 209900, colors: ['#111827', '#F3F4F6'], sizes: CALZ },
  { id: 10, name: 'Tenis Kids Salto', cat: 'ninos', sport: 'Básquet', price: 259900, colors: ['#22C55E', '#064E3B'], sizes: NINO },
  { id: 11, name: 'Conjunto Junior FC', cat: 'ninos', sport: 'Fútbol', price: 219900, old: 289900, colors: ['#EF4444', '#7F1D1D'], sizes: NINO },
  { id: 12, name: 'Licra Studio Mujer', cat: 'mujer', sport: 'Gimnasio', price: 149900, colors: ['#A78BFA', '#312E81'], sizes: ROPA, tag: 'Nuevo' },
]

export const SEED_REVIEWS = {
  1: [{ name: 'Camila R.', stars: 5, text: 'Muy livianos, los usé para mi primera media maratón.' }],
  6: [{ name: 'Andrés P.', stars: 5, text: 'Llegó rápido y la tela es excelente.' }, { name: 'Laura M.', stars: 4, text: 'Talla true to size, recomendada.' }],
  9: [{ name: 'Jorge T.', stars: 4, text: 'Por este precio es una ganga.' }],
}