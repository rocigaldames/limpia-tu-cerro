import { useState, type ReactNode } from 'react'
import GameExperience, { type GameId } from './GameExperiences'

type Tab = 'perfil' | 'juegos' | 'inicio' | 'misiones' | 'tienda'
type PanelView = 'main' | 'extras' | 'map' | 'news' | 'settings'

const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
  { id: 'perfil', label: 'Perfil', icon: <PersonIcon /> },
  { id: 'juegos', label: 'Juegos', icon: <GameIcon /> },
  { id: 'inicio', label: 'Inicio', icon: <HomeIcon /> },
  { id: 'misiones', label: 'Misiones', icon: <ListIcon /> },
  { id: 'tienda', label: 'Tienda', icon: <CartIcon /> },
]

function Icon({
  children,
  size = 24,
  className = '',
}: {
  children: ReactNode
  size?: number
  className?: string
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {children}
    </svg>
  )
}

function PersonIcon() {
  return (
    <Icon>
      <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="2" />
      <path d="M5.5 20c.5-4.2 2.7-6.25 6.5-6.25S18 15.8 18.5 20" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </Icon>
  )
}

function GameIcon() {
  return (
    <Icon>
      <path d="M8.2 8.4h7.6c3.4 0 5.2 6.3 4.4 9.1-.5 1.8-2.2 2.2-3.4.8l-1.5-1.8H8.7l-1.5 1.8c-1.2 1.4-2.9 1-3.4-.8-.8-2.8 1-9.1 4.4-9.1Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path d="M8 11.5v4M6 13.5h4M15.8 12.2h.1M18 14.4h.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
    </Icon>
  )
}

function HomeIcon() {
  return (
    <Icon>
      <path d="m4 11 8-6.5 8 6.5v8.5h-6v-5h-4v5H4V11Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
    </Icon>
  )
}

function ListIcon() {
  return (
    <Icon>
      <rect height="17" rx="2" stroke="currentColor" strokeWidth="2" width="15" x="4.5" y="3.5" />
      <path d="m8 9 .9.9L10.6 8M12.7 9.2H17M8 14.5l.9.9 1.7-1.9M12.7 14.7H17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </Icon>
  )
}

function CartIcon() {
  return (
    <Icon>
      <path d="M3 5h2l1.8 9.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 8H6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <circle cx="9" cy="19" fill="currentColor" r="1.4" />
      <circle cx="17" cy="19" fill="currentColor" r="1.4" />
    </Icon>
  )
}

function LeafIcon() {
  return (
    <Icon className="stat-icon" size={27}>
      <path d="M20 4.5C12.2 4.2 6.1 7 5.2 12.1c-.7 3.9 3 6.6 6.3 4.7 3.8-2.2 5.4-7.1 8.5-12.3Z" fill="currentColor" />
      <path d="M4 20c2.3-4.5 6-7.6 11.1-9.4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </Icon>
  )
}

function DropIcon() {
  return (
    <Icon className="stat-icon" size={26}>
      <path d="M12 2.8S5.7 10.4 5.7 15a6.3 6.3 0 0 0 12.6 0C18.3 10.4 12 2.8 12 2.8Z" fill="currentColor" />
      <path d="M9 16.2c.3 1.3 1.2 2.1 2.5 2.5" stroke="white" strokeLinecap="round" strokeWidth="1.5" />
    </Icon>
  )
}

function StreakIcon() {
  return (
    <Icon className="streak-recycle-icon" size={48}>
      <path d="M11.8 3.2a8.9 8.9 0 0 1 7.4 4.1l1-2.1 1.8 5.6-5.8.5 1.3-1.8A6.9 6.9 0 0 0 12 6.1" fill="rgb(11, 196, 67)" stroke="none" />
      <path d="M20.2 12.6a8.9 8.9 0 0 1-7.3 8.2l1.4 1.9-5.8-1.2 2.4-5.3 1.2 1.9a6.9 6.9 0 0 0 5.2-5.4" fill="rgb(11, 196, 67)" stroke="none" />
      <path d="M8 19.9a8.9 8.9 0 0 1-3.1-10.5l-2.4.2 4-4.3 3.9 4.3-2.2-.1A6.9 6.9 0 0 0 9.6 17" fill="rgb(11, 196, 67)" stroke="none" />
    </Icon>
  )
}

