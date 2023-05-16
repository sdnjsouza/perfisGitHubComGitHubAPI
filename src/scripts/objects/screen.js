const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do Perfil">
                            <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado🥲'}</h1>
                                <p>${user.bio ?? 'Não possui bio cadastrada 🥲'}</p>
                                <p class="followers">👥 ${user.followers}  Seguidores </p>
                                <p class="following">👥${user.following} Seguindo</p>
                            </div>
                        </div> `
        let repositoriesItens = ''
        user.repositories.forEach(repo => {
            repositoriesItens += `<li>
                                    <a href="${repo.html_url}" target="_blank">
                                    ${repo.name}
                <ul class="repositories-info">
                  
                    <li>📓 ${repo.forks_count}</li>
                    <li>⭐ ${repo.stargazers_count}</li>
                    <li>👀 ${repo.watchers}</li>
                    <li>🧑‍💻 ${repo.language}</li>
                </ul>
                                    </a>
                                 </li>`
        })
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul class="repositories-itens">${repositoriesItens}</ul>
                                        </div>`
        }
        this.renderUserEvents(user)
    },  
    renderUserEvents(user){ 
        let createAndPushEvents = ''
        let createEvents = 0
        let pushEvents = 0

       user.events.forEach(event =>{
        if (event.type === "CreateEvent") {
            createAndPushEvents += ` <li>
            <span>${event.repo.name}</span> - Não contém Mensagem.
            </li>`
        }
        createEvents++
        if (event.type === "PushEvent") {
            createAndPushEvents += ` <li>
                        <span>${event.repo.name}
                        </span> - 
                        ${event.payload.commits[0].message ?? 'Não contém Mensagem.'}
                        </li>`
        }
        pushEvents++
        if ((createEvents + pushEvents) == 10) {
            return
        }
       })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += ` <div class="events">
                            <h2>Eventos</h2>
                            <ul>
                               ${createAndPushEvents}
                            </ul>
                        </div>`
        } 
       
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado.</h3>"
    },
    renderTimeLimit() {
        this.userProfile.innerHTML = "<h3>Requisições Limite excedidas. Espere alguns minutos para pesquisar um novo usuário</h3>"
    }
}
export { screen }