// ───────── Datos editables de All Sport ─────────
// Los precios, nombres y tallas son DE EJEMPLO. Para fotos reales agrega `img: 'ruta-o-url'`
// dentro de cada color (se guarda en public/ y se usa con `${import.meta.env.BASE_URL}archivo.jpg`).
// Si un color no trae `img`, se dibuja la ilustración neutra de la prenda con los colores indicados.

export const STORE = {
  name: 'All Sport',
  city: 'Ocaña, Norte de Santander',
  whatsapp: '573224383790', // 57 (Colombia) + 322 4383790, sin + ni espacios
  instagram: '',
}

export const SPORTS = ['Fútbol', 'Running', 'Gimnasio', 'Básquet']

export const TYPES = [
  ['ropa', 'Ropa'],
  ['calzado', 'Calzado'],
  ['accesorios', 'Accesorios'],
]

export const NAV = [
  ['todo', 'Todo'],
  ['hombre', 'Hombre'],
  ['mujer', 'Mujer'],
  ['ninos', 'Niños'],
  ['outlet', 'Outlet'],
]

const ROPA = ['S', 'M', 'L', 'XL']
const ROPA_NINO = ['6', '8', '10', '12', '14']
const CALZ_H = ['39', '40', '41', '42', '43', '44']
const CALZ_M = ['35', '36', '37', '38', '39', '40']
const CALZ_N = ['28', '30', '32', '34']
const UNICA = ['Única']

const c = (n, a, b) => ({ n, a, b })
const RED = '#E11B22'
const INK = '#111111'

