var Base = {

    getProductos: async function (value) {

        await axios.get(Functions.obtenerUrlApiUnite('base/listproductosautocomplete'), {
            params: {
                value: value
            },
            headers: {
                'Authorization': Functions.obtenerDatosUsuario().Token,
            }
        })
            .then(res => {
                if (res.data.EsCorrecto) {  
                    return (res.data.Valor.List) ? res.data.Valor.List : [];
                }

            }).catch(error => {
                Notifications.Messages.error('Ocurrió una excepción en el método getProductos');
            });
    },

}