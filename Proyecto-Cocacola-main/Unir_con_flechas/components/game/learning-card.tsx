'use client'

import type { Pair } from '@/lib/game-data'

export function LearningCard({
  pair,
  isLast,
  onContinue,
}: {
  pair: Pair
  isLast: boolean
  onContinue: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-6 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="learn-title"
        className="animate-eco-pop w-full max-w-md overflow-hidden rounded-3xl bg-card shadow-2xl"
      >
        <div className="flex flex-col items-center gap-4 bg-eco-green px-6 pb-5 pt-8 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-card shadow-md">
            <img
              src={pair.icon || '/placeholder.svg'}
              alt={pair.action}
              className="h-20 w-20 object-cover"
            />
          </div>
          <span className="rounded-full bg-card/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
            ¡Correcto!
          </span>
        </div>

        <div className="flex flex-col items-center gap-3 px-7 py-6 text-center">
          <h2
            id="learn-title"
            className="text-balance text-2xl font-extrabold text-eco-green-dark"
          >
            {pair.learnTitle}
          </h2>
          <p className="text-pretty text-base leading-relaxed text-foreground">
            {pair.learnText}
          </p>

          <button
            type="button"
            onClick={onContinue}
            className="mt-3 w-full rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-md transition-transform active:scale-95"
          >
            {isLast ? 'Ver mi resultado' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  )
}
