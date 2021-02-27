var pistaCounter = 0;
var nivel = 1;
var pokes = [];
var pistaCounter2 = 0;
var pistas = [];

$(document).ready(function () {
    pistaCounter = 0;
    pistaCounter2 = 0;
    pistas = [];
    $(".start").on("click", function () {
        mostrarPoke();
    });

    $(".pista").on("click", function () {
        /* mostrarPista(); */
        mostrarPista2();
    });

    $(".pokeBallIcon").on("click", function () {
        verificarRespuesta();
    });

    $(".respuesta").on("keypress", function (e) {
        if (e.keyCode === 13) {
            verificarRespuesta();
        }
    });
})


function mostrarPoke() {
    $('input').val('');
    pistaCounter = 0;
    pistaCounter2 = 0;
    pistas = [];
    $(".noPista").addClass("hidden");
    var id = Math.floor((Math.random() * 151) + 1);
    imgUrl = "https://pokeres.bastionbot.org/images/pokemon/" + id + ".png"
    console.log(imgUrl);
    $(".pokeImg").attr("src", "" + imgUrl);
    $(".nivel").html("Pokemon " + nivel);
    $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + id + "/",
            method: "GET",
            dataType: "json"
        })
        .then(function (pokemon) {
            $(".start").addClass("hidden");
            setTimeout(function () {
                var pokemonName = pokemon.name;
                var pokeSprite = pokemon.sprites.front_default;
                pokes.push(pokeSprite);
                console.log(pokemonName);
                $(".pokeName").html(pokemonName);
                espaciosNombre(pokemonName);
            }, 500)
        })
        .then(setTimeout(function () {
            $(".container").removeClass("hidden");
            $(".respuesta").focus();
        }, 500))
}

function espaciosNombre(nombre) {
    var largoNombre = nombre.length;
    /* var pista = "_  ".repeat(largoNombre); */
    var pista2 = "_ ".repeat(largoNombre);
    /* $(".pokePista").html(pista); */
    $(".pokePista2").html(pista2);
}

/* function mostrarPista() {
    pistaCounter++;
    var nombre = $(".pokeName").html();
    // aca  tengo que calcular con pistaCounter cuantas 
    // pistas tengo que dar.
    var pistasRestantes = nombre.length - pistaCounter
    if (pistasRestantes < 0) {
        $(".noPista").removeClass("hidden");
    } else {
        console.log(pistasRestantes);
        console.log(nombre.substring(0, pistaCounter));
        $(".pokePista").html(nombre.substring(0, pistaCounter).toUpperCase() + "  " + "_  ".repeat(pistasRestantes));
    }
} */


function mostrarPista2(){
    pistaCounter2++;
    if(pistaCounter2<4){
        var nombre = $(".pokeName").html();
        var letraRandom = Math.floor((Math.random() * nombre.length) + 1)
        var pista = nombre.charAt(letraRandom-1);
        var nombreSeparado = nombre.split("");
        var espacios= $(".pokePista2").html();
        var espacioCreado = espacios.split(" ");
        if(pistaCounter2===1){
            espacioCreado.pop();
        }
        console.log("La pista es: "+pista);
        if(pistas.includes(pista)){
            console.log("Si esta en el array");
            pistaCounter2--;
            mostrarPista2();
            espacioCreado.push();
        }
        else{
            console.log("Se añadio "+pista+" al array.");
            pistas.push(pista);
            console.log(pistas);
            var indexPista = nombreSeparado.indexOf(pista);
            espacioCreado[indexPista] = pista;
            console.log(nombreSeparado);
            console.log(indexPista);
            console.log(espacioCreado);
            pistaCreada = espacioCreado.join(" ");
            $(".pokePista2").html(pistaCreada.toUpperCase());
        }
        
    }
    else{
        $(".noPista").removeClass("hidden");
    }
}



function verificarRespuesta() {
    var nombre = $(".pokeName").html();
    var respuesta = $(".respuesta").val().toLowerCase();
    console.log("El nombre es: " + nombre + " y la respuesta es: " + respuesta);
    if (nombre === respuesta) {
        $(".tusRespuestas").removeClass("hidden");
        nivel++;
        $(".cardContainer").addClass("correcto");
        $(".pokeName").append("<span>   ✓</span>");
        $(".pokeName").removeClass("hidden");
        $(".pokeImg").removeClass("opaco");
        setTimeout(function () {
            $(".cardContainer").removeClass("correcto");
            $(".pokeName").addClass("hidden");
            $(".pokeImg").addClass("opaco");
            mostrarPoke();
        }, 1400)
        actualizarLista();
    } else {
        nivel = 1;
        pokes = [];
        $(".cardContainer").addClass("equivocado");
        $(".respuestaCorrecta").html("The correct answer was: " + nombre);
        $(".respuestaCorrecta").removeClass("hidden");
        $(".tusRespuestas").addClass("hidden");
        actualizarLista();
        setTimeout(function () {
            $(".cardContainer").removeClass("equivocado");
            $(".respuestaCorrecta").addClass("hidden");
            $(".container").addClass("hidden");
            $(".start").removeClass("hidden");
        }, 2500)
    }
}

function actualizarLista() {
    $(".pokesContainer").html("");
    pokes.forEach(sprite => {
        $(".pokesContainer").append("<div class=" + "col" + "><img src=" + sprite + "></div>");
    });
}
