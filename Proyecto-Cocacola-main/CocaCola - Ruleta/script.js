/*ELEMENTOS*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const menuPrincipal = document.getElementById("menuPrincipal");
const juego = document.getElementById("juego");
const comenzar = document.getElementById("comenzar");
const enlaceInicio = document.querySelector(".enlace-inicio");
const botonGirar = document.getElementById("botonGirar");
const desafioElemento = document.getElementById("desafio");
const tituloDesafio = document.getElementById("tituloDesafio");
const preguntaElemento = document.getElementById("pregunta");
const opcionesElemento = document.getElementById("opciones");
const resultadoElemento = document.getElementById("resultado");
const puntosElemento = document.getElementById("puntos");
const tiempoElemento = document.getElementById("tiempo");
const progresoElemento = document.getElementById("progreso");
const ruletaWrap = document.getElementById("ruletaWrap");
const tituloJuego = document.getElementById("tituloJuego");
const descripcionJuego = document.getElementById("descripcionJuego");


/*MOSTRAR / OCULTAR LA RULETA*/

function ocultarRuleta() {
    ruletaWrap.style.display = "none";
    botonGirar.style.display = "none";
    tituloJuego.style.display = "none";
    descripcionJuego.style.display = "none";
}

function mostrarRuleta() {
    ruletaWrap.style.display = "";
    botonGirar.style.display = "";
    tituloJuego.style.display = "";
    descripcionJuego.style.display = "";
}


/*CONFIGURACIÓN DEL JUEGO*/
const MAX_DESAFIOS = 3;
const TIEMPO_MAXIMO = 30;
const PUNTOS_POR_ACIERTO = 10;


/*VARIABLES*/
let puntos = 0;
let aciertos = 0;
let desafiosCompletados = 0;
let tiempoRestante = TIEMPO_MAXIMO;
let intervaloTiempo = null;
let girando = false;
let juegoActivo = false;
let desafioActual = null;
let rotacion = 0;
let preguntasUsadas = [];


