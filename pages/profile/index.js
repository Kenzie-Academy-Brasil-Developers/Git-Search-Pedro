function reposGit(){

    const userData = JSON.parse(localStorage.getItem("users"))[localStorage.getItem("userToLoad")]
   
    const userImg = document.getElementById("user-img")
    userImg.src= userData.avatar_url
    const userJob = document.getElementById("user-job")
    userJob.innerHTML = userData.company
    const userName = document.getElementById("user-name")
    userName.innerHTML= userData.name
    const userMail = document.getElementById("user-mail")
    userMail.href   = "mailto:" + userData.email
    const userRepos = document.getElementById("user-repos")

    fetch(userData.repos_url)
        .then(function(response){ return response.json()})
        .then(function(responseJson){
        responseJson.forEach(repo => {
        
            const liRepo    = document.createElement('li')
            userRepos.appendChild(liRepo)
            const repoTitle = document.createElement('span')
            const repoDescription     = document.createElement('p')
            const reposURL  = document.createElement('a')
            const repoDemo  = document.createElement('a')

            liRepo.append(repoTitle, repoDescription, reposURL, repoDemo)
            
            repoTitle.innerHTML = repo.name
            repoDescription.innerHTML= repo.description
            reposURL.href= repo.url
            reposURL.innerText = "Repositório"
            repoDemo.href= ""
            repoDemo.innerText = "Demo"

        
        })
        if(responseJson.length == 0){
            const divRepoEmpty    = document.createElement('div')
            divRepoEmpty.id = "div-repo-empty"
            const repoEmpty = document.createElement('span')
            repoEmpty.innerText = "Este usuário ainda não tem repositórios."
            divRepoEmpty.appendChild(repoEmpty)
            userRepos.appendChild(divRepoEmpty)
        }    
    })
    
}

document.addEventListener('DOMContentLoaded', function() {
    reposGit()
}, false);
