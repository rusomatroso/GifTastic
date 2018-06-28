var animals = ["crocodile", "elephant", "leopard", "puma", "cat", "eagle", "coyote", "polar bear", "panther", "komodo dragon", "wolverine", "grizly bear", "tiger", "moose"];

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
    });
}


function getAnimalGifs(animalName) {

    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=QMJHQpZvW4PuvNmC9rJ5adhY2DgktK5b&limit=10";


    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        printAnimalGifs(response.data);
    });
}


create_buttons();

$("#addAnimal").on("click", function (event) {
    var newAnimal = $("#newAnimal").val().trim();
    animals.push(newAnimal);
    create_buttons();
});



function printAnimalGifs(animals2) {
    $('#images').empty();
    if (animals2.length < 1) {
        $('#images').html('<div class="alert alert-danger">No gifs of this animal have been found</div>');
        return;
    }
    $.each(animals2, function (index, gif) {
        $('#images').prepend('<img src="' + gif.images.downsized_still.url + '" data-still="' + gif.images.downsized_still.url + '" data-state="still" class="img-responsive img-animal" data-animated="' + gif.images.downsized.url + '">');
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

}

