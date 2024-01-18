"use strict";

const btnSubmit = document.getElementById("submit-btn");
const btnClear = document.getElementById("clear-btn");
const btnHealthy = document.getElementById("healthy-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
let dataOfPet;
const petArr = [];

const data1 = {
  idInput: "P101",
  nameInput: "Tom",
  ageInput: 3,
  typeInput: "Cat",
  weightInput: 5,
  lengthInput: 50,
  breedInput: "Tabby",
  colorInput: "#ff0000",
  vaccinatedInput: true,
  dewormedInput: true,
  sterilizedInput: true,
  //date: new Date("01/032022"),
  //BMI = ?
};
console.log(data1);
const data2 = {
  idInput: "P102",
  nameInput: "Tyke",
  ageInput: 5,
  typeInput: "Dog",
  weightInput: 3,
  lengthInput: 40,
  breedInput: "Mixed Breed",
  colorInput: "#00ff00",
  vaccinatedInput: false,
  dewormedInput: false,
  sterilizedInput: false,
  //date: new Date("02/032022"),
  //BMI = ?
};

//add data to petArr
petArr.push(data1);
petArr.push(data2);

//display data
function renderTableData(petArr) {
  let tableData = document.getElementById("tbody");
  tableData.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    let row = document.createElement("tr");

    //get date
    let gettingDate = new Date();
    let addedDate = `${
      gettingDate.getDate() < 10
        ? `0${gettingDate.getDate()}`
        : `${gettingDate.getDate()}`
    }/${
      gettingDate.getMonth() + 1 < 10
        ? `0${gettingDate.getMonth() + 1}`
        : `${gettingDate.getMonth() + 1}`
    }/${gettingDate.getFullYear()}`;

    //insert data into table
    row.innerHTML = `
      <th scope="row">${petArr[i].idInput}</th>
      <td>${petArr[i].nameInput}</td>
      <td>${petArr[i].ageInput}</td>
      <td>${petArr[i].typeInput}</td>
      <td>${petArr[i].weightInput}kg</td>
      <td>${petArr[i].lengthInput} cm</td>
     <td>${petArr[i].breedInput}</td>
      <td>
        <i class="bi bi-square-fill" style="color:${petArr[i].colorInput}"></i>
      </td>
      <td><i class = ${
        petArr[i].vaccinatedInput === true
          ? `"bi bi-check-circle-fill"`
          : `"bi bi-x-circle-fill"`
      }></i></td>
      <td><i class = ${
        petArr[i].dewormedInput === true
          ? `"bi bi-check-circle-fill"`
          : `"bi bi-x-circle-fill"`
      }></i></td>
      <td><i class = ${
        petArr[i].sterilizedInput === true
          ? `"bi bi-check-circle-fill"`
          : `"bi bi-x-circle-fill"`
      }></i></td>
      <td>${addedDate}</td>
      <td>
       <button type="button" class="btn btn-danger">Delete</button>
      </td>
      <td><button onclick="deletePet('${
        petArr[i].idInput
      }')" type="button" class="btn btn-danger">Delete</button></td>`;
    tableData.appendChild(row);
  }
}
renderTableData(petArr);
//petArr = [data1, data2]

//button submit
btnSubmit.addEventListener("click", function (e) {
  dataOfPet = {
    idInput: idInput.value,
    nameInput: nameInput.value,
    ageInput: parseInt(ageInput.value),
    typeInput: typeInput.value,
    weightInput: parseInt(weightInput.value),
    lengthInput: parseInt(lengthInput.value),
    colorInput: colorInput.value,
    breedInput: breedInput.value,
    vaccinatedInput: vaccinatedInput.checked,
    dewormedInput: dewormedInput.checked,
    sterilizedInput: sterilizedInput.checked,
  };
  console.log(dataOfPet);

  //validate data
  function validateData(dataOfPet) {
    //check idInput
    for (let i = 0; i < petArr.length; i++) {
      if (dataOfPet.idInput === petArr[i].idInput) {
        alert("ID must be unique!");
        return false;
      }
    }
    //check data format
    if (
      dataOfPet.idInput === "" ||
      dataOfPet.nameInput === "" ||
      !dataOfPet.ageInput ||
      !dataOfPet.weightInput ||
      !dataOfPet.lengthInput
    ) {
      alert("Please fill the blank!");
      return false;
    } else if (
      isNaN(dataOfPet.ageInput) ||
      dataOfPet.ageInput < 1 ||
      dataOfPet.ageInput > 15
    ) {
      alert("Age must be between 1 and 15!");
      return false;
    } else if (
      isNaN(dataOfPet.weightInput) ||
      dataOfPet.weightInput < 1 ||
      dataOfPet.weightInput > 15
    ) {
      alert("Weight must be between 1 and 15!");
      return false;
    } else if (
      isNaN(dataOfPet.lengthInput) ||
      dataOfPet.lengthInput < 1 ||
      dataOfPet.lengthInput > 100
    ) {
      alert("Length must be between 1 and 100!");
      return false;
    } else if (dataOfPet.typeInput === "Select Type") {
      alert("Please select Type!");
      return false;
    } else if (dataOfPet.breedInput === "Select Breed") {
      alert("Please select Breed!");
      return false;
    } else {
      return true;
    }
  }

  if (validateData(dataOfPet)) {
    petArr.push(dataOfPet);
    renderTableData(petArr);
    //document.querySelector("#form-data").reset();
  }
});

//clear form
btnClear.addEventListener("click", function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
});

//delete pet
function deletePet(x) {
  let confirmDelete = confirm("Do you really want to delete this pet?");
  if (confirmDelete) {
    let indexRow;
    for (let k = 0; k < petArr.length; k++) {
      if (petArr[k].idInput === x) {
        indexRow = k;
        console.log(indexRow, typeof indexRow);
        document.getElementById("tbody").deleteRow(indexRow);
        return indexRow;
      }
      console.log(indexRow);
      // document.getElementById("tbody").deleteRow(indexRow);
    }
  }
  renderTableData();
}
