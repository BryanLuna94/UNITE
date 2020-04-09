//==================================================================================\\
//VUEX => VARIABLE GENERAL DEL TODO EL PROYECTO.
//==================================================================================\\
const store = new Vuex.Store({
    state: {
        usuario: null,
        list: {}
    },
    getters: {},
    mutations: {
        setUsuario: function (state, usuario) {
            state.usuario = usuario;
        },
        setList: function (state, list) {
            state.list = list;
        }
    },
    actions: {
        saveUsuario: function ({ commit }, usuario) {
            commit('setUsuario', usuario);
        },
        saveList: function ({ commit }, list) {
            commit('setList', list);
        }
    }
});

//==================================================================================\\
//VUEJS => REGISTER GLOBAL
//==================================================================================\\
//Vue Components
Vue.component('v-select', VueSelect.VueSelect);
Vue.component('v-multiselect', window.VueMultiselect.default);
Vue.component('v-datepicker', VueBootstrapDatetimePicker);
Vue.component('v-money', {
    props: ["value"],
    template: `<input class="form-control" type="text" v-model="displayValue" placeholder="Monto" @blur="isInputActive = false" @focus="isInputActive = true"/>`,
    data: function () {
        return {
            isInputActive: false
        };
    },
    computed: {
        displayValue: {
            get: function () {
                if (this.isInputActive) {
                    // Cursor is inside the input field. unformat display value for user
                    return (this.value) ? this.value : 0;
                } else {
                    // User is not modifying now. Format display value for user interface
                    return /*"S/ " +*/ (this.value) ? this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") : null;
                }
            },
            set: function (modifiedValue) {
                // Recalculate value after ignoring "$" and "," in user input
                let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""));
                // Ensure that it is not NaN
                if (isNaN(newValue)) {
                    newValue = 0;
                }
                // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
                // $emit the event so that parent component gets it
                this.$emit('input', newValue);
            }
        }
    }
});
Vue.component('v-moneymin', {
    props: ["value"],
    template: `<input class="form-control" type="text" v-model="displayValue" placeholder="P.Mínimo" @blur="isInputActive = false" @focus="isInputActive = true"/>`,
    data: function () {
        return {
            isInputActive: false
        };
    },
    computed: {
        displayValue: {
            get: function () {
                if (this.isInputActive) {
                    // Cursor is inside the input field. unformat display value for user
                    return (this.value) ? this.value : 0;
                } else {
                    // User is not modifying now. Format display value for user interface
                    return /*"S/ " +*/ (this.value) ? this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") : null;
                }
            },
            set: function (modifiedValue) {
                // Recalculate value after ignoring "$" and "," in user input
                let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""));
                // Ensure that it is not NaN
                if (isNaN(newValue)) {
                    newValue = 0;
                }
                // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
                // $emit the event so that parent component gets it
                this.$emit('input', newValue);
            }
        }
    }
});
Vue.component('v-moneymax', {
    props: ["value"],
    template: `<input class="form-control" type="text" v-model="displayValue" placeholder="P.Máximo" @blur="isInputActive = false" @focus="isInputActive = true"/>`,
    data: function () {
        return {
            isInputActive: false
        };
    },
    computed: {
        displayValue: {
            get: function () {
                if (this.isInputActive) {
                    // Cursor is inside the input field. unformat display value for user
                    return (this.value) ? this.value : 0;
                } else {
                    // User is not modifying now. Format display value for user interface
                    return /*"S/ " +*/ (this.value) ? this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") : null;
                }
            },
            set: function (modifiedValue) {
                // Recalculate value after ignoring "$" and "," in user input
                let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""));
                // Ensure that it is not NaN
                if (isNaN(newValue)) {
                    newValue = 0;
                }
                // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
                // $emit the event so that parent component gets it
                this.$emit('input', newValue);
            }
        }
    }
});
Vue.component('v-moneyinline', {
    props: ["value", "dsb"],
    template: `<input type="text" v-model="displayValue" placeholder="Monto" @blur="isInputActive = false" :disabled="dsb" @focus="isInputActive = true"/>`,
    data: function () {
        return {
            isInputActive: false
        };
    },
    computed: {
        displayValue: {
            get: function () {
                if (this.isInputActive) {
                    // Cursor is inside the input field. unformat display value for user
                    return (this.value) ? this.value : 0;
                } else {
                    // User is not modifying now. Format display value for user interface
                    return /*"S/ " +*/ (this.value) ? this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") : null;
                }
            },
            set: function (modifiedValue) {
                // Recalculate value after ignoring "$" and "," in user input
                let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ""));
                // Ensure that it is not NaN
                if (isNaN(newValue)) {
                    newValue = 0;
                }
                // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
                // $emit the event so that parent component gets it
                this.$emit('input', newValue);
            }
        }
    }
});
//Vue Filters
Vue.filter('capitalize', function (value) {
    if (!value) return '';
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});
//Vue directives
Vue.directive('focus', {
    // When the bound element is inserted into the DOM...
    inserted: function (el) {
        // Focus the element
        el.focus();
    }
});
Vue.directive('mask', VueMask.VueMaskDirective);
//==================================================================================\\
//NOTIFICATIONS
//==================================================================================\\
const Notifications = {
    Messages: {
        none: function (msg) {
            $.toast({
                heading: 'Mensaje nulo',
                text: msg,
                position: 'top-right',
                loaderBg: '#ff6849',
                icon: 'info',
                hideAfter: 4000,
                stack: 1
            });
        },
        info: function (msg) {
            $.toast({
                heading: 'Mensaje de Información',
                text: msg,
                position: 'top-right',
                loaderBg: '#ff6849',
                icon: 'info',
                hideAfter: 4000,
                stack: 1
            });
        },
        warning: function (msg) {
            $.toast({
                heading: 'Mensaje de Advertencia',
                text: msg,
                position: 'top-right',
                loaderBg: '#ff6849',
                icon: 'warning',
                hideAfter: 4000,
                stack: 1
            });
        },
        success: function (msg) {
            $.toast({
                heading: 'Mensaje de éxito',
                text: msg || 'Operación satisfactoria.',
                position: 'top-right',
                loaderBg: '#ff6849',
                icon: 'success',
                hideAfter: 4000,
                stack: 1
            });
        },
        danger: function (msg) {
            $.toast({
                heading: 'Mensaje de Alerta',
                text: msg || 'Se produjo una alerta en el sistema.',
                position: 'top-right',
                loaderBg: '#ff1100',
                icon: 'error',
                hideAfter: 4000,
                stack: 1
            });
        },
        error: function (msg) {
            $.toast({
                heading: 'Mensaje de Error',
                text: msg || 'Ocurrió una excepción en el sistema.',
                position: 'top-right',
                loaderBg: '#ff6849',
                icon: 'error',
                hideAfter: 4000,
                stack: 1
            });
        }
    },
    Alerts: {
        FullWidthTop: function () { },
        FullWidthBottom: function () { },
        FullWidthTopImage: function () { },
        FullWidthBottomImage: function () { },
        TopRight: function () { },
        TopLeft: function () { },
        BottomLeft: function () { },
        BottomRight: function () { }
    },
    SweatAlerts: {
        Confirm: async function (_title, _message, _textButtonConfirm, _textButtonCancel, _confirmButtonColor, _cancelButtonColor) {
            let res = false;
            await Swal.fire({
                title: _title || "Mensaje del sistema",
                text: _message || "¿Desea Continuar con la operación?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: _confirmButtonColor || '#3085d6',
                cancelButtonColor: _cancelButtonColor || '#d33',
                confirmButtonText: _textButtonConfirm || "Si",
                cancelButtonText: _textButtonCancel || "No",
                allowOutsideClick: false,
            }).then((result) => {
                res = (result.value) ? true : false;
            }).catch(error => {
                this.Message.error(error);
            });

            return res;
        },
        Message: async function () { },
        TitleWithTextUnder: async function () { },
        SuccessMessage: async function () { },
        WarningMessage: async function () { },
        BasicMessageConfirmation: function () { },
        AlertWithImage: async function () { },
        AlertWithTime: async function () { }
    }
};

