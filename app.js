var nivel = 1;
var pokes = [];
var nombrePokes = [];
var pistaCounter2 = 0;
var pistas = [];
var generation = 1;
var vidas = 3;
var borrarPoke=false;

$(document).ready(function () {
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
        blockInput();
        verificarRespuesta();
    });

    $(".respuesta").on("keypress", function (e) {
        if (e.keyCode === 13) {
            blockInput();
            verificarRespuesta();
            
        }
    });

    $(".close").on("click", function () {
        cerrarReglas();
    });

    $(".mostrarReglas").on("click", function () {
        mostrarReglas();
    });

    
})


function mostrarPoke() {
    $('input').val('');
    pistaCounter2 = 0;
    pistas = [];
    renderVidas(vidas);
    $(".noPista").addClass("hidden");
    switch (true){
        case (nivel<=5): 
            generation=1;
            $(".generationLevel").html("Generation "+generation);
            break;
        case (nivel>=6 && nivel<11):
            generation=2;
            $(".generationLevel").html("Generation "+generation);
            break;
        case (nivel>=11 && nivel<16):
            generation=3;
            $(".generationLevel").html("Generation "+generation);
            break;
        case (nivel>=16 && nivel<21):
            generation=4;
            $(".generationLevel").html("Generation "+generation);
            break;
        case (nivel>=21 && nivel<26): 
            generation=5;
            $(".generationLevel").html("Generation "+generation);
            break;
        case (nivel>=26 && nivel<31):
            console.log("generacion 6");
            generation=6;
            $(".generationLevel").html("Generation "+generation);
            break;
        case (nivel>=31 && nivel<36):
            generation=7;
            $(".generationLevel").html("Generation "+generation);
            break;
        case (nivel>=36 && nivel<41):
            generation=8;
            $(".generationLevel").html("Generation "+generation);
            break;
        case (nivel>40):
            victory();
    }

    switch (generation) {
        case 1:
            var id = Math.floor((Math.random() * 151) + 1);
            break;
        case 2: 
            var id = Math.floor((Math.random() * 100) + 151);
            break;
        case 3: 
            var id = Math.floor((Math.random() * 135) + 251);
            break;
        case 4: 
            var id = Math.floor((Math.random() * 107) + 386);
            break;
        case 5: 
            var id = Math.floor((Math.random() * 156) + 493);
            break;
        case 6: 
            var id = Math.floor((Math.random() * 72) + 649);
            break;
        case 7: 
            var id = Math.floor((Math.random() * 88) + 721);
            break;
        case 8: 
            var id = Math.floor((Math.random() * 89) + 898);
            break;
    }
    imgUrl = "https://pokeres.bastionbot.org/images/pokemon/" + id + ".png";
    testImage(imgUrl);
    $(".pokeImg").attr("src", "" + imgUrl);
    $(".nivel").html("Pokemon " + nivel);

    $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/" + id + "/",
            method: "GET",
            dataType: "json"
        })
        .then(function (pokemon) {
            testImage(imgUrl);
            $(".start").addClass("hidden");
            if(nombrePokes.includes(pokemon.name)){
                mostrarPoke();
            }
            else{
                setTimeout(function () {
                    if(borrarPoke===true){
                        pokes.pop();
                        borrarPoke=false;
                    }
                        var pokemonName = pokemon.name;
                        var pokeSprite = pokemon.sprites.front_default;
                        var pokeTypes = pokemon.types;
                        var dataTipos = [];
                        for(var i=0; i<pokeTypes.length; i++){
                            var tipo = pokeTypes[i].type.name;
                            dataTipos.push(tipo);
                        } 
                        renderTipos(dataTipos);
                        pokes.push(pokeSprite);
                        nombrePokes.push(pokemonName);
                        console.log(pokemonName);
                        $(".pokeName").html(pokemonName);
                        $(".height").html("Height: "+((pokemon.height)/10)+"m");
                        $(".weight").html("Weight: "+((pokemon.weight)/10)+"kg");
                        espaciosNombre(pokemonName);
                    
                }, 500)
            }
        })
        .then(setTimeout(function () {
            $(".container").removeClass("hidden");
            $(".respuesta").focus();
        }, 500))
}

