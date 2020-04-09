var Functions = {

    obtenerSesion: function (nombreItem) {
        var valor = localStorage.getItem(nombreItem);
        return valor;
    },

    guardarSesion: function (nombreItem, valorItem) {
        localStorage.setItem(nombreItem, valorItem);
    },

    obtenerUrlApiUnite: function (url){
        return Constants.DatosApiUnite.URL_BASE + url;
    },

    obtenerDatosUsuario: function () {
        var valor = localStorage.getItem(Constants.NombreSesion.DATOS_USUARIO);
        return JSON.parse(valor);
    }
}