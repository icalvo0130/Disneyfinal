document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "" || fullname === "") {
      alert("Por favor completa todos los campos para continuar");
      return;
    }

    let userFound = false;

    for (let i = 0; i < registeredUsers.length; i++) {
      if (registeredUsers[i].fullname === fullname && registeredUsers[i].email === email && registeredUsers[i].password === password) {
        userFound = true;
        break;
      }
    }

    if (userFound === false) {
      alert("Usuario, correo o contraseña incorrectos")
      return;
    }

    let user_login = {
      email: email,
      password: password,
    };

    localStorage.setItem("login", JSON.stringify(user_login));

    alert("Usuario logeado con éxito");
    window.location.href = "../tienda/tienda.html"; // cuando se loguea se redirige a la tienda
  });
