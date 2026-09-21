'use client'

import { BrandLogo } from './brand-logo'
import { PAIRS, COPYRIGHT } from '@/lib/game-data'

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function EndScreen({
  seconds,
  onRestart,
}: {
  seconds: number
  onRestart: () => void
}) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-y-auto px-4 py-6 text-center sm:px-6 sm:py-10">
      <div className="flex w-full max-w-2xl flex-col items-center gap-4 sm:gap-5">
        <BrandLogo size="sm" />

        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-eco-green text-3xl text-primary-foreground shadow-lg">
            ✓
          </div>
          <h1 className="text-balance text-3xl font-extrabold text-foreground">
            ¡Gracias por cuidar el planeta!
          </h1>
          <p className="text-pretty text-base text-muted-foreground">
            Completaste el reto en{' '}
            <span className="font-bold text-primary">{formatTime(seconds)}</span>. Estos
            son los aprendizajes que te llevas hoy:
          </p>
        </div>

        <ul className="grid w-full gap-2 text-left sm:grid-cols-2 sm:gap-3">
          {PAIRS.map((p) => (
            <li
              key={p.id}
              className="flex items-start gap-3 rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border"
            >
              <img
                src={p.icon || '/placeholder.svg'}
                alt=""
                aria-hidden
                className="h-11 w-11 shrink-0 rounded-full bg-secondary object-cover"
              />
              <div>
                <p className="text-sm font-bold text-eco-green-dark">{p.learnTitle}</p>
                <p className="text-xs leading-snug text-muted-foreground">
                  {p.action} → {p.benefit}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onRestart}
          className="mt-2 min-h-14 w-full max-w-xs rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform active:scale-95 sm:px-12 sm:py-5 sm:text-xl"
        >
          Jugar de nuevo
        </button>

        <footer className="mt-4 flex flex-col items-center gap-1">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span>{COPYRIGHT}</span>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pakova%20icono-PCRN62nDJXYI8MmUpOLOGP1WtK9C3R.jpeg"
              alt="Pakova"
              className="h-7 w-7 rounded-full object-cover"
            />
          </div>
          <p className="text-[11px] font-medium text-muted-foreground">con fines educativos</p>
        </footer>
      </div>
    </div>
  )
}
