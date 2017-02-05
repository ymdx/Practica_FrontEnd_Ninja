var $ = require('jquery');
var manager = require('./comments');

module.exports = {

    setUiIdeal: function() {
        $('.flex-formulario2').removeClass().addClass('flex-formulario2 ideal');
    },

    setUiBlanco: function() {
        $('.flex-formulario2').removeClass().addClass('flex-formulario2 blanco');
    },

    setUiError: function() {
        $('.flex-formulario2').removeClass().addClass('flex-formulario2 error');
    },

    setUiLoading: function() {
        $('.flex-formulario2').removeClass().addClass('flex-formulario2 loading');
    },

    cargarComentarios: function() {
        var self = this;
        self.setUiLoading();
        manager.obtener(function(comments) { // si nos devuelve comentarios
            if (comments.length == 0) {
                self.setUiBlanco();
            } else {
                self.renderComments(comments);
                self.setUiIdeal();
            }
        }, function(error) {
            self.setUiError();
        });
    },

    ponerComentarios: function(comments) {
        var contentToAdd = '';
        for (var i = 0; i < comments.length; i++) {
            contentToAdd += '<div id="comment">' + comments[i].nombre + '&nbsp' + comments[i].apellidos + '</div>' + '<li id="new-comment">' + comments[i].texto + '</li>';
        }
        $(".lista-comentarios").empty();
        $(".lista-comentarios").append(contentToAdd);
    },
}
