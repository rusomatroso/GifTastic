var animals = ["crocodile", "elephant", "leopard", "shark", "cat", "eagle", "coyote", "polar bear", "panther", "komodo dragon", "monkey", "grizly bear", "tiger", "moose", "mouse"];
var offset = 0;
$('#showExtra10').hide();

function create_buttons() {
    $("#buttons").empty();
    for (var i = 0; i < animals.length; i++) {

        var btn = $("<button>");
        btn.addClass("btn btn-primary btn-animal");
        btn.attr("animal-name", animals[i]);
        btn.text(animals[i]);
        $("#buttons").append(btn);
    }
    $('.btn-animal').on('click', function () {
        var animalName = $(this).text();
        getAnimalGifs(animalName);

        sessionStorage.clear();
        sessionStorage.setItem("currentAnimal", animalName);
    });
}

create_buttons();

function getAnimalGifs(animalName) {

    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=QMJHQpZvW4PuvNmC9rJ5adhY2DgktK5b&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        printAnimalGifs(response.data, false);
    });
}

$("#addAnimal").on("click", function (event) {
    var newAnimal = $("#newAnimal").val().trim();
    animals.push(newAnimal);
    create_buttons();
});



$("#showExtra10").on("click", function (event) {
    offset = offset+10;
    var currentAnimal = sessionStorage.getItem("currentAnimal");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + currentAnimal + "&api_key=QMJHQpZvW4PuvNmC9rJ5adhY2DgktK5b&limit=10&offset=" + offset;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        printAnimalGifs(response.data, true);
    });

});


function printAnimalGifs(animals2, prepend) {
    if(prepend === false) {
        $('#images').empty();
    }
    if (animals2.length < 1) {
        $('#images').html('<div class="alert alert-danger">No gifs of this animal have been found</div>');
        return;
    }
    $.each(animals2, function (index, gif) {
        $('#images').prepend(
        '<div class="card text-center"  style="width: 12rem;">\n' +
            '  <img class="img-responsive img-animal crd-img"  src="' + gif.images.downsized_still.url + '" data-still="' + gif.images.downsized_still.url + '" data-state="still" data-animated="' + gif.images.downsized.url + '">\n' +
            '  <div class="card-body">\n' +
            '    <div class="card-text">Name</div>\n' +
            '    <p class="mb-2"><a href="' + gif.images.original.url + '" target="_blank" class="btn btn-secondary btn-sm">download</a></p>\n' +
            '  </div>\n' +
            '</div>')
    });

    $('.img-animal').on('click', function () {
        var state = $(this).attr('data-state');
    if (state === 'still') {
            $(this).attr("src", $(this).attr('data-animated'));
            $(this).attr("data-state", 'animated');
        } else {
            $(this).attr("src", $(this).attr('data-still'));
            $(this).attr("data-state", 'still');
        }

    });
    $('#showExtra10').show();
}

