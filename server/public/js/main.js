
var frutasRepasadas = [];
var costa = [];
var sierra = [];
var idCategoriaCosta = 1;
var idCategoriaSierra = 2;
var puntaje = 0;
var habilitarBotonSiguiente = false;
const PREGUNTA_UNO = 1;
const PREGUNTA_TRES = 3;
var jsonVar, jsonText;
var totalfruta = 0;
var contarFrutasSeleccionadas = 0;

$(document).ready(function () {

    //Se obtiene los id de categoria
    $.ajax({
        type: 'GET',
        url: "/api/categoria/" + "Costa",
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (idCosta) {
            idCategoriaCosta = idCosta.id;
            obtenerFrutasCosta();
        }
    });
    $.ajax({
        type: 'GET',
        url: "/api/categoria/" + "Sierra",
        async: false,
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (idSierra) {
            idCategoriaSierra = idSierra.id;
            obtenerFrutasSierra();
        }
    });
    
    // Obtener las frutas por categoria
    function obtenerFrutasCosta(){
        //Obtener json que genera el servidor
        $.ajax({
            type: 'GET',
            url: "/api/fruta/" + idCategoriaCosta,
            async: false,
            beforeSend: function (xhr) {
                if (xhr && xhr.overrideMimeType) {
                    xhr.overrideMimeType('application/json;charset=utf-8');
                }
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                costa = data;
                construirFrutaCosta();
            }
        });
    }
    function obtenerFrutasSierra(){
        $.ajax({
            type: 'GET',
            url: "/api/fruta/" + idCategoriaSierra,
            async: false,
            beforeSend: function (xhr) {
                if (xhr && xhr.overrideMimeType) {
                    xhr.overrideMimeType('application/json;charset=utf-8');
                }
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                sierra = data;
                construirFrutaSierra();
            }
        });
    }

    // Ajax para obtener el total de las frutas

    $.ajax({
        type: 'GET',
        async: false,
        url: "/api/totalfruta",
        beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
                xhr.overrideMimeType('application/json;charset=utf-8');
            }
        },
        dataType: 'json',
        success: function (objTotalFruta) {
            var indexObjTotalFruta = 0;
            totalfruta = objTotalFruta[indexObjTotalFruta]["countOfFruits"];
        }
    });


    $("#btnIniciar").click(function () {
        aparecerPopupInstruc();
        $("#tituloIntro").fadeOut();
        $("#seccionIntro").fadeOut();
        $("#seccionAprendizaje").fadeIn();
    });


    var au = $('<audio src="audio/intro.mp3" autoplay type="audio/mpeg" loop="true"></audio>');
    $("body").append(au);

    $("#colorP1").css({ "color": "green" });
    $("#colorP2").css({ "color": "#eb984e" });
    $("#colorP3").css({ "color": "orange" });

    //Animación de imagen
    $("#animarImgSandia").click(function () {
        $(this).toggleClass("image-fade");
    });

    $("#animarImgDurazno").click(function () {
        $(this).toggleClass("image-fade");
    });

    $("#animarImgMandarina").click(function () {
        $(this).toggleClass("image-fade");
    });

    setearFrutasRepasadas();
    var indexArregloFrutasRepasadas = 0;

    $(".frutas").click(function () {
        var indexArregloFrutasRepasadas = 0;
        for (var key in costa["frutas"]) {
            var nombreFruta = costa["frutas"][key]["nombre"];
            if ($(this).attr("id") == nombreFruta) {
                console.log("fruta encontrada");
                $(this).hide();
                aprenderOptimizado(nombreFruta);
                frutasRepasadas[indexArregloFrutasRepasadas] = true;
                contarFrutasSeleccionadas++;
                break;
            }
            indexArregloFrutasRepasadas++;
        }

        indexArregloFrutasRepasadas = 0;
        for (var key in sierra["frutas"]) {
            var nombreFruta = sierra["frutas"][key]["nombre"];
            if ($(this).attr("id") == nombreFruta) {
                console.log("fruta encontrada");
                $(this).hide();
                aprenderOptimizado(nombreFruta);
                frutasRepasadas[indexArregloFrutasRepasadas] = true;
                contarFrutasSeleccionadas++;
                break;
            }
            indexArregloFrutasRepasadas++;
        }

        if (contarFrutasSeleccionadas == totalfruta) {
            $("#containerFrutasCosta").fadeOut();
            $("#containerFrutasSierra").fadeOut();
            $("#canasta").show();
            $("#btnEvaluar").show();
        }

    });

    $("#btnEvaluar").click(function () {
        $("#seccionAprendizaje").fadeOut();
    });
   

    function aprenderOptimizado(tipoFruta) {

        var au = $('<audio src="audio/' + tipoFruta + '.mp3" autoplay type="audio/mpeg"></audio>');
        $("body").append(au);

        $("#colgante").attr("src", "images/FRUTAS/" + tipoFruta + "Info.png");
        $("#colgante").css({ "display": "block" });

        setTimeout(function () {
            $("#colgante").css({ "display": "none" });
        }, 10000);
    }

    $("#content div").hide(); // Initially hide all content
    $("#tabs li:first").attr("id", "current"); // Activate first tab
    $("#content div:first").fadeIn(); // Show first tab content
    $('#tabs li a').click(function (e) {
        e.preventDefault();
        if ($(this).attr("id") == "current") { //detection for current tab
            return
        }
        else {
            $("#content div").hide(); //Hide all content
            $("#tabs li").attr("id", ""); //Reset id's
            $(this).parent().attr("id", "current"); // Activate this
            $($(this).attr('href')).fadeIn(); // Show content for current tab
        }
    });
    construirNivel();
});