function MiniBottleIcon() {
  return (
    <Icon size={25}>
      <path d="M9 3.5h6M10 6h4v3l2.6 3.1v7.4c0 .8-.7 1.5-1.5 1.5H8.9c-.8 0-1.5-.7-1.5-1.5v-7.4L10 9V6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M8 14.2h8M9.5 17.2h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </Icon>
  )
}

function PuzzleIcon() {
  return (
    <Icon size={25}>
      <path d="M4 5.5h5.1a2.9 2.9 0 1 1 5.8 0H20v5.1a2.9 2.9 0 1 0 0 5.8v4.1h-5.1a2.9 2.9 0 1 0-5.8 0H4v-5.1a2.9 2.9 0 1 0 0-5.8V5.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
    </Icon>
  )
}

function RecyclingBinIcon() {
  return (
    <Icon size={27}>
      <path d="M6.5 8h11l-1 13h-9l-1-13ZM5 5.5h14M9 5.5V3h6v2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
      <path d="m10.1 12 1.7-1.1 1 1.6M14.9 14l-.1 2-1.8.1M10.3 16l-1-1.7 1-1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
    </Icon>
  )
}

function HouseScene({
  onClean,
  onComplete,
  purchased,
}: {
  onClean: () => void
  onComplete: () => void
  purchased: string[]
}) {
  const [cleaned, setCleaned] = useState<string[]>([])
  const houseColor = [...purchased].reverse().find((item) => item.startsWith('color-'))
  const trash = [
    { id: 'bottle-1', type: 'bottle', className: 'trash bottle bottle-one', label: 'Botella de plástico' },
    { id: 'can-1', type: 'can', className: 'trash can can-one', label: 'Lata amarilla' },
    { id: 'paper-1', type: 'paper', className: 'trash paper paper-one', label: 'Papel arrugado' },
    { id: 'bag-1', type: 'bag', className: 'trash bag bag-one', label: 'Bolsa de basura' },
    { id: 'bottle-2', type: 'bottle', className: 'trash bottle bottle-two', label: 'Botella azul' },
    { id: 'can-2', type: 'can', className: 'trash can can-two', label: 'Lata oxidada' },
    { id: 'paper-2', type: 'paper', className: 'trash paper paper-two', label: 'Envoltorio' },
    { id: 'bag-2', type: 'bag', className: 'trash bag bag-two', label: 'Bolsa pequeña' },
  ]

  const cleanItem = (id: string) => {
    if (cleaned.includes(id)) return
    const nextCleaned = [...cleaned, id]
    setCleaned(nextCleaned)
    onClean()
    if (nextCleaned.length === trash.length) onComplete()
  }

  return (
    <section className={`scene clean-stage-${Math.floor(cleaned.length / 2)}`} aria-label="Casa rodeada de residuos">
      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />
      <div className="level-chip"><span>Nivel actual</span><strong>1</strong></div>
      <svg aria-hidden="true" className="hill hill-back" viewBox="0 0 700 190">
        <path d="M0 125C115 45 190 52 290 118c91-80 206-99 410 15v57H0Z" />
      </svg>
      <svg aria-hidden="true" className="hill hill-front" viewBox="0 0 700 180">
        <path d="M0 89c137-42 226-23 322 38 96-59 207-72 378-14v67H0Z" />
      </svg>

      <div className="tree">
        <div className="tree-top tree-top-a" />
        <div className="tree-top tree-top-b" />
        <div className="tree-top tree-top-c" />
        <div className="trunk" />
      </div>

      <div className="dirt dirt-one"><i /><i /><i /></div>
      <div className="dirt dirt-two"><i /><i /><i /></div>
      <div className="dirt dirt-three"><i /><i /></div>

      <div className={`house ${houseColor || ''}`}>
        <div className="chimney" />
        <div className="roof" />
        {purchased.includes('gato') && <span className="roof-cat cat-black"><i /><i /><b /><em /></span>}
        {purchased.includes('gato-naranjo') && <span className="yard-cat cat-orange"><i /><i /><b /><em /></span>}
        {purchased.includes('gato-blanco') && <span className="yard-cat cat-white"><i /><i /><b /><em /></span>}
        <div className="house-body">
          <span className="wall-stain wall-stain-one" />
          <span className="wall-stain wall-stain-two" />
          <span className="wall-crack" />
          <div className="window">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="door">
            <span />
          </div>
        </div>
        {purchased.includes('planta') && <span className="porch-plant"><i /><i /><i /></span>}
        {purchased.includes('lavanda') && <span className="lavender-pot"><i /><i /><i /></span>}
        {purchased.includes('flores') && <span className="flower-bed"><i /><i /><i /><i /></span>}
        {purchased.includes('enredadera') && <span className="wall-vine"><i /><i /><i /><i /></span>}
        {purchased.includes('lampara') && <span className="garden-lamp"><i /></span>}
        {purchased.includes('cerca') && <span className="garden-fence"><i /><i /><i /></span>}
        {purchased.includes('banca') && <span className="garden-bench"><i /><i /></span>}
        {purchased.includes('casita-ave') && <span className="bird-house"><i /></span>}
        {purchased.includes('molino') && <span className="pinwheel"><i /><i /><i /><i /></span>}
        {purchased.includes('felpudo') && <span className="welcome-mat">HOLA</span>}
        <div className="bush bush-left" />
        <div className="bush bush-right" />
      </div>
      <div className="clean-growth"><i /><i /><i /><i /><i /></div>

      {trash.map((item) => (
        <button
          aria-label={`Recoger ${item.label}`}
          className={`${item.className} ${cleaned.includes(item.id) ? 'is-cleaned' : ''}`}
          key={item.id}
          onClick={() => cleanItem(item.id)}
          type="button"
        >
          <span className="trash-spark">+</span>
          {item.type === 'bottle' && <span className="bottle-shape"><i /></span>}
          {item.type === 'can' && <span className="can-shape"><i /></span>}
          {item.type === 'paper' && <span className="paper-shape" />}
          {item.type === 'bag' && <span className="bag-shape"><i /></span>}
        </button>
      ))}

      <div className="scene-prompt">
        <span className="prompt-icon"><LeafIcon /></span>
        <div>
          <strong>¡Empecemos por casa!</strong>
          <span>Recoge los residuos del jardín</span>
        </div>
        <span className="progress-count">{cleaned.length}/8</span>
      </div>
    </section>
  )
}

