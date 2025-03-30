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

// let arr=[10,100,1000,100000];

// let str="javascript";


// for(let val of arr){
    //     console.log(val);
    // }
    
    
    
    
// for(let iterator of str){
//     console.log(iterator);
// }

// arr.pop();

// arr.push(500);
// console.log(arr);

// arr.shift();
// console.log(arr);

// arr.unshift(1,2);
// console.log(arr);

// arr.splice(1,2);
// console.log(arr);

// arr.splice(1,0,"a","b");

// arr.splice(1,0,"a");


// console.log(arr);
// arr.splice(1,1,"m");


// let arr4=[1,2,3,4,[5,6,]];

// let newArray=arr4.flat();

// console.log(newArray);


// let arr5=[1,23,4,[2,34,[5,5]]];

// let newArra=arr5.flat(1);



// newArra.fill(0);
// console.log(newArra);

// arr.push(10,10,10);
// console.log(arr);


// let a=[1,2,3,4,5];

// a.splice(1,1,9);
// console.log(a);



// // let newArr=fruits.forEach(fruit=>{
// //     return `item ${++index} : ${fruit}`;
// // });

// // console.log(newArr);


// let fruits=["apple","banana","mango","musk melon"]

// let newArr1=fruits.map((fruit,index)=> 
//      {
        
//         return `item ${index+1} : ${fruit}`
// })

 
// console.log(newArr1);


// let num=[41,1,3,4,5];

// let greater=num.filter(num=>num>3);
// console.log(greater);


// let reduce=num.reduce((accumulator,currentValue)=>{
//     return accumulator+currentValue;
// })

// console.log(reduce);

// //first occurence only fetched
// let find=num.find(num=>num%2==0);

// console.log(find);


// let vehicles=['aircraft','bus','car'];

// let find1=vehicles.find(vehicles=>vehicles.startsWith('c'));
// console.log(find1);


// let regex=/@/;

// let str="2k21aids@@@kiot.ac.in";

// let found=(regex.test(str));


// console.log(found);


// //anonymous function
// (function (){
//    console.log("Good Morning")
// })();


// //arrow function
// let add=(x,y)=>{
//     return x+y;
// }

// console.log(add(2,4));

// //pure function
// // function expo(x,y){
// //     console.log(x**y);
// // }

// expo(12,2);

// //impure function
// function math(x){
//      console.log(Math.floor(Math.random()*10+x));
// }

// math(1);
// math(1);
// math(1);
// math(1);


// //impure function test-2

// let flag=0;

// let impure=(x)=>{
//  flag++;
//  console.log(flag+1);
// }

// impure(1);
// impure(1);
// impure(1);
// impure(1);



// //Higher Order function
// let arr1=[1,2,3,4,5];
// //map 
// let mapped =arr1.map(arr=>arr*2);
// console.log(mapped);


// //filter
// let filter=arr1.filter(arr=>arr>3);
// console.log(filter);


// //reduce
// let reduce1=arr1.reduce((accumulator,currentValue)=>accumulator+currentValue);
// console.log(reduce1);


// function expo(x,y){
//     console.log(x**y);
// }


// function num1(fun1,a,b){
//         fun1(a,b);  
// }

// num1(expo,2,2);


// function msg(userName="guest"){
//     console.log("Welcome "+userName);
// }

// msg();
// msg("mohan raj");

// //Template Literal
// let employee={
//     Name:"mohan raj",
//     Id:456
// }


// console.log(`Good morning ${employee.Name}`);

// //copying array
// let arr3=[1,2,3,4,5]
// let array1=[];
// array1.push(...arr3);
// console.log(array1);

// //adding elements in  array

// let arr7=[10,20,30,40];
// arr7.push(...arr7,50,60,50);

// console.log(arr7);


// //mergin array
// let arr10=[1,2,3,4,5]
// let array11=['m','o','h','a','n'];
// let mergedArray=array11.push(...arr3);
// console.log(mergedArray);

// //String to array
// let str10='mohanraj';

// let strToArr=[];
// strToArr.push(...str10);
// console.log(strToArr);

// let person1={
//     id:101,
//     city:'salem'
// }

// let person2={
//     id:102,
//     city:'chennai'
// }
// //using spread operator in object 
// let persons={...person1};
// console.log(persons);




// let index=1;

// setTimeout(()=>{

//     console.log("Hi set");},5000);




    // document.getElementById('btn').textContent="hello";



    // class Customer{
    //     #customerName;
    //     #customerId;
    //   constructor(customerName,customerId){
    //         this.customername=customerName;
    //         this.customerId=customerId;
    //     }

        
    //     set setCustName(customerName){
    //         this.customerName=customerName
    //     }

    //     get getCustName(){
    //         return customerName;
    //     }

    // }


    // const customer1=new Customer("Mohanraj",101);
    // console.log(customer1.getCustName());


    export function add(x,y){
        return x+y;
    }

