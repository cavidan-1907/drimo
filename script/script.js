const nav=document.querySelector('nav');
const menu=document.querySelector(".bi-list");

const navMenu = document.querySelector(".nav-menu");

menu.addEventListener("click", () => {
    if (navMenu.style.top === "100px") {
        navMenu.style.top = "-500px";
    } else {
        navMenu.style.top = "100px";
    }
});

window.addEventListener("resize", ()=>{
    if(window.innerWidth > 991){
        navMenu.style.top = "-500px";
    }
})


window.onscroll=()=>{
if(window.scrollY>50)
{
    nav.style.background=" #f8f8f8";
    nav.style.padding = "30px 0";
}
else{
    nav.style.padding = "24px 0";
}
}

const url=`http://localhost:3000/data`;


let botom=document.querySelector(".botom");
let searchInput = document.querySelector("#search");
let filteredArr = [];
let copyArr = [];
let maxlength = 4;
let loadBtn=document.querySelector(".load");

async function getALLCard(){
let res= await axios("http://localhost:3000/data");

let data=await res.data;

copyArr=data;
console.log(data)
botom.innerHTML=" ";

filteredArr=filteredArr.length || searchInput.value ? filteredArr:data;
console.log(copyArr);

filteredArr.slice(0,maxlength).forEach(element=> {
    botom.innerHTML +=
    `
    <div class="card"><div class="img"><img src="${element.image}" alt=""></div>
    <div class="text"><a href="./details/details.html?id=${element.id}"><h3>${element.name}</h3></a>
    <p>${element.descrtiptions}</p></div>
    <div class="edit">
    <i onclick=deleteCard(${element.id}) class="bi bi-trash-fill"></i>
    <i class="bi bi-pen"></i>
    </div>
    </div>
    `
   
});








}

getALLCard()
//load
loadBtn.addEventListener("click",()=>{
    maxlength = maxlength + 4;
    getALLCard()
})
//delete
function deleteCard(id) {
    axios.delete(`http://localhost:3000/data/${id}`);
    window.location.reload()
  }
  

  //search

  searchInput.addEventListener("input",(e)=>{
filteredArr=copyArr;
filteredArr=filteredArr.filter((element)=>
element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())

)
getALLCard();
  })


