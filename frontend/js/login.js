if (sessionStorage.getItem("userData")) {
  window.location.href = "./cart.html";
}

async function login() {
  console.log("login");
  let user_username = document.getElementById("username").value;
  let user_password = document.getElementById("password").value;
  try {
    let response = await fetch("http://localhost:3001/users/login ", {
      method: "POST",
      body: JSON.stringify({
        username: user_username,
        password: user_password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // .then((json) => console.log(json));
    if (response.ok) {
      let text = await response.json();
      console.log(text);
      sessionStorage.setItem("userData", JSON.stringify(text));
      window.location.href = "cart.html";
    } else {
      document.getElementById("errorMsg").classList.remove("hidden");
      document.getElementById("errorMsg").innerHTML = "Incorrect credentials";
      console.log("response not ok");
    }

    // window.location.href = './cart.html';
  } catch (e) {
    console.log("error", e);
  }
}
