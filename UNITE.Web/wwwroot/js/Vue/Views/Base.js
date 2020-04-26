var Base = {

    Autocomplete: function () {


    },

    getProductos: async function (value) {

        var token = Functions.obtenerDatosUsuario().Token;

        return await axios.get(Functions.obtenerUrlApiUnite('base/listproductosautocomplete'), {
            params: {
                value: value
            },
            headers: {
                'authorization': token,
            }
        })
            .then(res => {
                if (res.data.EsCorrecto) {  
                    return (res.data.Valor.List) ? res.data.Valor.List : [];
                }

            })
            .catch(error => {
                Functions.capturarErrorResponse(error);
            });
    },

}