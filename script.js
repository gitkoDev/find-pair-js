const appInner = document.querySelector("#app__inner");
const imgs = document.querySelectorAll("#grid__img");


imgs.forEach((button) => {
    button.addEventListener("click", showImgs);
})

function showImgs(e) {
    e.target.classList.toggle("grid__img-show");
}

console.log(appInner);
console.log(imgs);