$(document).ready(function(){
    $(".start").on("click", function(){
        mostrarPoke();
    })
})






function mostrarPoke(){
    var id= Math.floor((Math.random()*151)+1);
    imgUrl= "https://pokeres.bastionbot.org/images/pokemon/"+id+".png"
    console.log(imgUrl);
    $(".pokeImg").attr("src", ""+imgUrl);
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/"+id+"/",
        method: "GET",
        dataType: "json"
    })
    .then(function(pokemon){
        setTimeout(function(){
            var pokemonName = capitalizeFirstLetter(pokemon.name) ;
            console.log(pokemonName);
            $(".pokeName").html(pokemonName);
        }),1500
    })
    .then(setTimeout(function(){
        $(".container").removeClass("hidden");
    }), 1500)
    
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
