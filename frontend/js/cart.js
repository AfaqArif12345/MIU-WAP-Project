let userData = JSON.parse(sessionStorage.getItem("userData"));
document.getElementById("header_welcome").innerHTML += userData.user;

var productData;

async function getProducts() {
  try {
    const data = {
      Auth: userData.auth,
      // Auth: "",
    };
    const requestOptions = {
      method: "POST", // or 'PUT', 'GET', 'DELETE', etc., depending on the HTTP method you need
      headers: {
        "Content-Type": "application/json", // Set the content type based on your data format
        // You can include other headers as needed
      },
      body: JSON.stringify(data), // Convert the data to a JSON string
    };
    let response = await fetch(
      "http://localhost:3001/products",
      requestOptions
    );
    if (response.ok) {
      //   console.log("products ok");
      productData = await response.json();
      console.log(productData);
      let tableBody = document.getElementById("productList");
      tableBody.innerHTML = "";
      productData.forEach((element) => {
        // console.log("1", element);
        tableBody.innerHTML += `
        <tr >
        <td>${element.name}</td>
        <td>${element.price}</td>
        <td><img src="${element.imgSrc}" alt="${
          element.name
        }" width="50 />"</td>
        <td>${element.stock}</td>
        <td><img src="./cart.png" alt="cart" width="25" onclick="addItem(${productData.indexOf(
          element
        )})" /></td>
        </tr>
        
        `;
      });
    } else {
      let text = await response.text();
      alert(text);
      sessionStorage.clear();
      window.location.replace("./login.html");
      console.log("products not ok");
    }
  } catch (e) {
    console.log("product error=> ", e);
  }
}

function addItem(id) {
  //   console.log("additems ", id);
  //   console.log(productData);
  if (productData[id].stock != 0) {
    tableShow();

    if (!ifExist(id)) {
      console.log("got false");
      let tableBody = document.getElementById("myCart");
      tableBody.innerHTML += `
        <tr >
        <td class="productName">${productData[id].name}</td>
        <td  class="productPrice">${productData[id].price}</td>
        <td  class="productTotal">${productData[id].price}</td>
        <td>
                <button class="controls" onclick="decrementItem(this)">-</button>
                <input class="quantity" type="text" value=${1}  max=${
        productData[id].stock
      } disabled />
                <button class="controls" onclick="icrementItem(this)" ${
                  productData[id].stock == 1 ? "disabled" : ""
                }>+</button>
              </td>
        </tr>

        `;
    }
    totalAmountCalculator();
  }
  quantityFixed();
}
function ifExist(id) {
  //   console.log("id ", id);
  let names = document.getElementsByClassName("productName");
  let flag = false;
  Array.from(names).forEach((element) => {
    if (element.innerHTML == productData[id].name) {
      let parent = element.parentElement;
      let price = parent.getElementsByClassName("productPrice")[0];
      let totalPrice = parent.getElementsByClassName("productTotal")[0];
      let quantity = parent.getElementsByClassName("quantity")[0];
      let incrementBtn = parent.getElementsByClassName("controls")[1];
      icrementItem(incrementBtn);
      // if (quantity.value != productData[id].stock) {
      //   quantity.value = parseInt(quantity.value) + 1;
      //   totalPrice.innerHTML = (
      //     parseFloat(totalPrice.innerHTML) + parseFloat(price.innerHTML)
      //   ).toFixed(2);
      // }
      flag = true;
      return true;
    }
  });
  return flag;
}

getProducts();
function logout() {
  sessionStorage.clear();
  window.location.href = "./login.html";
}

function totalAmountCalculator() {
  let sum = 0.0;
  let tableBody = document.getElementById("myCart");
  let rows = tableBody.getElementsByClassName("productTotal");
  Array.from(rows).forEach((row) => {
    sum = sum + parseFloat(row.innerText);
  });

  document.getElementById("totalAmount").innerHTML = sum.toFixed(2);
}

function quantityFixed() {
  let tableBody = document.getElementById("myCart");
  let rows = tableBody.getElementsByTagName("tr");
  Array.from(rows).forEach((row) => {
    // console.log(row);
    let price = row.getElementsByClassName("productPrice")[0];
    let totalPrice = row.getElementsByClassName("productTotal")[0];
    let quantity = row.getElementsByClassName("quantity")[0];
    quantity.value = parseInt(
      parseFloat(totalPrice.innerText) / parseFloat(price.innerText)
    );
  });
}

async function placeOrder() {
  const order = [];
  console.log("ordr placed");
  let tableBody = document.getElementById("myCart");
  let rows = tableBody.getElementsByTagName("tr");
  Array.from(rows).forEach((row) => {
    console.log(row);
    let productName = row.getElementsByClassName("productName")[0];
    let price = row.getElementsByClassName("productPrice")[0];
    let totalPrice = row.getElementsByClassName("productTotal")[0];
    let quantity = row.getElementsByClassName("quantity")[0];
    let name = productName.innerText;
    order.push({ name: name, quantity: quantity.value });
  });
  //   order.total = parseFloat(document.getElementById("totalAmount").innerHTML);
  console.log("order : ", order);

  try {
    const data = {
      Auth: userData.auth,
      order: order,
      user: userData.user,
      // Auth: "",
    };
    const requestOptions = {
      method: "POST", // or 'PUT', 'GET', 'DELETE', etc., depending on the HTTP method you need
      headers: {
        "Content-Type": "application/json", // Set the content type based on your data format
        // You can include other headers as needed
      },
      body: JSON.stringify(data), // Convert the data to a JSON string
    };
    let response = await fetch(
      "http://localhost:3001/products/order",
      requestOptions
    );
    if (response.ok) {
      console.log("order placed");
      getProducts();
      let tableBody = document.getElementById("myCart");
      tableBody.innerHTML = "";
      tableHide();
    } else {
      console.log("order not placed");
    }
  } catch {}
}

function tableShow() {
  document.getElementById("cartTable").classList.remove("hidden");
  document.getElementById("noItemCart").classList.add("hidden");
}
function tableHide() {
  document.getElementById("cartTable").classList.add("hidden");
  document.getElementById("noItemCart").classList.remove("hidden");
}

function checkEmpty() {
  let tableBody = document.getElementById("myCart");
  let rows = tableBody.getElementsByClassName("productTotal");
  if (rows.length == 0) {
    tableHide();
  }
}
