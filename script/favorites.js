let botomF=document.querySelector(".botomF");
let searchInputF=document.querySelector("#searchF");
let filteredArrF = [];
let copyArrF = [];
let maxlengthF = 4;
let loadBtnF=document.querySelector(".loadF");

async function getFavCard (){
    let res=await axios ("http://localhost:3000/favorites");

    let data= await res.data;

    copyArrF=data;
    botomF.innerHTML=" ";
    filteredArrF=filteredArrF.length || searchInputF.value ? filteredArrF:data;
    filteredArrF.slice(0,maxlengthF).forEach(fav=>{
        botomF.innerHTML += 
        `
        <div class="cardF"><div class="img"><img src="${fav.image}" alt=""></div>
        <div class="textF"><a href="./details/details.html?id=${fav.id}"><h3>${fav.name}</h3></a>
        <p>${fav.descrtiptions}</p></div>
      
        <i onclick=deleteFavCard(${fav.id}) class="bi bi-trash-fill"></i>
    
        </div>
        `
    })
}
getFavCard();



loadBtnF.addEventListener("click",()=>{
    maxlengthF=maxlengthF+4;
    getFavCard()

})


//favdelete


function deleteFavCard(id){
    axios.delete(`http://localhost:3000/favorites/${id}`)
    window.location.reload()
}

//search
searchInputF.addEventListener("input",(e)=>{

filteredArrF=copyArrF;
filteredArrF=filteredArrF.filter((element)=>
element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())

)
console.log(filteredArrF);
getFavCard();

})