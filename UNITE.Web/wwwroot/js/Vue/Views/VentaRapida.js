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