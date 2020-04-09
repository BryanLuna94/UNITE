let app = new Vue({
    el: "#app",
    data: {

        objAuxilioMecanico: {
            Carga: '',
            Are_Codigo: '',
            Are_Codigo2: '',
            Kmt_unidad: '',
            Kmt_recorrido: '',
            MMG: '',
            Fechahora_ini: '',
            Fechahora_fin: '',
            Controlable: '',
            Id_plataforma: '',
            Idtarea_c: '',
            Falla: '',
            Ben_codigo: '',
            Servicio: '',
            Kmt_Perdido: '',
            CambioTracto: '',
            Responsable: '',
            Atencion: '',
            Causa: '',
            IdPlan: '',
            IdAuxilioMecanico: ''
        },

        objFiltro: {
            FechaInicio: _FechaActual,
            FechaFin: _FechaActual,
            Are_Codigo: '',
            Ben_codigo: '',

        },

        list: {
            AuxilioMecanicos: [],
            Flotas: [],
            Carretas: [],
            Beneficiarios: [],
            Planes: [],
            Tareas: [],
            Plataformas: [],
            Id: [],
            Cargas: [],
            MMG: [],
            Controlables: [],
            Responsables: [],
            Atenciones: [],
        },
        createAuxilioMecanico: true,
    },
    created: async function () {
        await this.ListAuxilioMecanico();
        await this.getFlotas("");
        await this.getBeneficiarios("");
    },
    mounted: async function () {
        /*this.$nextTick(() => {

        });*/
        

        $.datetimepicker.setLocale('es');

        $('.dt-picker').datetimepicker({
            format: 'd/m/Y H:i',
            timepicker: true,
            mask: true, // '9999/19/39 29:59' - digit is the maximum possible for a cell
        });

    },
    methods: {

        validateDateTimeFormat: function (evt) {
            var fechaInvalida = "Invalid date";
            var fechaHora = moment(moment(evt, 'DD/MM/YYYY HH:mm')).format('DD/MM/YYYY HH:mm');
            return (fechaHora === fechaInvalida) ? "" : fechaHora;
        },

        ListAuxilioMecanico: async function () {

            let _this = this;

            var pFechaInicio = _this.objFiltro.FechaInicio = $('#FechaInicio').val();
            var pFechaFin = _this.objFiltro.FechaFin = $('#FechaFin').val();

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('AuxilioMecanico/ListAuxilioMecanico'), {
                params: {
                    fechainicio: pFechaInicio,
                    fechafin: pFechaFin,
                    are_codigo: _this.objFiltro.Are_Codigo,
                    Ben_codigo: _this.objFiltro.Ben_codigo,
                }
            })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.AuxilioMecanicos = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListAuxilioMecanico');
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

        getCarretas: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListFlotaAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Carretas = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getCarretas');
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
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getBeneficiarios');
                });
        },

        getPlanes: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListPlanAccionAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Planes = (res.data.Valor.List) ? res.data.Valor.List : [];

                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getPlanes');
                });
        },

        getTareas: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListTareasCAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Tareas = (res.data.Valor.List) ? res.data.Valor.List : [];

                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getTareas');
                });
        },

        getPlataformas: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListPlataformaAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Plataformas = (res.data.Valor.List) ? res.data.Valor.List : [];

                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getPlataformas');
                });
        },

        getListasEstaticas: async function () {
            let _this = this;

            _this.list.Atenciones = [
                {
                    Codigo: 'DIVEMOTOR',
                    Descripcion: 'DIVEMOTOR'
                },
                {
                    Codigo: 'WARI',
                    Descripcion: 'WARI'
                },
                {
                    Codigo: 'INHOUSE',
                    Descripcion: 'INHOUSE'
                },
                {
                    Codigo: 'STAR',
                    Descripcion: 'STAR'
                },
                {
                    Codigo: 'BASE ESTINAR',
                    Descripcion: 'BASE ESTINAR'
                },
            ];

            _this.list.Cargas = [
                {
                    Codigo: 'VACIO',
                    Descripcion: 'VACIO'
                },
                {
                    Codigo: 'CARGADO',
                    Descripcion: 'CARGADO'
                }
            ];

            _this.list.Responsables = [
                {
                    Codigo: 'DIVEMOTOR',
                    Descripcion: 'DIVEMOTOR'
                },
                {
                    Codigo: 'WARI',
                    Descripcion: 'WARI'
                },
                {
                    Codigo: 'DIVEMOTOR Y WARI',
                    Descripcion: 'DIVEMOTOR Y WARI'
                },
                {
                    Codigo: 'BASE ESTINAR',
                    Descripcion: 'BASE ESTINAR'
                },
            ];

            _this.list.Controlables = [
                {
                    Codigo: 'C',
                    Descripcion: 'CONTROLABLE'
                },
                {
                    Codigo: 'N',
                    Descripcion: 'NO CONTROLABLE'
                }
            ];

            _this.list.MMG = [
                {
                    Codigo: 'SI',
                    Descripcion: 'SI'
                },
                {
                    Codigo: 'NO',
                    Descripcion: 'NO'
                }
            ];

        },

        ShowEditor: async function (itemAuxilioMecanico) {

            var _this = this;
            _this.ClearAuxilioMecanico();
            _this.getBeneficiarios('');
            _this.getFlotas('');
            _this.getCarretas('');
            _this.getPlanes('');
            _this.getTareas('');
            _this.getPlataformas('');
            _this.getListasEstaticas('');
            if (itemAuxilioMecanico !== undefined) {
                _this.ObtenerAuxilioMecanico(itemAuxilioMecanico);
            } else {
                _this.createAuxilioMecanico = true;
            }
            $('#appEditAuxilioMecanico').modal('show');
        },

        ClearAuxilioMecanico: async function () {

            var _this = this;
            _this.objAuxilioMecanico.Carga = '';
            _this.objAuxilioMecanico.Are_Codigo = '';
            _this.objAuxilioMecanico.Are_Codigo2 = '';
            _this.objAuxilioMecanico.Kmt_unidad = '';
            _this.objAuxilioMecanico.Kmt_recorrido = '';
            _this.objAuxilioMecanico.MMG = '';
            _this.objAuxilioMecanico.Fechahora_ini = '';
            _this.objAuxilioMecanico.Fechahora_fin = '';
            _this.objAuxilioMecanico.Controlable = '';
            _this.objAuxilioMecanico.Id_plataforma = '';
            _this.objAuxilioMecanico.Idtarea_c = '';
            _this.objAuxilioMecanico.Falla = '';
            _this.objAuxilioMecanico.Ben_codigo = '';
            _this.objAuxilioMecanico.Servicio = '';
            _this.objAuxilioMecanico.Kmt_Perdido = '';
            _this.objAuxilioMecanico.CambioTracto = '';
            _this.objAuxilioMecanico.Responsable = '';
            _this.objAuxilioMecanico.Atencion = '';
            _this.objAuxilioMecanico.Causa = '';
            _this.objAuxilioMecanico.IdPlan = '';
            _this.objAuxilioMecanico.IdAuxilioMecanico = '';

        },

        ObtenerAuxilioMecanico: async function (itemAuxilioMecanico) {

            let _this = this;

            _this.createAuxilioMecanico = false;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('AuxilioMecanico/SelectAuxilioMecanico'), { params: { IdAuxilioMecanico: itemAuxilioMecanico.ID_Tb_AuxilioMecanico } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.objAuxilioMecanico.Carga = res.data.Valor.AuxilioMecanico.Carga;
                        _this.objAuxilioMecanico.Are_Codigo = res.data.Valor.AuxilioMecanico.Are_Codigo;
                        _this.objAuxilioMecanico.Are_Codigo2 = res.data.Valor.AuxilioMecanico.Are_Codigo2;
                        _this.objAuxilioMecanico.Kmt_unidad = res.data.Valor.AuxilioMecanico.Kmt_unidad;
                        _this.objAuxilioMecanico.Kmt_recorrido = res.data.Valor.AuxilioMecanico.Kmt_recorrido;
                        _this.objAuxilioMecanico.MMG = res.data.Valor.AuxilioMecanico.MMG;
                        _this.objAuxilioMecanico.Fechahora_ini = res.data.Valor.AuxilioMecanico.Fechahora_ini;
                        _this.objAuxilioMecanico.Fechahora_fin = res.data.Valor.AuxilioMecanico.Fechahora_fin;
                        _this.objAuxilioMecanico.Controlable = res.data.Valor.AuxilioMecanico.Controlable;
                        _this.objAuxilioMecanico.Id_plataforma = res.data.Valor.AuxilioMecanico.Id_plataforma;
                        _this.objAuxilioMecanico.Idtarea_c = res.data.Valor.AuxilioMecanico.Idtarea_c;
                        _this.objAuxilioMecanico.Falla = res.data.Valor.AuxilioMecanico.Falla;
                        _this.objAuxilioMecanico.Ben_codigo = res.data.Valor.AuxilioMecanico.Ben_codigo;
                        _this.objAuxilioMecanico.Servicio = res.data.Valor.AuxilioMecanico.Servicio;
                        _this.objAuxilioMecanico.Kmt_Perdido = res.data.Valor.AuxilioMecanico.Kmt_Perdido;
                        _this.objAuxilioMecanico.CambioTracto = res.data.Valor.AuxilioMecanico.CambioTracto;
                        _this.objAuxilioMecanico.Responsable = res.data.Valor.AuxilioMecanico.Responsable;
                        _this.objAuxilioMecanico.Atencion = res.data.Valor.AuxilioMecanico.Atencion;
                        _this.objAuxilioMecanico.Causa = res.data.Valor.AuxilioMecanico.Causa;
                        _this.objAuxilioMecanico.IdPlan = res.data.Valor.AuxilioMecanico.IdPlan;
                        _this.objAuxilioMecanico.IdAuxilioMecanico = res.data.Valor.AuxilioMecanico.ID_Tb_AuxilioMecanico;
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ObtenerAuxilioMecanico');
                });
        },

        saveAuxilioMecanico: async function () {

            var fecha_vacia = "__/__/____ __:__";
            var fechaini = $("#Fechahora_ini").val();
            var fechafin = $("#Fechahora_fin").val();
            if (fechaini === "" || fechaini === fecha_vacia) {
                Notifications.Messages.warning("Debe ingresar fecha de inicio");
                $("#Fechahora_ini").focus();
                return;
            }

            if (fechafin === "" || fechafin === fecha_vacia) {
                Notifications.Messages.warning("Debe ingresar fecha de termino");
                $("#Fechahora_fin").focus();
                return;
            }

            if (this.createAuxilioMecanico) {
                await this.InsertAuxilioMecanico();
            } else {
                await this.UpdateAuxilioMecanico();
            }
        },

        UpdateAuxilioMecanico: async function () {

            let _this = this;
            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('AuxilioMecanico/UpdateAuxilioMecanico'), {
                Carga: _this.objAuxilioMecanico.Carga,
                Are_Codigo: _this.objAuxilioMecanico.Are_Codigo,
                Are_Codigo2: _this.objAuxilioMecanico.Are_Codigo2,
                Kmt_unidad: _this.objAuxilioMecanico.Kmt_unidad,
                Kmt_recorrido: _this.objAuxilioMecanico.Kmt_recorrido,
                MMG: _this.objAuxilioMecanico.MMG,
                Fechahora_ini: $("#Fechahora_ini").val(),
                Fechahora_fin: $("#Fechahora_fin").val(),
                Controlable: _this.objAuxilioMecanico.Controlable,
                Id_plataforma: _this.objAuxilioMecanico.Id_plataforma,
                Idtarea_c: _this.objAuxilioMecanico.Idtarea_c,
                Falla: _this.objAuxilioMecanico.Falla,
                Ben_codigo: _this.objAuxilioMecanico.Ben_codigo,
                Servicio: _this.objAuxilioMecanico.Servicio,
                Kmt_Perdido: _this.objAuxilioMecanico.Kmt_Perdido,
                CambioTracto: _this.objAuxilioMecanico.CambioTracto,
                Responsable: _this.objAuxilioMecanico.Responsable,
                Atencion: _this.objAuxilioMecanico.Atencion,
                Causa: _this.objAuxilioMecanico.Causa,
                IdPlan: _this.objAuxilioMecanico.IdPlan,
                ID_Tb_AuxilioMecanico: _this.objAuxilioMecanico.IdAuxilioMecanico
            })
                .then(res => {
                    if (res.data.Estado) {
                        this.close(1);
                        Notifications.Messages.success('Se grabó información exitosamente');
                        this.ListAuxilioMecanico();
                    } else if (res.data.Estado === false) {
                        //this.processing = false;
                        Notifications.Messages.error(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo UpdateAuxilioMecanico');
                });
        },

        InsertAuxilioMecanico: async function () {

            let _this = this;
            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('AuxilioMecanico/InsertAuxilioMecanico'), {
                Carga: _this.objAuxilioMecanico.Carga,
                Are_Codigo: _this.objAuxilioMecanico.Are_Codigo,
                Are_Codigo2: _this.objAuxilioMecanico.Are_Codigo2,
                Kmt_unidad: _this.objAuxilioMecanico.Kmt_unidad,
                Kmt_recorrido: _this.objAuxilioMecanico.Kmt_recorrido,
                MMG: _this.objAuxilioMecanico.MMG,
                Fechahora_ini: $("#Fechahora_ini").val(),
                Fechahora_fin: $("#Fechahora_fin").val(),
                Controlable: _this.objAuxilioMecanico.Controlable,
                Id_plataforma: _this.objAuxilioMecanico.Id_plataforma,
                Idtarea_c: _this.objAuxilioMecanico.Idtarea_c,
                Falla: _this.objAuxilioMecanico.Falla,
                Ben_codigo: _this.objAuxilioMecanico.Ben_codigo,
                Servicio: _this.objAuxilioMecanico.Servicio,
                Kmt_Perdido: _this.objAuxilioMecanico.Kmt_Perdido,
                CambioTracto: _this.objAuxilioMecanico.CambioTracto,
                Responsable: _this.objAuxilioMecanico.Responsable,
                Atencion: _this.objAuxilioMecanico.Atencion,
                Causa: _this.objAuxilioMecanico.Causa,
                IdPlan: _this.objAuxilioMecanico.IdPlan
            })
                .then(res => {
                    if (res.data.Estado) {
                        this.close(1);
                        Notifications.Messages.success('Se grabó información exitosamente');
                        this.ListAuxilioMecanico();
                    } else if (res.data.Estado === false) {
                        //this.processing = false;
                        Notifications.Messages.error(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo InsertAuxilioMecanico');
                });
        },

        DeleteAuxilioMecanico: async function (itemAuxilioMecanico) {

            let _this = this;
            //this.processing = true;

            Swal.fire({
                title: '¿Estas Seguro?',
                text: "Deseas eliminar este registro",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sì, Eliminar Registro'
            }).then((result) => {
                if (result.value) {
                    //swal-end
                    axios.post(getBaseUrl.obtenerUrlAbsoluta('AuxilioMecanico/DeleteAuxilioMecanico'), { IdAuxilioMecanico: itemAuxilioMecanico.ID_Tb_AuxilioMecanico })
                        .then(res => {
                            if (res.data.Estado) {

                                Notifications.Messages.success('Se eliminó registro exitosamente');
                                this.ListAuxilioMecanico();

                            }
                            if (res.data.Estado === false) {
                                Notifications.Messages.warning("esta registro no se pudo eliminar");
                            }

                        }).catch(error => {
                            Notifications.Messages.error('Ocurrió una excepción en el metodo DeleteAuxilioMecanico');
                        });
                    //fin delete    
                    //fin swal 1
                }


            })
            //fin swal2

        },

        close: function (code) {
            if (code === 1) {
                this.ClearAuxilioMecanico();
                $('#appEditAuxilioMecanico').modal('hide');
                this.$nextTick(() => {

                });
            }
        }
    },

    computed: {
        FullAuxilioMecanico: function () {
            return (
                this.objAuxilioMecanico.Are_Codigo &&
                this.objAuxilioMecanico.Carga &&
                this.objAuxilioMecanico.Kmt_unidad &&
                this.objAuxilioMecanico.Kmt_recorrido &&
                this.objAuxilioMecanico.MMG &&
                this.objAuxilioMecanico.Controlable &&
                this.objAuxilioMecanico.Falla &&
                this.objAuxilioMecanico.Fechahora_ini &&
                this.objAuxilioMecanico.Fechahora_fin &&
                this.objAuxilioMecanico.Servicio &&
                this.objAuxilioMecanico.Kmt_Perdido &&
                this.objAuxilioMecanico.CambioTracto &&
                this.objAuxilioMecanico.Responsable &&
                this.objAuxilioMecanico.Atencion &&
                this.objAuxilioMecanico.Causa
                ) ? true : false;
        },
    },

    watch: {
        /*"objTareaM.IdTarea": function (newval, oldval) {
            if (newval) {
                this.SetFocus();
            }
        }*/
    }
});


