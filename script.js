const appInner = document.querySelector("#app__inner");


const imgs = document.querySelectorAll("#grid__img");
const oneItem = document.querySelector("#grid__item");
const item = document.querySelectorAll(".grid__item");

// Array with innerHTML of the images to insert while creating new elements
const imgArray = [
'<img id="grid__img" class="grid__img" src="img/1.png">', 
'<img id="grid__img" class="grid__img" src="img/2.png">', 
'<img id="grid__img" class="grid__img" src="img/3.png">', 
'<img id="grid__img" class="grid__img" src="img/4.png">'
];


let columns = 3;
let rows = 2;
// Amount of items we need to know to generate random picking of picture pairs
let items = columns * rows;
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
newArr = getRandom();


// Create a grid with random images in random order when the page loads
window.onload = (() => {

    // Create a grid container
    const grid = document.createElement("div");
    grid.classList.add("grid");
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
            item.innerHTML = `<img id="grid__img" class="grid__img" src="img/${randomItem}.png">`;
            // Append horizonal grid items to verical
            column.append(item);
        }
        // Append the items to the grid container
        grid.append(column);
    }
    // Append the grid to the main container
    appInner.append(grid);
});




appInner.addEventListener("click", showImgs);

// Function to check if images are the same. If they are - leave them open. Otherwise, turn them back around.
function showImgs(e) {
    e.target.classList.toggle("grid__img-show");
}


// Generate a number or unique digits, duplicate them, insert them in the innerHTML of every image (e.g. src= 1(HERE WE INSERT THE RANDOMIZED NUMBER).png)