function construirNivel(){
    /*section Evaluación Start*/
    //center y section por cada nivel
    var center = $("<center></center>");
    var section = $("<section></section>")
        .attr("id", "seccionEvaluacion");
    var divContainer = $("<div></div>")
        .attr("class", "container");    
    var divRow = $("<div></div>")
        .attr("class", "row");
    var divCol4_1 = $("<div></div>")
        .attr("class", "col-lg-4");
    var divCol4_2 = $("<div></div>")
        .attr("class", "col-lg-4");
    var divCol4_3 = $("<div></div>")
        .attr("class", "col-lg-4");
    var imgFluid = $("<img></img>")
        .attr("class", "img-fluid")
        .attr("src", "../images/OBJETOS/n1.png")
        .attr("id", "tituloNivel1");
    var imgFluidCol = $("<img></img>")
        .attr("class", "img-fluid col-sm-12")
        .attr("src", "../images/ROTULOS/rotEvaluación.png")
        .attr("id", "rotEva");
    var imgFluid2 = $("<img></img>")
        .attr("class", "img-fluid")
        .attr("src", "../images/ROTULOS/rotPuntaje.png")
        .attr("id", "rotPuntaje");
    var h1Puntaje = $("<h1></h1>")
        .attr("class", "img-fluid")
        .attr("id", "puntaje")
        .text("0");
    center.append(section);
    section.append(divContainer);
    divContainer.append(divRow);
    divRow.append(divCol4_1);
    divRow.append(divCol4_2);
    divRow.append(divCol4_3);
    divCol4_1.append(imgFluid);
    divCol4_2.append(imgFluidCol);
    divCol4_3.append(imgFluid2);
    divCol4_3.append(h1Puntaje);

    /*Inicio de cada pregunta*/
    var sectionPreg1 = $("<section></section>")
        .attr("id", "seccionPreg1");
    //Seccion imagen fruta
    var divContainerFruta = $("<div></div>")
        .attr("class", "container");    
    var divRowFruta = $("<div></div>")
        .attr("class", "row");
    var divCol4_4 = $("<div></div>")
        .attr("class", "col-lg-4");
    var divCol4_5 = $("<div></div>")
        .attr("class", "col-lg-4");
    var divCol4_6 = $("<div></div>")
        .attr("class", "col-lg-4");
    var aFruta = $("<a></a>")
        .attr("href", "#");
    var imgFruta = $("<img></img>")
        .attr("id", "animarImgSandia")
        .attr("src", "../images/FRUTAS/sandia.png")
        .attr("class", "img-fluid");    
    center.append(sectionPreg1);
    sectionPreg1.append(divContainerFruta);
    divContainerFruta.append(divRowFruta);
    divRowFruta.append(divCol4_4);
    divRowFruta.append(divCol4_5);
    divCol4_5.append(aFruta);
    aFruta.append(imgFruta);
    divRowFruta.append(divCol4_6);
    //Seccion pregunta fruta
    var divContainerPreg1 = $("<div></div>")
        .attr("class", "container");    
    var divRowPreg1 = $("<div></div>")
        .attr("class", "row");
    var divCol12 = $("<div></div>")
        .attr("class", "col-lg-12");
    var h2 = $("<h2></h2>")
        .attr("id", "colorP1")
        .attr("class", "espacioPreg")
        .text("FORMA");    
    var div1 = $("<div></div>");
    var divContainerPreg2 = $("<div></div>")
        .attr("class", "container");    
    var divRowPreg2 = $("<div></div>")
        .attr("class", "row");
    var divCol3_1 = $("<div></div>")
        .attr("class", "col-lg-3");
    var divCol3_2 = $("<div></div>")
        .attr("class", "col-lg-3");
    var divCol3_3 = $("<div></div>")
        .attr("class", "col-lg-3");
    var divCol3_4 = $("<div></div>")
        .attr("class", "col-lg-3");
    var btnOpcion1 = $("<div></div>")
        .attr("type", "button")
        .attr("class", "btn btn-secondary btn-lg")
        .attr("id", "btnRespuestaOk_Pregunta1")
        .text("Redondeada");
    var btnOpcion2 = $("<div></div>")
        .attr("type", "button")
        .attr("class", "btn btn-secondary btn-lg")
        .attr("id", "btnRespuestaOk_Pregunta1")
        .text("Alargada");
    sectionPreg1.append(divContainerPreg1);
    divContainerPreg1.append(divRowPreg1);
    divRowPreg1.append(divCol12);
    divCol12.append(h2);
    divCol12.append(div1);
    divCol12.append(divContainerPreg2);
    divContainerPreg2.append(divRowPreg2);
    divRowPreg2.append(divCol3_1);
    divRowPreg2.append(divCol3_2);
    divCol3_2.append(btnOpcion1);
    divRowPreg2.append(divCol3_3);
    divCol3_3.append(btnOpcion2);
    divRowPreg2.append(divCol3_4);
    /*Fin de cada pregunta*/

    /*Boton siguiente*/
    var divContainerSgt = $("<div></div>")
        .attr("class", "container");    
    var divRowSgt = $("<div></div>")
        .attr("class", "row");
    var divCol12Sgt = $("<div></div>")
        .attr("class", "col-lg-12");
    var aSgt = $("<a></a>")
        .attr("href", "#")
        .attr("id", "btnSiguientePregunta");
    var imgSgt = $("<img></img>")
        .attr("src", "../images/BOTONES/SIGUIENTE.png")
        .attr("class", "img-fluid center-block");
    section.append(divContainerSgt);
    divContainerSgt.append(divRowSgt);
    divRowSgt.append(divCol12Sgt);
    divCol12Sgt.append(aSgt);
    aSgt.append(imgSgt);

    $('#juego').append(center);
    $('#juego').append(divContainerSgt);
}

