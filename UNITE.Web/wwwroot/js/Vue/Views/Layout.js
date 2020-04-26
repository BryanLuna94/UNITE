let app = new Vue({
    el: '#appLayout',
    data: {

        objUsuario: {
            Nombre: '',//Functions.obtenerDatosUsuario().Usuario.Nombre,
        }

    },
    created: async function () {
        
    },
    mounted: async function () {
        this.$nextTick(() => {

        });
    },
    methods: {

        obtenerDatos: async function () {
            
        },

        salir: function () {
            Functions.cerrarSesion();
        },

    },
    computed: {
        FullFields: function () {
            return this.validateForm();
        }
    },
    watch: {

    }
});