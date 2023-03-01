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
const toyCollection = document.getElementById("toy-collection")
const toyForm = document.querySelector(".add-toy-form")
const nameInput = document.querySelectorAll(".input-text")[0]
const imageInput = document.querySelectorAll(".input-text")[1]
///////////////////////////////////////

function fetchToys(){
fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(data => renderToys(data))
}
fetchToys()

function renderToys(data){
  data.forEach(toyInfo)
}

function toyInfo(data){
  const div = document.createElement("div")
  div.className = "card"
  toyCollection.append(div)
  const h2 = document.createElement("h2")
  const img = document.createElement("img")
  img.className = "toy-avatar"
  const p = document.createElement("p")
  const btn = document.createElement("button")
  div.append(h2, img, p, btn)
  h2.innerText = data.name
  img.src = data.image
  p.innerText = data.likes
  btn.className = "like-btn"
  btn.id = data.id
  btn.innerText = "like"
  btn.addEventListener("click", () => incrementLikes(btn.id, p))
}

toyForm.addEventListener("submit", formPost)  
function formPost(){
const formObj = {
  name: nameInput.value,
  image: imageInput.value
  }
fetch("http://localhost:3000/toys", {
  method: "POST",
  headers:{
      "Content-Type": "application/json"
    },
  body: JSON.stringify(formObj)
    })
.then(response => response.json())
.then(data => renderToys(data))
  
}

function incrementLikes(id, p){
p.innerText = parseInt(p.innerText) + 1
const likeObj = {
likes: p.innerText
}
fetch(`http://localhost:3000/toys/${id}`, {
method: "PATCH",
headers: {
  "Content-Type": "application/json"
},
body: JSON.stringify(likeObj)
})
.then(response => response.json())
.then(data => console.log(data))
}
