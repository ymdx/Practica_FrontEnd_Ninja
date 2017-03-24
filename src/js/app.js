var $ = require('jquery');
var moment = require('moment');

var comments = require('./comments');
var commentsManager = require('./commentsManager');

var form = $(".form");

// scroll hasta el top de la pagina 

$(".go").on("click", function() {
    var posicion = $(".web-header").offset().top;
    $("html, body").animate({
        scrollTop: posicion
    }, 3000);
});

// scroll hasta los comentarios

var control = false;

$(window).on("scroll", function(e) {
    var posicionFlexbox2 = $(".flex-formulario2").offset().top;
    //console.log(posicionFlexbox2);
    //console.log($(window).scrollTop() + $(window).height());
    if ((control == false) && $(window).scrollTop() + $(window).height() >= posicionFlexbox2) {
        control = true; // Ponemos que se han cargado los comentarios 
        commentsManager.cargarComentarios(); // Cargamos los comentarios
    } else {
        commentsManager.setLoading();
        control = false;
        return false; // aqui no funciona el e.stopPropagation, ni el e.preventDefault...
    }
});

// --------------------------------------

// Fecha

// Fecha que metemos en el datetime y lo pasamos a una variable en formato moment().

$('time').each(function() {

    var initialDate = $(this).attr("datetime");
    var fechaInicial = moment(initialDate);

    // Creamos la fecha actual de nuestra maquina para comparar

    var fechaActual = new Date();

    // Comparamos las dos fechas con diff 

    if ((fechaInicial.diff(fechaActual), 'days') > 1) {
        // Formateamos la fecha con los distintos string que nos da calendar().
        fechaInicial = fechaInicial.calendar();
    } else {
        // Formateamos la fecha con fromNow().
        fechaInicial = fechaInicial.fromNow();
    }

    // Reemplazamos el texto FECHA HUMANOS por la hora

    $(this).text(fechaInicial);
});

// --------------------------------------

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
    } else {
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

// formulario : 

$(".form").on("submit", function(e) {
    if ($("#nombre")[0].checkValidity() == false) {
        alert("Escribe tu nombre correctamente");
        $("#nombre").focus();
        e.preventDefault();
        return false;
    }

    if ($("#apellidos")[0].checkValidity() == false) {
        alert("Escribe tus apellidos correctamente");
        $("#apellidos").focus();
        e.preventDefault();
        return false;
    }

    if ($("#email")[0].checkValidity() == false) {
        alert("Escribe tu email correctamente");
        $("#email").focus();
        e.preventDefault();
        return false;
    }

    if (cuentaPalabras($("textarea#texto").val()) > 120) {
        alert('Máximo 120 palabras');
        $("#texto").focus();
        e.preventDefault();
        return false;
    }

    var datos = {
        nombre: $("#nombre").val(),
        apellidos: $("#apellidos").val(),
        email: $("#email").val(),
        texto: $("textarea#texto").val()
    }

    comments.guardar(datos, function(data) {
        commentsManager.cargarComentarios();
        alert("Thank you for post your comment");
    }, function(error) {
        alert("error");
    });

    return false;

});

function cuentaPalabras(f) {
    var quitarEspacios = f.replace(/\s\s+/g, ' ').trim();
    var arrayPalabras = quitarEspacios.split(' ');
    var numeroPalabras = arrayPalabras.length;
    return numeroPalabras;
}
