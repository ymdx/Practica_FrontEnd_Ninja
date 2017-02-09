var $ = require('jquery');
var manager = require('./comments');

module.exports = {

    setLoading: function() {
        $('.flex-formulario2').removeClass().addClass('flex-formulario2 loading');
    },
    setError: function() {
        $('.flex-formulario2').removeClass().addClass('flex-formulario2 error');
    },

    setIdeal: function() {
        $('.flex-formulario2').removeClass().addClass('flex-formulario2 ideal');
    },

    setBlanco: function() {
        $('.flex-formulario2').removeClass().addClass('flex-formulario2 blanco');
    },

    cargarComentarios: function() {
        var self = this;
        //self.setLoading(); 
        manager.obtener(function(comments) { // si nos devuelve comentarios
            if (comments.length == 0) {
                //console.log("No tenemos comentarios");
                self.setBlanco();
            } else {
                //console.log("Tenemos comentarios");
                self.setIdeal();
                self.ponerComentarios(comments);
                //self.setIdeal();
            }
        }, function(error) {
            self.setError();
        });
    },

    ponerComentarios: function(comments) {
        var contentToAdd = '';
        for (var i = 0; i < comments.length; i++) {
            contentToAdd += '<div id="comment">' +
                comments[i].nombre + '&nbsp' + comments[i].apellidos +
                '<br>' + '(' + comments[i].email + ')' +
                '</div>' + '<li id="new-comment">' +
                comments[i].texto + '</li>';
        }
        $(".lista-comentarios").empty();
        $(".lista-comentarios").append(contentToAdd);
    },
}
