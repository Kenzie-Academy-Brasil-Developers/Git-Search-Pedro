function reposGit(){

    const userData = JSON.parse(localStorage.getItem("users"))[localStorage.getItem("userToLoad")]
   
    const userImg = document.getElementById("user-img")   
    const userJob = document.getElementById("user-job")    
    const userName = document.getElementById("user-name")    
    const userMail = document.getElementById("user-mail")    
    const userRepos = document.getElementById("user-repos")

    userImg.src= userData.avatar_url
    userJob.innerHTML = userData.company
    userName.innerHTML= userData.name
    userMail.href   = "mailto:" + userData.email



    fetch(userData.repos_url)
        .then(function(response){ return response.json()})
        .then(function(responseJson){
        responseJson.forEach(repo => {
        
            const liRepo            = document.createElement('li')           
            const repoTitle         = document.createElement('span')
            const repoDescription   = document.createElement('p')
            const reposButton       = document.createElement('div')
            const reposURL          = document.createElement('a')
            const repoDemo          = document.createElement('a')

            userRepos.appendChild(liRepo)
            liRepo.append(repoTitle, repoDescription, reposButton)
            reposButton.append(reposURL, repoDemo)
            
            repoTitle.innerHTML = repo.name
            repoDescription.innerHTML= repo.description
            reposURL.href= repo.url
            reposURL.innerText = "Repositório"
            repoDemo.href= ""
            repoDemo.innerText = "Demo"


            liRepo.classList            = "li-repo"
            repoTitle.classList         = "repo-title"   
            repoDescription.classList   = "repo-description"
            reposButton.classList       = "div-button"
            reposURL.classList          = "repos-url"
            repoDemo.classList          = "repo-demo"
        })
        if(responseJson.length == 0){
            const divRepoEmpty    = document.createElement('div')            
            const repoEmpty = document.createElement('span')
            
            
            
            divRepoEmpty.id = "div-repo-empty"
            divRepoEmpty.appendChild(repoEmpty)
            userRepos.appendChild(divRepoEmpty)

            divRepoEmpty.classList  = "div-empty"
            repoEmpty.classList     = "repo-empty"

            repoEmpty.innerText = "Este usuário ainda não tem repositórios."
        }    
    })
    
}

document.addEventListener('DOMContentLoaded', function() {
    reposGit()
}, false);
