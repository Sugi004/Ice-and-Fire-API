// Creating the necessary elements using DOM

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


async function getData() // Fetching data from url = https://www.anapioficeandfire.com/api/books
{
    try{
        let res = await fetch(url)
        let data = await res.json()
        console.log(data)
        constructData(data)
    }
    catch(error)
    {
        console.log(error)
        throw error;
    }
}
getData()


async function constructData(data)  // Displaying the fetched data
{
    data.forEach(async (e) => {
        let div = document.createElement("div")
        div.innerHTML = `<div class="card " style="width: 20rem; >
            <div   div class="card-body" id="text"  >
                <h5 class="card-title cardText">${e.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted cardText" >ISBN: ${e.isbn}</h6>
                <p class="cardText"><strong>Number of Pages: </strong>${e.numberOfPages}</p>
                <p class="cardText"><strong>Authors: </strong> ${e.authors[0]}</p>
                <p class="cardText" ><strong>Publisher Name: </strong> ${e.publisher}</p>
                <p class="cardText"><strong>Released Date: </strong>${e.released}</p>
                <p class="cardText"><strong>Characters: </strong>
                  <span><ul>
                    ${await getCharacterList(e.characters)}  
                  </ul></span>
                </p>
               
            </div>
        </div>`    
        body.appendChild(div)  
    });
}



async function getCharacterList(characterUrls)  // Getting th passed URL and slicing it to dsplay 5 Characters
{
  let characterList = "";
  
  const charactersToFetch = characterUrls.slice(10, 16); // We can just change the value to display more characters

  for (let e of charactersToFetch) {
    let character = await fetchCharacterData(e); // Passing the character URL to fetch data 
    characterList += `<li class="cardText">${character.name}</li>`; // Displaying as a list
  }

  return characterList;
}

async function fetchCharacterData(characterUrl) // Fetches the Data from character URL and parsing to JSON
{
  try {
    let res = await fetch(characterUrl);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function searchAndHighlight(keyword) // Function to Search the typed text in input 
{
    let text = document.querySelectorAll('.cardText');
    text.forEach((title) => {
      let html = title.innerHTML;
      let highlightedHTML = html.replace(new RegExp(keyword, 'gi'), (match) => `<span class="highlight">${match}</span>`);
      title.innerHTML = highlightedHTML;
      Array.from(title.childNodes).forEach((child) => {  // Checks whether it is HTML or text and compares it
        if (child.nodeType === Node.TEXT_NODE) {
          const span = document.createElement('span');
          span.innerHTML = child.textContent.replace(new RegExp(keyword, 'gi'), (match) => `<span class="highlight">${match}</span>`);
          title.replaceChild(span, child);
        }
      });
    });
  }


  function handleSearch() // This Handles the typed text in the input
  {
    let searchInput = document.getElementById('search');
    let keyword = searchInput.value.trim();
    if (keyword !== '') {
      const highlightedText = document.querySelectorAll('.highlight');
      highlightedText.forEach((text) => {
        text.classList.remove('highlight');
      });
      searchAndHighlight(keyword);
    }
  }

  document.addEventListener('DOMContentLoaded', () => { // 
    let searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', handleSearch);})