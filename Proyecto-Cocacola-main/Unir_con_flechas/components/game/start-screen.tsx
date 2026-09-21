'use client'

import { BrandLogo } from './brand-logo'
import { PAIRS, COPYRIGHT } from '@/lib/game-data'

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-6 text-center sm:px-6 sm:py-10">
      {/* Decoración de fondo suave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, var(--coke-red) 0 2px, transparent 2px), radial-gradient(circle at 80% 60%, var(--eco-green) 0 2px, transparent 2px)',
          backgroundSize: '46px 46px, 60px 60px',
        }}
      />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-6">
        <BrandLogo size="lg" />

        <div className="flex flex-col items-center gap-2">
          <span className="rounded-full bg-eco-green/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-eco-green-dark">
            Por un planeta vivo
          </span>
          <h1 className="text-balance text-3xl font-extrabold text-foreground sm:text-4xl">
            Une con Flechas
          </h1>
          <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Conecta cada acción de cuidado con el beneficio que le regala al mundo.
            Aprende cómo proteger el medio ambiente y la biodiversidad en menos de 2 minutos.
          </p>
        </div>

        {/* Íconos preview */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {PAIRS.map((p) => (
            <img
              key={p.id}
              src={p.icon || '/placeholder.svg'}
              alt=""
              aria-hidden
              className="h-12 w-12 rounded-full bg-secondary object-cover shadow-sm ring-1 ring-border"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-2 min-h-14 w-full max-w-xs rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform active:scale-95 sm:px-12 sm:py-5 sm:text-xl"
        >
          Jugar
        </button>

        <p className="text-xs text-muted-foreground">
          Toca una acción y luego su beneficio para unirlos con una flecha.
        </p>
      </div>

      <footer className="relative z-10 mt-10 flex flex-col items-center gap-1 text-center">
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
  )
}
