'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'

const values = ['♻️', '🌳', '💧', '☀️', '🥤', '🌱', '🔋', '🌎']

function shuffle(items: string[]) {
  return [...items, ...items].sort(() => Math.random() - 0.5)
}

export default function Page() {
  const [started, setStarted] = useState(false)
  const [cards, setCards] = useState(() => shuffle(values))
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)

  const restart = useCallback(() => {
    setCards(shuffle(values)); setFlipped([]); setMatched([]); setMoves(0); setLocked(false)
  }, [])

  function flip(index: number) {
    if (locked || flipped.includes(index) || matched.includes(index)) return
    const next = [...flipped, index]
    setFlipped(next)
    if (next.length !== 2) return
    setMoves((count) => count + 1)
    if (cards[next[0]] === cards[next[1]]) {
      setMatched((items) => [...items, ...next]); setFlipped([])
      return
    }
    setLocked(true)
    window.setTimeout(() => { setFlipped([]); setLocked(false) }, 900)
  }

  const isComplete = matched.length === values.length * 2

  return (
    <main className="memotest-page">
      <section className={`game-card ${started ? 'is-game' : ''}`}>
        <div className="brand"><Image src="/coca-cola-logo.png" alt="Coca-Cola" width={300} height={130} priority /></div>
        <h1>Memotest</h1>
        <div className="subtitle">Cuidemos el medio ambiente</div>
        {!started ? <>
          <p className="intro">Da vuelta las cartas de a dos y encuentra las 8 parejas de íconos sustentables. ¡Entrena tu memoria mientras pensás en cómo cuidar el planeta!</p>
          <button className="start-button" onClick={() => { setStarted(true); restart() }}>Iniciar Juego</button>
          <div className="creator"><Image src="/pakova.jpeg" alt="Pakova" width={42} height={42} /><p>Creado por Pakova</p></div>
        </> : isComplete ? <div className="completion" role="status" aria-live="polite">
          <div className="completion-mark" aria-hidden="true">8/8</div>
          <h2>¡Felicitaciones!</h2>
          <p className="completion-result">Encontraste todas las parejas en {moves} intentos.</p>
          <div className="lesson">
            <strong>Aprendizaje sustentable</strong>
            <p>Separar los residuos, ahorrar agua y energía, y reutilizar lo que tenemos son pequeñas acciones que ayudan a cuidar el planeta.</p>
          </div>
          <button className="restart-button" onClick={() => { restart(); setStarted(false) }}>Volver a la pantalla principal</button>
        </div> : <>
          <div className="stats"><span>Intentos: <b>{moves}</b></span><span>Parejas: <b>{matched.length / 2}</b>/8</span></div>
          <div className="board" aria-label="Tablero de memotest">
            {cards.map((value, index) => <button key={`${value}-${index}`} className={`card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''} ${matched.includes(index) ? 'matched' : ''}`} onClick={() => flip(index)} aria-label={flipped.includes(index) || matched.includes(index) ? `Carta ${value}` : 'Carta oculta'}>
              {flipped.includes(index) || matched.includes(index) ? value : <Image src="/cocacola.jpeg" alt="Carta oculta" width={90} height={90} />}
            </button>)}
          </div>
          <button className="restart-button" onClick={restart}>Reiniciar</button>
          <div className="message">Cada pequeña acción cuenta para cuidar nuestro planeta.</div>
        </>}
      </section>
      <footer><Image src="/pakova.jpeg" alt="Pakova" width={35} height={35} /><p>© 2026 Pakova. Todos los derechos reservados.</p></footer>
    </main>
  )
}
