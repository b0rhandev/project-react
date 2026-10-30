



// const name = "borhan";






// for (let i = 0; i < 3; i++) {
//     console.log(`Hello ${name}`);
// }









// // const person = {
// //     name: " bothan",
// //     age: 18,
// //     city:"Darab",
// // };


// // const {city ,name} =  person

// // console.log(name);




// const numbers = [5, 6, 7 ,8];



// const [NUM ,b ,r ,t] = numbers
// console.log(b);






// const adade = [20, 30 ,40 ,40000];


// const [wan , tow , three , forth ] = adade



// console.log(wan + 15);







// const fruits = ["apple", "banana", "orange"];

// const [ one , tow, three] = fruits


// console.log(tow);





// const user = {
//     name: "Borhan",
//     age: 20,
// };


// const {name}= user


// console.log(name);





// const names = ["Ali", "Sara", "Borhan"];

// names.map(name => {
//     console.log(name);
// });





// const user= {names:"sara", age:24, city:"tehran"};



// console.log(Object.keys(user));

// console.log(Object.values(user));



// console.log(Object.entries());








// function names(parametr) {
//     console.log("my names is borhan");
    
//     parametr()
// };


// function Nums(secend) {
//     console.log("چه اسم زیبایی");
    


// };

// names(Nums)


//---------------------------------------------------------------------------//

// function age(sen) {
//     console.log("من 18 سالم هست ");


// };



// function men() {
//     console.log("سلام چقدر سنت مناسب است");
    
// };




// age(men)
//---------------------------------------------------------------------------//



const Title = document.getElementById("title");


Title.textContent = "سلام دنیا";


Title.style.color = "blue";




const b = document.getElementById("BOLD");



b.innerHTML = `<h2> salam</h2>`;




const link = document.querySelector("a");

link.href = "https://google.com";






const button = document.getElementById("btn")


button.addEventListener('click', ()=>{
    console.log("cheked");
    
})



button.addEventListener('click', ()=>{
    button.textContent = "سلام برهان"
});





const title= document.createElement("h1")

title.textContent = "wwwe";


document.body.append(title);






const BOX = document.getElementById("box")

BOX.append ("meow");







// fetch("https://jsonplaceholder.typicode.com/users")
// .then(res => res.json())
// .then(users => {

//     users.map(user => {
//         console.log(user.name);
//     })

// });





// async function getData(){

//     let result = await something();

//     console.log(result);

// }





