function decrementItem(state) {
  let quantity = state.parentElement.getElementsByClassName("quantity")[0];
  if (quantity.value == 1) {
    console.log("state ", state.parentElement.parentElement.remove());
  }
  let parentElement = state.parentElement.parentElement;
  let price = parentElement.getElementsByClassName("productPrice")[0];
  let Totalprice = parentElement.getElementsByClassName("productTotal")[0];

  quantity.value = parseInt(quantity.value) - 1;
  Totalprice.innerHTML = (
    parseFloat(Totalprice.innerHTML) - parseFloat(price.innerHTML)
  ).toFixed(2);

  incrementBtn = state.parentElement.getElementsByClassName("controls")[1];
  console.log(incrementBtn);
  incrementBtn.removeAttribute("disabled");

  totalAmountCalculator();
  checkEmpty();
}
function icrementItem(state) {
  let quantity = state.parentElement.getElementsByClassName("quantity")[0];
  let max = quantity.getAttribute("max");
  let parentElement = state.parentElement.parentElement;
  let price = parentElement.getElementsByClassName("productPrice")[0];
  let Totalprice = parentElement.getElementsByClassName("productTotal")[0];
  if (quantity.value == max) {
    console.log(state.parentElement);
    incrementBtn = state;
    incrementBtn.setAttribute("disabled", true);
  } else {
    quantity.value = parseInt(quantity.value) + 1;
    Totalprice.innerHTML = (
      parseFloat(Totalprice.innerHTML) + parseFloat(price.innerHTML)
    ).toFixed(2);
  }
  console.log("quantity value ", quantity.value);
  console.log("max ", max);
  if (quantity.value == max) {
    console.log(state.parentElement);
    incrementBtn = state;
    incrementBtn.setAttribute("disabled", true);
  }

  // if (quantity.value == max) {
  //   console.log(state.parentElement);
  //   incrementBtn = state;
  //   incrementBtn.setAttribute("disabled", true);
  // }
  totalAmountCalculator();
}
