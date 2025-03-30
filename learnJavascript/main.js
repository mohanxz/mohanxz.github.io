//object methods

let person={
    pName:'Mohan',
    age:21
}

//object create 

console.log(person)

let newObj=Object.create(person);

console.log(newObj.__proto__);

console.log(Object.getPrototypeOf(newObj));

//Assign object

Object.assign(person,{salary:12000000});

//object  entries

let new1=Object.entries(person);
console.log(new1);

let new2=Object.fromEntries(new1);

console.log(new2);

let onlyKeys=Object.keys(new2);

console.log(onlyKeys);

Object.freeze(new2);

new2.pName="mohanraj";
console.log(new2)

let person1={
    pName:'Mohan',
    age:21
}

console.log(Object.isFrozen(person1));


class User{
   static #_name="";
    constructor(name){
        User.#_name=name
    }

    static setname(newName){
        User.#_name=newName;
    }
   static getName(){
        return this.#_name.toUpperCase();
    }

}

const obj=new User("Alice");
console.log(User.getName());



//map

//setting key:value in map
let map =new Map();
map.set("name","alice");
map.set("salary",100000);

//updating  key:value in map
map.set("name","mohan");

console.log(map.get("name"));


//deleting key in map using delete
map.delete("name");

console.log(map);



//checking the key exist in map
console.log(map.has("salary"));
console.log(map.has("name"));


//to get the map size
console.log(map.size)


//loop through a map
map.forEach((key,value)=>{
    console.log(`${key} : ${value}`);
})

for(let [key,value] of map){
    console.log(`${key} : ${value}`);
}

//to clear the entire map

console.log((map.clear()))
console.log((map.size))



//Set does not allow any duplicates and does not maintain any index
//Creating a set

let mySet=new Set();

console.log(mySet);

//initializing values in set
mySet=new Set([1,2,3,4,5])
console.log(mySet)


mySet.add("Apple");
mySet.add("Banana");
mySet.add("Apple");


let itemsToDelete=[1,2,3,4,5];

let itemsToDeleteSet=new Set([1,2,3,4,5])

//deleting more element using for each loop 
itemsToDelete.forEach(element=> 
    mySet.delete(element)
)


//Creating new set with only elements not in itemsToDelete
let filteredSet=new Set([...mySet].filter(item=>
    !itemsToDeleteSet.has(item)
))
console.log(filteredSet)


//to check the element exists in set
let newSet=new Set();
mySet.forEach((key)=> 
    
    newSet.add(key.toUpperCase()));

console.log(newSet.has("APPLE"));

console.log(newSet);


import { add } from "./script.js";

console.log(add(10,20));

//Delayed execution using setTimeOut

function fetchData(callBack){
    console.log("Fetching Data");

    setTimeout(()=>{
        callBack("Here is your data");

    })
}


fetchData(data=>console.log(data));
