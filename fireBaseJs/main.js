import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, onValue, remove}from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";


const appSetting={
    databaseURL: "https://jscrud-80213-default-rtdb.firebaseio.com/"
}

const tblBodyELe = document.querySelector("#tblBody");
const app=initializeApp(appSetting);
const userList=ref(database,"users")


onValue(userList, (snapshot) => {
    tblBodyELe.innerHTML="";
    if (snapshot.exists()) {
        let userArray = Object.entries(snapshot.val());
        console.log(userArray);

        for (let i = 0; i < userArray.length; i++) {
            let currentUser = userArray[i];
            let userId = currentUser[0];
            let userValue = currentUser[1];
            tblBodyELe.innerHTML += `
    <tr>
                <td>${i+1}</td>
                <td>${userValue.name}</d>
                <td>${userValue.age}</td>
                <td>${userValue.city}</td>
                <td><Button data-id=${userId} class=btn-edit><ion-icon name="create" ></ion-icon></Button></td>
                <td><Button data-id=${userId} class=btn-delete><ion-icon name="trash"></ion-icon></Button></td>
            </tr>
            `
        }

    }
    else {
        tblBodyELe.innerHTML = '<tr><td colspan=6>No record found</td></tr>';
    }
})


document.addEventListener('click',(e)=>{
    if(e.target.classList.contains("btn-edit")){
 const id=e.target.dataset.id;
 let tdEle=e.target.closest('tr').children;
 idEle.value=id;
 nameEle.value=tdEle[1].textContent;
 ageEle.value=tdEle[2].textContent;
 cityEle.value=tdEle[3].textContent;


  sessionStorage.setItem("id",id);
  sessionStorage.setItem("name",tdEle[1].textContent);
  sessionStorage.setItem("age",tdEle[2].textContent);
  sessionStorage.setItem("city",tdEle[3].textContent);
  window.onload.href="main.html"
    }
    
   else if(e.target.classList.contains("btn-delete")){
    const id=e.target.dataset.id;
    if(confirm("Are your sure to delete ?")){
        let data=ref(database,`users/${id}`);
        remove(data);
    }
    }
    
    
    
})