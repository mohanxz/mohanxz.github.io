import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, set } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-database.js";

const appSetting = {
    databaseURL: "https://jscrud-80213-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const userlist = ref(database, "users");

const idEle = document.querySelector("#id");
const nameEle = document.querySelector("#name");
const ageEle = document.querySelector("#age");
const cityEle = document.querySelector("#city");
const form = document.querySelector("#form");

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!nameEle.value.trim() || !ageEle.value.trim() || !cityEle.value.trim()) {
        alert("Please fill All details");
        return;
    }
    
    if (idEle.value) {
    set(ref(database,'users/'+idEle.value),{
    name: nameEle.value.trim(),
    age: ageEle.value.trim(),
    city: cityEle.value.trim()
    })
    clear();
    return;
}


    const newUser = {
        name: nameEle.value.trim(),
        age: ageEle.value,
        city: cityEle.value.trim()

    };
    push(userlist, newUser)
    alert("Data saved!");
    clear();

});

export let clear = () => {
    idEle.value=""
    nameEle.value = ""
    ageEle.value = ""
    cityEle.value = ""
}

window.onload=()=>{
    const idEle = document.querySelector("#id");
    const nameEle = document.querySelector("#name");
    const ageEle = document.querySelector("#age");
    const cityEle = document.querySelector("#city");
    
    if(sessionStorage.getItem("id")){
        idEle.value=sessionStorage.getItem("id");
        nameEle.value=sessionStorage.getItem("name");
        ageEle.value=sessionStorage.getItem("age");
        cityEle.value=sessionStorage.getItem("city");

        sessionStorage.clear();
    }
}