/*DESAFÍOS*/
const desafios = [
    {
        titulo: "Reciclaje",
        preguntas: [
            {
                pregunta: "Tenés una botella de plástico vacía. ¿Qué deberías hacer?",
                opciones: ["Tirarla al suelo", "Colocarla en el contenedor correspondiente", "Dejarla en cualquier lugar"],
                correcta: 1
            },
            {
                pregunta: "¿Qué acción ayuda a reciclar correctamente?",
                opciones: ["Separar los residuos", "Mezclar toda la basura", "Tirar los residuos al río"],
                correcta: 0
            },
            {
                pregunta: "Encontrás una lata vacía. ¿Qué sería una buena opción?",
                opciones: ["Tirarla en la calle", "Reciclarla correctamente", "Esconderla debajo de un árbol"],
                correcta: 1
            }
        ]
    },
    {
        titulo: "Cuidado del agua",
        preguntas: [
            {
                pregunta: "Mientras te lavás los dientes, ¿qué deberías hacer?",
                opciones: ["Dejar la canilla abierta", "Cerrar la canilla", "Abrirla al máximo"],
                correcta: 1
            },
            {
                pregunta: "La canilla está goteando. ¿Qué deberías hacer?",
                opciones: ["Ignorarla", "Avisar para que la reparen", "Abrirla más"],
                correcta: 1
            },
            {
                pregunta: "¿Cuál de estas acciones ahorra agua?",
                opciones: ["Tomar duchas más cortas", "Dejar correr el agua", "Jugar con la manguera durante horas"],
                correcta: 0
            }
        ]
    },
    {
        titulo: "Árboles",
        preguntas: [
            {
                pregunta: "Ves un árbol joven en una plaza. ¿Qué deberías hacer?",
                opciones: ["Romper sus ramas", "Cuidarlo", "Tirarle basura"],
                correcta: 1
            },
            {
                pregunta: "¿Por qué son importantes los árboles?",
                opciones: ["Ayudan a los ecosistemas", "Porque podemos dañarlos", "No tienen ningún beneficio"],
                correcta: 0
            },
            {
                pregunta: "¿Qué acción ayuda a cuidar los árboles?",
                opciones: ["Evitar dañarlos", "Arrancar sus hojas", "Clavar objetos en ellos"],
                correcta: 0
            }
        ]
    },
    {
        titulo: "Energía",
        preguntas: [
            {
                pregunta: "Salís de una habitación y no queda nadie. ¿Qué hacés?",
                opciones: ["Dejar las luces encendidas", "Apagar las luces", "Encender más luces"],
                correcta: 1
            },
            {
                pregunta: "¿Qué ayuda a ahorrar electricidad?",
                opciones: ["Apagar los aparatos que no usás", "Dejarlos siempre encendidos", "Encender todas las luces"],
                correcta: 0
            },
            {
                pregunta: "Durante el día hay mucha luz natural. ¿Qué podés hacer?",
                opciones: ["Encender todas las luces", "Aprovechar la luz natural", "Cerrar todas las cortinas"],
                correcta: 1
            }
        ]
    },
    {
        titulo: "Transporte",
        preguntas: [
            {
                pregunta: "Tenés que ir a un lugar cercano. ¿Qué opción es más ecológica?",
                opciones: ["Caminar o usar bicicleta", "Usar el auto", "Dejar el motor encendido"],
                correcta: 0
            },
            {
                pregunta: "¿Qué alternativa puede reducir el uso de autos?",
                opciones: ["Usar transporte público", "Usar una moto", "Viajar siempre solo"],
                correcta: 0
            },
            {
                pregunta: "Para recorrer unas pocas cuadras, ¿qué podés elegir?",
                opciones: ["Caminar", "Usar un auto innecesariamente", "Dejar el auto encendido"],
                correcta: 0
            }
        ]
    },
    {
        titulo: "Residuos",
        preguntas: [
            {
                pregunta: "Encontrás un papel tirado en una plaza. ¿Qué hacés?",
                opciones: ["Lo ignorás", "Lo recogés y lo tirás en un cesto", "Tirás otro papel"],
                correcta: 1
            },
            {
                pregunta: "¿Dónde deberían colocarse los residuos?",
                opciones: ["En los cestos correspondientes", "En la calle", "En los parques"],
                correcta: 0
            },
            {
                pregunta: "Terminaste de comer en una plaza. ¿Qué hacés con el envoltorio?",
                opciones: ["Lo dejás en el banco", "Lo tirás al suelo", "Lo colocás en un cesto"],
                correcta: 2
            }
        ]
    },
    {
        titulo: "Plantas",
        preguntas: [
            {
                pregunta: "Tenés una planta en casa. ¿Cómo podés ayudarla?",
                opciones: ["Cuidarla y regarla cuando lo necesite", "Romper sus hojas", "No cuidarla"],
                correcta: 0
            },
            {
                pregunta: "¿Qué necesita una planta para crecer?",
                opciones: ["Agua, luz y cuidados adecuados", "Basura", "Plástico"],
                correcta: 0
            },
            {
                pregunta: "Encontrás flores en un jardín. ¿Qué deberías evitar?",
                opciones: ["Observarlas", "Cuidarlas", "Arrancarlas sin necesidad"],
                correcta: 2
            }
        ]
    },
    {
        titulo: "Biodiversidad",
        preguntas: [
            {
                pregunta: "¿Qué podés hacer para ayudar a los polinizadores?",
                opciones: ["Plantar flores", "Destruir las plantas", "Eliminar todas las flores"],
                correcta: 0
            },
            {
                pregunta: "Encontrás un animal silvestre. ¿Qué deberías hacer?",
                opciones: ["Molestarlo", "Observarlo desde una distancia segura", "Intentar atraparlo"],
                correcta: 1
            },
            {
                pregunta: "¿Por qué es importante la biodiversidad?",
                opciones: ["Porque mantiene ecosistemas saludables", "Porque permite destruir hábitats", "Porque no tiene importancia"],
                correcta: 0
            }
        ]
    },
    {
        titulo: "Alimentos",
        preguntas: [
            {
                pregunta: "Te sobró comida después de comer. ¿Qué podés hacer?",
                opciones: ["Tirarla inmediatamente", "Guardarla para después", "Dejarla en la calle"],
                correcta: 1
            },
            {
                pregunta: "¿Qué ayuda a reducir el desperdicio de comida?",
                opciones: ["Planificar las compras", "Comprar mucho más de lo necesario", "Tirar los alimentos"],
                correcta: 0
            },
            {
                pregunta: "¿Qué deberías hacer antes de servirte comida?",
                opciones: ["Servirte una cantidad que puedas comer", "Servirte muchísimo", "Tirar parte antes de comer"],
                correcta: 0
            }
        ]
    },
    {
        titulo: "Menos plástico",
        preguntas: [
            {
                pregunta: "¿Qué ayuda a reducir el uso de plástico descartable?",
                opciones: ["Usar una botella reutilizable", "Comprar botellas nuevas todos los días", "Tirar botellas al suelo"],
                correcta: 0
            },
            {
                pregunta: "Vas al supermercado. ¿Qué podés llevar?",
                opciones: ["Una bolsa reutilizable", "Muchas bolsas descartables", "Dejar los productos en la calle"],
                correcta: 0
            },
            {
                pregunta: "¿Qué opción genera menos residuos?",
                opciones: ["Un producto con mucho envase innecesario", "Un producto con menos envase", "Usar varios envases para un producto"],
                correcta: 1
            }
        ]
    },
    {
        titulo: "Playas y ríos",
        preguntas: [
            {
                pregunta: "Terminaste un día en la playa. ¿Qué deberías hacer?",
                opciones: ["Dejar los residuos", "Recoger tus residuos", "Enterrar las botellas"],
                correcta: 1
            },
            {
                pregunta: "¿Qué puede contaminar un río?",
                opciones: ["Tirar residuos al agua", "Mantenerlo limpio", "Recoger basura"],
                correcta: 0
            },
            {
                pregunta: "Encontrás plástico cerca de un río. ¿Qué hacés?",
                opciones: ["Lo tirás al agua", "Lo dejás allí", "Lo colocás en un lugar adecuado para residuos"],
                correcta: 2
            }
        ]
    },
    {
        titulo: "Reutilización",
        preguntas: [
            {
                pregunta: "Tenés ropa que ya no usás pero está en buen estado. ¿Qué podés hacer?",
                opciones: ["Donarla", "Tirarla inmediatamente", "Dejarla en la calle"],
                correcta: 0
            },
            {
                pregunta: "Un objeto todavía funciona pero ya no lo necesitás. ¿Qué podés hacer?",
                opciones: ["Reutilizarlo o regalarlo", "Romperlo", "Tirarlo aunque funcione"],
                correcta: 0
            },
            {
                pregunta: "¿Por qué es útil reutilizar objetos?",
                opciones: ["Porque puede reducir residuos", "Porque genera más basura", "Porque obliga a comprar más"],
                correcta: 0
            }
        ]
    }
];


