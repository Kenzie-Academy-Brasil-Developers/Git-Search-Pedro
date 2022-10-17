
 
  
document.addEventListener('DOMContentLoaded', function() {
  
    const span = document.getElementById('user-name')
    let userToLoad  = localStorage.getItem("userToLoad")
    let users = JSON.parse(localStorage.getItem("users"))
     
    span.innerHTML=users[userToLoad].login
}, false);