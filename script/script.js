const nav = document.querySelector('nav');
const menu = document.querySelector(".bi-list");

const navMenu = document.querySelector(".nav-menu");

menu.addEventListener("click", () => {
  if (navMenu.style.top === "90px") {
    navMenu.style.top = "-500px";
  } else {
    navMenu.style.top = "90px";
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 991) {
    navMenu.style.top = "-500px";
  }
})


window.onscroll = () => {
  if (window.scrollY > 50) {
    nav.style.background = " #f8f8f8";
    nav.style.padding = "30px 0";
  }
  else {
    nav.style.padding = "24px 0";
  }
}

const url = `http://localhost:3000/data`;


let botom = document.querySelector(".botom");
let searchInput = document.querySelector("#search");
let filteredArr = [];

let maxlength = 4;
let loadBtn = document.querySelector(".load");

async function getALLCard() {
  let res = await axios("http://localhost:3000/data");

  let data = await res.data;

  copyArr = data;
  console.log(data)
  botom.innerHTML = " ";

  filteredArr = filteredArr.length || searchInput.value ? filteredArr : data;
  console.log(copyArr);

  filteredArr.slice(0, maxlength).forEach(element => {
    botom.innerHTML +=
      `
    <div class="card"><div class="img"><img src="${element.image}" alt=""></div>
    <div class="text"><a href="./details/details.html?id=${element.id}"><h3>${element.name}</h3></a>
    <p>${element.descrtiptions}</p></div>
    <div class="edit">
    <i onclick="deleteCard(${element.id})" class="bi bi-trash-fill"></i>
    <i onclick="editCard(${element.id})" class="bi bi-pen pen "></i>
    <i onclick="Favorite(${element.id})" class="bi bi-heart"></i>
    </div>
    </div>
    `

  });








}

getALLCard()
//sort
let sortBtn = document.querySelector(".sort");
let sorted = "descending";

sortBtn.addEventListener("click", () => {
  if (sorted === "ascending") {
    filteredArr.sort((a, b) => b.id - a.id);
    sortBtn.innerHTML = "SORT ASC";

  }
  else if (sorted === "descending") {
    filteredArr.sort((a, b) => a.id - b.id);
    sorted = "def";
    sortBtn.innerHTML = "SORT DSC";
  }
  else {
    filteredArr = copyArr
    sorted = "ascending";
    sortBtn.innerHTML = "SORT";
  }

  getALLCard();
})


//load
loadBtn.addEventListener("click", () => {
  maxlength = maxlength + 4;
  getALLCard()
})
//delete
function deleteCard(id) {
  axios.delete(`http://localhost:3000/data/${id}`);
  window.location.reload()
}


//search

searchInput.addEventListener("input", (e) => {
  console.log(filteredArr);
  filteredArr = copyArr;
  filteredArr = filteredArr.filter((element) =>
    element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())

  )
  getALLCard();
})

//favorit

function Favorite(id) {

  if (event.target.classList.contains('bi-heart')) {
    event.target.classList.remove('bi-heart')
    event.target.classList.add('bi-heart-fill')

    axios.get(`http://localhost:3000/data/${id}`)
      .then(res => {
        console.log(res.data);
        return res.data
      })
      .then(res => {
        axios.get(`http://localhost:3000/favorites`)
          .then(response => {
            let iD = response.data.find(f => f.id === response.id);
            if (!iD) {
              axios.post(`http://localhost:3000/favorites`, res)
              console.log(event.target);
            }
            else {
              axios.delete(`http://localhost:3000/favorites/${iD.id}`)
            }
          })
      })
  }
  else {
    event.preventDefault();
    event.target.classList.remove('bi-heart-fill')
    event.target.classList.add('bi-heart')
    axios.delete(`http://localhost:3000/favoourites/${id}`)
  }
}

//uptade

let file = document.querySelector("#file");
let form = document.querySelector(".form");
let img2 = document.querySelector("#img2");
let desc1 = document.querySelector("#desc");
let name1 = document.querySelector("#name");
let editB = document.querySelector(".editB");
let pen = document.querySelector(".pen");
let closeB = document.querySelector(".bi-x");

file.addEventListener("change", () => {
  let src = file.files[0]
  let reader = new FileReader();
  reader.readAsDataURL(src);
  reader.onload = function (e) {
    img2.src = e.target.result
  }
})


closeB.addEventListener("click", () => {
  editB.style.display = "none";
})


function editCard(id) {
  editB.style.display = "block"
  axios.get(`http://localhost:3000/data/${id}`).then(res => {
    name1.value = res.data.name;
    desc1.value = res.data.descrtiptions;
    img2.src = res.data.image;
    file.value = res.data.image
  })

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    axios.get(`http://localhost:3000/data/${id}`).then(res => {
      name1.value = res.data.name;
      desc1.value = res.data.descrtiptions;
      img2.src = res.data.image;

    })
    let src2 = file.files[0];
    let reader2 = new FileReader();
    reader2.onload = (e) => {
      let obj = {
        image: e.target.result,
        name: name1.value,
        descrtiptions: desc1.value

      }
      axios.patch(`http://localhost:3000/data/${id}`, obj).then(res = console.log(res.data))
    }
    reader2.readAsDataURL(src2)
  });
}