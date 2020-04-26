var Functions = {

    obtenerSesion: function (nombreItem) {
        var valor = localStorage.getItem(nombreItem);
        if (valor === null) {
            this.cerrarSesion();
        }
        return valor;
    },

    guardarSesion: function (nombreItem, valorItem) {
        localStorage.setItem(nombreItem, valorItem);
    },

    cerrarSesion: function () {
        localStorage.removeItem(Constants.NombreSesion.DATOS_USUARIO);
        window.location.href = rutaLogin;
    },

    obtenerUrlApiUnite: function (url){
        return Constants.DatosApiUnite.URL_BASE + url;
    },

    obtenerDatosUsuario: function () {
        var valor = localStorage.getItem(Constants.NombreSesion.DATOS_USUARIO);
        if (valor === null) {
            this.cerrarSesion();
        }
        return JSON.parse(valor);
    },

    capturarErrorResponse(error) {
        if (error.response) {
            switch (error.response.status) {

                case 401:
                    Notifications.Messages.warning('Acceso Denegado');
                    this.cerrarSesion();
                    break;
                case 500:
                    Notifications.Messages.warning('Error Interno');
                    break;
                default:
            }
        }
    }
}