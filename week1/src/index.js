
if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  const dogs = ["akita", "husky", "malamute", "rottweiler", "eskimo"];
  for (let i = 0; i < 5; i++) {
    createElements();
  }
  setImage(dogs);
  getWikiData(dogs)
}

function createElements() {
  const container = document.getElementsByClassName('container');

  const item = document.createElement("div");
  const header = document.createElement("h1");
  const content = document.createElement("div");
  const text = document.createElement("p");
  const imgContainer = document.createElement("div");
  const image = document.createElement("img");

  item.classList.add("wiki-item");
  header.classList.add("wiki-header");
  content.classList.add("wiki-content");
  text.classList.add("wiki-text");
  imgContainer.classList.add("img-container");
  image.classList.add("wiki-img");

  imgContainer.appendChild(image);
  content.appendChild(text);
  content.appendChild(imgContainer);
  item.appendChild(header);
  item.appendChild(content);
  container[0].appendChild(item);
}

async function fetchDog(breed) {
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error("There was error while fetching");
    return;
  }
  const data = await response.json();
  return data;
}
async function setImage(dogs) {
  const pictures = [];
  for (let i = 0; i < dogs.length; i++) {
    pictures.push(await fetchDog(dogs[i]));
  }

  const elements = document.getElementsByClassName("wiki-img");
  const names = document.getElementsByClassName("wiki-header");

  for (let i = 0; i < elements.length; i++) {
    
    elements[i].src = pictures[i].message;
    names[i].textContent = dogs[i];
  }
}
async function getWikiData(dogs){
  
  const elements = document.getElementsByClassName('wiki-text');
  for (let i = 0; i < dogs.length; i++) {
    const data = await getWiki(dogs[i]);
    elements[i].textContent = data.extract
    
    
  }
}


async function getWiki(breed){
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error("There was error while fetching");
    return;
  }
  const data = await response.json();
  return data;
}
