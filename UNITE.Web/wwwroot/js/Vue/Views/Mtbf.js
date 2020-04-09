


let app = new Vue({
    el: "#app",
    data: {
        objMtbf: {
            Bam: '',
            ViajeEnHoras: '',
            HorasDia: '',
            Anio: '',
            NumMes: '',
            DiasMes: '',
            Viajes: '',
            FallasMecanicas: '',
            TotalHoras: '',
            MTTR: '',
            MetaMTBF: '',
            MTBFHorasTotales: '',
            MTBFDiario: '',
            MTBFViajes: '',
            KmPerdidos: '',
            Meta: '',
            Eficiencia: '',
            CambioTractos: '',
            DisponibilidadMecanica: '',
            DisponibilidadFlota: '',
            IdMtbf: '',
            NombreMes: ''
        },

        list: {
            Mtbf: [],
            TipoM: [],
            TipoM2: [],
            Sistemas: [],
            Sistemas2: [],
            SubSistemas: [],
            SubSistemas2: [],
            Id: []
        }
    },
    created: async function () {
        var anio = _FechaActual.substr(6, 4);
        this.objMtbf.Anio = anio;
        await this.ListMtbf();
    },
    mounted: async function () {
        this.$nextTick(() => {
            //this.SetFocus();
        });
    },
    methods: {

        ListMtbf: async function () {

            let _this = this;

            if (_this.objMtbf.Anio === "") {
                Notifications.Messages.warning('Primero debe seleccionar un año');
                _this.$refs.Anio.focus();
                return;
            }

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Mtbf/ListMtbf'), { params: { value: _this.objMtbf.Anio } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Mtbf = (res.data.Valor.List) ? res.data.Valor.List : [];
                        _this.objMtbf.Bam = (res.data.Valor.Bam === 0) ? "" : res.data.Valor.Bam;
                        _this.objMtbf.ViajeEnHoras = (res.data.Valor.ViajeEnHoras === 0) ? "" : res.data.Valor.ViajeEnHoras;
                        _this.objMtbf.HorasDia = (res.data.Valor.HorasDia === 0) ? "" : res.data.Valor.HorasDia;
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListMtbf');
                });
        },

        Recargar: async function () {

            let _this = this;

            if (_this.objMtbf.Anio === "") {
                Notifications.Messages.warning('Primero debe seleccionar un año');
                _this.$refs.Anio.focus();
                return;
            }

            if (_this.objMtbf.Bam === "") {
                Notifications.Messages.warning('Primero debe ingresar Bam');
                _this.$refs.Bam.focus();
                return;
            }

            if (_this.objMtbf.ViajeEnHoras === "") {
                Notifications.Messages.warning('Primero debe ingresar viaje en horas');
                _this.$refs.ViajeEnHoras.focus();
                return;
            }

            if (_this.objMtbf.HorasDia === "") {
                Notifications.Messages.warning('Primero debe ingresar horas del día');
                _this.$refs.HorasDia.focus();
                return;
            }

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Mtbf/RecargarMtbf'), { params: { value: _this.objMtbf.Anio } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Mtbf = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo Recargar');
                });

        },

        Guardar: async function () {

            let _this = this;

            if (_this.objMtbf.Anio === "") {
                Notifications.Messages.warning('Primero debe seleccionar un año');
                _this.$refs.Anio.focus();
                return;
            }

            if (_this.objMtbf.Bam === "") {
                Notifications.Messages.warning('Primero debe ingresar Bam');
                _this.$refs.Bam.focus();
                return;
            }

            if (_this.objMtbf.ViajeEnHoras === "") {
                Notifications.Messages.warning('Primero debe ingresar viaje en horas');
                _this.$refs.ViajeEnHoras.focus();
                return;
            }

            if (_this.objMtbf.HorasDia === "") {
                Notifications.Messages.warning('Primero debe ingresar horas del día');
                _this.$refs.HorasDia.focus();
                return;
            }

            let data = {
                ListMtbf : _this.list.Mtbf,
                HorasDia: _this.objMtbf.HorasDia,
                ViajeEnHoras: _this.objMtbf.ViajeEnHoras,
                Bam: _this.objMtbf.Bam,
                Anio: _this.objMtbf.Anio
            };

            var json = JSON.stringify(data);

            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('Mtbf/InsertMtbf'), {
                json: json
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                    } else if (res.data.Estado === false) {
                        //this.processing = false;
                        Notifications.Messages.error(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo InsertAuxilioMecanico');
                });
        },

        ObtenerHora: function (hora) {
            if (hora === null) {
                return 0;
            } else {
                var nuevaHora = hora.substr(0, 2);
                return parseInt(nuevaHora);
            }
        },

        Redondeo: function (numero, decimales) {
            if (decimales === undefined) {
                decimales = 2;
            }
            var flotante = parseFloat(numero);
            var resultado = Math.round(flotante * Math.pow(10, decimales)) / Math.pow(10, decimales);
            return resultado;
        },

        ActualizarDatos() {
            let _this = this;
            let viajeEnHoras = _this.objMtbf.ViajeEnHoras;
            let horasDia = _this.objMtbf.HorasDia;
            let bam = _this.objMtbf.Bam;
            let val = _this.list.Mtbf;
            $.each(val, function (key, item) {
                var mtbfHorasTotales;
                var mtbfDiario;
                var mtbfViajes;
                var eficiencia;
                var disponibilidadMecanica;
                var disponibilidadFlota;

                if (item.FallasMecanicas === 0 || item.Viajes === "" || item.MetaMTBF === "" || item.Meta === "") {
                    mtbfHorasTotales = 0;
                    mtbfDiario = 0;
                    mtbfViajes = 0;
                    eficiencia = 0;
                    disponibilidadMecanica = 0;
                    disponibilidadFlota = 0;
                } else {
                    mtbfHorasTotales = (item.Viajes * 62) / item.FallasMecanicas;
                    mtbfDiario = (mtbfHorasTotales / ((item.Viajes * viajeEnHoras) / item.DiasMes)) * horasDia;
                    mtbfViajes = item.Viajes / item.FallasMecanicas;
                    eficiencia = (((item.Viajes * bam) - item.KmPerdidos) / (item.Viajes * bam)) * 100;
                    disponibilidadMecanica = (mtbfDiario / (mtbfDiario + _this.ObtenerHora(item.MTTR))) * 100;
                    disponibilidadFlota = ((item.Viajes - item.CambioTractos) / item.Viajes) * 100;

                }

                item.MTBFHorasTotales = _this.Redondeo(mtbfHorasTotales, 0);
                item.MTBFDiario = _this.Redondeo(mtbfDiario, 0);
                item.MTBFViajes = _this.Redondeo(mtbfViajes, 0);
                item.Eficiencia = _this.Redondeo(eficiencia, 0);
                item.DisponibilidadMecanica = _this.Redondeo(disponibilidadMecanica);
                item.DisponibilidadFlota = _this.Redondeo(disponibilidadFlota);
            });
        },
    },

    



    computed: {
        FullFields: function () {

        }
    },

    watch: {
        "list.Mtbf": {
            deep: true,
            handler(val) {
                let _this = this;
                _this.ActualizarDatos();
            }
        },
        "objMtbf": {
            deep: true,
            handler(val) {
                let _this = this;
                _this.ActualizarDatos();
            }
        },
    }
});



