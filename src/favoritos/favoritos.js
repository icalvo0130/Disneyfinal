const register_users = JSON.parse(localStorage.getItem("users")) || [];
const login_user = JSON.parse(localStorage.getItem("login")) || null;

let allProducts = [];

function parseDataToProducts(data) {
    for (let i = 0; i < data.length; i++) {
        let map = data[i];
        let product = new Product(
            map["name"],
            map["caracteristica1"],
            map["caracteristica2"],
            map["caracteristica3"],
            map["precio"],
            map["cantidad"],
            map["imagenes"]
        );
        allProducts.push(product);
    }
}

function getFavoritesUser() {
    const foundUser = register_users.find(user => user.email === login_user.email);

    let container = document.getElementById("box");
    container.innerHTML = ""; 

    if (foundUser && foundUser.favorites && foundUser.favorites.length > 0) {
        parseDataToProducts(foundUser.favorites)
        for (let i = 0; i < allProducts.length; i++) {
            const element = allProducts[i];
            container.innerHTML += element.htmlCard(i)
        }
    }
}

function toFavorites(index) {}

function productSelected(pos) {
    let productselected = allProducts[pos];    
    window.location = "../product/producto1.html?name=" + encodeURIComponent(productselected.name);
}

function isLogged() {
    if (login_user === null) {
        alert("Debes iniciar sesión antes de ingresar")
        window.location.href = "../login/login.html"
    }
}

isLogged();
getFavoritesUser()