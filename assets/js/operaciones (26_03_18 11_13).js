


// Get the button that opens the modal
var btnH = $("#btnHombre");
var btnM = $("#btnMujer");

var redirectMen = $('.btn-men');
var redirectWomen = $('.btn-women');

// Get the <span> element that closes the modal
var btnClose = $("#closeButton");
var modal = $('#myModal');
var modalAux = document.getElementById('myModal');
var test = {};	
var results = [];
var currentQuestion = 0;

btnClose.click(function () {
    modal.css("display", "none");
    return false;
})

// When the user clicks anywhere outside of the modal, close it

function navigate(value) {
    $(".hideable").each(function () {
        $(this).css("display", "none");
    });
    $("#" + value).css("display", "block");
}

btnH.click(function () {
    modal.css("display", "block");
    navigate("men");
    $.getJSON('//test.json', function (data) {
        test = data['hombre'];
        results = [];
        currentQuestion = 0;
        setupTestMen();
    });
    return false;
})

btnM.click(function () {
    modal.css("display", "block");
    navigate("women");
    $.getJSON('//test.json', function (data) {
        test = data['mujer'];
        results = [];
        currentQuestion = 0;
        setupTestWomen();
    });
    return false;
})
// When the user clicks on <span> (x), close the modal
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modalAux) {
        modal.css("display", "none");
    }
}

function navigate(toIndex) {
    $(".hideable").css("display", "none");
    $("#" + toIndex).css("display", "block");
}

function setupTestWomen() {
    showQuestionWomen(0);
    var circles = "";
    var i = 0;
    test["preguntas"].forEach(function (pregunta) {
        if (i == 0) {
            circles += '<div class="boxCircle"><div id="ccircle0" class="activeCircle">1</div>';
        } else {
            circles += '<div id="ccircle' + i + '" class="boxCircle">' + (i+1) + '</div>';
        }
        results.push(0);
        i++;
    });
    $(".test-circles-women").html(circles);
    $('.boxCircle div').click(function () {
        $('.boxCircle div').removeClass('activeCircle');
        $(this).addClass('activeCircle');
        var id = $(this).attr('id').split("cle")[1];
        showQuestionWomen(id);
        currentQuestion = id + 1;
        return false;
    });
    i = 1;
    for (i = 1; i <= test["preguntas"].length; i++) {

        $('#ccircle' + i).click(function () {
            var id = parseInt($(this).attr('id').split("cle")[1]);
            showQuestionWomen(id);
            currentQuestion = id + 1;
            return false;
        });
    }
}

function setupTestMen() {
    showQuestionMen(0);
    var circles = "";
    var i = 0;
    test["preguntas"].forEach(function (pregunta) {
        if (i == 0) {
            circles += '<div class="boxCircle"><div id="circle' + i + '" class="activeCircle">1</div>';
        } else {
            circles += '<div id="circle' + i + '" class="boxCircle">' + (i + 1) + '</div>';
        }
        results.push(0);
        i++;
    });
    $(".test-circles-men").html(circles);
    $('.boxCircle div').click(function () {
        $('.boxCircle div').removeClass('activeCircle');
        $(this).addClass('activeCircle');
        var id = parseInt($(this).attr('id').split("cle")[1]);
        showQuestionMen(id);
        currentQuestion = id;
        return false;
    });
    i = 1;
    for (i = 1; i <= test["preguntas"].length; i++) {
        $('#circle' + i).click(function () {
            var id = $(this).attr('id').split("cle")[1];
            showQuestionMen(id);
            return false;
        });
    }
}


function showQuestionMen(number) {
    var buttons = "";
    var question = test["preguntas"][number];
    var j = 0;
    question["opciones"].forEach(function (respuesta) {
        buttons += "<button id='question" + j + "'>" + respuesta + "</button>";
        j++;
    });
    $('#section-answers-men').html(buttons);
    var j = 0;
    question["opciones"].forEach(function (respuesta) {
        $('#question' + j).click(function () {
            var id = $(this).attr('id').split("tion")[1];
            results[parseInt(currentQuestion)] = parseInt(id) + 1;
            var nextQuestion = getNextQuestion();
            if (nextQuestion != -1) {
                $('.boxCircle div').removeClass('activeCircle');
                $('#circle' + (nextQuestion)).addClass('activeCircle');
                showQuestionMen(nextQuestion);
                currentQuestion = nextQuestion;
            } else {
                var sum = results.reduce(function (a, b) { return a + b; }, 0);
                $("#points-men").html(sum);
                for (i = 0; i < test["resultados"].length; i++) {
                    console.log(sum);
                    if( sum > 8 && sum <= 11 ){
                        redirectMen.attr('href','https://www.ingenes.com/formularios/contacto/es/?origen=test-fertilidad-h-lv');
                    }
                    if( sum >= 12 && sum <= 18 ){
                        redirectMen.attr('href','https://www.ingenes.com/formularios/contacto/es/?origen=test-fertilidad-h-md');
                    }
                    if( sum > 18 ){
                        redirectMen.attr('href','https://www.ingenes.com/formularios/contacto/es/?origen=test-fertilidad-h-al');
                    }
                    if (sum <= test["resultados"][i]["maximo"]) {
                        $("#info-results-men").html(test["resultados"][i]["respuesta"]);
                        break;
                    }
                }
                navigate("results-men");
            }
            return false;
        });
        j++;
    });

    $('#question-men').html(question["pregunta"]);
    $('#question-content-men').html(question["explicacion"]);
}

function showQuestionWomen(number) {
    var buttons = "";
    var question = test["preguntas"][number];
    var j = 0;
    question["opciones"].forEach(function (respuesta) {
        buttons += "<button id='qquestion" + j + "'>" + respuesta + "</button>";
        j++;
    });
    $('#section-answers-women').html(buttons);
    var j = 0;
    question["opciones"].forEach(function (respuesta) {
        $('#qquestion' + j).click(function () {
            var id = $(this).attr('id').split("tion")[1];
            results[parseInt(currentQuestion)] = parseInt(id) + 1;
            var nextQuestion = getNextQuestion();
            if (nextQuestion != -1) {
                $('.boxCircle div').removeClass('activeCircle');
                $('#ccircle' + (nextQuestion)).addClass('activeCircle');
                showQuestionWomen(nextQuestion);
                currentQuestion = nextQuestion;
            } else {
                var sum = results.reduce(function (a, b) { return a + b; }, 0);
                $("#points-women").html(sum);
                for (i = 0; i < test["resultados"].length; i++) {
                    if (sum <= test["resultados"][i]["maximo"]) {
                        if( sum > 10 && sum <= 13 ){
                            redirectWomen.attr('href','https://www.ingenes.com/formularios/contacto/es/?origen=test-fertilidad-m-lv');
                        }
                        if( sum >= 14 && sum <= 16 ){
                            redirectWomen.attr('href','https://www.ingenes.com/formularios/contacto/es/?origen=test-fertilidad-m-md');
                        }
                        if( sum > 16 ){
                            redirectWomen.attr('href','https://www.ingenes.com/formularios/contacto/es/?origen=test-fertilidad-m-al');
                        }
                        $("#info-results-women").html(test["resultados"][i]["respuesta"]);
                        break;
                    }
                }
                navigate("results-women");
            }
            return false;
        });
        j++;
    });


    $('#question-women').html(question["pregunta"]);
    $('#question-content-women').html(question["explicacion"]);
}

function getNextQuestion() {
    for (i = 0; i < results.length; i++) {
        if (results[i] == 0) {
            return i;
        }
    }
    return -1;
}