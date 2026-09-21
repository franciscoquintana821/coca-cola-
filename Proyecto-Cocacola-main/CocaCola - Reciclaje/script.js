const residuosBase=[
  {nombre:'Botella de plástico',imagen:'🧴',tipo:'plastico'},
  {nombre:'Botella de vidrio',imagen:'🍾',tipo:'vidrio'},
  {nombre:'Cáscara de banana',imagen:'🍌',tipo:'organico'},
  {nombre:'Bolsa de plástico',imagen:'🛍️',tipo:'plastico'},
  {nombre:'Frasco de vidrio',imagen:'🫙',tipo:'vidrio'},
  {nombre:'Manzana',imagen:'🍎',tipo:'organico'},
  {nombre:'Botella plástica',imagen:'🥤',tipo:'plastico'},
  {nombre:'Copa de vidrio',imagen:'🍷',tipo:'vidrio'},
  {nombre:'Cáscara de naranja',imagen:'🍊',tipo:'organico'},
  {nombre:'Envase plástico',imagen:'🧃',tipo:'plastico'}];

let residuos=[];

let puntos=0,
vidas=3,
residuoActual=0,
juegoActivo=false;

const imagenResiduo=document.getElementById('residuo'),
textoPuntos=document.getElementById('puntos'),
textoVidas=document.getElementById('vidas'),
textoNumeroResiduo=document.getElementById('numero-residuo'),
mensaje=document.getElementById('mensaje');
const pantallaHome=document.getElementById('pantalla-home'),
pantallaJuego=document.getElementById('pantalla-juego'),
pantallaFinal=document.getElementById('pantalla-final'),
enlaceInicio=document.getElementById('enlace-inicio');

function comenzarJuego(){
  reiniciarJuego();
}

function volverAlInicio(){
  juegoActivo=false;
  pantallaHome.style.display='block';
  pantallaJuego.style.display='none';
  pantallaFinal.style.display='none';
  enlaceInicio.style.display='none';
}

function mezclarResiduos(){
  residuos=[...residuosBase];
  for(let i=residuos.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [residuos[i],residuos[j]]=[residuos[j],residuos[i]];
  }
}

function mostrarResiduo()
{if(residuoActual>=residuos.length){
  terminarJuego();
  return} 
const residuo=residuos[residuoActual];
imagenResiduo.textContent=residuo.imagen; 
imagenResiduo.setAttribute('aria-label',residuo.nombre); 
textoNumeroResiduo.textContent=residuoActual+1; 
mensaje.textContent='';
mensaje.className='' }

function elegirTacho(tipoElegido)
{if(!juegoActivo)
  return;
  const residuo=residuos[residuoActual];
  if(tipoElegido===residuo.tipo){puntos+=10;textoPuntos.textContent=puntos;mensaje.textContent='¡Correcto! Muy bien. +10 puntos';mensaje.className='correcto';residuoActual++;setTimeout(mostrarResiduo,700)}else{vidas--;textoVidas.textContent=vidas;mensaje.textContent='Incorrecto. Probá con otro tacho.';mensaje.className='incorrecto';if(vidas<=0)setTimeout(terminarJuego,700)}}

function terminarJuego() {

  juegoActivo = false;

  pantallaJuego.style.display = 'none';
  pantallaFinal.style.display = 'block';

  document.getElementById('puntaje-final').textContent = puntos;

  const sello = document.getElementById('final-sello');
  const eyebrow = document.getElementById('final-eyebrow');
  const titulo = document.getElementById('final-titulo');
  const mensaje = document.getElementById('final-mensaje');

  // GANÓ: completó los 10 residuos
  if (residuoActual >= residuos.length) {
    sello.textContent = '♻';
    eyebrow.textContent = '¡Misión completada!';
    titulo.textContent = '¡Gracias por cuidar el mundo!';

    mensaje.innerHTML =
      'Tu puntaje final es <strong id="puntaje-final">' +
      puntos +
      '</strong> puntos. ¡Cada elección cuenta!';

  // PERDIÓ: se quedó sin vidas
  } else {
    sello.textContent = '🌱';
    eyebrow.textContent = '¡No te rindas!';
    titulo.textContent = '¡Todavía podés hacerlo mejor!';

    mensaje.innerHTML =
      'Tu puntaje fue de <strong id="puntaje-final">' +
      puntos +
      '</strong> puntos. ' +
      'Aprendé de cada intento y volvé a intentarlo. ¡El planeta te necesita!';
  }
}

function reiniciarJuego(){
  puntos=0;vidas=3;residuoActual=0;juegoActivo=true;
  mezclarResiduos();
  textoPuntos.textContent=puntos;textoVidas.textContent=vidas;
  pantallaHome.style.display='none';
  pantallaJuego.style.display='block';
  pantallaFinal.style.display='none';
  enlaceInicio.style.display='inline-flex';
  mostrarResiduo();
}
mezclarResiduos();
enlaceInicio.style.display='none';