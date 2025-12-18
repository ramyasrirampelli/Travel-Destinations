const API_URL = "https://crud-backend-jhep.onrender.com/data";

async function showAllData() {
let res = await fetch(API_URL);
  try {
    if (!res.ok) {
      throw new Error("Something wrong in displaying details");
    }
    let data = await res.json();
    getData(data)
  } catch (error) {
    console.log(error.message);
  }
}
 function getData(data){
    data.forEach(obj => {
        let container=document.getElementsByClassName("container")[0]
      let item = document.createElement("div");
    item.innerHTML = `
    <h4>Id : ${obj.id}</h4>
    <p>Name : ${obj.name}</p>
    <img src=${obj.img}>
    `;
     container.appendChild(item)
    });
 }

 showAllData()