const panelData: Record<Exclude<Tab, 'inicio'>, { eyebrow: string; title: string; description: string; action: string }> = {
  perfil: { eyebrow: 'Explorador nivel 1 ', title: 'Tu impacto crece', description: 'Has reciclado 28 objetos y protegido 3 espacios naturales.', action: 'Ver mis logros' },
  juegos: { eyebrow: 'Minijuegos', title: 'Juega y gana agua', description: 'Supera retos ambientales para conseguir gotas de agua.', action: 'Ver todos los juegos' },
  misiones: { eyebrow: 'Misiones verdes', title: 'Actúa y gana hojas', description: 'Completa acciones ecológicas para conseguir hojas.', action: 'Ver todas las misiones' },
  tienda: { eyebrow: 'Personaliza tu hogar', title: 'Tienda ecológica', description: 'Usa tus hojas y gotas para decorar, pintar y llenar de vida tu casa.', action: 'Ver la tienda' },
}

function FeaturePanel({
  tab,
  initialView,
  onClose,
  onWaterReward,
  completedMissions,
  claimedMissions,
  completeMission,
  claimMission,
  rewardClaimed,
  onClaimReward,
  onNavigate,
  leaves,
  water,
  purchased,
  onPurchase,
}: {
  tab: Exclude<Tab, 'inicio'>
  initialView: PanelView
  onClose: () => void
  onWaterReward: (amount: number) => void
  completedMissions: string[]
  claimedMissions: string[]
  completeMission: (title: string, reward: number) => void
  claimMission: (title: string, reward: number) => void
  rewardClaimed: boolean
  onClaimReward: () => void
  onNavigate: (tab: Tab, view?: PanelView) => void
  leaves: number
  water: number
  purchased: string[]
  onPurchase: (id: string, cost: number, currency: 'leaves' | 'water') => void
}) {
  const data = panelData[tab]
  const [view, setView] = useState<PanelView>(initialView)
  const [activeGame, setActiveGame] = useState<GameId | null>(null)
  const [gameRuns, setGameRuns] = useState<Record<string, number[]>>(() => {
    try {
      return JSON.parse(localStorage.getItem('eco-game-runs') || '{}')
    } catch {
      return {}
    }
  })
  const [sound, setSound] = useState(true)
  const [music, setMusic] = useState(true)
  const [notifications, setNotifications] = useState(false)
  const [mapZoomed, setMapZoomed] = useState(false)
  const gameItems = [
    { id: 'match' as GameId, icon: <MiniBottleIcon />, title: 'Queule crash', detail: 'junta 3 residuos iguales', reward: 3 },
    { id: 'puzzle' as GameId, icon: <PuzzleIcon />, title: 'Arma el rompecabezas', detail: 'Completa la imagen del zorro', reward: 5 },
    { id: 'recycle' as GameId, icon: <RecyclingBinIcon />, title: 'Recicla correctamente', detail: 'clasifica en su basurero', reward: 4 },
    { id: 'trivia' as GameId, icon: <ListIcon />, title: 'Trivia verde', detail: 'Demuestra tu conocimiento', reward: 6 },
  ]
  const missionItems = [
    { title: 'Limpia el jardín', detail: 'Recoge 8 residuos', reward: '40', progress: '8/8', target: 'inicio' as Tab, view: undefined },
    { title: 'Aprende algo nuevo', detail: 'Lee un articulo', reward: '25', progress: '1/1', target: 'perfil' as Tab, view: 'news' as PanelView },
    { title: 'Demuestra tu conocimiento', detail: 'Completa la trivia', reward: '30', progress: '1/1', target: 'juegos' as Tab, view: undefined },
  ]
  const shopItems = [
    { id: 'planta', name: 'Planta nativa', detail: 'Para el porche', cost: 120, currency: 'leaves' as const, art: 'plant-art' },
    { id: 'lampara', name: 'Lámpara solar', detail: 'Ilumina el jardín', cost: 240, currency: 'leaves' as const, art: 'lamp-art' },
    { id: 'cerca', name: 'Cerca de madera', detail: 'Ordena tu patio', cost: 380, currency: 'leaves' as const, art: 'fence-art' },
    { id: 'gato', name: 'Gato del tejado', detail: 'Compañero especial', cost: 25, currency: 'water' as const, art: 'cat-art' },
    { id: 'gato-naranjo', name: 'Gato naranjo', detail: 'Juega en el jardín', cost: 30, currency: 'water' as const, art: 'orange-cat-art' },
    { id: 'gato-blanco', name: 'Gato blanco', detail: 'Descansa junto a la casa', cost: 30, currency: 'water' as const, art: 'white-cat-art' },
    { id: 'banca', name: 'Banca reciclada', detail: 'Un rincón para descansar', cost: 460, currency: 'leaves' as const, art: 'bench-art' },
    { id: 'casita-ave', name: 'Casa para aves', detail: 'Atrae fauna nativa', cost: 520, currency: 'leaves' as const, art: 'birdhouse-art' },
    { id: 'lavanda', name: 'Maceta de lavanda', detail: 'Flores aromáticas', cost: 180, currency: 'leaves' as const, art: 'lavender-art' },
    { id: 'flores', name: 'Jardín de flores', detail: 'Colores para el patio', cost: 260, currency: 'leaves' as const, art: 'flowers-art' },
    { id: 'enredadera', name: 'Enredadera', detail: 'Cubre una pared', cost: 320, currency: 'leaves' as const, art: 'vine-art' },
    { id: 'molino', name: 'Molino de viento', detail: 'Gira con la brisa', cost: 290, currency: 'leaves' as const, art: 'pinwheel-art' },
    { id: 'felpudo', name: 'Felpudo de yute', detail: 'Bienvenida natural', cost: 140, currency: 'leaves' as const, art: 'mat-art' },
    { id: 'color-verde', name: 'Pintura salvia', detail: 'Cambia el color de la casa', cost: 350, currency: 'leaves' as const, art: 'paint-green-art' },
    { id: 'color-azul', name: 'Pintura océano', detail: 'Cambia el color de la casa', cost: 350, currency: 'leaves' as const, art: 'paint-blue-art' },
    { id: 'color-rosa', name: 'Pintura coral', detail: 'Cambia el color de la casa', cost: 350, currency: 'leaves' as const, art: 'paint-coral-art' },
  ]

  const goBack = () => setView(view === 'map' || view === 'news' || view === 'settings' ? 'extras' : 'main')
  const allMissionsComplete = completedMissions.length === missionItems.length
  const getGameStatus = (id: GameId) => {
    const now = Date.now()
    const today = new Date().toDateString()
    const runsToday = (gameRuns[id] || []).filter((time) => new Date(time).toDateString() === today)
    if (runsToday.length >= 3) return { available: false, label: 'Límite diario' }
    const lastRun = runsToday.at(-1)
    if (lastRun && now - lastRun < 60 * 60 * 1000) {
      const minutes = Math.ceil((60 * 60 * 1000 - (now - lastRun)) / 60000)
      return { available: false, label: `${minutes} min` }
    }
    return { available: true, label: `${runsToday.length}/3 hoy` }
  }
  const finishGame = (id: GameId, reward: number) => {
    const next = { ...gameRuns, [id]: [...(gameRuns[id] || []), Date.now()] }
    setGameRuns(next)
    localStorage.setItem('eco-game-runs', JSON.stringify(next))
    onWaterReward(reward)
    if (id === 'trivia') completeMission('Demuestra tu conocimiento', 30)
  }

  if (tab === 'juegos' && activeGame) {
    const game = gameItems.find((item) => item.id === activeGame)!
    return <GameExperience game={activeGame} onBack={() => setActiveGame(null)} onWin={() => finishGame(activeGame, game.reward)} />
  }

  if (tab === 'perfil' && view !== 'main') {
    return (
      <section className="feature-panel profile-detail" aria-live="polite">
        <button aria-label="Volver" className="back-panel" onClick={goBack} type="button">←</button>
        <button aria-label="Cerrar" className="close-panel" onClick={onClose} type="button">×</button>
        {view === 'extras' && (
          <>
            <span className="panel-eyebrow">Herramientas para valparaiso</span>
            <strong>&nbsp;&nbsp;</strong>
            <p>Revisa tu impacto y descubre nuevas formas de cuidar tu entorno.</p>
            <div className="profile-menu">
              <button onClick={() => setView('map')} type="button"><span className="menu-art map-art" /><span><strong>Mapa</strong><small>Lugares limpios cercanos</small></span><b>→</b></button>
              <button onClick={() => setView('news')} type="button"><span className="menu-art news-art" /><span><strong>Noticias</strong><small>Actualidad ambiental</small></span><b>→</b></button>
              <button onClick={() => setView('settings')} type="button"><span className="menu-art settings-art" /><span><strong>Ajustes</strong><small>Sonido y preferencias</small></span><b>→</b></button>
            </div>
          </>
        )}
        {view === 'map' && (
          <>
            <span className="panel-eyebrow">Mapa</span>
            <strong>Valparaíso limpio</strong>
            <div className="map-profile-summary"><span className="profile-avatar">M</span><span><strong>Matias</strong><small>3 puntos visitados · Nivel 1</small></span><b>7 días</b></div>
            <div className={`profile-map-card ${mapZoomed ? 'zoomed' : ''}`}>
              <img alt="Mapa de puntos limpios y centros de reciclaje de Valparaíso" src="/valparaiso-recycling-map.png" />
              <span className="green-map-pin green-pin-one"><i /></span>
              <span className="green-map-pin green-pin-two"><i /></span>
              <span className="green-map-pin green-pin-three"><i /></span>
              <div className="map-controls"><button aria-label="Acercar mapa" onClick={() => setMapZoomed(true)} type="button">+</button><button aria-label="Alejar mapa" onClick={() => setMapZoomed(false)} type="button">−</button></div>
            </div>
            <div className="map-legend"><span><i className="legend-clean" />Punto limpio</span><span><i className="legend-recycle" />Centro de reciclaje</span><span><i className="legend-visited" />Visitado</span></div>
            <div className="place-list"><span><i />Punto limpio Plásticos PET <b>Abierto</b></span><span><i />Centro de reciclaje Placilla <b>2 km</b></span></div>
          </>
        )}
        {view === 'news' && (
          <>
            <span className="panel-eyebrow">Noticias</span>
            <strong>Aprende algo nuevo</strong>
            <p>Leer también es una forma de transformar el planeta.</p>
            <article className="news-card"><span className="news-cover drought-cover"><DropIcon /></span><small>Sequía y recuperación hídrica · 4 min</small><strong>La nueva imagen del lago Peñuelas tras las lluvias</strong><p>Conoce cómo las precipitaciones cambiaron el embalse y qué significa para la sequía en Valparaíso.</p><button onClick={() => { window.open('https://www.msn.com/es-cl/infraestructura-urbana/sostenibilidad-medioambiental/significa-que-el-embalse-se-va-a-mantener-la-nueva-imagen-del-lago-pe%C3%B1uelas-tras-intensas-lluvias/ar-AA28uH2q?ocid=BingNewsVerp', '_blank', 'noopener,noreferrer'); completeMission('Aprende algo nuevo', 25) }} type="button">{completedMissions.includes('Aprende algo nuevo') ? 'Volver a leer la noticia' : 'Leer noticia y completar misión'}</button></article>
          </>
        )}
        {view === 'settings' && (
          <>
            <span className="panel-eyebrow">Ajustes</span>
            <strong>Tu experiencia</strong>
            <p>Configura el juego a tu manera.</p>
            <div className="settings-list">
              <button onClick={() => setSound(!sound)} type="button"><span>Sonidos del juego<small>Efectos y recompensas</small></span><i className={sound ? 'toggle on' : 'toggle'} /></button>
              <button onClick={() => setMusic(!music)} type="button"><span>Música ambiental<small>Sonidos de la naturaleza</small></span><i className={music ? 'toggle on' : 'toggle'} /></button>
              <button onClick={() => setNotifications(!notifications)} type="button"><span>Recordatorios<small>Misiones y racha diaria</small></span><i className={notifications ? 'toggle on' : 'toggle'} /></button>
            </div>
          </>
        )}
      </section>
    )
  }

  return (
    <section className={`feature-panel panel-${tab}`} aria-live="polite">
      <button aria-label="Volver al inicio" className="close-panel" onClick={onClose} type="button">×</button>
      <span className="panel-eyebrow">{data.eyebrow}</span>
      <strong>{data.title}</strong>
      <p>{data.description}</p>
      {tab === 'perfil' && (
        <>
          <div className="profile-summary">
            <span className="profile-avatar">M</span>
            <div><strong>Matias</strong><small>Ecoexplorador · Nivel 1 </small></div>
          </div>
          <div className="profile-stats">
            <span><strong>28</strong><small>residuos</small></span>
            <span><strong>3</strong><small>lugares</small></span>
            <span><strong>7</strong><small>días de racha</small></span>
          </div>
          <div className="impact-progress"><span><b className="impact-fill" /></span><small>70% para alcanzar el nivel 2 </small></div>
        </>
      )}
      {tab === 'juegos' && (
        <div className="reward-list">
          {gameItems.map((item) => (
            <button
              className="reward-card game-card"
              disabled={!getGameStatus(item.id).available}
              key={item.title}
              onClick={() => setActiveGame(item.id)}
              type="button"
            >
              <span className="item-number">{item.icon}</span>
              <span className="item-copy"><strong>{item.title}</strong><small>{item.detail}</small></span>
              <span className="item-reward water-reward"><DropIcon />{getGameStatus(item.id).available ? `+${item.reward}` : getGameStatus(item.id).label}</span>
            </button>
          ))}
        </div>
      )}
      {tab === 'misiones' && (
        <>
          <div className="reward-list">
            {missionItems.map((item) => {
              const complete = completedMissions.includes(item.title)
              const claimed = claimedMissions.includes(item.title)
              return (
                <button
                  className={`reward-card mission-card ${complete && !claimed ? 'claim-ready' : ''}`}
                  disabled={claimed}
                  key={item.title}
                  onClick={() => complete ? claimMission(item.title, Number(item.reward)) : onNavigate(item.target, item.view)}
                  type="button"
                >
                  <span className={`mission-check ${complete ? 'checked' : ''}`} />
                  <span className="item-copy"><strong>{item.title}</strong><small>{item.detail} · {complete ? item.progress : item.progress.replace(/^[^/]+/, '0')}</small></span>
                  <span className="item-reward leaf-reward"><LeafIcon />{claimed ? 'Cobrada' : complete ? `Reclamar +${item.reward}` : `+${item.reward}`}</span>
                </button>
              )
            })}
          </div>
          <div className={`mission-bonus ${allMissionsComplete ? 'ready' : ''}`}>
            <span className="bonus-drop"><DropIcon /></span>
            <span><strong>Recompensa semanal</strong><small>Completa las 3 misiones</small></span>
            <button disabled={!allMissionsComplete || rewardClaimed} onClick={onClaimReward} type="button">{rewardClaimed ? 'Canjeada' : '+100'}</button>
          </div>
        </>
      )}
      {tab === 'tienda' && (
        <div className="shop-grid">
          {shopItems.map((item) => {
            const owned = purchased.includes(item.id)
            const reusable = item.id.startsWith('color-')
            const canBuy = item.currency === 'leaves' ? leaves >= item.cost : water >= item.cost
            return (
              <button disabled={(owned && !reusable) || (!owned && !canBuy)} key={item.id} onClick={() => onPurchase(item.id, item.cost, item.currency)} type="button">
                <span className={`shop-art ${item.art}`}><i /><i /></span>
                <span className="shop-copy"><strong>{item.name}</strong><small>{item.detail}</small></span>
                <span className={`shop-price ${item.currency}`}>{item.currency === 'leaves' ? <LeafIcon /> : <DropIcon />}{owned ? reusable ? 'Aplicar' : 'Comprado' : item.cost}</span>
              </button>
            )
          })}
        </div>
      )}
      {tab === 'perfil' && <button className="panel-action" onClick={() => setView('extras')} type="button">Ver mis logros<span>→</span></button>}
    </section>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('inicio')
  const [panelView, setPanelView] = useState<PanelView>('main')
  const [leaves, setLeaves] = useState(1240)
  const [water, setWater] = useState(36)
  const [completedMissions, setCompletedMissions] = useState<string[]>([])
  const [claimedMissions, setClaimedMissions] = useState<string[]>([])
  const [rewardClaimed, setRewardClaimed] = useState(false)
  const [purchased, setPurchased] = useState<string[]>([])

  const completeMission = (title: string, _reward: number) => {
    if (completedMissions.includes(title)) return
    setCompletedMissions((missions) => [...missions, title])
  }

  const claimMission = (title: string, reward: number) => {
    if (!completedMissions.includes(title) || claimedMissions.includes(title)) return
    setClaimedMissions((missions) => [...missions, title])
    setLeaves((value) => value + reward)
  }

  const navigate = (tab: Tab, view: PanelView = 'main') => {
    setPanelView(view)
    setActiveTab(tab)
  }

  const purchase = (id: string, cost: number, currency: 'leaves' | 'water') => {
    if (purchased.includes(id)) {
      if (id.startsWith('color-')) setPurchased((items) => [...items.filter((item) => item !== id), id])
      return
    }
    if (currency === 'leaves') {
      if (leaves < cost) return
      setLeaves((value) => value - cost)
    } else {
      if (water < cost) return
      setWater((value) => value - cost)
    }
    setPurchased((items) => [...items, id])
  }

  return (
    <main className="app-shell">
      <div className="game">
        <header className="topbar">
          <div className="brand" aria-label="Ecoaventura">
            <span className="brand-mark"><LeafIcon /></span>
            <span>Eco<span>aventura</span></span>
          </div>

          <div className="status-group">
            <div className="currency leaf-currency" title="Hojas">
              <LeafIcon />
              <strong>{leaves.toLocaleString('es-ES')}</strong>
              <button aria-label="Conseguir más hojas" type="button">+</button>
            </div>
            <div className="currency water-currency" title="Gotas de agua">
              <DropIcon />
              <strong>{water}</strong>
              <button aria-label="Conseguir más agua" type="button">+</button>
            </div>
          </div>

          <div className="streak" title="Racha de 7 días">
            <div className="streak-ring">
              <StreakIcon />
              <strong>7</strong>
            </div>
            <span>días</span>
          </div>
        </header>

        <div className="welcome">
          <span>Buenos días, MATIAS</span>
          <strong>LIMPIA TU CERRO</strong>
        </div>

        <HouseScene
          onClean={() => setLeaves((value) => value + 5)}
          onComplete={() => completeMission('Limpia el jardín', 40)}
          purchased={purchased}
        />
        {activeTab !== 'inicio' && (
          <FeaturePanel
            claimedMissions={claimedMissions}
            claimMission={claimMission}
            completeMission={completeMission}
            completedMissions={completedMissions}
            initialView={panelView}
            key={`${activeTab}-${panelView}`}
            leaves={leaves}
            onClose={() => setActiveTab('inicio')}
            onClaimReward={() => {
              if (completedMissions.length === 3 && !rewardClaimed) {
                setWater((value) => value + 100)
                setRewardClaimed(true)
              }
            }}
            onNavigate={navigate}
            onPurchase={purchase}
            onWaterReward={(amount) => setWater((value) => value + amount)}
            purchased={purchased}
            rewardClaimed={rewardClaimed}
            tab={activeTab}
            water={water}
          />
        )}

        <nav aria-label="Navegación principal" className="bottom-nav">
          {tabs.map((tab) => (
            <button
              aria-current={activeTab === tab.id ? 'page' : undefined}
              className={activeTab === tab.id ? 'active' : ''}
              key={tab.id}
              onClick={() => navigate(tab.id)}
              type="button"
            >
              {tab.id === 'misiones' && (completedMissions.some((mission) => !claimedMissions.includes(mission)) || (completedMissions.length === 3 && !rewardClaimed)) && <i className="nav-notification" />}
              <span className="nav-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </main>
  )
}
