// (function hello(){
//     console.log("hi macha");
// })();




// function add(callBack,a,b,num1,num2){
//     console.log(a+b);
//     callBack(num1,num2);
// }

// function mul(num1,num2){
//    console.log( num1*num2);
// }

// add( mul,10,20,100,200);

// function outerFunction(){
//     let value="Outer";
//     function innerFunction(){
//         console.log(value);
//     }
//     return innerFunction;
// }

// let inner=outerFunction();
// inner();

// function* generatorFunction(){
//     yield "firstValue";
//     yield "secondValue";
//     yield "thirdValue";
//     return "finalValue";
// }


// let regenerator=generatorFunction();

// console.log(regenerator.next().value);

// console.log(regenerator.next());
// console.log(regenerator.next().done);
// console.log(regenerator.next());


// let flavours=["vannila","chocolate","butter scotch"];
// console.log(flavours[1]);

// let newArray= new Array();

// newArray[0]="first";
// newArray[1]="first";
// newArray[2]="first";
// newArray[3]="first";
// newArray[4]="first";

// console.log(newArray);



// let user={
//     name:"mohan",
//     age:20,
//     eat:function(){
//         console.log("I am gonna eat ice cream");
        
//     },
//     hobbies:["chess","carrom"]
// }

// console.log(user.hobbies[1]);
// let i=0
// user.hobbies.forEach(()=>{

//     console.log(user.hobbies[i]);
//     i++;
// })


// for(let key in user){

//     console.log(user[key]);
    
// }


// let arr=[10,20,30,40];
// let arr1=[10,20,30,40];

// let newArr=[...arr1,...arr]

// console.log(newArr);

// for(let key in arr){
//     console.log(arr[key]);
    
// }
// function rest(...arr){
//     console.log(arr);
// }

// rest(1,2,3,4,5,6);

let arr=[10,100,1000,100000];

// let str="javascript";


// for(let val of arr){
    //     console.log(val);
    // }
    
    
    
    
// for(let iterator of str){
//     console.log(iterator);
// }

arr.pop();

arr.push(500);
console.log(arr);

arr.shift();
console.log(arr);

arr.unshift(1,2);
console.log(arr);

arr.splice(1,2);
console.log(arr);

arr.splice(1,0,"a","b");

arr.splice(1,0,"a");


console.log(arr);
arr.splice(1,1,"m");


let arr4=[1,2,3,4,[5,6,]];

let newArray=arr4.flat();

console.log(newArray);


let arr5=[1,23,4,[2,34,[5,5]]];

let newArra=arr5.flat(1);



newArra.fill(0);
console.log(newArra);

arr.push(10,10,10);
console.log(arr);


let a=[1,2,3,4,5];

a.splice(1,1,9);
console.log(a);




let fruits=["apple","banana","mango","musk melon"]






