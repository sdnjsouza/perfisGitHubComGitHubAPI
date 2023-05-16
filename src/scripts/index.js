import { getUser } from "./services/users.js"
import { getRepositories } from "./services/repositories.js"
import { getEvents } from "./services/events.js"

import { user } from "./objects/users.js"
import { screen } from "./objects/screen.js"

const btnSearch = document.getElementById('btn-search')
const inputSearch = document.getElementById('input-search')

btnSearch.addEventListener('click', () => {
    if ( validateEmptyInput(inputSearch.value) ) return
    getUserData(inputSearch.value)
})

inputSearch.addEventListener('keyup', (e) => {
    const inputName = e.target.value;
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13 
    
    if (isEnterKeyPressed) {
       if (validateEmptyInput(inputName)) return
        getUserData(inputName)
    }
})

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert("Preencha o campo com o nome do usuário do GitHub")
    return true
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName)
    if (userResponse.message === "API rate limit exceeded for 189.71.242.45. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)") {
        screen.renderTimeLimit()
        return
    }
    if (userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }
    const eventsResponse = await getEvents(userName)
    const repositoriesResponse = await getRepositories(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
    
    screen.renderUser(user)
   
}