function espaciosNombre(nombre) {
    var largoNombre = nombre.length;
    var pista2 = "_ ".repeat(largoNombre);
    $(".pokePista2").html(pista2);
}




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
        if(pistas.includes(pista)){
            pistaCounter2--;
            mostrarPista2();
            espacioCreado.push();
        }
        else{
            pistas.push(pista);
            var indexPista = nombreSeparado.indexOf(pista);
            espacioCreado[indexPista] = pista;
            if(espacioCreado.length>=8 ){
                $(".pokePista2").css("letter-spacing", "3px")
            }
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
    console.log("El nombre es: " + nombre + " y la respuesta fue: " + respuesta);
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
        vidas--;
        if(vidas>0){
            renderVidas(vidas);
            $(".cardContainer").addClass("equivocado");
            $(".respuestaCorrecta").html("The correct answer was: " + nombre.toUpperCase());
            $(".respuestaCorrecta").removeClass("hidden");
            borrarPoke=true;
            mostrarPoke();
            setTimeout(function () {
                $(".cardContainer").removeClass("equivocado");
                $(".respuestaCorrecta").addClass("hidden");
            }, 2000)
            
        }
        else{
            renderVidas(vidas);
            $(".cardContainer").addClass("equivocado");
            $(".respuestaCorrecta").html("The correct answer was: " + nombre.toUpperCase());
            $(".respuestaCorrecta").removeClass("hidden");
            $(".tusRespuestas").addClass("hidden");
            setTimeout(function () {
            $(".cardContainer").removeClass("equivocado");
            $(".respuestaCorrecta").addClass("hidden");
            $(".container").addClass("hidden");
            $(".start").removeClass("hidden");
            resetGame();
            
        }, 2500)
        }
        
    }
}

function actualizarLista() {
    $(".pokesContainer").html("");
    pokes.forEach(sprite => {
        $(".pokesContainer").append("<div class=" + "col" + "><img src=" + sprite + "></div>");
    });
}


function testImage(imgUrl) {
    var tester = new Image();
    tester.addEventListener('load', imageFound);
    tester.addEventListener('error', imageNotFound);
    tester.src = imgUrl;
}

function imageFound() {
    console.log('That image is found and loaded');
}

function imageNotFound() {
    console.log('That image was not found.');
    mostrarPoke();
}

function renderVidas(vidas){
    var corazon = "img/corazon.png";
    $(".vidas").html("");
     for(var i=0; i<vidas; i++){
         $(".vidas").append("<img class="+"corazones"+" src="+corazon+">");
    }
    
    
}

function cerrarReglas(){
    $(".rulesContainer").css("display", "none");
}

function mostrarReglas(){
    $(".rulesContainer").css("display", "block");
}

function renderTipos(tipos){
    console.log("Estos son los tipos que llegan a la funcion:"+tipos);
    $(".dataTypes").html("");
    tipos.forEach(tipo => {
        $(".dataTypes").append("<div class=" + "col" + "><img src= img/types/" + tipo + ".png class="+"typeIcon"+"></div>")
        $(".typeIcon").attr("title", ""+tipo+"");
    });
}

function blockInput(){
    $(".respuesta").attr("disabled","disabled");
            setTimeout(function(){
                $(".respuesta").removeAttr("disabled");
            },2000)
}

function resetGame(){
  console.log("Se reinicio el juego");
  pistaCounter = 0;
  nivel = 1;
  pokes = [];
  nombrePokes = [];
  pistaCounter2 = 0;
  pistas = [];
  generation = 1;
  vidas = 3;
  actualizarLista();
}
