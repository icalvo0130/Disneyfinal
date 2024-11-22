document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (fullname === "") {
        alert("Por favor, llena el campo de Nombre Completo.");
        return;
    }

    if (email === "") {
        alert("Por favor, llena el campo de Correo.");
        return;
    }

    if (!email.includes("@")) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    if (password === "") {
        alert("Por favor, llena el campo de Contraseña.");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    let register_users = JSON.parse(localStorage.getItem("users")) || [];

    const emailFound = register_users.some(user => user.email === email);
    if (emailFound) {
        alert("Usuario ya existente")
        return;
    }

    const user = {
        fullname: fullname,
        email: email,
        password: password,
        favorites: [],
    }

    register_users.push(user)

    localStorage.setItem("users", JSON.stringify(register_users));

    alert("Registro exitoso. Redirigiendo a iniciar sesión...");
    window.location.href = "../login/login.html"; //cuando todo lleno, manda a la página de login 
});

