export function BrandLogo({
  className = '',
  size = 'md',
}: {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const scale =
    size === 'lg'
      ? 'text-6xl sm:text-7xl md:text-8xl'
      : size === 'sm'
        ? 'text-3xl'
        : 'text-5xl sm:text-6xl'

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Coca-Cola%20icono-DRT50VZY1G8DA3XkXEN8a5Lgo7IQHM.svg"
        alt="Coca-Cola"
        className={`w-auto rounded-full object-contain ${size === 'lg' ? 'h-28 xs:h-32 sm:h-44 md:h-52' : size === 'sm' ? 'h-20 sm:h-24' : 'h-28 sm:h-36'}`}
      />
    </div>
  )
}
