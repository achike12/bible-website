async function getBible(book,chapter){

let url = `https://bible-api.com/${book}%20${chapter}`

let response = await fetch(url)

return await response.json()

}
