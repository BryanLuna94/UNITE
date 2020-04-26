let appVentaRapida = new Vue({
    el: '#appVentaRapida',
    data: {

        objVenta: {
            Acceso: '',
            Clave: ''
        },

        objDetalle: {
            IdProducto: '',
            Descripcion: ''
        },

        list: {
            Detalle: [],
            Productos: []
        },
    },
    created: async function () {

        let _this = this;

        await _this.getProductos('');
    },
    mounted: async function () {

        this.$nextTick(() => {

        });
    },
    methods: {

        getProductos: async function (value) {

            let _this = this;

            await Base.getProductos(value).then(function (data) {
                _this.list.Productos = data;
            });

        },

        agregarFila: function () {
            let _this = this;
            let index = _this.list.Detalle.length;
            let numItem = index + 1;
            let objProducto = _this.list.Productos.find(x => x.Codigo === _this.objDetalle.IdProducto);
            let descripcion = objProducto.Descripcion;
            let precio = objProducto.Descripcion.substring(objProducto.Descripcion.indexOf('.') + 2);

            var arr = {
                Item: numItem,
                IdProducto: _this.objDetalle.IdProducto,
                Descripcion: descripcion,
                Precio: precio,
                Cantidad: '',
                SubTotal: ''
            };

            _this.limpiarObjetoDetalle();
            _this.list.Detalle.unshift(arr);
            _this.setFocus(1, 0);
        },

        limpiarObjetoDetalle: function () {
            let _this = this;
            _this.objDetalle = {
                IdProducto: '',
                Descripcion: ''
            };
        },

        eliminarProducto: function (key) {

            let _this = this;
            _this.list.Detalle.splice(key, 1);

        },

        validateForm: function () {
            return (this.objUsuario.Acceso && this.objUsuario.Clave) ? true : false;
        },

        setFocus: function (val, key) {

            let _this = this;

            switch (val) {
                case 1:
                    _this.$refs.Precio[key].focus();
                    break;
                case 2:
                    _this.$refs.Cantidad[key].focus();
                    break;
                default:
                    break;
            }
        },

        redondeo: function (numero, decimales) {
            if (decimales === undefined) {
                decimales = 2;
            }
            var flotante = parseFloat(numero);
            var resultado = Math.round(flotante * Math.pow(10, decimales)) / Math.pow(10, decimales);
            return resultado;
        },

        actualizarDatos: function () {
            let _this = this;

            let val = _this.list.Detalle;
            $.each(val, function (key, item) {
                var subTotal;

                subTotal = item.Precio * item.Cantidad;

                item.SubTotal = _this.redondeo(subTotal, 2);
            });
        },
    },
    computed: {
        FullFields: function () {
            return this.validateForm();
        }
    },
    watch: {
        "list.Detalle": {
            deep: true,
            handler(val) {
                let _this = this;
                _this.actualizarDatos();
            }
        },
    }
});