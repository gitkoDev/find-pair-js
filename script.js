const grid = document.querySelector("#grid");
const navAgain = document.querySelector("#nav__again").addEventListener("click", openStart);

// Array with innerHTML of the images to insert while creating new elements
const numbersArray = [
    '<img id="grid__img" class="grid__img" src="img/numbers/1.png">',
    '<img id="grid__img" class="grid__img" src="img/numbers/2.png">',
    '<img id="grid__img" class="grid__img" src="img/numbers/3.png">',
    '<img id="grid__img" class="grid__img" src="img/numbers/4.png">',
    '<img id="grid__img" class="grid__img" src="img/numbers/5.png">',
    '<img id="grid__img" class="grid__img" src="img/numbers/6.png">',
    '<img id="grid__img" class="grid__img" src="img/numbers/7.png">',
];

const fruitArray = [
    '<img id="grid__img" class="grid__img" src="img/fruit/1.png">',
    '<img id="grid__img" class="grid__img" src="img/fruit/2.png">',
    '<img id="grid__img" class="grid__img" src="img/fruit/3.png">',
    '<img id="grid__img" class="grid__img" src="img/fruit/4.png">',
    '<img id="grid__img" class="grid__img" src="img/fruit/5.png">',
    '<img id="grid__img" class="grid__img" src="img/fruit/6.png">',
    '<img id="grid__img" class="grid__img" src="img/fruit/7.png">',
];

const customArray = [
    '<img id="grid__img" class="grid__img" src="img/custom/1.png">',
    '<img id="grid__img" class="grid__img" src="img/custom/2.png">',
    '<img id="grid__img" class="grid__img" src="img/custom/3.png">',
    '<img id="grid__img" class="grid__img" src="img/custom/4.png">',
    '<img id="grid__img" class="grid__img" src="img/custom/5.png">',
    '<img id="grid__img" class="grid__img" src="img/custom/6.png">',
    '<img id="grid__img" class="grid__img" src="img/custom/7.png">',
    '<img id="grid__img" class="grid__img" src="img/custom/8.png">',
    '<img id="grid__img" class="grid__img" src="img/custom/9.png">',
    '<img id="grid__img" class="grid__img" src="img/custom/10.png">',
];
let imgArray = fruitArray;

/*          Modal window on start that lets the user choose the size and topic                */
const modal = document.querySelector("#modal-start");
const topicNumbers = document.querySelector("#topic--numbers");
const topicFruit = document.querySelector("#topic--fruit");
const topicCustom = document.querySelector("#topic--custom");

window.onload = openStart;

function openStart() {
    openedItems = 0;
    grid.style.display = "none";

    const modalStart = document.querySelector(".modal-start");
    modalStart.style.display = "block";

    const sizeSmall = document.querySelector("#size--small");
    const sizeMedium = document.querySelector("#size--medium");
    const sizeLarge = document.querySelector("#size--large");

    const startBtn = document.querySelector("#start-btn");

    startBtn.addEventListener("click", () => {
        if (sizeSmall.checked) {
            columns = 3;
            rows = 2;
            grid.style.gridTemplateColumns = "1fr 1fr 1fr";
        }
        if (sizeMedium.checked) {
            columns = 4;
            rows = 2;
            grid.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
        }
        if (sizeLarge.checked) {
            columns = 4;
            rows = 3;
            grid.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
        }

        modalStart.style.display = "none";
        startGame();
    });

    const closeBtn = document.querySelector("#modal-start__close-btn").addEventListener("click", () => {
        modalStart.style.display = "none";
    });
}

/*           When the game loads, generate the tiles and put randomized pictures in them                     */
let columns;
let rows;
// Amount of items we need to know to generate random picking of picture pairs
let items = columns * rows;
let openedItems = 0;

function getRandom() {
    // Array to push links to random pictures
    let randomArr = [];
    let items = columns * rows;
    if (topicNumbers.checked) {
        imgArray = numbersArray;
    }
    if (topicFruit.checked) {
        imgArray = fruitArray;
    }
    if (topicCustom.checked) {
        imgArray = customArray;
    }
    // Generate random numbers to use in imgArray
    while (randomArr.length < items / 2) {
        let random = Math.floor(Math.random() * imgArray.length);
        // If a number is unique, push it into the array
        if (randomArr.indexOf(imgArray[random]) === -1) {
            randomArr.push(imgArray[random]);
        }
    }
    return [...randomArr, ...randomArr];
}

// Create a grid with random images in random order when the page loads
function startGame() {
    grid.style.display = "grid";
    grid.innerHTML = "";

    newArr = getRandom();
    // Create grid items vertically (Create every column)
    for (let i = 0; i < columns; i++) {
        let column = document.createElement("div");
        column.classList.add("grid__column");
        // Create grid items in each column (Append a number of squares equal to the number of rows to the column)
        for (let i = 0; i < rows; i++) {
            let item = document.createElement("div");
            item.classList.add("grid__item");

            // Get a random number from the array and put it in the name of the image, then remove it from the array
            let randomItem = newArr.splice(Math.floor(Math.random() * newArr.length), 1);
            // Depending of what topic is chosen, open a certain folder
            item.innerHTML = randomItem;
            // Append horizonal grid items to verical
            column.append(item);
        }
        // Append the items to the grid container
        grid.append(column);
    }
}

/*                                Game flow                                     */
grid.addEventListener("click", showImgs);

// Array for src attributes of the images(to compare them)
let clickedImgs = [];

// Array for the images as elements(to manupulate their class lists)
let targets = [];

// Function to let the user open two tiles
function showImgs(e) {
    // When two items are clicked to the following
    if (clickedImgs.length < 2) {
        // Check if the user is really trying to open a tile, and not click on an opened one
        if (!e.target.classList.contains("grid__img-show")) {
            e.target.classList.add("grid__img-show");
            targets.push(e.target);
            clickedImgs.push(e.target.src);
        }
    }
    // Check if there's a match using the function checkImgs
    if (clickedImgs.length === 2) {
        setTimeout(checkImgs, 400);
    }
}

// Function to check if the images match
function checkImgs() {
    let items = columns * rows;
    if (clickedImgs[0] !== clickedImgs[1]) {
        for (let i = 0; i < targets.length; i++) {
            targets[i].classList.remove("grid__img-show");
        }
    } else {
        // If there's a match, increase the counter of the opened items, so that when all items are opened, we can congratulate the user
        openedItems += 2;
    }
    // When all items are opened, do the following
    if (openedItems === items) {
        userWins();
        openedItems = 0;
    }
    targets = [];
    clickedImgs = [];
}

// Function to congratulate the user when all items have been opened
function userWins() {
    modal.style.display = "block";
    grid.style.display = "none";
}

document.querySelector("#modal__again-btn").addEventListener("click", () => {
    modal.style.display = "none";
    openStart();
});
document.querySelector("#modal__close-btn").addEventListener("click", () => {
    modal.style.display = "none";
});
