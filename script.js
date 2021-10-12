const grid = document.querySelector("#grid");

// Array with innerHTML of the images to insert while creating new elements
const imgArray = [
'<img id="grid__img" class="grid__img" src="img/1.png">', 
'<img id="grid__img" class="grid__img" src="img/2.png">', 
'<img id="grid__img" class="grid__img" src="img/3.png">', 
'<img id="grid__img" class="grid__img" src="img/4.png">',
'<img id="grid__img" class="grid__img" src="img/5.png">',
'<img id="grid__img" class="grid__img" src="img/6.png">',
'<img id="grid__img" class="grid__img" src="img/7.png">'
];

const modal = document.querySelector("#modal");


/*           When the game loads, generate the tiles and put randomized pictures in them                     */
let columns = 3;
let rows = 2;
// Amount of items we need to know to generate random picking of picture pairs
let items = columns * rows;
let openedItems = 0;

function getRandom() {
    // Array to push links to random pictures
    let randomArr = [];
    // Generate random numbers to use in imgArray
    while(randomArr.length < items / 2) {
        let random = Math.floor((Math.random() * imgArray.length) + 1);
        // If a number is unique, push it into the array
        if(randomArr.indexOf(random) === -1) {
            randomArr.push(random);
        }
    }
    return [...randomArr, ...randomArr];
}


 // Create a grid with random images in random order when the page loads
window.onload = startGame;

function startGame() {
    openedItems = 0;
    modal.style.display = "none";
    grid.innerHTML = "";
    newArr = getRandom();
    // Create grid items vertically (Create every column)
    for(let i = 0; i < columns; i++) {
        let column = document.createElement("div");
        column.classList.add("grid__column");
        // Create grid items in each column (Append a number of squares equal to the number of rows to the column)
        for(let i = 0; i < rows; i++) {
            let item = document.createElement("div");
            item.classList.add("grid__item");

            // Get a random number from the array and put it in the name of the image, then remove it from the array
            let randomItem = newArr.splice(Math.floor(Math.random() * newArr.length), 1);
            item.innerHTML = `<img class="grid__img" src="img/${randomItem}.png">`;
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
    if(clickedImgs.length < 2) {
        // Check if the user is really trying to open a tile, and not click on an opened one
        if(!e.target.classList.contains("grid__img-show")) {
            e.target.classList.add("grid__img-show");
            targets.push(e.target);
            clickedImgs.push(e.target.src);
            console.log(e.target);
        } else {
            console.log("already clicked");
        }
    } 
     // Check if there's a match using the function checkImgs
    if(clickedImgs.length === 2) {
        setTimeout(checkImgs, 500);
    }
}   


// Function to check if the images match
function checkImgs() {
    if(clickedImgs[0] !== clickedImgs[1]) {
            for(let i = 0; i < targets.length; i++) {
                targets[i].classList.remove("grid__img-show");
            }
    } else {
        
        // If there's a match, increase the counter of the opened items, so that when all items are opened, we can congratulate the user
        openedItems += 2;
    }
    // When all items are opened, do the following
    if(openedItems === items) {
        userWins();
    }
        targets = [];
        clickedImgs = [];
        console.log(openedItems);
}


// Function to congratulate the user when all items have been opened
function userWins() {
    modal.style.display = "block";
    
}


document.querySelector("#modal__again-btn").addEventListener("click", startGame);
document.querySelector("#modal__close-btn").addEventListener("click", () => {
    modal.style.display = "none";
});