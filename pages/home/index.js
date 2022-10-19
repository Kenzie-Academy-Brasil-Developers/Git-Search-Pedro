function getUserData(){
    const name = document.getElementById('input-search').value
    if(name !== ""){
        fetch(`https://api.github.com/users/${name}`)
        .then(function(response){ return response.json()})
        .then(function(responseJson){
         if(responseJson.message !== undefined){
            document.getElementById("span-input").style.display= ""
         }else{
            document.getElementById("span-input").style.display= "none"
            
            let cont    = localStorage.getItem("cont")
            let users   = JSON.parse(localStorage.getItem("users"))
            
            if(users == null){
                users = [{},{},{}]
            }
            if(cont == null || cont == 3){
                cont = 0
            }
            
            let naoExiste = true
            let userToLoad = 0
            users.forEach((user, index) => {
                if(user.hasOwnProperty("login")){
                    if(user.login == responseJson.login){
                        naoExiste = false
                        userToLoad = index
                    }
                }
            });
            if(naoExiste){
                userToLoad  = cont
                users[cont] = responseJson
                cont++ 
                localStorage.setItem("users",JSON.stringify(users))
                localStorage.setItem("cont",cont)
                localStorage.setItem("userToLoad",userToLoad)
                
            }
            window.location.href="../profile/index.html"
        }
         
        })
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const ul = document.getElementById('ul-down')

    const users   = JSON.parse(localStorage.getItem("users"))
    users.forEach((user, index) => {
        if(user.hasOwnProperty("login")){
            const liProfile     = document.createElement('li')
            const imgProfile    = document.createElement('img')
            const buttonProfile = document.createElement('button')
            
            liProfile.classList = "li-profile"
            imgProfile.classList = "img-profile"
            imgProfile.src     = user.avatar_url
            buttonProfile.innerText    = "visitar esse perfil"
            buttonProfile.classList = "button-Profile"
            buttonProfile.addEventListener('click',() =>{
                
                localStorage.setItem("userToLoad",index)
                window.location.href="../profile/index.html"
            })
            ul.appendChild(liProfile)
            liProfile.append(imgProfile, buttonProfile)
        }
    })

}, false);

