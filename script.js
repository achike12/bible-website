const bookSelect = document.getElementById("bookSelect")
const versesDiv = document.getElementById("verses")
const bookmarksDiv = document.getElementById("bookmarks")

books.forEach(book=>{
let option = document.createElement("option")
option.text = book
bookSelect.add(option)
})

async function loadChapter(){

let book = bookSelect.value
let chapter = document.getElementById("chapterInput").value

let data = await getBible(book,chapter)

versesDiv.innerHTML=""

data.verses.forEach(v=>{

let div = document.createElement("div")

div.className="verse"

div.innerHTML = `<b>${v.verse}</b> ${v.text}`

div.onclick = ()=> saveBookmark(book,chapter,v.verse,v.text)

versesDiv.appendChild(div)

})

}

function toggleDark(){

document.body.classList.toggle("dark")

}

function saveBookmark(book,chapter,verse,text){

let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")

bookmarks.push(`${book} ${chapter}:${verse} - ${text}`)

localStorage.setItem("bookmarks",JSON.stringify(bookmarks))

loadBookmarks()

}

function loadBookmarks(){

let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")

bookmarksDiv.innerHTML=""

bookmarks.forEach(b=>{

let p = document.createElement("p")

p.innerText=b

bookmarksDiv.appendChild(p)

})

}

loadBookmarks()

async function searchVerse(){

let query = document.getElementById("search").value

let url = `https://bible-api.com/${query}`

let response = await fetch(url)

let data = await response.json()

versesDiv.innerHTML=""

data.verses.forEach(v=>{

let p=document.createElement("p")

p.innerHTML=`<b>${v.book_name} ${v.chapter}:${v.verse}</b> ${v.text}`

versesDiv.appendChild(p)

})

}

async function dailyVerse(){

let randomBooks = books[Math.floor(Math.random()*books.length)]

let chapter = Math.floor(Math.random()*10)+1

let data = await getBible(randomBooks,chapter)

let verse = data.verses[Math.floor(Math.random()*data.verses.length)]

document.getElementById("dailyVerse").innerHTML =
`<h2>Daily Verse</h2><p>${verse.text}</p>`

}

dailyVerse()
