let appVentaRapida = new Vue({
    el: '#appVentaRapida',
    data: {

        objVenta: {
            Acceso: '',
            Clave: ''
        },

        list: {
            Detalle: [],
            Productos: []
        }
    },
    created: async function () {

        let _this = this;

        await _this.getProductos('');

    },
    mounted: async function () {

        this.list.Detalle = {

            Item: '1',
            Descripcion: '',

        },
        this.$nextTick(() => {

        });
    },
    methods: {

        getProductos: async function (value) {

            let _this = this;
            /*Base.getProductos(value).then((data) => {
                alert(data);
            });
            */
            alert(await Base.getProductos(value));
            //_this.list.Productos = await return Base.getProductos(value);
        },

        validateForm: function () {
            return (this.objUsuario.Acceso && this.objUsuario.Clave) ? true : false;
        },
        SetFocus: function () {
            if (!this.objUsuario.Acceso) {
                this.$refs.Acceso.focus();
            } else if (!this.objUsuario.Clave) {
                this.$refs.Clave.focus();
            } else {
                this.$refs.bntSubmit.focus();
            }
        }
    },
    computed: {
        FullFields: function () {
            return this.validateForm();
        }
    },
    watch: {

    }
});