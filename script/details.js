let id=new URLSearchParams (window.location.search).get("id");
let botom1=document.querySelector(".botom1");
async function getALLCard(){
    let res= await axios(`http://localhost:3000/data/${id}`);
    
    let element=await res.data;

    botom1.innerHTML=
    `

    <div class="card"><div class="img"><img src="${element.image}" alt=""></div>
    <div class="text"><h3>${element.name}</h3>
    <p>${element.descrtiptions}</p></div>
    </div>
    `
    console.log(element);
}

getALLCard()