const API_URL = "https://crud-backend-jhep.onrender.com/data";

async function showAllData() {
  let res = await fetch(API_URL);
  try {
    if (!res.ok) {
      throw new Error("Something wrong in displaying details");
    }
    let data1 = await res.json();
    data1.sort((a, b) => a.id - b.id);
    data1.forEach((obj) => {
      getData(obj);
    });
  } catch (error) {
    console.log(error.message);
  }
}

showAllData();

function getData(data1) {
  let save = document.getElementsByClassName("save")[0];
  let item = document.createElement("div");
  item.innerHTML = `
    <h5>Id : ${data1.id}</h5>
    <p>Name : ${data1.name}</p>
    `;
  let deletebtn = document.createElement("button");
  deletebtn.innerHTML = "DELETE";
  deletebtn.addEventListener("click", () => {
    deleteData(`${data1.id}`);
    setTimeout(() => {
      item.remove();
    }, 1000);
  });
  item.appendChild(deletebtn);
  let editbtn = document.createElement("button");
  editbtn.innerHTML = "EDIT";
  editbtn.addEventListener("click", () => {
    editData(`${data1.id}`);
  });
  item.appendChild(editbtn);
  save.appendChild(item);
}

let savebtn = document.getElementById("savebtn");
let ids = document.getElementById("ids");
let names = document.getElementById("names");
let imglink = document.getElementById("imglink");

savebtn.addEventListener("click", async () => {
  if (editId !== null) {
    updateData(editId);
    editId = null;
    savebtn.innerHTML = "SAVE DATA";
    ids.readOnly = false;
  } else {
    let res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(ids.value),
        name: names.value,
        img: imglink.value,
      }),
    });
    try {
      if (!res.ok) {
        throw new Error("Something wrong in saving data");
      }
      alert("Data saved successfully");
      ids.value = "";
      names.value = "";
      imglink.value = "";
      let data = await res.json();
      getData(data);
    } catch (error) {
      console.log(error.message);
    }
  }
});

async function deleteData(id) {
  let res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  try {
    if (!res.ok) {
      throw new Error("Something wrong in deleting data");
    }
    alert("Data deleted successfully");
  } catch (error) {
    console.log(error.message);
  }
}

let editId = null;
async function editData(id) {
  savebtn.innerHTML = "UPDATE DATA";
  let updatebtn = document.getElementById("updatebtn");
  let response = await fetch(`${API_URL}/${id}`);
  try {
    if (!response.ok) {
      throw new Error("Something wrong in getting data");
    }
    let response2 = await response.json();
    ids.value = response2.id;
    ids.readOnly = true;
    names.value = response2.name;
    imglink.value = response2.img;
    editId = response2.id;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateData(id) {
  let res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${names.value}`,
      img: `${imglink.value}`,
    }),
  });
  try {
    if (!res.ok) {
      throw new Error("Something wrong in Updating data");
    }
    alert("Data Updated successfully");
    let save = document.getElementsByClassName("save")[0];
    save.innerHTML = "";
    showAllData();
    ids.value = "";
    names.value = "";
    imglink.value = "";
  } catch (error) {
    console.log(error.message);
  }
}
