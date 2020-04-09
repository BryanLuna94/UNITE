let app = new Vue({
    el: "#app",
    data: {

        objOrdenMasiva: {
            FechaGenerar: _FechaActual,
            IdOrdenMasiva: ''
        },

        objFiltro: {
            FecIni: _FechaActual,
            FecFin: _FechaActual,
            Origen: '',
            Destino: '',
            Unidad: '',
            Chofer: '',
            Generado: false,
            Orden: 'P'
        },

        list: {
            OrdenMasiva: [],
            Origenes: [],
            Destinos: [],
            Beneficiarios: [],
            Flotas: [],
            Seleccionados: [],
            TareasPendientes: [],
            Buses: [],
        },
        isCheckAll: false,
        createOrdenMasiva: true,
        selectedlang: "",
    },
    created: async function () {
        await this.ListOrdenMasiva();
        await this.getFlotas('');
        await this.getBeneficiarios('');
        await this.getOrigenes('');
        await this.getDestinos('');
    },
    mounted: async function () {
        /*this.$nextTick(() => {

        });*/


        $.datetimepicker.setLocale('es');

        $('.dt-picker').datetimepicker({
            format: 'd/m/Y',
            timepicker: false,
            mask: true, // '9999/19/39 29:59' - digit is the maximum possible for a cell
        });

    },
    methods: {

        checkAll: function () {

            this.isCheckAll = !this.isCheckAll;
            this.list.Seleccionados = [];
            if (this.isCheckAll) { // Check all
                for (var key in this.list.OrdenMasiva) {
                    this.list.Seleccionados.push(this.list.OrdenMasiva[key]);
                }
            }
        },

        updateCheckall: function (ordenMasiva) {

            //si esta seleccionado quitarlo

            let lstIguales = this.list.OrdenMasiva.filter(function (item) {
                return item.CODI_PROGRAMACION_REAL === ordenMasiva.CODI_PROGRAMACION_REAL;
            });


            for (var key in lstIguales) {
                let existe = this.list.Seleccionados.filter(function (itemSelec) {
                    return itemSelec === lstIguales[key];
                });

                if (existe.length === 0) {
                    this.list.Seleccionados.push(lstIguales[key]);
                }
            }



            if (this.list.Seleccionados.length === this.list.OrdenMasiva.length) {
                this.isCheckAll = true;
            } else {
                this.isCheckAll = false;
            }
        },

        validateDateTimeFormat: function (evt) {
            var fechaInvalida = "Invalid date";
            var fechaHora = moment(moment(evt, 'DD/MM/YYYY')).format('DD/MM/YYYY');
            return (fechaHora === fechaInvalida) ? "" : fechaHora;
        },

        ListOrdenMasiva: async function () {

            let _this = this;
            _this.list.Seleccionados = [];

            let data = {
                Filtro: _this.objFiltro
            };

            var json = JSON.stringify(data);

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('OrdenMasiva/ListOrdenMasiva'), {
                params: {
                    json: json
                }
            })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.OrdenMasiva = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListOrdenMasiva');
                });
        },

        ListTareasPendientes: async function (areCodigo) {

            let _this = this;


            await axios.get(getBaseUrl.obtenerUrlAbsoluta('OrdenMasiva/ListTareasPendientes'), {
                params: {
                    are_codigo: areCodigo
                }
            })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.TareasPendientes = (res.data.Valor.ListTareasPendientes) ? res.data.Valor.ListTareasPendientes : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListTareasPendientes');
                });
        },

        getFlotas: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListFlotaAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Flotas = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getFlotas');
                });
        },

        getBeneficiarios: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListBeneficiarioAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Beneficiarios = (res.data.Valor.List) ? res.data.Valor.List : [];

                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getSistemas');
                });
        },

        getOrigenes: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListPuntoAtencionAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Origenes = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getOrigenes');
                });
        },

        getDestinos: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListPuntoAtencionAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Destinos = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getDestinos');
                });
        },

        GenerarCorrectivo: async function () {

            let _this = this;

            if (_this.objOrdenMasiva.FechaGenerar === "") {
                Notifications.Messages.warning('Primero debe seleccionar una fecha');
                _this.$refs.FechaGenerar.focus();
                return;
            }

            let data = {
                FechaGenerar: _this.objOrdenMasiva.FechaGenerar,
                ListInsertar: _this.list.Seleccionados
            };

            var json = JSON.stringify(data);

            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('OrdenMasiva/GenerarCorrectivo'), {
                json: json
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        _this.ListOrdenMasiva();
                    } else if (res.data.Estado === false) {
                        //this.processing = false;
                        Notifications.Messages.error(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo GenerarCorrectivo');
                });
        },

        VerPreventivos: async function () {

            let _this = this;

            _this.list.Buses = [];
            _this.list.TareasPendientes = [];
            for (var key in _this.list.Seleccionados) {
                _this.list.Buses.push(_this.list.OrdenMasiva[key]);
            }

            if (_this.list.Buses.length === 0) {
                _this.ListTareasPendientes('');
            }
            
            $('#appTareasPendientes').modal('show');
        },

        AnularCorrectivo: async function () {

            Swal.fire({
                title: '¿Desea continuar?',
                text: "Está seguro que desea anular las órdenes correctivas, se anularán tambien las órdenes preventivas en caso se hayan generado",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sì, Anular'
            }).then((result) => {
                if (result.value) {

                    let _this = this;

                    let data = {
                        ListInsertar: _this.list.Seleccionados
                    };

                    var json = JSON.stringify(data);

                    //this.processing = true;
                    axios.post(getBaseUrl.obtenerUrlAbsoluta('OrdenMasiva/AnularCorrectivo'), {
                        json: json
                    })
                        .then(res => {
                            if (res.data.Estado) {
                                Notifications.Messages.success('Se grabó información exitosamente');
                                _this.ListOrdenMasiva();
                            } else if (res.data.Estado === false) {
                                //this.processing = false;
                                Notifications.Messages.error(res.data.Mensaje);
                            }
                        }).catch(error => {
                            Notifications.Messages.error('Ocurrió una excepción en el metodo AnularCorrectivo');
                        });
                }


            })

        },

        GenerarPreventivo: async function () {

            let _this = this;

            if (_this.objOrdenMasiva.FechaGenerar === "") {
                Notifications.Messages.warning('Primero debe seleccionar una fecha');
                _this.$refs.FechaGenerar.focus();
                return;
            }

            Swal.fire({
                title: '¿Desea continuar?',
                text: "Solo se generarán órdenes preventivas para programaciones con órdenes correctivas",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sì, Generar'
            }).then((result) => {
                if (result.value) {
                    //swal-end
                    let data = {
                        FechaGenerar: _this.objOrdenMasiva.FechaGenerar,
                        ListInsertar: _this.list.Seleccionados
                    };

                    var json = JSON.stringify(data);

                    //this.processing = true;
                    axios.post(getBaseUrl.obtenerUrlAbsoluta('OrdenMasiva/GenerarPreventivo'), {
                        json: json
                    })
                        .then(res => {
                            if (res.data.Estado) {
                                Notifications.Messages.success('Se grabó información exitosamente');
                                _this.ListOrdenMasiva();
                            } else if (res.data.Estado === false) {
                                //this.processing = false;
                                Notifications.Messages.error(res.data.Mensaje);
                            }
                        }).catch(error => {
                            Notifications.Messages.error('Ocurrió una excepción en el metodo GenerarPreventivo');
                        });
                    //fin delete    
                    //fin swal 1
                }


            })
        },

        AnularPreventivo: async function () {

            Swal.fire({
                title: '¿Desea continuar?',
                text: "Está seguro que desea anular las órdenes preventivas",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sì, Anular'
            }).then((result) => {
                if (result.value) {

                    let _this = this;

                    let data = {
                        ListInsertar: _this.list.Seleccionados
                    };

                    var json = JSON.stringify(data);

                    //this.processing = true;
                    axios.post(getBaseUrl.obtenerUrlAbsoluta('OrdenMasiva/AnularPreventivo'), {
                        json: json
                    })
                        .then(res => {
                            if (res.data.Estado) {
                                Notifications.Messages.success('Se grabó información exitosamente');
                                _this.ListOrdenMasiva();
                            } else if (res.data.Estado === false) {
                                //this.processing = false;
                                Notifications.Messages.error(res.data.Mensaje);
                            }
                        }).catch(error => {
                            Notifications.Messages.error('Ocurrió una excepción en el metodo AnularPreventivo');
                        });
                }


            })
        },

        RedirectInforme: async function (numero, tipo) {

            let _this = this;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('OrdenMasiva/SelectInformePorNumero'), {
                params:
                {
                    NumeroInforme: numero,
                    Tipo: tipo
                }
            })
                .then(res => {
                    if (res.data.Estado) {
                        window.location.href = _rutaInforme;
                    } else if (res.data.tipoNotificacion) {
                        ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                    } else if (res.data.tip) {
                        Notifications.Messages.warning(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo RedirectInforme');
                });
           
        },

        close: function (code) {
            if (code === 1) {
                $('#appTareasPendientes').modal('hide');
                this.$nextTick(() => {

                });
            }
        },

        RedirectReport: async function () {

            let _this = this;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('OrdenMasiva/Report'), {
                params: {}
            })
                .then(res => {
                    window.open(_rutaReporte);
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo RedirectReport');
                });

        }

    },

    computed: {

    },

    watch: {
        /*"objTareaM.IdTarea": function (newval, oldval) {
            if (newval) {
                this.SetFocus();
            }
        }*/
    }
});


