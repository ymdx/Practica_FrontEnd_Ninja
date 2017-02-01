var $ = require('jquery');
var moment = require('moment');

// scroll hasta el top de la pagina 

$(".go").on("click", function() {
    var posicion = $(".web-header").offset().top;
    $("html, body").animate({
        scrollTop: posicion
    }, 3000);
});

// Fecha

var initialDate = new Date();

var ahora = moment(initialDate).fromNow();

$(".hora").append("  " + ahora);


// Web Storage: 

if (typeof(Storage) !== "undefined") { // si son soportados localStorage y sessionStorage

    var likes = [];

    $('.boton').on('click', function(e) {
        var x = e.target.id; // id del elemento clickado
        if ($('#' + x).hasClass('clicked')) { // si tiene la clase clicked
            console.log("List item ", x, " was unclicked!"); // cuando desclickamos un elemento
            $('#' + x).removeClass("clicked"); // quitamos la clase clicked 
            $('#' + x).css("filter", "grayscale(100%)"); // agregamos negro ( ilusión desclickado)
            var index = likes.indexOf(x); // buscamos la posición en el array de likes del id del botón
            console.log(index);
            likes.splice(index, 1); // eliminamos esa posición del array que se va a guardar
        } else { // si no tiene la clase clicked
            console.log("List item ", x, " was clicked!"); // cuando clickamos un elemento
            $('#' + x).addClass("clicked"); // agrega la clase clicked
            $('#' + x).css("filter", "grayscale(0%)"); // pone el corazón en rojo
            likes.push(x); // y lo mete en el array de likes...
        }
        console.log(likes); // imprimimos el array de los que queremos guardar...
        localStorage.setItem('arraylikes', likes); // guardamos el array final
        //console.log(localStorage.getItem('arraylikes'));
    });
    //console.log(localStorage.getItem('arraylikes'));
    var a = localStorage.getItem('arraylikes');
    if (a == 0) { // si no tenemos elementos guardados :
        console.log("No tienes elementos guardados");
    } 
    else {
        a = a.split(',');
        for (i in a) {
            var elemento = a[i];
            console.log("List item ", elemento, " was clicked!");
            $('#' + elemento).addClass("clicked");
            $('#' + elemento).css("filter", "grayscale(0%)");
        }

    }

} else {
    console.log("No es soportado el Web Storage");
}
