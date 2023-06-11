let root = document.createElement("div")
root.setAttribute("class", "container-fluid")
root.setAttribute("id", "root")
document.body.appendChild(root)

let h1 = document.createElement("h1")
h1.setAttribute("id","h1")
h1.innerHTML = "Ice And Fire"
root.appendChild(h1)

let div = document.createElement("div")
div.setAttribute("class", "container-fluid")
root.appendChild(div)

let search = document.createElement("input")
search.setAttribute("type", "text")
search.setAttribute("id", "search")
search.setAttribute("placeholder", "Search...")
div.append(search)

let body = document.createElement("div")
body.setAttribute("class", "card-wrapper")
root.appendChild(body)

let icon = document.createElement("i");
icon.setAttribute("class", "fa-solid fa-magnifying-glass search-icon")
icon.setAttribute("id", "searchButton")
div.appendChild(icon)



const url = "https://www.anapioficeandfire.com/api/books"


async function getData(){
    try{
        let res = await fetch(url)
        let data = await res.json()
        console.log(data)
        constructData(data)
    }
    catch(error){
        console.log(error)
    }
}
getData()


async function constructData(data){
    data.forEach(e => {
        let div = document.createElement("div")
        div.innerHTML = `<div class="card " style="width: 20rem; >
            <div   div class="card-body" id="text"  >
                <h5 class="card-title cardText">${e.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted cardText" >ISBN: ${e.isbn}</h6>
                <p class="cardText"><strong>Number of Pages: </strong>${e.numberOfPages}</p>
                <p class="cardText"><strong>Authors: </strong> ${e.authors[0]}</p>
                <p class="cardText" ><strong>Publisher Name: </strong> ${e.publisher}</p>
                <p class="cardText"><strong>Released Date: </strong>${e.released}</p>
               
            </div>
        </div>`    
        body.appendChild(div)  
    });
}

// async function characterData(i){
//     let res = await fetch(url)
//     let data = await res.json()
//     data.forEach(e =>{
//        let char = e.characters[0]
//         getCharData(char)
        
    
//     })
// }characterData()

// async function getCharData(char){
    
    
//     let res = await fetch(char)
//     let data = await res.json()
//     characterRender(data)
//     console.log(data)
    
// }


// function highlightText() {
   
// let searchText = document.getElementById("search").value.trim();
// if (searchText) {
// let text = document.getElementById("text").innerHTML;
// let re = new RegExp(searched,"gi"); // search for all instances
// let newText = text.replace(re,  `<mark>${searchText}</mark>`);
// document.getElementById("text").innerHTML = newText;
// }
// }

function searchAndHighlight(keyword) {
    const text = document.querySelectorAll('.cardText');
    text.forEach((title) => {
      const html = title.innerHTML;
      const highlightedHTML = html.replace(new RegExp(keyword, 'gi'), (match) => `<span class="highlight">${match}</span>`);
      title.innerHTML = highlightedHTML;
      Array.from(title.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const span = document.createElement('span');
          span.innerHTML = child.textContent.replace(new RegExp(keyword, 'gi'), (match) => `<span class="highlight">${match}</span>`);
          title.replaceChild(span, child);
        }
      });
    });
  }

  function handleSearch() {
    const searchInput = document.getElementById('search');
    const keyword = searchInput.value.trim();
    if (keyword !== '') {
      const highlightedText = document.querySelectorAll('.highlight');
      highlightedText.forEach((text) => {
        text.classList.remove('highlight');
      });
      searchAndHighlight(keyword);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', handleSearch);})