import { useState, type ReactNode } from 'react'

export type GameId = 'match' | 'puzzle' | 'recycle' | 'trivia'

type GameProps = {
  game: GameId
  onBack: () => void
  onWin: () => void
}

const foxPhoto =
  'https://images.unsplash.com/photo-1749486216290-c96118c70b05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'

function GameFrame({
  title,
  subtitle,
  children,
  onBack,
}: {
  title: string
  subtitle: string
  children: ReactNode
  onBack: () => void
}) {
  return (
    <section className="game-experience" aria-live="polite">
      <button className="game-back" onClick={onBack} type="button">←</button>
      <span className="panel-eyebrow">Minijuego</span>
      <strong>{title}</strong>
      <p>{subtitle}</p>
      {children}
    </section>
  )
}

const matchShapes = ['bottle', 'can', 'leaf', 'bin']
const scoreGoal = 1000

function createMatchBoard(seed: number) {
  const board = Array.from({ length: 25 }, (_, index) => matchShapes[(index * 2 + Math.floor(index / 5) + seed) % matchShapes.length])
  const target = matchShapes[seed % matchShapes.length]
  board[0] = target
  board[1] = target
  board[2] = matchShapes[(seed + 1) % matchShapes.length]
  board[7] = target
  return board
}

function MatchGame({ onBack, onWin }: Omit<GameProps, 'game'>) {
  const [board, setBoard] = useState(() => createMatchBoard(0))
  const [selected, setSelected] = useState<number | null>(null)
  const [message, setMessage] = useState('Selecciona un objeto y muévelo una casilla.')
  const [won, setWon] = useState(false)
  const [moves, setMoves] = useState(15)
  const [score, setScore] = useState(0)

  const hasMatch = (items: string[]) => {
    for (let row = 0; row < 5; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        const i = row * 5 + col
        if (items[i] === items[i + 1] && items[i] === items[i + 2]) return true
      }
    }
    for (let col = 0; col < 5; col += 1) {
      for (let row = 0; row < 3; row += 1) {
        const i = row * 5 + col
        if (items[i] === items[i + 5] && items[i] === items[i + 10]) return true
      }
    }
    return false
  }

  const move = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (selected === null || won || moves === 0) return
    const row = Math.floor(selected / 5)
    const col = selected % 5
    if ((direction === 'up' && row === 0) || (direction === 'down' && row === 4) || (direction === 'left' && col === 0) || (direction === 'right' && col === 4)) {
      setMessage('Ese objeto no puede moverse en esa dirección.')
      return
    }
    const offset = direction === 'up' ? -5 : direction === 'down' ? 5 : direction === 'left' ? -1 : 1
    const next = [...board]
    ;[next[selected], next[selected + offset]] = [next[selected + offset], next[selected]]
    setMoves((value) => value - 1)
    if (!hasMatch(next)) {
      setMessage(moves === 1 ? 'Sin movimientos. Vuelve para intentarlo otra vez.' : 'Aún no hay tres iguales. Prueba otro movimiento.')
      setSelected(null)
      return
    }
    const nextScore = score + 100
    setScore(nextScore)
    setSelected(null)
    if (nextScore >= scoreGoal) {
      setBoard(next)
      setWon(true)
      setMessage('¡Meta de puntos alcanzada!')
      onWin()
    } else {
      setBoard(createMatchBoard(nextScore / 100))
      setMessage(`¡+100 puntos! Busca una nueva combinación.`)
    }
  }

  return (
    <GameFrame onBack={onBack} subtitle={`Forma filas de tres hasta llegar a ${scoreGoal.toLocaleString('es-CL')} puntos.`} title="Queule crash">
      <div className="match-header">
        <span><small>Movimientos</small><strong>{moves}</strong></span>
        <span><small>Puntaje</small><strong>{score.toLocaleString('es-CL')}</strong></span>
        <span><small>Meta</small><strong>{scoreGoal.toLocaleString('es-CL')}</strong></span>
      </div>
      <div className="score-progress">
        <span>{Array.from({ length: 10 }, (_, index) => <i className={index < score / 100 ? 'filled' : ''} key={index} />)}</span>
        <b>{Math.round((score / scoreGoal) * 100)}%</b>
      </div>
      <div className="match-board">
        {board.map((item, index) => (
          <button aria-label={`Objeto ${item}`} className={`match-${item} ${selected === index ? 'selected' : ''}`} key={`${index}-${item}`} onClick={() => setSelected(index)} type="button"><i /></button>
        ))}
      </div>
      <div className="direction-pad">
        <button aria-label="Mover arriba" onClick={() => move('up')} type="button">↑</button>
        <button aria-label="Mover izquierda" onClick={() => move('left')} type="button">←</button>
        <button aria-label="Mover abajo" onClick={() => move('down')} type="button">↓</button>
        <button aria-label="Mover derecha" onClick={() => move('right')} type="button">→</button>
      </div>
      <p className={won ? 'game-message success' : 'game-message'}>{message}</p>
    </GameFrame>
  )
}

