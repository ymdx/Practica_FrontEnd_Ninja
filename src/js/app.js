var $ = require('jquery');
var moment = require('moment');

// scroll hasta el top de la pagina 

$(".go").on("click", function() {
    var posicion = $(".web-header").offset().top;
    $("html, body").animate({
        scrollTop: posicion
    }, 3000);
});

// botón del menu para 

// Fecha

var actual = moment().format().split('T');
var hora = actual[1].split('+');
var horaReal = hora[0];

console.log(horaReal);

console.log(moment(horaReal,"hh:mm:ss"));