/* INICIALIZAR PREGUNTAS Y COLORES */
function inicializarPreguntas() {
    preguntasUsadas = desafios.map(() => []);
}

const colores = [
    "#F40009", "#D90000", "#FF3333", "#B80000",
    "#00A651", "#00C853", "#76C043", "#008C45",
    "#FF5A00", "#FF7A00", "#FF9500", "#E94E00"
];

const cantidad = desafios.length;
const angulo = (Math.PI * 2) / cantidad;


/* DIBUJAR RULETA */
function dibujarRuleta() {
    const centroX = canvas.width / 2;
    const centroY = canvas.height / 2;
    const radio = canvas.width / 2 - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    desafios.forEach((desafio, indice) => {
        const inicio = rotacion + indice * angulo;
        const fin = inicio + angulo;

        ctx.beginPath();
        ctx.moveTo(centroX, centroY);
        ctx.arc(centroX, centroY, radio, inicio, fin);
        ctx.closePath();

        ctx.fillStyle = colores[indice % colores.length];
        ctx.fill();

        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.save();
        ctx.translate(centroX, centroY);
        ctx.rotate(inicio + angulo / 2);
        ctx.fillStyle = "white";
        ctx.font = "bold 25px Arial";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";

        ctx.fillText(desafio.titulo, radio - 18, 0);
        ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
    ctx.strokeStyle = "#8f0000";
    ctx.lineWidth = 8;
    ctx.stroke();
}

dibujarRuleta();


/* COMENZAR JUEGO */
comenzar.addEventListener("click", comenzarJuego);

function comenzarJuego() {
    puntos = 0;
    aciertos = 0;
    desafiosCompletados = 0;
    tiempoRestante = TIEMPO_MAXIMO;
    rotacion = 0;
    juegoActivo = true;
    girando = false;

    inicializarPreguntas();
    actualizarInformacion();

    menuPrincipal.style.display = "none";
    juego.style.display = "block";
    enlaceInicio.style.display = "inline-flex";
    desafioElemento.style.display = "none";

    mostrarRuleta();
    botonGirar.disabled = false;
}


/* INFORMACIÓN */
function actualizarInformacion() {
    puntosElemento.textContent = puntos;
    tiempoElemento.textContent = tiempoRestante;
    progresoElemento.textContent = desafiosCompletados;
}


/* ELEGIR PREGUNTA */
function elegirPregunta(indiceTematica) {
    const preguntas = desafios[indiceTematica].preguntas;
    let disponibles = preguntas.map((_, indice) => indice);

    disponibles = disponibles.filter(
        indice => !preguntasUsadas[indiceTematica].includes(indice)
    );

    if (disponibles.length === 0) {
        preguntasUsadas[indiceTematica] = [];
        disponibles = preguntas.map((_, indice) => indice);
    }

    const elegida = disponibles[Math.floor(Math.random() * disponibles.length)];
    preguntasUsadas[indiceTematica].push(elegida);

    return preguntas[elegida];
}


/* TEMPORIZADOR */
function iniciarTemporizador() {
    detenerTemporizador();
    tiempoRestante = TIEMPO_MAXIMO;
    actualizarInformacion();

    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        actualizarInformacion();

        if (tiempoRestante <= 0) {
            detenerTemporizador();
            tiempoAgotado();
        }
    }, 1000);
}

