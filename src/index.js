let addToy = false;
``
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//! DOM Methods

///////////////////////////////////////
//TODO: Get the toy collection div 
const toyContainer = document.getElementById("toy-collection")
const toyForm = document.querySelector(".add-toy-form")
// const inputName = toyForm.name
// const inputImage = toyForm.image
const inputName = document.querySelectorAll(".input-text")[0]
const inputImage = document.querySelectorAll(".input-text")[1]
///////////////////////////////////////

//TODO: Fetch the data from JSON
//? Function to fetch the toys
function fetchToys(){
fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(data => {
  
  data.forEach(data => renderToys(data))}
)
}
//? Call function
fetchToys()



//? Function with the information contained in the Toy card
function renderToys(data){
//TODO: Create div for Toys Cards
const div = document.createElement("div")
//TODO: Add a class name to this div
div.className = "card"
//TODO: Add created div to the toy-collection div
toyContainer.append(div)
//TODO: Create h2 tag with toy's name
const h2 = document.createElement("h2")
h2.innerText = data.name
//TODO: Create img tag with toy's image
const img = document.createElement("img")
img.src = data.image
//TODO: Add a class name to img tag
img.className = "toy-avatar"
//TODO: Create p tag with toy's likes
const p = document.createElement("p")
p.innerText = data.likes
//TODO: Create button tag
const btn = document.createElement("button")
btn.className = "like-btn"
//TODO: Add an id attribute with toy's id
btn.id = data.id
btn.textContent = "like"
div.append(h2, img, p, btn)
btn.addEventListener("click",()=> incrementLikes(btn.id, p))
}

//TODO: Event listener for toy form
toyForm.addEventListener("submit", formPost)  
//? Function to create the POST
function formPost(e){
e.preventDefault()
//! Create an object to be passed
//! into the body of the POST
const formObj = {
  name: inputName.value,
  image: inputImage.value,
  likes: 0
}
//! Fetch toys and provide second argument
//! with the object to post
renderToys(formObj)
e.target.reset()

//? use this data we are posting
//? and add it to the DOM



}

//TODO: PATCH request to increase likes
//? Function to increment likes
//? need parameter of id and 
//? the element we will modify
//? when incrementing
function incrementLikes(id, element){
//TODO: increment the value that
//TODO: currently exsits in "likes"
element.innerText = parseInt(element.innerText) + 1
//? Create object that contains
//? what we want to edit in database
const patchObj = {
  likes: element.innerText
}
fetch(`http://localhost:3000/toys/${id}`, {
method: "PATCH",
headers: {
  "Content-Type": "application/json"
},
body:JSON.stringify(patchObj)
})
.then(response => response.json())
.then(data => console.log(data))

//? Fetch using backticks to include id





//TODO: Pass increment likes function
//TODO: to an event listener
}






