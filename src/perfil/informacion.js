const register_users = JSON.parse(localStorage.getItem("users")) || [];
const login_user = JSON.parse(localStorage.getItem("login")) || null;

const email = document.getElementById("email")
const password = document.getElementById("password")
const fullname = document.getElementById("name")

function putInformation() {
    const foundUser = register_users.find(user => user.email === login_user.email)

    if (!foundUser) {
        console.error("Usuario no encontrado.");
        return;
    }

    email.placeholder = foundUser.email
    password.value = foundUser.password
    fullname.placeholder = foundUser.fullname
}


document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.querySelector('.edit-button');
    const inputs = document.querySelectorAll('input');

    editButton.addEventListener('click', () => {
        inputs.forEach(input => {
            input.disabled = !input.disabled;
        });

        if (editButton.textContent === 'Editar Información') {
            editButton.textContent = 'Guardar Información';
        } else {
            const newFullname = fullname.value.trim();
            const newEmail = email.value.trim();
            const newPassword = password.value.trim();

            if (newFullname || newEmail || newPassword) {
                const foundUser = register_users.find(user => user.email === login_user.email);
                if (foundUser) {
                    if (newFullname) foundUser.fullname = newFullname;
                    if (newEmail) foundUser.email = newEmail;
                    if (newPassword) foundUser.password = newPassword;

                    localStorage.setItem("users", JSON.stringify(register_users));
                    alert("Datos actualizados con éxito");
                    localStorage.removeItem("login");
                    window.location.reload();
                } else {
                    console.error("Usuario no encontrado.");
                }
            } else {
                alert("No se realizaron cambios.");
            }

            editButton.textContent = 'Editar Información';
            inputs.forEach(input => input.disabled = true);
        }
    });
});


document.getElementById("logout").addEventListener("click", function(event) {
    alert("Sesión cerrada con éxito")
    localStorage.removeItem("login")
    window.location.reload()
})


function isLogged() {
    if (login_user === null) {
        alert("Debes iniciar sesión antes de ingresar")
        window.location.href = "../login/login.html"
    }
}

isLogged();
putInformation()