//==================================================================================\\
//MODALS
//==================================================================================\\
const Modals = {
    LargeModel: async function () { },
    MediumModel: async function () { },
    SmallModel: async function () { },
    ResponsiveModel: function () { }
};
//==================================================================================\\
//FUNCTIONS
//==================================================================================\\
function ProcessMessage(tipoNotificacion, msg) {
    if (tipoNotificacion === 'Info') {
        return Notifications.Messages.info(msg);
    } if (tipoNotificacion === 'Success') {
        return Notifications.Messages.success(msg);
    } else if (tipoNotificacion === 'Warning') {
        return Notifications.Messages.warning(msg);
    } else if (tipoNotificacion === 'Danger') {
        return Notifications.Messages.danger(msg);
    } else if (tipoNotificacion === 'Error') {
        return Notifications.Messages.error(msg);
    } else {
        return Notifications.Messages.none(msg);
    }
}

//==================================================================================\\
//PRELOADER
//==================================================================================\\
const APP = {
    preloader: {
        showLoading: function () {
            $(".preloader").fadeIn().css("background-color", "rgba(0, 0, 0, 0.3)");
        },
        hideLoading: function () {
            $(".preloader").fadeOut().css("background-color", "");
        },
        clearLoading: function () {
            $(".preloader").fadeOut().css("background-color", "");
        }
    },
};

//==================================================================================\\
//JQUERY DATATABLES
//==================================================================================\\
const Datatables = {
    lang: {
        es: {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    }
};

//==================================================================================\\
//VUE BOOTSTRAP DATETIME PICKER
//==================================================================================\\
const VueDateTimePicker = {
    DatePicker: {
        format: 'DD/MM/YYYY',
        useCurrent: false,
        showClear: true,
        showClose: true,
        showTodayButton: true
    },
    TimePicker: {
        format: 'HH:mm A',
        useCurrent: false,
        showClear: true,
        showClose: true,
        showTodayButton: true
    },
    TodayMinDate: {
        format: 'DD/MM/YYYY',
        useCurrent: false,
        showClear: true,
        showClose: true,
        showTodayButton: true,
        minDate: new Date()
    },
    TodayMaxDate: {
        format: 'DD/MM/YYYY',
        useCurrent: false,
        showClear: true,
        showClose: true,
        showTodayButton: true,
        maxDate: new Date()
    },
};



//==================================================================================\\
//CUANDO EL DOCUMENTO ESTA LISTO
//==================================================================================\\
$(function () {
    $('#tblList').DataTable({
        "language": Datatables.lang.es,
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "order": [],
        "info": true
    });
    $('.datepicker').datetimepicker({
        locale: 'es',
        format: 'DD/MM/YYYY',
        showTodayButton: true,
    });
    $('.timepicker').datetimepicker({
        locale: 'es',
        format: 'HH:mm A'
    });


});