const animalPhotos = [
  { id: 'culpeo', name: 'Zorro culpeo', image: foxPhoto, credit: 'Diego Marín' },
  { id: 'guanaco', name: 'Guanaco patagónico', image: 'https://images.unsplash.com/photo-1782333052810-6e9b58102975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', credit: 'Rafael Peier' },
  { id: 'pudu', name: 'Ciervo del bosque', image: 'https://images.unsplash.com/photo-1544028895-15df7c485276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', credit: 'Mariana Proença' },
]

function PuzzleGame({ onBack, onWin }: Omit<GameProps, 'game'>) {
  const [animal, setAnimal] = useState<(typeof animalPhotos)[number] | null>(null)
  const [pieces, setPieces] = useState([1, 0, 2, 3, 4, 5, 7, 6, 8, 9, 11, 10])
  const [selected, setSelected] = useState<number | null>(null)
  const [won, setWon] = useState(false)

  const selectPiece = (index: number) => {
    if (won) return
    if (selected === null) {
      setSelected(index)
      return
    }
    const next = [...pieces]
    ;[next[selected], next[index]] = [next[index], next[selected]]
    setPieces(next)
    setSelected(null)
    if (next.every((piece, position) => piece === position)) {
      setWon(true)
      onWin()
    }
  }

  if (!animal) {
    return (
      <GameFrame onBack={onBack} subtitle="Elige una especie para armar su rompecabezas de 12 piezas." title="Fauna nativa">
        <div className="animal-gallery">
          {animalPhotos.map((option) => (
            <button key={option.id} onClick={() => setAnimal(option)} type="button">
              <img alt={option.name} src={option.image} />
              <span><strong>{option.name}</strong><small>12 piezas</small></span>
            </button>
          ))}
        </div>
      </GameFrame>
    )
  }

  return (
    <GameFrame onBack={onBack} subtitle="Intercambia dos piezas hasta reconstruir la imagen." title={animal.name}>
      <button className="change-animal" onClick={() => { setAnimal(null); setPieces([1, 0, 2, 3, 4, 5, 7, 6, 8, 9, 11, 10]); setSelected(null); setWon(false) }} type="button">Cambiar animal</button>
      <div className={`puzzle-board ${won ? 'complete' : ''}`}>
        {pieces.map((piece, index) => (
          <button
            aria-label={`Pieza ${piece + 1}`}
            className={`puzzle-piece piece-${piece} ${selected === index ? 'selected' : ''}`}
            key={`${index}-${piece}`}
            onClick={() => selectPiece(index)}
            style={{ backgroundImage: `url("${animal.image}")` }}
            type="button"
          />
        ))}
      </div>
      <div className="photo-credit">{animal.name} · Foto de {animal.credit} en Unsplash</div>
      <p className={won ? 'game-message success' : 'game-message'}>{won ? '¡Rompecabezas completado!' : selected === null ? 'Elige la primera pieza.' : 'Ahora elige dónde intercambiarla.'}</p>
    </GameFrame>
  )
}

const recycleObjects = [
  { name: 'Botella plástica', material: 'plastic', explanation: 'El plástico debe ir al contenedor amarillo.' },
  { name: 'Frasco de vidrio', material: 'glass', explanation: 'El vidrio limpio se deposita en el contenedor verde.' },
  { name: 'Lata de bebida', material: 'metal', explanation: 'Las latas van al contenedor amarillo junto a envases.' },
  { name: 'Periódico', material: 'paper', explanation: 'El papel seco corresponde al contenedor azul.' },
  { name: 'Caja de cartón', material: 'paper', explanation: 'Aplana el cartón y llévalo al contenedor azul.' },
]