export const PRODUCTS = [
  { id: 1, name: 'Camiseta Local All Sport', cat: 'hombre', type: 'ropa', kind: 'shirt', sport: 'Fútbol', price: 189900, tag: 'Nuevo',
    colors: [c('Rojo', RED, INK), c('Negro', INK, RED)], sizes: ROPA,
    desc: 'Camiseta de juego en tela liviana que evacúa el sudor. Cuello en V reforzado y corte regular para jugar o para lucirla en la tribuna.' },
  { id: 2, name: 'Camiseta Visitante', cat: 'hombre', type: 'ropa', kind: 'shirt', sport: 'Fútbol', price: 189900,
    colors: [c('Blanco', '#F2F2F2', INK), c('Gris', '#9A9A9C', INK)], sizes: ROPA,
    desc: 'La versión clara de la colección: misma tela transpirable, ideal para los partidos de la tarde.' },
  { id: 3, name: 'Camiseta Entrenamiento Dry-Fit', cat: 'hombre', type: 'ropa', kind: 'shirt', sport: 'Gimnasio', price: 79900, old: 99900,
    colors: [c('Negro', INK, '#707072'), c('Rojo', RED, INK)], sizes: ROPA,
    desc: 'Básica para entrenar: seca rápido, no pesa y aguanta muchos lavados.' },
  { id: 4, name: 'Short de Juego', cat: 'hombre', type: 'ropa', kind: 'shorts', sport: 'Fútbol', price: 69900,
    colors: [c('Negro', INK, RED), c('Blanco', '#F2F2F2', INK)], sizes: ROPA,
    desc: 'Short liviano con cintura elástica y cordón. Corte amplio para correr y patear sin restricciones.' },
  { id: 5, name: 'Buzo Capucha All Sport', cat: 'hombre', type: 'ropa', kind: 'hoodie', sport: 'Gimnasio', price: 169900, tag: 'Más vendido',
    colors: [c('Negro', INK, RED), c('Gris', '#6E6E70', '#F2F2F2')], sizes: ROPA,
    desc: 'Buzo de algodón perchado por dentro para calentar antes de entrenar o para las noches frescas.' },
  { id: 6, name: 'Chaqueta Cortavientos', cat: 'mujer', type: 'ropa', kind: 'hoodie', sport: 'Running', price: 219900,
    colors: [c('Negro', INK, '#F2F2F2'), c('Rojo', RED, INK)], sizes: ROPA,
    desc: 'Cortavientos ligero con capucha ajustable y bolsillos con cierre, pensado para correr en la mañana.' },
  { id: 7, name: 'Licra Studio', cat: 'mujer', type: 'ropa', kind: 'shorts', sport: 'Gimnasio', price: 99900, tag: 'Nuevo',
    colors: [c('Negro', INK, '#707072'), c('Rojo', RED, INK)], sizes: ROPA,
    desc: 'Licra de compresión suave y opaca, cómoda para funcional, yoga o spinning.' },
  { id: 8, name: 'Camiseta Running Mujer', cat: 'mujer', type: 'ropa', kind: 'shirt', sport: 'Running', price: 89900,
    colors: [c('Blanco', '#F2F2F2', RED), c('Negro', INK, '#707072')], sizes: ROPA,
    desc: 'Tela ultraliviana con paneles de ventilación. Para largas distancias bajo el sol.' },
  { id: 9, name: 'Guayos Velocidad FG', cat: 'hombre', type: 'calzado', kind: 'shoe', sport: 'Fútbol', price: 329900, tag: 'Nuevo',
    colors: [c('Negro / Rojo', INK, RED), c('Blanco / Negro', '#F2F2F2', INK)], sizes: CALZ_H,
    desc: 'Guayos para cancha de césped natural con tacos firmes, ajuste ceñido y buen agarre en la arrancada.' },
  { id: 10, name: 'Guayos Júnior', cat: 'ninos', type: 'calzado', kind: 'shoe', sport: 'Fútbol', price: 189900, old: 229900,
    colors: [c('Rojo', RED, INK), c('Negro', INK, '#F2F2F2')], sizes: CALZ_N,
    desc: 'Guayos para los más chicos: livianos, con cierre fácil y suela flexible para la cancha del colegio.' },
  { id: 11, name: 'Tenis Run Pro', cat: 'hombre', type: 'calzado', kind: 'shoe', sport: 'Running', price: 289900,
    colors: [c('Negro', INK, '#F2F2F2'), c('Rojo', RED, INK)], sizes: CALZ_H,
    desc: 'Tenis de running con espuma que amortigua cada zancada y malla transpirable.' },
  { id: 12, name: 'Tenis Lite Mujer', cat: 'mujer', type: 'calzado', kind: 'shoe', sport: 'Running', price: 259900,
    colors: [c('Blanco', '#F2F2F2', RED), c('Negro', INK, '#707072')], sizes: CALZ_M,
    desc: 'Ligeros y flexibles, con soporte en el talón para entrenar o para el día a día.' },
  { id: 13, name: 'Balón Pro No. 5', cat: 'unisex', type: 'accesorios', kind: 'ball', sport: 'Fútbol', price: 139900, tag: 'Más vendido',
    colors: [c('Blanco / Rojo', '#FFFFFF', RED), c('Blanco / Negro', '#FFFFFF', INK)], sizes: UNICA,
    desc: 'Balón talla 5 de costura reforzada y buen agarre, para cancha sintética o de césped.' },
  { id: 14, name: 'Balón Entrenamiento No. 4', cat: 'unisex', type: 'accesorios', kind: 'ball', sport: 'Fútbol', price: 79900, old: 99900,
    colors: [c('Blanco / Negro', '#FFFFFF', INK)], sizes: UNICA,
    desc: 'Talla 4 para microfútbol y entrenamientos. Resistente al piso duro.' },
  { id: 15, name: 'Medias Deportivas', cat: 'unisex', type: 'accesorios', kind: 'socks', sport: 'Fútbol', price: 39900,
    colors: [c('Negro', INK, RED), c('Blanco', '#F2F2F2', INK)], sizes: ['M', 'L'],
    desc: 'Medias largas con puño elástico y refuerzo en talón y punta.' },
  { id: 16, name: 'Conjunto Júnior FC', cat: 'ninos', type: 'ropa', kind: 'shirt', sport: 'Fútbol', price: 149900, old: 189900,
    colors: [c('Rojo', RED, INK), c('Negro', INK, RED)], sizes: ROPA_NINO,
    desc: 'Camiseta y short en tela liviana para el equipo del barrio o la clase de educación física.' },
  { id: 17, name: 'Camiseta Júnior Entrenamiento', cat: 'ninos', type: 'ropa', kind: 'shirt', sport: 'Gimnasio', price: 59900,
    colors: [c('Blanco', '#F2F2F2', RED), c('Negro', INK, '#707072')], sizes: ROPA_NINO,
    desc: 'Camiseta cómoda y fresca para jugar y moverse todo el día.' },
]

export const catLabel = (cat) => ({ hombre: 'Hombre', mujer: 'Mujer', ninos: 'Niños', unisex: 'Unisex' }[cat] || cat)
export const cop = (n) => '$ ' + n.toLocaleString('es-CO')
