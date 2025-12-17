async function showAllData() {
  let res = await fetch(`http://localhost:3000/data`);
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
  let container=document.getElementsByClassName("container")[0]
    data.forEach(obj => {
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