function RecycleGame({ onBack, onWin }: Omit<GameProps, 'game'>) {
  const [index, setIndex] = useState(0)
  const [message, setMessage] = useState('Selecciona el contenedor correcto.')
  const [won, setWon] = useState(false)
  const current = recycleObjects[index]

  const choose = (material: string) => {
    if (won) return
    if (material !== current.material) {
      setMessage(current.explanation)
      return
    }
    if (index === recycleObjects.length - 1) {
      setWon(true)
      setMessage('¡Los 5 residuos quedaron bien clasificados!')
      onWin()
    } else {
      setIndex((value) => value + 1)
      setMessage('¡Correcto! Continúa con el siguiente.')
    }
  }

  return (
    <GameFrame onBack={onBack} subtitle="Lleva cinco residuos a su contenedor correcto." title="Recicla correctamente">
      <div className="sort-object">
        <span className={`sort-icon sort-${current.material}`}><i /></span>
        <strong>{current.name}</strong>
        <small>{index + 1}/5</small>
      </div>
      <div className="bin-grid">
        <button className="bin yellow" onClick={() => choose('plastic')} type="button"><span>Envases</span><small>Plástico</small></button>
        <button className="bin green" onClick={() => choose('glass')} type="button"><span>Vidrio</span><small>Botellas</small></button>
        <button className="bin blue" onClick={() => choose('paper')} type="button"><span>Papel</span><small>Cartón</small></button>
        <button className="bin gray" onClick={() => choose('metal')} type="button"><span>Metales</span><small>Latas</small></button>
      </div>
      <p className={won ? 'game-message success' : 'game-message'}>{message}</p>
    </GameFrame>
  )
}

const questions = [
  { question: '¿Qué aves son típicas de la costa de Valparaíso?', options: ['Cóndor, ñandú y flamenco', 'Gaviota, pelícano, yeco y pingüino de Humboldt', 'Carpintero negro, tiuque y loro tricahue', 'Cisne, garza y águila real'], correct: 1 },
  { question: '¿Por qué se le dice “Plan” al centro de Valparaíso?', options: ['Porque sus calles forman un plano perfecto', 'Por el antiguo Plan de Navegación del puerto', 'Por el plan de reconstrucción posterior al terremoto de 1960', 'Porque fue diseñado por urbanistas franceses'], correct: 2 },
  { question: '¿Con qué fuente de agua se abastece Valparaíso?', options: ['Río Aconcagua', 'Río Maipo', 'Lago Peñuelas únicamente', 'Río Mapocho'], correct: 0 },
  { question: '¿Cuál es el ascensor funcional más antiguo?', options: ['Ascensor Artillería, inaugurado en 1920', 'Ascensor Polanco, inaugurado en 1850', 'Ascensor Barón, inaugurado en 1940', 'Ascensor Concepción, inaugurado en 1883'], correct: 3 },
  { question: 'Tengo cuatro patas, vivo en el bosque y soy el más pequeño de los ciervos en extinción. ¿Quién soy?', options: ['Pudú', 'Huemul', 'Zorro culpeo', 'Guanaco'], correct: 1 },
]

function TriviaGame({ onBack, onWin }: Omit<GameProps, 'game'>) {
  const [question, setQuestion] = useState(0)
  const [message, setMessage] = useState('Elige una respuesta.')
  const [won, setWon] = useState(false)

  const answer = (option: number) => {
    if (option !== questions[question].correct) {
      setMessage('Esa no es la respuesta. Revisa las opciones e intenta otra vez.')
      return
    }
    if (question === questions.length - 1) {
      setWon(true)
      setMessage('¡Todas las respuestas son correctas!')
      onWin()
    } else {
      setQuestion((value) => value + 1)
      setMessage('¡Correcto! Vamos con la siguiente.')
    }
  }

  return (
    <GameFrame onBack={onBack} subtitle={`Pregunta ${question + 1} de ${questions.length}`} title="Trivia verde">
      <div className="quiz-progress"><span><i className={`quiz-step-${question + 1}`} /></span><b>{question + 1}/{questions.length}</b></div>
      <div className="quiz-card">
        <strong>{questions[question].question}</strong>
        <div>
          {questions[question].options.map((option, index) => <button disabled={won} key={option} onClick={() => answer(index)} type="button"><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}
        </div>
      </div>
      <p className={won ? 'game-message success' : 'game-message'}>{message}</p>
    </GameFrame>
  )
}

export default function GameExperience({ game, onBack, onWin }: GameProps) {
  if (game === 'match') return <MatchGame onBack={onBack} onWin={onWin} />
  if (game === 'puzzle') return <PuzzleGame onBack={onBack} onWin={onWin} />
  if (game === 'recycle') return <RecycleGame onBack={onBack} onWin={onWin} />
  return <TriviaGame onBack={onBack} onWin={onWin} />
}
