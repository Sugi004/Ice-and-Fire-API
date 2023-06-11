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
icon.setAttribute("onclick", "highlightText(id)")
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
            <div   div class="card-body" id="card"  >
                <h5 class="card-title">${e.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted" >ISBN: ${e.isbn}</h6>
                <p id="text"><strong>Number of Pages: </strong>${e.numberOfPages}</p>
                <p ><strong>Authors: </strong> ${e.authors[0]}</p>
                <p ><strong>Publisher Name: </strong> ${e.publisher}</p>
                <p ><strong>Released Date: </strong>${e.released}</p>
               
            </div>
        </div>`    
        body.appendChild(div)  
    });
}

async function characterData(i){
    let res = await fetch(url)
    let data = await res.json()
    data.forEach(e =>{
       let char = e.characters[0]
        getCharData(char)
        
    
    })
}characterData()

async function getCharData(char){
    
    
    let res = await fetch(char)
    let data = await res.json()
    // characterRender(data)
    console.log(data)
    
}


function highlightText() {
   
let searchText = document.getElementById("search").value.trim();
if (searchText) {
let text = document.getElementById("text").innerHTML;
let re = new RegExp(searched,"gi"); // search for all instances
let newText = text.replace(re,  `<mark>${searchText}</mark>`);
document.getElementById("text").innerHTML = newText;
}
}

