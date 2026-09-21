export type Pair = {
  id: string
  icon: string
  action: string
  benefit: string
  /** Título de la tarjeta de aprendizaje */
  learnTitle: string
  /** Explicación del cuidado y su beneficio para el mundo */
  learnText: string
}

export const PAIRS: Pair[] = [
  {
    id: 'reciclaje',
    icon: '/icons/reciclaje.png',
    action: 'Reciclar botellas',
    benefit: 'Menos residuos y se ahorra petróleo',
    learnTitle: 'Reciclar da nueva vida',
    learnText:
      'Cada botella PET que reciclas puede convertirse en una botella nueva. Así reducimos la basura, ahorramos petróleo y energía, y cuidamos los océanos donde viven miles de especies.',
  },
  {
    id: 'agua',
    icon: '/icons/agua.png',
    action: 'Cuidar el agua',
    benefit: 'Protege ríos y ecosistemas',
    learnTitle: 'El agua es vida',
    learnText:
      'Usar el agua de forma responsable mantiene sanos los ríos, lagos y humedales. De ellos dependen los peces, las aves y las plantas que sostienen la biodiversidad del planeta.',
  },
  {
    id: 'bosque',
    icon: '/icons/bosque.png',
    action: 'Reforestar bosques',
    benefit: 'Hábitat para especies y captura CO2',
    learnTitle: 'Los bosques respiran por todos',
    learnText:
      'Plantar árboles crea hogares para animales y plantas, y captura el CO2 que calienta el planeta. Un bosque sano limpia el aire que respiramos cada día.',
  },
  {
    id: 'abeja',
    icon: '/icons/abeja.png',
    action: 'Proteger polinizadores',
    benefit: 'Aseguran la biodiversidad y los cultivos',
    learnTitle: 'Sin abejas no hay cosecha',
    learnText:
      'Las abejas y otros polinizadores permiten que crezcan frutas, verduras y flores. Protegerlas garantiza alimentos para todos y mantiene viva la biodiversidad.',
  },
  {
    id: 'energia',
    icon: '/icons/energia.png',
    action: 'Usar energía solar',
    benefit: 'Reduce las emisiones contaminantes',
    learnTitle: 'Energía limpia, planeta sano',
    learnText:
      'La energía solar no contamina ni emite gases dañinos. Usarla ayuda a frenar el cambio climático y protege los ecosistemas de todo el mundo.',
  },
]

export const COPYRIGHT = `© ${new Date().getFullYear()} Pakova`
