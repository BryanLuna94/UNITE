


let app = new Vue({
    el: "#app",
    data: {
        objFallasD: {
            IdSolicitudRevisionD: '',
            IdSolicitudRevision: '',
            Observacion: '',
            UsuarioRegistro: '',
            Fecharegistro: '',
            HoraRegistro: '',
            Estado: '',
            IdSistema: '',
            IdObservacion: ''

        },
        objFiltro: {
            correlativo: '',
            Fecha: '',
            Hora: '',
            Chofer: '',
            Placa: '',
            Destino: '',
            Usuario: ''

        },
        objSolicitud: {
            IdSolicitudRevision: '',
            NumeroInforme: '',
            Odometro: 0,
            OdometroAnterior: 0,
            Chofer: '',
            CorrelativoInterno: '',
            Destino: '',
            Estado: '',
            FechaDoc: '',
            FechaViaje: '',
            HoraDoc: '',
            HoraViaje: '',
            Origen: '',
            Unidad: '',
            Ruta: '',
            IdUnidad: ''
        },
        objTipoM: {
            Codigo: '',
            Descripcion: ''
        },
        list: {
            FallasD: [],
            TipoM: [],
            Id: [],
            Viajes: [],
            Solicitudes: [],
            SolicitudesFiltradas: []
        }
    },
    created: async function () {
        await this.getTipoM("");
        await this.ValidarUsuarioChofer();
    },
    mounted: async function () {
        this.$nextTick(() => {
            this.SetFocus();
        });
    },
    methods: {
        getTipoM: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListTipoMAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.TipoM = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getTipoM');
                });
        },

        SelectSolicitud: async function (itemSolicitud) {

            let _this = this;
            await _this.ObtenerSolicitud(itemSolicitud.correlativo);
            await _this.SelectFallasD();
            _this.close(1);

        },

        ValidarUsuarioChofer: async function () {

            let _this = this;

            let ben_codigo = document.getElementById('Ben_Codigo').value;

            if (ben_codigo.substring(0, 1) !== "C") return;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Fallas/ObtenerUltimaRevisionChofer'))
                .then(res => {
                    if (res.data.Estado) {
                        if (res.data.Valor.IdSolicitud !== "") {
                            _this.objSolicitud.IdSolicitudRevision = res.data.Valor.IdSolicitud;
                            _this.ObtenerSolicitud(_this.objSolicitud.IdSolicitudRevision);
                            _this.SelectFallasD();
                        }

                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ObtenerSolicitud');
                });

        },

        Guardar: async function () {

            let _this = this;

            let data = {
                SolicitudRevision: _this.objSolicitud
            };

            var json = JSON.stringify(data);

            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('Fallas/UpdateSolicitudRevision'), {
                json: json
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                    } else if (res.data.tipoNotificacion) {
                        ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                    } else if (res.data.tip) {
                        Notifications.Messages.warning(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo InsertMantenimiento');
                });

        },

        ObtenerSolicitud: async function (IdSolicitudRevision) {

            let _this = this;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Fallas/SelectSolicitudRevision'), { params: { IdSolicitudRevision: IdSolicitudRevision } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.objSolicitud.NumeroInforme = res.data.Valor.SolicitudRevision.NumeroInforme;
                        _this.objSolicitud.Odometro = res.data.Valor.SolicitudRevision.Odometro;
                        _this.objSolicitud.OdometroAnterior = res.data.Valor.SolicitudRevision.Odometro;
                        _this.objSolicitud.Chofer = res.data.Valor.SolicitudRevision.Chofer;
                        _this.objSolicitud.CorrelativoInterno = res.data.Valor.SolicitudRevision.CorrelativoInterno;
                        _this.objSolicitud.Destino = res.data.Valor.SolicitudRevision.Destino;
                        _this.objSolicitud.Estado = res.data.Valor.SolicitudRevision.Estado;
                        _this.objSolicitud.FechaDoc = res.data.Valor.SolicitudRevision.FechaDoc;
                        _this.objSolicitud.FechaViaje = res.data.Valor.SolicitudRevision.FechaViaje;
                        _this.objSolicitud.HoraDoc = res.data.Valor.SolicitudRevision.HoraDoc;
                        _this.objSolicitud.HoraViaje = res.data.Valor.SolicitudRevision.HoraViaje;
                        _this.objSolicitud.Origen = res.data.Valor.SolicitudRevision.Origen;
                        _this.objSolicitud.Unidad = res.data.Valor.SolicitudRevision.Unidad;
                        _this.objSolicitud.IdUnidad = res.data.Valor.SolicitudRevision.IdUnidad;
                        _this.objSolicitud.Ruta = _this.objSolicitud.Origen + ' - ' + _this.objSolicitud.Destino;
                        _this.objSolicitud.IdSolicitudRevision = res.data.Valor.SolicitudRevision.IdSolicitudRevision;

                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ObtenerSolicitud');
                });
        },

        ShowBuscador: async function () {

            let _this = this;
            _this.ListSolicitudes();
            $('#appBuscadorSolicitudes').modal('show');

        },
        ListSolicitudes: async function () {

            let _this = this;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Fallas/ListBusqueda')
            )
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Solicitudes = (res.data.Valor.ListBusqueda) ? res.data.Valor.ListBusqueda : [];
                        _this.list.SolicitudesFiltradas = _this.list.Solicitudes;
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListSolicitudes');
                });
        },

        SelectFallasD: async function () {

            let _this = this;
            Id = _this.objSolicitud.IdSolicitudRevision;// document.getElementById("IdSolicitudRevision").innerHTML;

            axios.post(getBaseUrl.obtenerUrlAbsoluta("Fallas/SelectFallasD"), { ID: Id })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.FallasD = (res.data.Valor.List) ? res.data.Valor.List : [];
                    } else if (res.data.tipoNotificacion) {
                        ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                    }
                })



            //DESACTIVA Div SubSistemas y su contenido
            //var nodes = document.getElementById("busqueda").getElementsByTagName('*');
            //for (var i = 0; i < nodes.length; i++) {
            //    nodes[i].disabled = false;
            //}
            //fin DESACTIVA Div SubSistemas y su contenido
        },
        DeleteFallasD: async function (e) {
            //vars
            e = e || window.event;
            var data = [];
            var target = e.srcElement || e.target;
            while (target && target.nodeName !== "TR") {
                target = target.parentNode;
            }
            if (target) {
                var cells = target.getElementsByTagName("td");
                for (var i = 0; i < cells.length; i++) {
                    data.push(cells[i].innerHTML);
                }
            }
            //axios
            var Id = data[0]
            //delete
            //swal
            Swal.fire({
                title: '¿Estas Seguro?',
                text: "Deseas eliminar esta Observación",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sì, Eliminar esta Observación'
            }).then((result) => {
                if (result.value) {
                    //swal-end
                    axios.post(getBaseUrl.obtenerUrlAbsoluta("Fallas/DeleteFallasD"), { ID: Id })
                        .then(res => {
                            if (res.data.Estado) {

                                Notifications.Messages.success("Registro Eliminado");
                                setTimeout(() => { this.$refs.frmFallasD.submit(); }, 500);

                                console.log(res.data.Estado);
                                window.setTimeout(function () { location.reload() }, 500)

                            } else if (res.data.tipoNotificacion) {

                                ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                            }
                            if (res.data.Estado == false) {
                                Notifications.Messages.warning("esta Observación tiene un mecánico asignado");
                            }

                        })
                    //fin delete    
                    //fin swal 1
                }


            })
            //fin swal2


        },

        Anular: async function () {

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
                    axios.post(getBaseUrl.obtenerUrlAbsoluta('Fallas/AnularSolicitudRevision'),
                        {
                            idSolicitudRevision: _this.objSolicitud.IdSolicitudRevision
                        })
                        .then(res => {
                            if (res.data.Estado) {
                                Notifications.Messages.success('Se eliminó registro exitosamente');
                                _this.objSolicitud.Estado = "ANULADO";
                            }
                            if (res.data.Estado === false) {
                                Notifications.Messages.warning("esta registro no se pudo eliminar");
                            }

                        }).catch(error => {
                            Notifications.Messages.error('Ocurrió una excepción en el metodo Anular');
                        });
                    //fin delete    
                    //fin swal 1
                }

            })
            //fin swal2

        },

        Agregar: async function () {
            //codigo y SubSistemas
            //codigo y sistema
            //asigna id maximo desde la bd
            let _this = this;
            var IdSolD = ""
            var IdSolC = _this.objSolicitud.IdSolicitudRevision;// document.getElementById('IdSolicitudRevision').innerHTML;
            var tm = this.$refs.txtCodTipoM.value;
            var ta = this.$refs.txtCodTarea.value;
            var obs = document.getElementById('txtObservacion').value;
            var coduser = document.getElementById("lblcodusuario").innerHTML;
            var fecha = new Date();
            var fechar = ""
            var horar = ""
            fechar = (fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
            horar = "12:00PM";
            console.log(fechar);
            console.log(tm);
            console.log(ta);
            console.log(obs);
            console.log(coduser);
            console.log(horar);

            if (obs.length == 0) {
                console.log(obs.length);
                Notifications.Messages.warning("Ingrese una Observación");
                return
            }

            //swal
            Swal.fire({
                title: '¿Estas Seguro?',
                text: "Deseas grabar este Subsistema",
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sì, Grabar SubSistema'
            }).then((result) => {
                if (result.value) {

                    //swal-end
                    var estado = document.getElementById('lblEstadoC').value;
                    if (estado === "1") {

                        let _this = this;

                        axios.post(getBaseUrl.obtenerUrlAbsoluta("Fallas/IdFallasD"))
                            .then(res => {
                                if (res.data.Estado) {

                                    _this.list.Id = (res.data.Valor.List) ? res.data.Valor.List : [];
                                    //asigna id maximo desde la bd
                                    _this.list.Id = (res.data.Valor.List) ? res.data.Valor.List : [];
                                    //asigna id maximo desde la bd
                                    IdSolD = _this.list.Id[0].IdSolicitudRevisionD;
                                    console.log(IdSolD);

                                    //nuevo elemento
                                    //nuevo
                                    axios.post(getBaseUrl.obtenerUrlAbsoluta("Fallas/InsertFallasD"), {
                                        IdSolicitudRevisionD: IdSolD, IdSolicitudRevision: IdSolC, Observacion: obs, UsuarioRegistro: coduser, FechaRegistro: fechar,
                                        HoraRegistro: horar, Estado: 0, IdSistema: tm, IdObservacion: ta
                                    })

                                        .then(res => {
                                            if (res.data.Estado) {
                                                Notifications.Messages.success("Registro Guardado");
                                                _this.SelectFallasD();
                                                //setTimeout(() => { this.$refs.frmFallas.submit(); }, 500);
                                                //window.setTimeout(function () { location.reload() }, 500);

                                            } else if (res.data.tipoNotificacion) {
                                                ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                                            }
                                        })

                                }
                            }).catch(error => {
                                Notifications.Messages.error('Ocurrió una excepción en el metodo IdSubSistemas');
                            });
                        //fin get id


                    }

                    else {
                        console.log(horar);
                    }


                }
                //swal cierre

                //fin swal 1
            }

            )
        },

        close: function (code) {
            if (code === 1) {
                $('#appBuscadorSolicitudes').modal('hide');
                this.$nextTick(() => {

                });
            }
        }
        //fin swal2
    },


    computed: {
        FullFields: function () {
            return this.validateForm();
        },
        SolicitudesFiltradas2() {
            return this.list.Solicitudes.filter(item => {
                return (
                    item.Chofer.toLowerCase().indexOf(this.objFiltro.Chofer.toLowerCase()) > -1 &&
                    item.Placa.toLowerCase().indexOf(this.objFiltro.Placa.toLowerCase()) > -1 &&
                    item.correlativo.toLowerCase().indexOf(this.objFiltro.correlativo.toLowerCase()) > -1 &&
                    item.Fecha.toLowerCase().indexOf(this.objFiltro.Fecha.toLowerCase()) > -1 &&
                    item.Hora.toLowerCase().indexOf(this.objFiltro.Hora.toLowerCase()) > -1 &&
                    item.Destino.toLowerCase().indexOf(this.objFiltro.Destino.toLowerCase()) > -1 &&
                    item.Usuario.toLowerCase().indexOf(this.objFiltro.Usuario.toLowerCase()) > -1
                )
            })
        },
        FullCabecera: function () {
            return (
                this.objSolicitud.NumeroInforme &&
                this.objSolicitud.Odometro
            ) ? true : false;
        },
        FullRegistro: function () {
            return (
                this.objSolicitud.IdSolicitudRevision
            ) ? true : false;
        },
    },

    watch: {
        "objFallasD.IdSolicitudRevisionD": function (newval, oldval) {
            if (newval) {
                this.SetFocus();
            }
        }
    }
});