function evaluacionPreguntasCosta() {
    for (var c in costa["frutas"]) {
        var url = costa["frutas"][c]["url"];
        var div = $("<div></div>");
        var img = $("<img></img>")
            .attr("src", url)
            .attr("class", "img-responsive");
        div.append(img);
        $('#animarImgSandia').append(div);
    }

}



function setearFrutasRepasadas() {
    var indiceFrutaRepasada = 0;
    for (var c in costa["frutas"]) {
        frutasRepasadas[indiceFrutaRepasada] = false;
        indiceFrutaRepasada++;
    }
    for (var c in sierra["frutas"]) {
        frutasRepasadas[indiceFrutaRepasada] = false;
        indiceFrutaRepasada++;
    }
}

function construirFrutaCosta() {
    for (var c in costa["frutas"]) {
        var url = costa["frutas"][c]["url"];
        var nombreFruta = costa["frutas"][c]["nombre"];
        var div = $("<div></div>");
        var img = $("<img></img>")
            .attr("src", url)
            .attr("id", nombreFruta)
            .attr("class", "img-responsive frutas");
        var a = $("<a></a>")
            .attr("href", "#");
        a.append(img);
        div.append(a);
        $('#containerFrutasCosta').append(div);
    }
}

function construirFrutaSierra() {
    for (var c in sierra["frutas"]) {
        var url = sierra["frutas"][c]["url"];
        var nombreFruta = sierra["frutas"][c]["nombre"];
        var div = $("<div></div>");
        var img = $("<img></img>")
            .attr("src", url)
            .attr("id", nombreFruta)
            .attr("class", "img-responsive frutas");
        var a = $("<a></a>")
            .attr("href", "#");
        a.append(img);
        div.append(a);
        $('#containerFrutasSierra').append(div);
    }
}


