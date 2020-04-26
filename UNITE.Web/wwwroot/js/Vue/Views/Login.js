let appLogin = new Vue({
    el: '#appLogin',
    data: {
        objUsuario: {
            Acceso: '',
            Clave: ''
        }
    },
    created: async function () {

    },
    mounted: async function () {
        this.$nextTick(() => {

        });
    },
    methods: {

        ingresar: async function () {
            if (this.validateForm()) {
                await axios.post(Functions.obtenerUrlApiUnite('Autenticacion/Login'), {
                    Acceso: this.objUsuario.Acceso,
                    Clave: this.objUsuario.Clave,
                    MinutosExpiracion: Constants.DatosApiUnite.TIME_EXPIRE_TOKEN
                })
                    .then(async res => {
                        if (res.data.EsCorrecto) {
                            Notifications.Messages.success(Constants.MensajesRespuesta.USUARIO_AUTORIZADO);
                            Functions.guardarSesion(Constants.NombreSesion.DATOS_USUARIO, JSON.stringify(res.data.Valor));
                            window.location.href = rutaIndex;
                        } else if (res.data.tipoNotificacion) {
                            ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                        }
                    })
                    .catch(error => {
                        Functions.capturarErrorResponse(error);
                    });
            } else {
                this.SetFocus();
            }
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