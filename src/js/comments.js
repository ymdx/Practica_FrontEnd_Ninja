var $ = require('jquery');

var API_URL = "/api/comments/";

module.exports = {

    guardar: function(comment, successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "POST",
            data: comment,
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("Error al guardar los elementos", error);
            }
        });
    },

    obtener: function(successCallback, errorCallback) {
        $.ajax({
            url: API_URL,
            type: "GET",
            success: function(data) {
                successCallback(data);
            },
            error: function(error) {
                errorCallback(error);
                console.error("Error al listar los elementos", error);
            }
        })
    }
};
