$(document).ready(function () {
    // Theme color settings
    var ruta = 'wwwroot/AmpleAdmin/css/colors/';
    var link = document.getElementById('theme'), ext = '.css';
    let theme = localStorage.getItem('ThemeColor');
    let working = localStorage.getItem('ThemeColorWorking');

    if (!theme) {
        theme = 'default';
        working = 'working';
        localStorage.setItem('ThemeColor', theme);
        localStorage.setItem('ThemeColorWorking', working);
        $("[data-theme='" + theme + "']").addClass(working);
    } else {
        $("[data-theme='" + theme + "']").addClass(working);
    }

    $("*[data-theme]").click(function (e) {
        e.preventDefault();
        theme = $(this).attr('data-theme');
        $('#themecolors li a').removeClass(working);
        $(this).addClass(working);
        localStorage.setItem('ThemeColor', theme);
        localStorage.setItem('ThemeColorWorking', working);
        //link.setAttribute('href', getBaseUrl.obtenerUrlAbsoluta(ruta + theme + ext));
    });

    // color selector
    $('#themecolors').on('click', 'a', function () {
        $('#themecolors li a').removeClass('working');
        $(this).addClass('working');
    });

    //link.setAttribute('href', getBaseUrl.obtenerUrlAbsoluta(ruta + theme + ext));
});