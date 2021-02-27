var pistaCounter = 0;
var nivel = 1;
var pokes = [];

$(document).ready(function () {
    pistaCounter = 0;
    $(".start").on("click", function () {
        mostrarPoke();
    });

    $(".pista").on("click", function () {
        mostrarPista();
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

/* function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } */

function espaciosNombre(nombre) {
    console.log(nombre.length);
    var largoNombre = nombre.length;
    var pista = "_  ".repeat(largoNombre);
    $(".pokePista").html(pista);
}

function mostrarPista() {
    pistaCounter++;
    var nombre = $(".pokeName").html();
    console.log(nombre + " y su largo es: " + nombre.length);
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
        setTimeout(function () {
            $(".cardContainer").removeClass("correcto");
            $(".pokeName").addClass("hidden");
            mostrarPoke();
        }, 1400)
        actualizarLista();
    } else {
        nivel = 1;
        pokes = [];
        $(".cardContainer").addClass("equivocado");
        $(".respuestaCorrecta").html("La respuesta correcta era: " + nombre);
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
/* $(".prueba").append("<h1>Holas</")

numeros.forEach(numero => {
    $(".prueba").append("<p>"+numero+"</p>")
}); */
{
    /* <span>✓</span> */ }