//SECCIÓN DE EVALUACIÓN

EvaluarPregunta();

function EvaluarPregunta() {
    for (var preguntaNumero = PREGUNTA_UNO; preguntaNumero <= PREGUNTA_TRES; preguntaNumero++) {

        $("#seccionPreg" + preguntaNumero).each(function (index) {
            var frutaOk = $("#btnRespuestaOk_Pregunta" + preguntaNumero);
            var frutaErr1 = $("#btnRespuestaErr1_Pregunta" + preguntaNumero);
            var frutaErr2 = $("#btnRespuestaErr2_Pregunta" + preguntaNumero);
            VerificarRespuestaCorrecta(frutaOk, preguntaNumero);
            VerificarPrimeraRespuestaErronea(frutaErr1, preguntaNumero);
            VerificarSegundaRespuestaErronea(frutaErr2, preguntaNumero);
        });
    }
}

function VerificarRespuestaCorrecta(frutaOk, preguntaNumero) {

    if (frutaOk == $("#btnRespuestaOk_Pregunta" + preguntaNumero).on({
        click: function () {
            $(this).addClass("btn-success");

            setTimeout(function () {
                var au = $('<audio src="../audio/ganador.mp3" autoplay type="audio/mpeg"></audio>');
                $("body").append(au);
            }, 400);

            $("#btnRespuestaErr1_Pregunta" + preguntaNumero).prop("disabled", true);
            $("#btnRespuestaErr2_Pregunta" + preguntaNumero).prop("disabled", true);
            $("#btnRespuestaOk_Pregunta" + preguntaNumero).prop("disabled", true);
            puntaje += 5;
            $("#puntaje").html("" + puntaje);
            habilitarBotonSiguiente = true;
        }

    })
    ) {
    };
}

function VerificarPrimeraRespuestaErronea(frutaErr1, preguntaNumero) {

    if (frutaErr1 == $("#btnRespuestaErr1_Pregunta" + preguntaNumero).on({
        click: function () {
            $(this).addClass("btn-danger");
            if (puntaje >= 2) {
                puntaje -= 2;
            } else {
                puntaje = 0;
            }
            setTimeout(function () {
                $("#btnRespuestaErr1_Pregunta" + preguntaNumero).prop("disabled", true);
                $("#puntaje").html("" + puntaje);
                habilitarBotonSiguiente = false;
                var au = $('<audio src="../audio/oh_no.mp3" autoplay type="audio/mpeg"></audio>');
                $("body").append(au);
            }, 400);
        }
    })
    ) {
    };
}


function VerificarSegundaRespuestaErronea(frutaErr2, preguntaNumero) {

    if (frutaErr2 == $("#btnRespuestaErr2_Pregunta" + preguntaNumero).on({
        click: function () {
            $(this).addClass("btn-danger");
            if (puntaje >= 2) {
                puntaje -= 2;
            } else {
                puntaje = 0;
            }

            setTimeout(function () {
                $("#btnRespuestaErr2_Pregunta" + preguntaNumero).prop("disabled", true);
                $("#puntaje").html("" + puntaje);
                habilitarBotonSiguiente = false;
                var au = $('<audio src="../audio/oh_no.mp3" autoplay type="audio/mpeg"></audio>');
                $("body").append(au);
            }, 400);
        }
    })
    ) {
    };
}


