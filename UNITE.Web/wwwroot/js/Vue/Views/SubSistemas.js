


let app = new Vue({
    el: "#app",
    data: {
        objSubSistemas: {
            ID_tb_SubSistema_Mant: '',
            ID_tb_Sistema_Mant: '',
            Descripcion: ''
        },
        objSistemas: {
            Codigo: '',
            Descripcion: ''
        },
        objSistemas2: {
            Codigo: '',
            Descripcion: ''
        },
        list: {
            Sistemas: [],
            Sistemas2: [],
            SubSistemas: [],
            Id: []
        },
    },
    created: async function () {
        await this.ListSubSistemas();
        await this.getSistemas("");
        await this.getSistemas2("");
    },
    mounted: async function () {
        this.$nextTick(() => {
            this.SetFocus();
        });
    },
    methods: {

        ListSubSistemas: async function () {


            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('SubSistemas/ListSubSistemas'))
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.SubSistemas = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo ListSubSistemas');
                });

            //DESACTIVA Div SubSistemas y su contenido
            this.$refs.txtCodSistema.value = "";
            var nodes = document.getElementById("DivSistemas").getElementsByTagName('*');
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].disabled = true;
            }
            //fin DESACTIVA Div SubSistemas y su contenido
        },

        SelectSubSistemas: async function (e) {

            //extraer datos tabla


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

            //Listar SubSistemas para editar

            var codss = data[0]
            var codsis = data[1]
            var descss = data[2]
            console.log(codss);

            axios.post(getBaseUrl.obtenerUrlAbsoluta("SubSistemas/SelectSubSistemas"), { ID_tb_SubSistema_Mant: codss })
                .then(res => {
                    if (res.data.Estado) {


                        document.getElementById("txtCodSubSistemas").value = codss;
                        this.$refs.txtCodSistema.value = codsis;

                        document.getElementById("txtCodSubSistemas").disabled = false;

                        document.getElementById("txtDescSubSistemas").value = descss;

                        $('#txtCodSubSistemas').prop('disabled', true);

                        $('#txtDescSubSistemas').prop('disabled', false);

                        $('html, body').animate({ scrollTop: 0 }, 'fast');

                        document.getElementById("lblEstadoC").innerHTML = "2";
                        $("#spaEstadoD").text("Editando registros");

                        document.getElementById("txtCodSubSistemas").focus();

                        $('#btnGrabar').prop('disabled', false);



                        Notifications.Messages.success("Registro Cargado");
                        setTimeout(() => { this.$refs.frmSubSistemas.submit(); }, 500);


                    } else if (res.data.tipoNotificacion) {
                        ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                    }

                })
            //DESACTIVA Div SubSistemas y su contenido
            this.$refs.txtCodSistema.value = "";
            var nodes = document.getElementById("DivSistemas").getElementsByTagName('*');
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].disabled = true;
            }
            //fin DESACTIVA Div SubSistemas y su contenido
        },

 

 


        DelSubSistemas: async function (e) {
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
            //id sub 
            var codss = data[0]

            //inicio swal
            Swal.fire({
                title: '¿Estas Seguro?',
                text: "No podras revertir este proceso",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sì, Borrar SubSistema'
            }).then((result) => {
                if (result.value) {
                    //inicio swal fin       

                    //delete

                    axios.post(getBaseUrl.obtenerUrlAbsoluta("SubSistemas/DeleteSubSistemas"), { ID_tb_SubSistema_Mant: codss })
                        .then(res => {
                            if (res.data.Estado) {

                                Notifications.Messages.success("Registro Eliminado");
                                setTimeout(() => { this.$refs.frmSubSistemas.submit(); }, 500);

                                console.log(res.data.Estado);
                                window.setTimeout(function () { location.reload() }, 500)

                            } else if (res.data.tipoNotificacion) {

                                ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                            }
                            if (res.data.Estado == false) {
                                Notifications.Messages.warning("este Clase tiene Tipos de mantenimiento asignados");
                            }

                        })
                    //fin delete    
                    //fin swal 1
                }
            })
            //fin swal2

        },

        getSistemas: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListSistemasAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Sistemas = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getSistemas');
                });
        },
        getSistemas2: async function (value) {
            let _this = this;
            await axios.get(getBaseUrl.obtenerUrlAbsoluta('Base/ListSistemasAutocomplete'), { params: { value: value } })
                .then(res => {
                    if (res.data.Estado) {
                        _this.list.Sistemas2 = (res.data.Valor.List) ? res.data.Valor.List : [];
                    }

                }).catch(error => {
                    Notifications.Messages.error('Ocurrió una excepción en el metodo getSistemas2');
                });
        },
        SelFiltro2: async function (value) {

            document.getElementById("TxtFiltro2").value = value;

            // Declare variables

            var input, filter, table, tr, td, i, txtValue ;
            input = document.getElementById("TxtFiltro2");
            filter = input.value.toUpperCase();
            table = document.getElementById("tableSubSistemas");
            tr = table.getElementsByTagName("tr");

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1 && td.innerText == value ) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        },

        Cancelar: function () {
            window.setTimeout(function () { location.reload() }, 50)
        },

        Nuevo: async function () {


            document.getElementById('lblEstadoC').innerHTML = "1";
            $("#spaEstadoD").text("Agregando registros");

            document.getElementById("txtCodSubSistemas").value = "";

       

                //ACTIVA Div SubSistemas y su contenido
                this.$refs.txtCodSistema.value = "";
                var nodes = document.getElementById("DivSistemas").getElementsByTagName('*');
                for (var i = 0; i < nodes.length; i++) {
                nodes[i].disabled = false;
                }
                //fin ACTIVA Div SubSistemas y su contenido
      

            document.getElementById("txtDescSubSistemas").value = "";
            $('#txtDescSubSistemas').prop('disabled', false);

            document.getElementById("txtCodSistema").focus();
            $('#btnGrabar').prop('disabled', false);
        },

        Grabar: async function () {
            //codigo y SubSistemas
            //codigo y sistema

          
            var codsis = this.objSistemas.ID_tb_Sistema_Mant;
            var descss = document.getElementById("txtDescSubSistemas").value;

           

            if (codsis.length == 0 || descss.length == 0) {
                Notifications.Messages.warning("Llene todos los campos necesarios");
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
                    if (document.getElementById('lblEstadoC').innerHTML == "1") {
                        //get id axios
                        let _this = this;

                        axios.post(getBaseUrl.obtenerUrlAbsoluta("SubSistemas/IdSubSistemas"), { ID_tb_Sistema_Mant: codsis })
                            .then(res => {
                                if (res.data.Estado) {

                                    _this.list.Id = (res.data.Valor.List) ? res.data.Valor.List : [];
                                    //asigna id maximo desde la bd
                                    document.getElementById('txtCodSubSistemas').value = _this.list.Id[0].ID_tb_SubSistema_Mant;
                                    var codss = _this.list.Id[0].ID_tb_SubSistema_Mant;

                                    //nuevo elemento
                                    //nuevo
                                    axios.post(getBaseUrl.obtenerUrlAbsoluta("SubSistemas/InsertSubSistemas"), { ID_tb_SubSistema_Mant: codss, ID_tb_Sistema_Mant: codsis, Descripcion: descss })
                                        .then(res => {
                                            if (res.data.Estado) {
                                                Notifications.Messages.success("Registro Guardado");
                                                setTimeout(() => { this.$refs.frmSubSistemas.submit(); }, 500);
                                                window.setTimeout(function () { location.reload() }, 500)

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
                        var codss = document.getElementById("txtCodSubSistemas").value;
                        console.log(codss);
                        //modificacion
                        axios.post(getBaseUrl.obtenerUrlAbsoluta("SubSistemas/UpdateSubSistemas"), { ID_tb_SubSistema_Mant: codss, ID_tb_Sistema_Mant: codsis, Descripcion: descss })
                            .then(res => {
                                if (res.data.Estado) {

                                    


                                    Notifications.Messages.success("Registro Actualizado");
                                    setTimeout(() => { this.$refs.frmSubSistemas.submit(); }, 500);
                                    window.setTimeout(function () { location.reload() }, 500)
                                    console.log(descss)

                                } else if (res.data.tipoNotificacion) {
                                    ProcessMessage(res.data.tipoNotificacion, res.data.mensaje);
                                }
                            })
                    }

                    //DESACTIVA Div SubSistemas y su contenido
                    this.$refs.txtCodSistema.value = "";
                    var nodes = document.getElementById("DivSistemas").getElementsByTagName('*');
                    for (var i = 0; i < nodes.length; i++) {
                        nodes[i].disabled = true;
                    }
                //fin DESACTIVA Div SubSistemas y su contenido

                }
                //swal cierre

                //fin swal 1
            }

            )
        }
        //fin swal2
   

},

    SetFocus: function () {
        if (!this.objSistemas.Descripcion) {
            this.$refs.Codigo.$refs.search.focus();
        } else if (!this.objSistemas.Descripcion) {
            this.$refs.Descripcion.focus();
        } else {
            this.$refs.bntSubmit.focus();
        }
    },
            computed: {
        FullFields: function () {
                    return this.validateForm();
}
},
            watch: {
        "objSistemas.ID_tb_Sistema_Mant": function (newval, oldval) {
                    if (newval) {
        this.SetFocus();
    }
}
}
});




//filtros

        function Filtrar1() {
            // Declare variables
            var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("TxtFiltro1");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableSubSistemas");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
    if (td) {
        txtValue = td.textContent || td.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
    } else {
        tr[i].style.display = "none";
    }
}
}
}


function Filtrar3() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("TxtFiltro3");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableSubSistemas");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}



