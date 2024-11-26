var lengthOfSequence = 1;
var colors = ["green", "red", "yellow", "blue"];
var createdSequence = [];

function levelChange(lengthOfSequence) {
    $("h1").text("Level " + lengthOfSequence);
}

function makeSequence() {
    let indexOfColor = Math.floor(Math.random() * 4);
    createdSequence.push(colors[indexOfColor]); // Add one new color to the existing sequence
    return createdSequence;
}

function makeSound(buttonId) {
    switch (buttonId) {
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;

        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;

        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;

        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
    }
}


function showNewElement(sequence) {
    const newElement = sequence[sequence.length - 1]; // Get the last element (newly added)
    $("#" + newElement).addClass("transform");
    makeSound(newElement); // Play sound for the new element
    setTimeout(() => {
        $("#" + newElement).removeClass("transform");
    }, 1500); // Duration of the effect
}

function makeLosingSound(){
    var losingSound = ["sounds/sound1.mp3", "sounds/sound2.mp3", "sounds/sound3.mp3", "sounds/sound4.mp3"];
    var randomSound = losingSound[Math.floor(Math.random() * losingSound.length)];
    var audio = new Audio(randomSound);
    audio.play();
}

function resetGame() {
    lengthOfSequence = 1;
    createdSequence = [];
    $("body").one("keypress", function () {
        levelChange(lengthOfSequence);
        const sequence = makeSequence();
        showNewElement(sequence);
        checkUserSequence();
    });
}

function checkUserSequence() {
    var userSequence = [];
    var currentStep = 0;

    $("button").off("click").on("click", function () {
        var buttonId = $(this).attr("id");

        // Check if the current step is correct
        if (buttonId !== createdSequence[currentStep]) {
            // Play losing sound and show game over effects
            makeLosingSound();

            $("body").addClass("gameover");
            $("h1").text("Game Over! Press any key to restart.");
            setTimeout(() => $("body").removeClass("gameover"), 200);

            resetGame(); // Reset the game state
            return;
        }

        // If correct, proceed normally
        makeSound(buttonId); // Play the sound for the button
        userSequence.push(buttonId); // Add the button to the user's sequence
        currentStep++;

        // Check if the user completed the sequence
        if (userSequence.length === createdSequence.length) {
            lengthOfSequence++;
            $("button").off("click"); // Prevent further clicks until the next sequence
            setTimeout(() => {
                levelChange(lengthOfSequence);
                const sequence = makeSequence();
                showNewElement(sequence); // Show only the new element
                checkUserSequence();
            }, 2000);
        }
    });
}


function game() {
    $("body").one("keypress", function () {
        levelChange(lengthOfSequence);
        const sequence = makeSequence();
        showNewElement(sequence); // Show only the new element
        checkUserSequence();
    });
}

game();