var contadorDePregunta = 1;

$("#btnSiguientePregunta").on({
    click: function () {
        if (habilitarBotonSiguiente) {
            habilitarBotonSiguiente = false;
            ocultarOMostrarSeccionPregunta();
        }
    }
});

function ocultarOMostrarSeccionPregunta() {
    var numeroDePreguntaSiguiente = contadorDePregunta + 1;
    if (contadorDePregunta == PREGUNTA_TRES) {
        $("#seccionPreg" + contadorDePregunta).show();
        $("#seccionEvaluacion").fadeOut();
        seccionEvaluacion2();
    }
    else {
        $("#seccionPreg" + contadorDePregunta).hide();
        $("#seccionPreg" + numeroDePreguntaSiguiente).show();
        contadorDePregunta++;
    }
}

function seccionEvaluacion2() {
    $("#seccionEvaluacion2").show();
    $('#conPuntajeAcum').html("" + puntaje);
    for (i = 0; i < frutasAnimadasSierra.length; i++) {
        var enlaceFrutasSNivel2 = $('<a href="#"><img  src="images/FRUTAS/' + frutasAnimadasSierra[i].nombre + '" id="' + frutasAnimadasSierra[i].id + '" class="img-responsive frutas"></a>');
        $("#containerFrutasSierraN2").append(enlaceFrutasSNivel2);
    }
}

function aparecerPopupInstruc() {
    var au = $('<audio src="audio/instrucciones.mp3" autoplay type="audio/mpeg"></audio>');
    $("body").append(au);
    var mpopup = $('#instrucmpopupBox');//Aqui lee el id del pop up que esta en el html. Si se desea crear mas pop up. Copien y peguen toda esta funcion y solo cambian el nombre de la funcion. Y reemplazan este ID aqui en el js(#mpopupBox) y en html(Deben copiar y pegar el codigo html y pegarlo en donde se quiera), cambiando el id.
    mpopup.show();//Muestra el pop up
    $(".close").on('click', function () {//Al dar click en un elemento con clase close(.close), se escondera el pop up
        mpopup.hide(); //Se esconde el pop up
        var au = $('<audio src="audio/aprendizaje.mp3" autoplay type="audio/mpeg"></audio>');
        $("body").append(au);

    });

    $(window).on('click', function (e) {//Al dar click fuera de la pantalla, se escondera el pop up
        if (e.target == mpopup[0]) {//Aqui se valida que se este dando click fuera del pop up para cerrar el pop up
            mpopup.hide();//Se esconde el pop up
            var au = $('<audio src="audio/aprendizaje.mp3" autoplay type="audio/mpeg"></audio>');
            $("body").append(au);
        }
    });
}

function aparecerPopupWinner() {
    var au = $('<audio src="../audio/felicidades.mp3" autoplay type="audio/mpeg"></audio>');
    $("body").append(au);
    $('#conPuntaje').html("HAS RECOPILADO " + puntaje + " PUNTOS");
    var mpopup = $('#popwinner');//Aqui lee el id del pop up que esta en el html. Si se desea crear mas pop up. Copien y peguen toda esta funcion y solo cambian el nombre de la funcion. Y reemplazan este ID aqui en el js(#mpopupBox) y en html(Deben copiar y pegar el codigo html y pegarlo en donde se quiera), cambiando el id.
    mpopup.show();//Muestra el pop up
    $(".close").on('click', function () {//Al dar click en un elemento con clase close(.close), se escondera el pop up
        mpopup.hide(); //Se esconde el pop up
        /*  location.reload(); //me retorna al indice */
    });

    $(window).on('click', function (e) {//Al dar click fuera de la pantalla, se escondera el pop up
        if (e.target == mpopup[0]) {//Aqui se valida que se este dando click fuera del pop up para cerrar el pop up
            mpopup.hide();//Se esconde el pop up 
            $("#seccionEvaluacion").fadeOut();
            $("#despedida").fadeIn();
            var au = $('<audio src="../audio/despedida.mp3" autoplay type="audio/mpeg"></audio>');
            $("body").append(au);
        }
    });
}