function detenerTemporizador() {
    if (intervaloTiempo) {
        clearInterval(intervaloTiempo);
        intervaloTiempo = null;
    }
}


/* TIEMPO AGOTADO */
function tiempoAgotado() {
    if (!juegoActivo) return;

    desafiosCompletados++;
    actualizarInformacion();

    mostrarMensajeTemporal(
        "¡Se acabó el tiempo!",
        "Tenés que responder antes de que se agote el tiempo para sumar puntos.",
        "incorrecto"
    );

    if (desafiosCompletados >= MAX_DESAFIOS) {
        setTimeout(finalizarJuego, 2500);
    } else {
        setTimeout(reiniciarRuleta, 2500);
    }
}


/* GIRAR RULETA */
botonGirar.addEventListener("click", girarRuleta);

function girarRuleta() {
    if (girando || !juegoActivo) return;

    girando = true;
    botonGirar.disabled = true;
    desafioElemento.style.display = "none";

    const ganador = Math.floor(Math.random() * desafios.length);
    const centroGanador = ganador * angulo + angulo / 2;
    const posicionFlecha = -Math.PI / 2;

    const objetivo = posicionFlecha - centroGanador;
    let diferencia = objetivo - rotacion;
    diferencia = ((diferencia + Math.PI) % (Math.PI * 2)) - Math.PI;

    const destino = rotacion + diferencia + Math.PI * 2 * 6;
    const inicio = rotacion;
    const duracion = 4000;
    const tiempoInicio = performance.now();

    function animar(tiempo) {
        let progreso = (tiempo - tiempoInicio) / duracion;
        if (progreso > 1) progreso = 1;

        const suavizado = 1 - Math.pow(1 - progreso, 4);
        rotacion = inicio + (destino - inicio) * suavizado;

        dibujarRuleta();

        if (progreso < 1) {
            requestAnimationFrame(animar);
        } else {
            rotacion = destino;
            dibujarRuleta();
            mostrarDesafio(ganador);
        }
    }

    requestAnimationFrame(animar);
}


/* MOSTRAR DESAFÍO */
function mostrarDesafio(indiceTematica) {
    const pregunta = elegirPregunta(indiceTematica);

    desafioActual = {
        tematica: desafios[indiceTematica],
        pregunta: pregunta
    };

    tituloDesafio.textContent = desafios[indiceTematica].titulo;
    preguntaElemento.textContent = pregunta.pregunta;
    opcionesElemento.innerHTML = "";
    resultadoElemento.style.display = "none";
    resultadoElemento.className = "resultado";

    pregunta.opciones.forEach((opcion, indice) => {
        const boton = document.createElement("button");
        boton.className = "opcion";
        boton.textContent = opcion;
        boton.addEventListener("click", () => {
            comprobarRespuesta(indice);
        });
        opcionesElemento.appendChild(boton);
    });

    desafioElemento.style.display = "block";
    ocultarRuleta();
    girando = false;

    iniciarTemporizador();
}


