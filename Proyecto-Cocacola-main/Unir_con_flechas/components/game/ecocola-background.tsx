'use client'

const bubbles = Array.from({ length: 18 }, (_, index) => index)

export function EcocolaBackground() {
  return (
    <div className="ecocola-background" aria-hidden="true">
      {bubbles.map((bubble) => (
        <span key={bubble} className="ecocola-bubble" />
      ))}
    </div>
  )
}
