let app = new Vue({
    el: "#app",
    data: {

        objInforme: {
            IdInforme: '',
            Are_Codigo: '',
            Are_Nombre: '',
            Ofi_Codigo: '',
            Oficina: '',
            Ben_Codigo: '',
            Chofer: '',
            FechaStr: '',
            Hora: '',
            Observacion: '',
            KmUnidad: 0,
            EstCierre: false,
            TipoInforme: '',
            IdUndAlerta: 0,
            NumeroInforme: 0,
            Solicitante: '',
            TipoInformeDesc: '',
            Kilometraje: 0,
            TipoU: ''
        },

        objMantenimiento: {
            IdInforme: '',
            IdTarea: '',
            IdTipMan: '',
            Observacion: '',
            FechaInicio: '',
            Sistema: ''
        },

        objODM: {
            Are_Codigo: '',
            ODM_FechMovimiento: '',
            ODM_FechContable: '',
            ODM_FechVencimiento: '',
            Ben_Codigo_Solicitante: '',
            ODM_Informe: '',
            IdTareaMecanicos: ''
        },

        objMecanico: {
            IdTareaMecanicos: 0,
            IdInforme: '',
            IdTarea: '',
            CodMecanico: '',
            FechaInicio: '',
            FechaTermino: '',
            Observacion: ''
        },

        objAyudante: {
            IdAyudante: 0,
            IdTareaMecanicos: '',
            CodMecanico: '',
            Observacion: ''
        },

        objFiltro: {
            Fech_ini: _FechaActual,
            Fech_fin: _FechaActual,
            NInforme: '',
            TipoU: '2',
            UsrCodigo: '',
            Orden: 'F',
            SoloMiUsuario: false
        },

        objBolsa: {
            IdArticuloTarea: 0,
            FechaInicio: '',
            Codigo: '',
            Original: '',
            Descripcion: '',
            Cantidad: '',
            Solicitado: 0,
            Consumo: 0,
            Pendiente: 0,
            Tipo: '',
            CodiAlmacen: '',
            IdTarea: '',
            IdInforme: '',
            IdTipMan: ''
        },

        buttonCorrectivoPreventivo: {
            text: 'IR A PREVENTIVO'
        },

        list: {
            Informes: [],
            Usuarios: [],
            Almacenes: [],
            Articulos: [],
            Sistemas: [],
            Mantenimientos: [],
            Beneficiarios: [],
            Mecanicos: [],
            MecanicosAyudantes: [],
            TareasPendientes: [],
            Ayudantes: [],
            Bolsas: []
        },

    },
    created: async function () {

        let _this = this;

        if (_IdInformeSesion !== '') {
            _this.SelectInforme(_IdInformeSesion);
        }
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

        $('.dtm-picker').datetimepicker({
            format: 'd/m/Y H:i',
            timepicker: true,
            mask: true, // '9999/19/39 29:59' - digit is the maximum possible for a cell
        });

    },

    methods: {

        validateDateFormat: function (evt) {
            var fechaInvalida = "Invalid date";
            var fechaHora = moment(moment(evt, 'DD/MM/YYYY')).format('DD/MM/YYYY');
            return (fechaHora === fechaInvalida) ? "" : fechaHora;
        },

        validateDateTimeFormat: function (evt) {
            var fechaInvalida = "Invalid date";
            var fechaHora = moment(moment(evt, 'DD/MM/YYYY HH:mm')).format('DD/MM/YYYY HH:mm');
            return (fechaHora === fechaInvalida) ? "" : fechaHora;
        },

        getBeneficiarios: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListMecanicosAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Beneficiarios = (res.data.Valor.List) ? res.data.Valor.List : [];

                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getBeneficiarios');
                });
        },

        getMecanicosAyudantes: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListMecanicosAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.MecanicosAyudantes = (res.data.Valor.List) ? res.data.Valor.List : [];

                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getAyudantes');
                });
        },

        getUsuarios: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListUsuariosAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Usuarios = (res.data.Valor.List) ? res.data.Valor.List : [];

                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getUsuarios');
                });
        },

        getSistemas: async function (value) {

            let _this = this;

            let codBus = _this.objInforme.Are_Codigo;


            if (_this.objInforme.TipoInforme === "1") {

                await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListTareasAutocomplete'), {
                    params: {
                        cod_bus: codBus,
                        value: value
                    }
                })
                    .then(res => {
                        if (res.data.Estado) {
                            _this.list.Sistemas = (res.data.Valor.List) ? res.data.Valor.List : [];
                        }
                    }).catch(error => {
                        Notifications.Messages.error('Ocurrió una excepción en el metodo ListSistemas');
                    });

            } else {



                await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListTareasPreventivoAutocompleteAsync'), {
                    params: {
                        cod_bus: codBus,
                        value: value
                    }
                })
                    .then(res => {
                        if (res.data.Estado) {
                            _this.list.Sistemas = (res.data.Valor.List) ? res.data.Valor.List : [];
                        }
                    }).catch(error => {
                        Notifications.Messages.error('Ocurrió una excepción en el metodo ListSistemas');
                    });

            }


        },

        getAlmacenes: async function () {

            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListAlmacenesAutocomplete'))
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Almacenes = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getAlmacenes');
                });
        },

        getArticulos: async function (value) {
            let _this = this;

            let codigoAlmacen = _this.objBolsa.CodiAlmacen;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListArticulosAutocomplete'), {
                params:
                {
                    idAlmacen: codigoAlmacen,
                    value: value
                }
            })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Articulos = (res.data.Valor.List) ? res.data.Valor.List : [];

                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getArticulos');
                });
        },

        ShowBuscador: async function () {

            var _this = this;
            await _this.getUsuarios('');
            _this.ListInforme();
            $('#appBuscadorInforme').modal('show');
        },

        ShowTareasPendientes: async function () {

            var _this = this;
            _this.ListTareasPendientes();
            $('#appInformeTareasPendientes').modal('show');
        },

        ListInforme: async function () {

            let _this = this;

            let data = {
                Filtro: _this.objFiltro
            };

            var json = JSON.stringify(data);

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Informe/ListInforme'), {
                params: {
                    json: json
                }
            })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Informes = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListInforme');
                });
        },

        ClearInforme: async function () {

            var _this = this;

            _this.objInforme.IdInforme = '';
            _this.objInforme.Are_Codigo = '';
            _this.objInforme.Are_Nombre = '';
            _this.objInforme.Ofi_Codigo = '';
            _this.objInforme.Oficina = '';
            _this.objInforme.Ben_Codigo = '';
            _this.objInforme.Chofer = '';
            _this.objInforme.FechaStr = '';
            _this.objInforme.Hora = '';
            _this.objInforme.Observacion = '';
            _this.objInforme.KmUnidad = 0;
            _this.objInforme.EstCierre = false;
            _this.objInforme.TipoInforme = '';
            _this.objInforme.IdUndAlerta = 0;
            _this.objInforme.NumeroInforme = 0;
            _this.objInforme.Solicitante = '';
            _this.objInforme.TipoInformeDesc = '';
            _this.objInforme.TipoU = '';
            _this.objInforme.Kilometraje = 0;
        },

        AnularInforme: async function () {

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
                    axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/AnularInforme'),
                        {
                            IdInforme: _this.objInforme.IdInforme
                        })
                        .then(res => {
                            if (res.data.Estado) {
                                Notifications.Messages.success('Se eliminó registro exitosamente');
                                _this.ClearInforme();
                                _this.ClearMantenimiento();
                                _this.ClearMecanico();
                                _this.list.Mecanicos = [];
                                _this.list.Mantenimientos = [];
                            }
                            if (res.data.Estado === false) {
                                Notifications.Messages.warning("esta registro no se pudo eliminar");
                            }

                        }).catch(error => {
                            Notifications.Messages.error('Ocurrió una excepción en el metodo AnularInforme');
                        });
                    //fin delete    
                    //fin swal 1
                }


            })
            //fin swal2

        },

        ListInformeTareas: async function () {

            let _this = this;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Informe/ListInformeTareas'), {
                params: {
                    IdInforme: _this.objInforme.IdInforme
                }
            })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Mantenimientos = (res.data.Valor.ListInformeTareas) ? res.data.Valor.ListInformeTareas : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListInforme');
                });
        },


        RedirectReport: async function () {

            let _this = this;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Informe/ReportTemp'), {
                params: {
                    IdInforme: _this.objInforme.IdInforme
                }
            })
                .then(res => {
                    window.open(_rutaReporte);
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo RedirectReport');
                });

        },


        RedirectReportTarea: async function (itemMantenimiento) {

            let _this = this;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Informe/ReportTempTarea'), {
                params: {
                    IdInforme: _this.objInforme.IdInforme,
                    IdTarea: itemMantenimiento.IdTarea
                }
            })
                .then(res => {
                    window.open(_rutaReporteTarea);
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo RedirectReport');
                });

        },

        ListTareasPendientes: async function () {

            let _this = this;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Informe/ListInformeTareasBackLog'), {
                params: {
                    IdUnidad: _this.objInforme.Are_Codigo,
                    Tipo: _this.objInforme.TipoInforme
                }
            })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.TareasPendientes = (res.data.Valor.ListInformeTareas) ? res.data.Valor.ListInformeTareas : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListInforme');
                });
        },

        SelectInformeCambiar: async function (numeroInforme, tipoInforme, tipoU) {

            let _this = this;
            let existe = false;


            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Informe/SelectInformeCambiar'), {
                params: {
                    NumeroInforme: numeroInforme,
                    TipoInforme: tipoInforme,
                    TipoU: tipoU
                }
            })
                .then(res => {
                    if (res.data.Estado) {
                        if (res.data.Valor.Informe !== null) {
                            _this.objInforme.IdInforme = res.data.Valor.Informe.IdInforme;
                            _this.objInforme.Are_Codigo = res.data.Valor.Informe.Are_Codigo;
                            _this.objInforme.Are_Nombre = res.data.Valor.Informe.Are_Nombre;
                            _this.objInforme.Ofi_Codigo = res.data.Valor.Informe.Ofi_Codigo;
                            _this.objInforme.Oficina = res.data.Valor.Informe.Oficina;
                            _this.objInforme.Ben_Codigo = res.data.Valor.Informe.Ben_Codigo;
                            _this.objInforme.Chofer = res.data.Valor.Informe.Chofer;
                            _this.objInforme.FechaStr = res.data.Valor.Informe.FechaStr;
                            _this.objInforme.Hora = res.data.Valor.Informe.Hora;
                            _this.objInforme.Observacion = res.data.Valor.Informe.Observacion;
                            _this.objInforme.KmUnidad = res.data.Valor.Informe.KmUnidad;
                            _this.objInforme.EstCierre = res.data.Valor.Informe.EstCierre;
                            _this.objInforme.TipoInforme = res.data.Valor.Informe.TipoInforme;
                            _this.objInforme.IdUndAlerta = res.data.Valor.Informe.IdUndAlerta;
                            _this.objInforme.NumeroInforme = res.data.Valor.Informe.NumeroInforme;
                            _this.objInforme.Solicitante = res.data.Valor.Informe.Solicitante;
                            _this.objInforme.Kilometraje = res.data.Valor.Informe.Kilometraje;
                            _this.objInforme.TipoInformeDesc = (res.data.Valor.Informe.TipoInforme === "1") ? "Correctivo" : "Preventivo";
                            _this.objInforme.TipoU = res.data.Valor.Informe.Tipo;
                            existe = true;
                            _this.ClearMecanico();
                            _this.ClearMantenimiento();
                            _this.list.Mecanicos = [];
                            _this.list.Mantenimientos = [];
                            _this.ListInformeTareas();
                            _this.getSistemas();
                        }

                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo SelectInformeCambiar');
                });


            return existe;
        },

        SelectInforme: async function (idInforme) {

            let _this = this;
            let _idInforme = parseInt(idInforme);

            //_this.createAuxilioMecanico = false;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Informe/SelectInforme'), { params: { IdInforme: _idInforme } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.objInforme.IdInforme = res.data.Valor.Informe.IdInforme;
                        _this.objInforme.Are_Codigo = res.data.Valor.Informe.Are_Codigo;
                        _this.objInforme.Are_Nombre = res.data.Valor.Informe.Are_Nombre;
                        _this.objInforme.Ofi_Codigo = res.data.Valor.Informe.Ofi_Codigo;
                        _this.objInforme.Oficina = res.data.Valor.Informe.Oficina;
                        _this.objInforme.Ben_Codigo = res.data.Valor.Informe.Ben_Codigo;
                        _this.objInforme.Chofer = res.data.Valor.Informe.Chofer;
                        _this.objInforme.FechaStr = res.data.Valor.Informe.FechaStr;
                        _this.objInforme.Hora = res.data.Valor.Informe.Hora;
                        _this.objInforme.Observacion = res.data.Valor.Informe.Observacion;
                        _this.objInforme.KmUnidad = res.data.Valor.Informe.KmUnidad;
                        _this.objInforme.EstCierre = res.data.Valor.Informe.EstCierre;
                        _this.objInforme.TipoInforme = res.data.Valor.Informe.TipoInforme;
                        _this.objInforme.IdUndAlerta = res.data.Valor.Informe.IdUndAlerta;
                        _this.objInforme.NumeroInforme = res.data.Valor.Informe.NumeroInforme;
                        _this.objInforme.Solicitante = res.data.Valor.Informe.Solicitante;
                        _this.objInforme.Kilometraje = res.data.Valor.Informe.Kilometraje;
                        _this.objInforme.TipoU = res.data.Valor.Informe.TIPOU;

                        if (_this.objInforme.TipoInforme === "1") {
                            _this.buttonCorrectivoPreventivo.text = "IR A PREVENTIVO";
                            _this.objInforme.TipoInformeDesc = "Correctivo";
                        } else {
                            _this.buttonCorrectivoPreventivo.text = "IR A CORRECTIVO";
                            _this.objInforme.TipoInformeDesc = "Preventivo";
                        }

                        _this.getSistemas('');
                        _this.ListInformeTareas();
                        _this.close(1);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo SelectInforme');
                });
        },

        CambiarTractoCarreta: async function () {

            let _this = this;
            let tipoU = _this.objInforme.TipoU;
            let tipoUnew = (tipoU === 1) ? 2 : 1;
            let numeroInforme = _this.objInforme.NumeroInforme;
            let tipoInforme = _this.objInforme.TipoInforme;

            let existe = await _this.SelectInformeCambiar(numeroInforme, tipoInforme, tipoUnew);

            if (existe === true) {
                if (tipoU === 1) { //TRACTO
                    $('#btnTractoCarreta').text('IR A TRACTO');
                } else { //CARRETA
                    $('#btnTractoCarreta').text('IR A CARRETA');
                }
            } else {
                Notifications.Messages.warning("No se encontró registros");
            }

        },

        CambiarCorrectivoPreventivo: async function () {

            let _this = this;
            let tipoU = _this.objInforme.TipoU;
            let numeroInforme = _this.objInforme.NumeroInforme;
            let tipoInforme = _this.objInforme.TipoInforme;
            let tipoInformeNew = (tipoInforme === "1") ? "0" : "1";

            let existe = await _this.SelectInformeCambiar(numeroInforme, tipoInformeNew, tipoU);

            if (existe === true) {
                if (tipoInforme === "1") { //CORRECTIVO
                    _this.buttonCorrectivoPreventivo.text = 'IR A CORRECTIVO';
                } else {
                    _this.buttonCorrectivoPreventivo.text = 'IR A PREVENTIVO';
                }
            } else {
                Notifications.Messages.warning("No se encontró registros");
            }
        },

        //INICIO MANTENIMIENTO

        EditarEstiloFila: async function (e) {
            var div = $(e).closest('div');
            if ($(div).hasClass("open")) {
                $(e).closest('tr').css({ 'height': '' });
            } else {
                $(e).closest('tr').css({ 'height': '250px' });
            }
        },

        saveMantenimiento: async function () {

            var fecha_vacia = "__/__/____";
            var fechaini = $("#Fechahora_ini").val();
            if (fechaini === "" || fechaini === fecha_vacia) {
                Notifications.Messages.warning("Debe ingresar fecha de inicio");
                $("#FechaInicio").focus();
                return;
            }

            await this.InsertMantenimiento();

            //if (this.createAuxilioMecanico) {
            //    await this.InsertAuxilioMecanico();
            //} else {
            //    await this.UpdateAuxilioMecanico();
            //}
        },

        CambiarEstadoMantenimiento: async function (itemMantenimiento, estado, e) {

            let _this = this;

            _this.objMantenimiento.IdInforme = _this.objInforme.IdInforme;

            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/UpdateInformeTareaEstado'), {
                IdInforme: _this.objInforme.IdInforme,
                IdTarea: itemMantenimiento.IdTarea,
                Estado: estado
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        $(e).closest('tr').css({ 'height': '' });
                        _this.ListInformeTareas();
                    } else if (res.data.tipoNotificacion) {
                        ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                    } else if (res.data.tip) {
                        Notifications.Messages.warning(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo CambiarEstadoMantenimiento');
                });
        },

        UpdateMantenimiento: async function () {

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

        ReasignarTarea: async function (itemTarea) {

            let _this = this;
            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/UpdateInformeTareasReasignarInforme'), {
                IdInformeNuevo: _this.objInforme.IdInforme,
                IdInformeAnterior: itemTarea.IdInforme,
                IdTarea: itemTarea.IdTarea
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        _this.ListTareasPendientes();
                        _this.ListInformeTareas();
                    } else if (res.data.Estado === false) {
                        Notifications.Messages.error(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ReasignarTarea');
                });
        },

        InsertMantenimiento: async function () {

            let _this = this;

            _this.objMantenimiento.IdInforme = _this.objInforme.IdInforme;

            let data = {
                InformeTareas: _this.objMantenimiento
            };

            var json = JSON.stringify(data);

            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/InsertInformeTarea'), {
                json: json
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        _this.ListInformeTareas();
                        _this.ClearMantenimiento();
                    } else if (res.data.tipoNotificacion) {
                        ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                    } else if (res.data.tip) {
                        Notifications.Messages.warning(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo InsertMantenimiento');
                });
        },

        DeleteMantenimiento: async function (itemMantenimiento, pendientes) {

            let _this = this;
            if (pendientes === undefined) pendientes = false;
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
                    axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/DeleteInformeTarea'),
                        {
                            IdInforme: _this.objInforme.IdInforme,
                            IdTarea: itemMantenimiento.IdTarea,
                            IdTipMan: itemMantenimiento.IdTipMan,
                            AreCodigo: _this.objInforme.Are_Codigo
                        })
                        .then(res => {
                            if (res.data.Estado) {
                                Notifications.Messages.success('Se eliminó registro exitosamente');
                                if (!pendientes) {
                                    _this.ListInformeTareas();
                                }
                                else {
                                    _this.ListTareasPendientes();
                                }
                            }
                            if (res.data.Estado === false) {
                                Notifications.Messages.warning("esta registro no se pudo eliminar");
                            }

                        }).catch(error => {
                            Notifications.Messages.error('Ocurrió una excepción en el metodo DeleteMantenimiento');
                        });
                    //fin delete    
                    //fin swal 1
                }


            })
            //fin swal2

        },

        SelectMantenimiento: async function (itemMantenimiento) {

            let _this = this;
            _this.objMecanico.IdTarea = itemMantenimiento.IdTarea;
            _this.objMantenimiento.IdTarea = itemMantenimiento.IdTarea;
            _this.objMecanico.IdTipMan = itemMantenimiento.IdTipMan;
            _this.objMantenimiento.Sistema = itemMantenimiento.Mantenimiento;
            _this.ListMecanicos(itemMantenimiento.IdTarea);
            _this.getBeneficiarios('');
        },

        NuevoMantenimiento: async function () {

            var _this = this;

            _this.ClearMantenimiento();
            _this.$refs.IdTarea.$refs.search.focus();
        },

        ClearMantenimiento: async function () {

            var _this = this;

            _this.objMantenimiento.IdInforme = '';
            _this.objMantenimiento.IdTarea = '';
            _this.objMantenimiento.IdTipMan = '';
            _this.objMantenimiento.Observacion = '';

        },

        //FIN MANTENIMIENTO

        //INICIO MECANICO

        ListMecanicos: async function (IdTarea) {

            let _this = this;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Informe/ListTareaMecanico'), {
                params: {
                    IdInforme: _this.objInforme.IdInforme,
                    IdTarea: IdTarea
                }
            })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Mecanicos = (res.data.Valor.ListTareaMecanico) ? res.data.Valor.ListTareaMecanico : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListMecanicos');
                });
        },

        saveMecanico: async function () {

            let _this = this;

            var fecha_vacia = "__/__/____ __:__";
            var fechaini = _this.objMecanico.FechaInicio;
            var fechafin = _this.objMecanico.FechaTermino;
            if (fechaini === "" || fechaini === fecha_vacia) {
                Notifications.Messages.warning("Debe ingresar fecha de inicio");
                //$("#Fechahora_ini").focus();
                return;
            }

            if (fechafin === "" || fechafin === fecha_vacia) {
                Notifications.Messages.warning("Debe ingresar fecha de termino");
                //$("#Fechahora_fin").focus();
                return;
            }

            if (_this.objMecanico.IdTareaMecanicos !== 0) {
                await _this.UpdateMecanico();
            } else {
                await _this.InsertMecanico();
            }

        },

        UpdateMecanico: async function () {

            let _this = this;

            let data = {
                TareaMecanico: _this.objMecanico
            };

            var json = JSON.stringify(data);

            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/UpdateTareaMecanico'), {
                json: json
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        _this.ListMecanicos(_this.objMecanico.IdTarea);
                        _this.ClearMecanico();
                    } else if (res.data.tipoNotificacion) {
                        ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                    } else if (res.data.tip) {
                        Notifications.Messages.warning(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo InsertMantenimiento');
                });

        },

        InsertMecanico: async function () {

            let _this = this;

            _this.objMecanico.IdInforme = _this.objInforme.IdInforme;

            let data = {
                TareaMecanico: _this.objMecanico
            };

            var json = JSON.stringify(data);

            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/InsertTareaMecanico'), {
                json: json
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        _this.ListMecanicos(_this.objMecanico.IdTarea);
                        _this.ClearMecanico();
                    } else if (res.data.Mensaje !== '') {
                        Notifications.Messages.warning(res.data.Mensaje);
                    } else if (res.data.tip) {
                        Notifications.Messages.warning(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo InsertMantenimiento');
                });
        },

        DeleteMecanico: async function (itemMecanico) {

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
                    axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/DeleteTareaMecanico'), { IdTareaMecanico: itemMecanico.IdTareaMecanicos })
                        .then(res => {
                            if (res.data.Estado) {
                                Notifications.Messages.success('Se eliminó registro exitosamente');
                                _this.ListMecanicos(_this.objMecanico.IdTarea);
                            }
                            if (res.data.Estado === false) {
                                Notifications.Messages.warning("esta registro no se pudo eliminar");
                            }

                        }).catch(error => {
                            Notifications.Messages.error('Ocurrió una excepción en el metodo DeleteMantenimiento');
                        });
                    //fin delete    
                    //fin swal 1
                }


            })
            //fin swal2

        },

        ClearMecanico: async function () {

            var _this = this;

            _this.objMecanico.IdTareaMecanicos = 0;
            _this.objMecanico.CodMecanico = '';
            _this.objMecanico.FechaInicio = '';
            _this.objMecanico.FechaTermino = '';
            _this.objMecanico.Observacion = '';
        },

        NuevoMecanico: async function () {

            var _this = this;

            _this.ClearMecanico();
            _this.$refs.CodMecanico.$refs.search.focus();
        },

        SelectMecanico: async function (itemMecanico) {

            let _this = this;

            _this.objMecanico.IdTareaMecanicos = itemMecanico.IdTareaMecanicos;
            _this.objMecanico.IdInforme = _this.objInforme.IdInforme;
            _this.objMecanico.IdTarea = _this.objMantenimiento.IdTarea;
            _this.objMecanico.IdTarea = _this.objMantenimiento.IdTarea;
            _this.objMecanico.CodMecanico = itemMecanico.CodMecanico;
            _this.objMecanico.FechaInicio = itemMecanico.FechaInicio;
            _this.objMecanico.FechaTermino = itemMecanico.FechaTermino;
            _this.objMecanico.Observacion = itemMecanico.Observacion;
        },

        //FIN MECANICO

        //INICIO AYUDANTES

        ShowAyudantes: async function (itemMecanico) {
            var _this = this;
            _this.objAyudante.IdTareaMecanicos = itemMecanico.IdTareaMecanicos;
            _this.getMecanicosAyudantes('');
            _this.ListAyudantes();
            $('#appAyudantes').modal('show');
        },

        ListAyudantes: async function () {

            let _this = this;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Informe/ListTareaMecanicosAyudante'), {
                params: {
                    IdTareaMecanico: _this.objAyudante.IdTareaMecanicos
                }
            })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Ayudantes = (res.data.Valor.ListTareaMecanicosAyudante) ? res.data.Valor.ListTareaMecanicosAyudante : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListAyudantes');
                });
        },

        saveAyudante: async function () {

            let _this = this;

            await _this.InsertAyudante();
        },

        InsertAyudante: async function () {

            let _this = this;

            _this.objAyudante.Observacion = _this.$refs.CodMecanicoAyudante.$refs.selectedOptions.innerText;

            let data = {
                TareaMecanicosAyudante: _this.objAyudante
            };

            var json = JSON.stringify(data);

            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/InsertTareaMecanicosAyudante'), {
                json: json
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        _this.ListAyudantes(_this.objAyudante.IdTareaMecanico);
                    } else if (res.data.tipoNotificacion) {
                        ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                    } else if (res.data.tip) {
                        Notifications.Messages.warning(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo InsertMantenimiento');
                });
        },

        DeleteAyudante: async function (itemAyudante) {

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
                    axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/DeleteTareaMecanicosAyudante'), { IdAyudante: itemAyudante.IdAyudante })
                        .then(res => {
                            if (res.data.Estado) {
                                Notifications.Messages.success('Se eliminó registro exitosamente');
                                _this.ListAyudantes(_this.objAyudante.IdTareaMecanico);
                            }
                            if (res.data.Estado === false) {
                                Notifications.Messages.warning("esta registro no se pudo eliminar");
                            }

                        }).catch(error => {
                            Notifications.Messages.error('Ocurrió una excepción en el metodo DeleteMantenimiento');
                        });
                    //fin delete    
                    //fin swal 1
                }
            })
            //fin swal2

        },

        //FIN AYUDANTES

        //INICIO REQUISICION

        ShowRequisicion: async function (itemMecanico) {
            var _this = this;
            _this.objODM.IdTareaMecanicos = itemMecanico.IdTareaMecanicos;
            _this.objMecanico.CodMecanico = itemMecanico.CodMecanico;
            await _this.getAlmacenes();
            await _this.ListBolsas();
            await _this.ClearBolsa();
            _this.objBolsa.CodiAlmacen = _this.list.Almacenes[0].Codigo;
            $('#appRequisicion').modal('show');
        },

        ListBolsas: async function () {

            let _this = this;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Informe/ListBolsas'), {
                params: {
                    IdInforme: _this.objInforme.IdInforme,
                    Cod_Ben: _this.objMecanico.CodMecanico
                }
            })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Bolsas = (res.data.Valor.ListBolsas) ? res.data.Valor.ListBolsas : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListBolsas');
                });
        },

        InsertBolsa: async function () {

            let _this = this;

            _this.objODM.Are_Codigo = _this.objInforme.Are_Codigo;
            _this.objODM.ODM_FechMovimiento = _this.objBolsa.FechaInicio;
            _this.objODM.ODM_FechContable = _this.objBolsa.FechaInicio;
            _this.objODM.ODM_FechVencimiento = _this.objBolsa.FechaInicio;
            _this.objODM.Ben_Codigo_Solicitante = _this.objMecanico.CodMecanico;
            _this.objODM.ODM_Informe = _this.objInforme.IdInforme;

            _this.objBolsa.IdInforme = _this.objInforme.IdInforme;
            _this.objBolsa.Descripcion = _this.$refs.Codigo.$refs.selectedOptions.innerText;
            _this.objBolsa.IdTarea = _this.objMecanico.IdTarea;
            _this.objBolsa.IdTipMan = _this.objMecanico.IdTipMan;
            _this.objBolsa.IdArticuloTarea = 0;

            let data = {
                Bolsa: _this.objBolsa,
                ODM: _this.objODM
            };

            var json = JSON.stringify(data);

            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/InsertBolsa'), {
                json: json
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        _this.ListBolsas();
                        _this.ClearBolsa();
                        _this.$refs.CodiAlmacen.$refs.search.focus();
                    } else if (res.data.tipoNotificacion) {
                        ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                    } else if (res.data.tip) {
                        Notifications.Messages.warning(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo InsertBolsa');
                });
        },

        AgregarBolsas: async function () {

            let _this = this;

            _this.objODM.Are_Codigo = _this.objInforme.Are_Codigo;
            _this.objODM.ODM_FechMovimiento = _FechaActual;
            _this.objODM.ODM_FechContable = _FechaActual;
            _this.objODM.ODM_FechVencimiento = _FechaActual;
            _this.objODM.Ben_Codigo_Solicitante = _this.objMecanico.CodMecanico;
            _this.objODM.ODM_Informe = _this.objInforme.IdInforme;

            _this.objBolsa.IdInforme = _this.objInforme.IdInforme;
            _this.objBolsa.IdTarea = _this.objMecanico.IdTarea;
            _this.objBolsa.IdTipMan = _this.objMecanico.IdTipMan;
            _this.objBolsa.FechaInicio = _FechaActual;
            _this.objBolsa.Cantidad = 0;

            let data = {
                Bolsa: _this.objBolsa,
                ODM: _this.objODM
            };

            var json = JSON.stringify(data);

            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/AgregarBolsas'), {
                json: json
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        _this.ListBolsas();
                    } else if (res.data.tipoNotificacion) {
                        ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                    } else if (res.data.tip) {
                        Notifications.Messages.warning(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo AgregarBolsas');
                });
        },

        DeleteBolsa: async function (itemBolsa) {

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

                    let data = {
                        ODMd: itemBolsa
                    };

                    var json = JSON.stringify(data);

                    axios.post(getBaseUrl.obtenerUrlAbsoluta('Informe/DeleteBolsa'),
                        {
                            json: json
                        })
                        .then(res => {
                            if (res.data.Estado) {
                                Notifications.Messages.success('Se eliminó registro exitosamente');
                                _this.ListBolsas();
                            }
                            if (res.data.Estado === false) {
                                Notifications.Messages.warning("esta registro no se pudo eliminar");
                            }

                        }).catch(error => {
                            Notifications.Messages.error('Ocurrió una excepción en el metodo DeleteBolsa');
                        });
                    //fin delete    
                    //fin swal 1
                }
            })
            //fin swal2

        },

        ClearBolsa: async function () {

            var _this = this;

            _this.objBolsa.IdArticuloTarea = 0;
            _this.objBolsa.FechaInicio = '';
            _this.objBolsa.Codigo = '';
            _this.objBolsa.Original = '';
            _this.objBolsa.Descripcion = '';
            _this.objBolsa.Cantidad = '';
            _this.objBolsa.Solicitado = 0;
            _this.objBolsa.Consumo = 0;
            _this.objBolsa.Pendiente = 0;
            _this.objBolsa.Tipo = '';
        },

        //FIN REQUISICION

        close: function (code) {
            if (code === 1) {
                $('#appBuscadorInforme').modal('hide');
                this.$nextTick(() => {

                });
            } else if (code === 2) {
                $('#appAyudantes').modal('hide');
                this.$nextTick(() => {

                });
            } else if (code === 3) {
                $('#appRequisicion').modal('hide');
                this.$nextTick(() => {

                });
            } else if (code === 4) {
                $('#appInformeTareasPendientes').modal('hide');
                this.$nextTick(() => {

                });
            }
        }

    },

    computed: {
        FullMantenimiento: function () {
            return (
                this.objInforme.IdInforme &&
                this.objMantenimiento.IdTarea &&
                this.objMantenimiento.Observacion &&
                this.objMantenimiento.FechaInicio
            ) ? true : false;
        },
        FullInforme: function () {
            return (
                this.objInforme.IdInforme
            ) ? true : false;
        },
        FullMecanico: function () {
            return (
                this.objInforme.IdInforme &&
                this.objMecanico.IdTarea &&
                this.objMecanico.Observacion &&
                this.objMecanico.FechaInicio
            ) ? true : false;
        },
        FullNuevoMecanico: function () {
            return (
                this.objInforme.IdInforme &&
                this.objMecanico.IdTarea
            ) ? true : false;
        },
        FullBolsa: function () {
            return (
                this.objBolsa.Codigo &&
                this.objBolsa.CodiAlmacen &&
                this.objBolsa.Cantidad &&
                this.objBolsa.FechaInicio
            ) ? true : false;
        },
        FullAgregarBolsas: function () {
            return (
                this.objBolsa.CodiAlmacen
            ) ? true : false;
        },
    },

    watch: {
        "objBolsa.CodiAlmacen": function (newval, oldval) {
            if (newval) {
                this.getArticulos('');
            }
        }
    }
});


