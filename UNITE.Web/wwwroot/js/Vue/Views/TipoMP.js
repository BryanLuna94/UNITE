let app = new Vue({
    el: "#app",
    data: {

        objTipoMP: {
            IdTipMan: 0,
            Marca: '',
            Modelo: '',
            Descripcion: '',
            Kilometros: 0,
            KilometrosAviso: 0,
            Dias: 0,
            DiasAviso: 0,
            Horas: 0,
            HorasAviso: 0,
            cod_marca: '',
            cod_modelo: 0
        },
        objTarea: {
            IdTarea: '',
            IdTipoMan: '',
            Descripcion: '',
            Sistema: 0,
            SubSistema: '',
            Flg_Revision: false
        },
        objRepuesto: {
            IdArtTar: 0,
            IdTarea: '',
            Descripcion: '',
            CodRepuesto: '',
            Cantidad: 0,
            Orden: 0
        },
        list: {
            MarcaModelo: [],
            TipoMP: [],
            Sistemas: [],
            Repuestos: [],
            Productos: [],
            SubSistemas: [],
            ClaseMP: [],
            TareaMP: [],
            Id: []
        },
        createKilometraje: true,
        createTarea: true,
        createRepuesto: true,
        showContextMenu: false,
        itemSelected1: null,
        itemSelected2: null,
        top: '0px',
        left: '0px'
    },


    created: async function () {

    },

    mounted: async function () {
        await this.CrearTabla();
        this.$nextTick(() => {
            this.FormatearTabla();
            $('#appKilometraje').on('shown.bs.modal', function () {
                //this.methods.ClearKilometraje();
            });
            $('#appTareas').on('shown.bs.modal', function () {

            });
        });
    },

    methods: {

        ListTipoMP: async function () {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('TipoMP/ListTipoMP'))
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.TipoMP = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListTipoMP');
                });
        },

        ListClaseMP: async function () {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('ClaseMP/ListClaseMP'))
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.ClaseMP = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListClaseMP');
                });
        },

        ListarMarcaModelo: async function () {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('MarcaModelo/ListMarcaModelo'))
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.MarcaModelo = (res.data.Valor.List) ? res.data.Valor.List : [];

                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListMarcaModelo');
                });
        },

        ListSistemas: async function (value) {

            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListSistemasAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Sistemas = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListSistemas');
                });
        },

        ListSubSistemas: async function (value) {

            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListSubSistemasAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.SubSistemas = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListSubSistemas');
                });
        },

        ListProductos: async function (value) {

            let _this = this;

            let idEmpresa = $("#hdncodempresa").val();

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Producto/ListProducto'), {
                params:
                {
                    Index_Compañia: idEmpresa,
                    filtro: value
                }
            })
                .then(res => {

                    if (res.data.Estado) {
                        _this.list.Productos = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListProductos');
                });
        },

        CrearTabla: async function () {
            await this.ListClaseMP();
            await this.ListTipoMP();
            await this.ListarMarcaModelo();
        },

        FormatearTabla: async function () {
            $("#tableTipoMP").bootstrapTable('destroy').bootstrapTable();
        },

        Cancelar: function () {
            window.setTimeout(function () { location.reload() }, 50)
        },

        openMenu: function (e, _item1, _item2) {

            this.showContextMenu = true;
            this.itemSelected1 = _item1;
            this.itemSelected2 = _item2;

            // Animación 'ScrollTop'
            //animateScrollTop(1000);

            //Lo usamos para 'fillDataAsientoVendido'
            //if (this.itemSelected.IdVenta && this.itemSelected.Tipo !== this.list.ventas[this.indexVenta].NroAsiento)
            //    this.bloquearAsiento(_item, true);

            var varScrollTop = $(window).scrollTop();

            Vue.nextTick(function () {
                this.$refs.right.focus();
                this.setMenu(e.y, e.x, varScrollTop);
            }.bind(this));

            e.preventDefault();
        },

        setMenu: function (top, left, varScrollTop) {
            if (varScrollTop)
                this.top = (top + varScrollTop - 120) + 'px';
            else
                this.top = (top + varScrollTop - 120) + 'px';

            this.left = (left - 80) + 'px';
        },

        closeMenu: function () {
            this.showContextMenu = false;
            this._itemSelected1 = null;
            this._itemSelected2 = null;
        },

        contextAgregarKilometraje: async function (_itemSelected1, _itemSelected2) {

            let _this = this;
            if (_itemSelected1 && _itemSelected2) {
                this.ShowKilometraje(_itemSelected1, _itemSelected2);
            }
            this.closeMenu();
        },

        contextAgregarTareas: async function (_itemSelected1, _itemSelected2) {

            let _this = this;
            if (_itemSelected1 && _itemSelected2) {
                this.ShowTareas(_itemSelected1, _itemSelected2);
            }
            this.closeMenu();
        },

        /** INICIO KILOMETRAJE
         * /
         * @param {any} itemMarcaModelo
         */

        ShowKilometraje: async function (itemMarcaModelo, itemClaseMP) {
            this.ClearKilometraje();
            this.ObtenerKilometraje(itemMarcaModelo, itemClaseMP);
            $('#appKilometraje').modal('show');
        },

        ClearKilometraje: async function () {
            this.objTipoMP.IdTipMan = '';
            this.objTipoMP.Descripcion = '';
            this.objTipoMP.Marca = '';
            this.objTipoMP.Modelo = '';
            this.objTipoMP.Kilometros = '';
            this.objTipoMP.KilometrosAviso = '';
            this.objTipoMP.Dias = '';
            this.objTipoMP.DiasAviso = '';
            this.objTipoMP.Horas = '';
            this.objTipoMP.HorasAviso = '';
        },

        ObtenerKilometraje: async function (itemMarcaModelo, itemClaseMP) {

            let _this = this;

            let objTipoMP = _this.list.TipoMP.filter(function (elem) {
                if (elem.Cod_Marca === itemMarcaModelo.cod_marca
                    && elem.Cod_Modelo == itemMarcaModelo.cod_modelo
                    && elem.Descripcion == itemClaseMP.IdClaseMantenimiento) return elem;
            });

            let idTipoMP = 0;
            _this.createKilometraje = true;

            if (objTipoMP.length > 0) {
                idTipoMP = objTipoMP[0].IdTipMan;
                _this.createKilometraje = false;
            }

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('TipoMP/SelectTipoMP'), { params: { IdTipMan: idTipoMP } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.objTipoMP.IdTipMan = idTipoMP;
                        _this.objTipoMP.Descripcion = itemClaseMP.IdClaseMantenimiento;
                        _this.objTipoMP.Marca = itemMarcaModelo.marca;
                        _this.objTipoMP.Modelo = itemMarcaModelo.modelo;
                        _this.objTipoMP.cod_marca = itemMarcaModelo.cod_marca;
                        _this.objTipoMP.cod_modelo = itemMarcaModelo.cod_modelo;
                        _this.objTipoMP.Kilometros = (!_this.createKilometraje) ? res.data.Valor.List[0].Kilometros : '';
                        _this.objTipoMP.KilometrosAviso = (!_this.createKilometraje) ? res.data.Valor.List[0].KilometrosAviso : '';
                        _this.objTipoMP.Dias = (!_this.createKilometraje) ? res.data.Valor.List[0].Dias : '';
                        _this.objTipoMP.DiasAviso = (!_this.createKilometraje) ? res.data.Valor.List[0].DiasAviso : '';
                        _this.objTipoMP.Horas = (!_this.createKilometraje) ? res.data.Valor.List[0].Horas : '';
                        _this.objTipoMP.HorasAviso = (!_this.createKilometraje) ? res.data.Valor.List[0].HorasAviso : '';
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListTipoMP');
                });
        },

        saveKilometraje: async function () {
            if (this.createKilometraje) {
                await this.InsertKilometraje();
            } else {
                await this.UpdateKilometraje();
            }
        },

        UpdateKilometraje: async function () {

            let _this = this;
            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('TipoMP/UpdateTipoMP'), {
                IdTipMan: _this.objTipoMP.IdTipMan,
                Descripcion: _this.objTipoMP.Descripcion,
                Kilometros: _this.objTipoMP.Kilometros,
                KilometrosAviso: _this.objTipoMP.KilometrosAviso,
                Dias: _this.objTipoMP.Dias,
                DiasAviso: _this.objTipoMP.DiasAviso,
                Horas: _this.objTipoMP.Horas,
                HorasAviso: _this.objTipoMP.HorasAviso
            })
                .then(res => {
                    if (res.data.Estado) {
                        this.close(1);
                        Notifications.Messages.success('Se grabó información exitosamente');
                        this.CrearTabla();
                    } else if (res.data.Estado === false) {
                        //this.processing = false;
                        Notifications.Messages.error(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo UpdateKilometraje');
                });
        },

        InsertKilometraje: async function () {

            let _this = this;
            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('TipoMP/InsertTipoMP'), {
                IdTipMan: _this.objTipoMP.IdTipMan,
                Descripcion: _this.objTipoMP.Descripcion,
                Kilometros: _this.objTipoMP.Kilometros,
                KilometrosAviso: _this.objTipoMP.KilometrosAviso,
                Dias: _this.objTipoMP.Dias,
                DiasAviso: _this.objTipoMP.DiasAviso,
                Horas: _this.objTipoMP.Horas,
                HorasAviso: _this.objTipoMP.HorasAviso,
                cod_marca: _this.objTipoMP.cod_marca,
                cod_modelo: _this.objTipoMP.cod_modelo
            })
                .then(res => {
                    if (res.data.Estado) {
                        this.close(1);
                        Notifications.Messages.success('Se grabó información exitosamente');
                        this.CrearTabla();
                    } else if (res.data.Estado === false) {
                        //this.processing = false;
                        Notifications.Messages.error(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo InsertKilometraje');
                });
        },

        /** INICIO TAREAS
         * /
         * @param {any} itemTarea
         */


        ShowTareas: async function (itemMarcaModelo, itemClaseMP) {

            let _this = this;
            let objTipoMP = _this.list.TipoMP.filter(function (elem) {
                if (elem.Cod_Marca === itemMarcaModelo.cod_marca
                    && elem.Cod_Modelo == itemMarcaModelo.cod_modelo
                    && elem.Descripcion == itemClaseMP.IdClaseMantenimiento) return elem;
            });

            if (objTipoMP.length > 0) {
                let idTipoMP = objTipoMP[0].IdTipMan;
                await this.ListTareas(idTipoMP);
                await this.ListSistemas('');
                await this.ListSubSistemas('');
                $('#appTareas').modal('show');
                await this.newTarea();
            } else {
                Notifications.Messages.info('Para agregar tareas primero debe agregar kilometraje');
            }

        },

        ClearTareas: async function () {
            this.objTarea.IdTarea = '';
            this.objTarea.Descripcion = '';
            this.objTarea.IdTipoMan = '';
            this.objTarea.Sistema = '';
            this.objTarea.SubSistema = '';
        },

        ListTareas: async function (IdTipoMP) {

            let _this = this;

            _this.createTarea = true;
            _this.objTarea.IdTipMan = IdTipoMP;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('TareaMP/ListTareaMP'), { params: { IdTipMan: IdTipoMP } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.TareaMP = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListTareas');
                });
        },

        ObtenerTarea: async function (itemTarea) {

            let _this = this;
            let idTarea = itemTarea.IdTarea;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('TareaMP/SelectTareaMP'), { params: { IdTarea: idTarea } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.objTarea.IdTipMan = res.data.Valor.List[0].IdTipMan;
                        _this.objTarea.IdTarea = idTarea;
                        _this.objTarea.Flg_Revision = res.data.Valor.List[0].Flg_Revision;
                        _this.objTarea.Sistema = res.data.Valor.List[0].ID_tb_Sistema_Mant;
                        _this.objTarea.SubSistema = res.data.Valor.List[0].ID_tb_SubSistema_Mant;
                        _this.objTarea.Descripcion = res.data.Valor.List[0].Descripcion;
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListTipoMP');
                });
        },

        EliminarTarea: async function (itemTarea) {
            let _this = this;
            //this.processing = true;

            Swal.fire({
                title: '¿Estas Seguro?',
                text: "Deseas eliminar esta Tarea",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sì, Eliminar Tarea'
            }).then((result) => {
                if (result.value) {
                    //swal-end
                    axios.post(getBaseUrl.obtenerUrlAbsoluta('TareaMP/DeleteTareaMP'), { IdTarea: itemTarea.IdTarea })
                        .then(res => {
                            if (res.data.Estado) {

                                Notifications.Messages.success('Se eliminó tarea exitosamente');
                                _this.ListTareas(itemTarea.IdTipMan);
                                _this.newTarea();

                            }
                            if (res.data.Estado === false) {
                                Notifications.Messages.warning("esta tarea tiene repuestos asignados");
                            }

                        }).catch(error => {
                            Notifications.Messages.error('Ocurrió una excepción en el metodo EliminarTarea');
                        });
                    //fin delete    
                    //fin swal 1
                }


            })
            //fin swal2
        },

        newTarea: async function () {
            this.createTarea = true;
            this.ClearTareas();
            this.$refs.Descripcion.focus();
        },

        selectTarea: async function (itemTarea) {
            this.createTarea = false;
            this.ObtenerTarea(itemTarea);
            this.$refs.Descripcion.focus();
        },

        saveTarea: async function () {
            if (this.createTarea) {
                await this.InsertTarea();
            } else {
                await this.UpdateTarea();
            }
        },

        UpdateTarea: async function () {

            let _this = this;
            //this.processing = true;
            await axios.post(getBaseUrl.obtenerUrlAbsoluta('TareaMP/UpdateTareaMP'), {
                IdTarea: _this.objTarea.IdTarea,
                IdTipMan: _this.objTarea.IdTipMan,
                Descripcion: _this.objTarea.Descripcion,
                Flg_Revision: _this.objTarea.Flg_Revision,
                ID_tb_Sistema_Mant: _this.objTarea.Sistema,
                ID_tb_SubSistema_Mant: _this.objTarea.SubSistema
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        _this.ListTareas(_this.objTarea.IdTipMan);
                        _this.newTarea();
                    } else if (res.data.Estado === false) {
                        //this.processing = false;
                        Notifications.Messages.error(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo UpdateKilometraje');
                });
        },

        InsertTarea: async function () {

            let _this = this;
            //this.processing = true;

            await axios.post(getBaseUrl.obtenerUrlAbsoluta('TareaMP/InsertTareaMP'), {
                IdTipMan: _this.objTarea.IdTipMan,
                Descripcion: _this.objTarea.Descripcion,
                Flg_Revision: _this.objTarea.Flg_Revision,
                ID_tb_Sistema_Mant: _this.objTarea.Sistema,
                ID_tb_SubSistema_Mant: _this.objTarea.SubSistema
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        _this.ListTareas(_this.objTarea.IdTipMan);
                        _this.newTarea();
                    } else if (res.data.Estado === false) {
                        //this.processing = false;
                        Notifications.Messages.error(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo InsertTarea');
                });
        },

        /** INICIO REPUESTOS
         * /
         * @param {any} itemRepuesto
         */

        ShowRepuestos: async function (itemTarea) {
            await this.ListRepuestos(itemTarea);
            await this.ListProductos('');
            $('#appRepuestos').modal('show');
            await this.newRepuesto();
        },

        newRepuesto: async function () {
            this.createRepuesto = true;
            this.ClearRepuestos();
            //this.$refs.Repuestos.$refs.search.focus();
        },

        ListRepuestos: async function (itemTarea, optIdTarea) {

            let _this = this;

            let idTarea = 0;

            if (optIdTarea === undefined) {
                idTarea = itemTarea.IdTarea;
                _this.objRepuesto.Descripcion = itemTarea.Descripcion;
                _this.objRepuesto.IdTarea = idTarea;
            } else {
                idTarea = optIdTarea;
            }

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('ArticuloT/ListArticuloT'), { params: { IdTarea: idTarea } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Repuestos = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListRepuestos');
                });
        },

        ClearRepuestos: async function () {
            this.objRepuesto.IdArtTar = 0;
            this.objRepuesto.CodRepuesto = '';
            this.objRepuesto.Cantidad = 0;
            this.objRepuesto.Orden = 0;
        },

        ObtenerRepuesto: async function (itemRepuesto) {

            let _this = this;
            let IdArtTar = itemRepuesto.IdArtTar;

            await axios.get(getBaseUrl.obtenerUrlAbsoluta('ArticuloT/SelectArticuloT'), { params: { IdArtTar: IdArtTar } })
                .then(async (res) => {
                    if (res.data.Estado) {
                        await _this.ListProductos(itemRepuesto.Descripcion);
                        _this.objRepuesto.IdArtTar = IdArtTar;
                        _this.objRepuesto.IdTarea = res.data.Valor.List[0].IdTarea;
                        _this.objRepuesto.CodRepuesto = res.data.Valor.List[0].Cod_Mer;
                        _this.objRepuesto.Cantidad = res.data.Valor.List[0].Cantidad;
                        _this.objRepuesto.Orden = res.data.Valor.List[0].Orden;
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ObtenerRepuesto');
                });
        },

        selectRepuesto: async function (itemRepuesto) {
            this.createRepuesto = false;
            this.ObtenerRepuesto(itemRepuesto);
            //this.$refs.Repuestos.$refs.search.focus();
        },

        saveRepuesto: async function () {
            if (this.createRepuesto) {
                await this.InsertRepuesto();
            } else {
                await this.UpdateRepuesto();
            }
        },

        UpdateRepuesto: async function () {

            let _this = this;
            //this.processing = true;

            await axios.post(getBaseUrl.obtenerUrlAbsoluta('ArticuloT/UpdateArticuloT'), {
                IdArtTar: _this.objRepuesto.IdArtTar,
                IdTarea: _this.objRepuesto.IdTarea,
                Cod_Mer: _this.objRepuesto.CodRepuesto,
                Cantidad: _this.objRepuesto.Cantidad,
                Orden: _this.objRepuesto.Orden
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        _this.ListRepuestos(undefined, _this.objRepuesto.IdTarea);
                        _this.newRepuesto();
                    } else if (res.data.Estado === false) {
                        //this.processing = false;
                        Notifications.Messages.error(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo InsertTarea');
                });
        },

        InsertRepuesto: async function () {

            let _this = this;
            //this.processing = true;

            await axios.post(getBaseUrl.obtenerUrlAbsoluta('ArticuloT/InsertArticuloT'), {
                IdTarea: _this.objRepuesto.IdTarea,
                Cod_Mer: _this.objRepuesto.CodRepuesto,
                Cantidad: _this.objRepuesto.Cantidad,
                Orden: _this.objRepuesto.Orden
            })
                .then(res => {
                    if (res.data.Estado) {
                        Notifications.Messages.success('Se grabó información exitosamente');
                        _this.ListRepuestos(undefined, _this.objRepuesto.IdTarea);
                        _this.newRepuesto();
                    } else if (res.data.Estado === false) {
                        //this.processing = false;
                        Notifications.Messages.error(res.data.Mensaje);
                    }
                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo InsertTarea');
                });
        },

        EliminarRepuesto: async function (itemRepuesto) {
            let _this = this;
            //this.processing = true;

            Swal.fire({
                title: '¿Estas Seguro?',
                text: "Deseas eliminar este repuesto",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sì, Eliminar Repuesto'
            }).then((result) => {
                if (result.value) {
                    //swal-end
                    axios.post(getBaseUrl.obtenerUrlAbsoluta('ArticuloT/DeleteArticuloT'), { IdArtTar: itemRepuesto.IdArtTar })
                        .then(res => {
                            if (res.data.Estado) {

                                Notifications.Messages.success('Se eliminó repuesto exitosamente');
                                _this.ListRepuestos(undefined, itemRepuesto.IdTarea);
                                _this.newRepuesto();

                            }
                            if (res.data.Estado === false) {
                                Notifications.Messages.warning("No se eliminó repuesto");
                            }

                        }).catch(error => {
                            Notifications.Messages.error('Ocurrió una excepción en el metodo EliminarRepuesto');
                        });
                    //fin delete    
                    //fin swal 1
                }


            })
            //fin swal2
        },

        close: function (code) {
            if (code === 1) {
                this.ClearKilometraje();
                $('#appKilometraje').modal('hide');
                this.$nextTick(() => {

                });
            } else if (code === 2) {
                this.ClearTareas();
                $('#appTareas').modal('hide');
                this.$nextTick(() => {

                });
            } else if (code === 3) {
                this.ClearRepuestos();
                $('#appRepuestos').modal('hide');
                this.$nextTick(() => {

                });
            }
        }
    },

    computed: {
        FullFilterKilometraje: function () {
            return (this.objTipoMP.Kilometros && this.objTipoMP.KilometrosAviso && this.objTipoMP.Dias && this.objTipoMP.DiasAviso && this.objTipoMP.Horas && this.objTipoMP.HorasAviso) ? true : false;
        },
        FullFilterTarea: function () {
            return (this.objTarea.Descripcion && this.objTarea.Sistema && this.objTarea.SubSistema) ? true : false;
        },
        FullFilterRepuesto: function () {
            return (this.objRepuesto.CodRepuesto && this.objRepuesto.Cantidad && this.objRepuesto.Orden) ? true : false;
        }
    },

    watch: {

    }
});