/* COMPROBAR RESPUESTA */
function comprobarRespuesta(respuesta) {
    detenerTemporizador();

    const botones = document.querySelectorAll(".opcion");
    botones.forEach(boton => { boton.disabled = true; });

    const correcta = desafioActual.pregunta.correcta;
    desafiosCompletados++;

    if (respuesta === correcta) {
        botones[correcta].classList.add("correcta");
        puntos += PUNTOS_POR_ACIERTO;
        aciertos++;
        actualizarInformacion();

        resultadoElemento.className = "resultado correcto";
        resultadoElemento.innerHTML = `
            <strong>¡MUY BIEN!</strong>
            <br><br>
            ¡Respuesta correcta! Sumaste <strong>+${PUNTOS_POR_ACIERTO} puntos</strong>.
        `;
        resultadoElemento.style.display = "block";

        if (desafiosCompletados >= MAX_DESAFIOS) {
            setTimeout(finalizarJuego, 2000);
        } else {
            setTimeout(reiniciarRuleta, 2000);
        }
    } else {
        botones[respuesta].classList.add("incorrecta");
        botones[correcta].classList.add("correcta");
        actualizarInformacion();

        resultadoElemento.className = "resultado incorrecto";
        resultadoElemento.innerHTML = `
            <strong>¡Respuesta incorrecta!</strong>
            <br><br>
            La respuesta correcta era:
            <br><br>
            <strong>${desafioActual.pregunta.opciones[correcta]}</strong>
        `;
        resultadoElemento.style.display = "block";

        if (desafiosCompletados >= MAX_DESAFIOS) {
            setTimeout(finalizarJuego, 3000);
        } else {
            setTimeout(reiniciarRuleta, 3000);
        }
    }
}


/* MENSAJE TEMPORAL */
function mostrarMensajeTemporal(titulo, texto, tipo) {
    desafioElemento.style.display = "block";
    tituloDesafio.textContent = "Tiempo agotado";
    preguntaElemento.textContent = "";
    opcionesElemento.innerHTML = "";
    resultadoElemento.className = "resultado " + tipo;
    resultadoElemento.innerHTML = `
        <strong>${titulo}</strong>
        <br><br>
        ${texto}
    `;
    resultadoElemento.style.display = "block";
}


/* REINICIAR RULETA */
function reiniciarRuleta() {
    if (!juegoActivo) return;

    detenerTemporizador();
    desafioElemento.style.display = "none";

    mostrarRuleta();
    botonGirar.disabled = false;
    girando = false;
    tiempoRestante = TIEMPO_MAXIMO;

    actualizarInformacion();
    rotacion = 0;
    dibujarRuleta();
}


/* FINALIZAR JUEGO */
function finalizarJuego() {
    detenerTemporizador();
    juegoActivo = false;
    girando = false;

    desafioElemento.style.display = "block";
    opcionesElemento.innerHTML = "";

    if (aciertos === 3) {
        // 3 ACIERTOS (VICTORIA PERFECTA)
        tituloDesafio.textContent = "¡GANASTE!";
        preguntaElemento.textContent = "¡Puntaje perfecto!";

        resultadoElemento.className = "resultado victoria";
        resultadoElemento.innerHTML = `
            <strong>¡FELICITACIONES!</strong>
            <br><br>
            Acertaste las <strong>3 preguntas</strong>. ¡Un verdadero experto en el medio ambiente!
            <br><br>
            <button class="botonMenu" onclick="volverAlMenu()">VOLVER AL MENÚ</button>
        `;
    } else {
        // MENOS DE 3 ACIERTOS (MENSAJE DINÁMICO)
        const faltantes = MAX_DESAFIOS - aciertos;
        const textoFaltantes = faltantes === 1 ? "1 acierto más" : `${faltantes} aciertos más`;

        tituloDesafio.textContent = "Fin de la partida";
        preguntaElemento.textContent = "¡Casi lo lográs!";

        resultadoElemento.className = "resultado derrota";
        resultadoElemento.innerHTML = `
            <strong>${aciertos} de 3 aciertos</strong>
            <br><br>
            Te faltó <strong>${textoFaltantes}</strong> para ganar. ¡Intentalo de nuevo!
            <br><br>
            <button class="botonMenu" onclick="volverAlMenu()">VOLVER AL MENÚ</button>
        `;
    }

    resultadoElemento.style.display = "block";
    botonGirar.disabled = true;
}


/*VOLVER AL MENÚ*/
function volverAlMenu() {
    detenerTemporizador();
    juegoActivo = false;
    girando = false;

    desafioElemento.style.display = "none";
    juego.style.display = "none";
    menuPrincipal.style.display = "block";
    enlaceInicio.style.display = "none";

    mostrarRuleta();
    botonGirar.disabled = false;
    rotacion = 0;
    dibujarRuleta();
}