let allProducts = [];

async function fetchData() {
    let response = await fetch('https://raw.githubusercontent.com/icalvo0130/DISNEYpage/refs/heads/main/DISNEYpage/src/data/data.json')
    let json = await response.json()
    parseDataToProducts(json)
}

//pasa de array data a Product 
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
    renderAllProducts(allProducts)
}

function renderAllProducts(products) {
    let container = document.getElementById("box");
    container.innerHTML = ""; 

    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        container.innerHTML += product.htmlCard(i); 
    }
}

document.getElementById("search").addEventListener("input", function(event) {
    event.preventDefault()

    let search = document.getElementById("search").value.toLowerCase()

    if (search === "" || search.length === 0) {
        renderAllProducts(allProducts)
    } else {
        let filteredProducts = allProducts.filter(function(product) {
            return product.name.toLowerCase().includes(search);
        });
        renderAllProducts(filteredProducts);
    }
})

const register_users = JSON.parse(localStorage.getItem("users")) || [];
const login_user = JSON.parse(localStorage.getItem("login")) || null;

function toFavorites(index) {
    let product = allProducts[index];

    const userIndex = register_users.findIndex(user => user.email === login_user.email);

    let user = register_users[userIndex];

    if (user.favorites.length !== 0) {
        let exist = user.favorites.find(favorite => favorite.name === product.name);
        if (exist) {
            alert("Producto ya agregado a favoritos");
            return
        }   
    }

    user.favorites.push(product)

    register_users[userIndex] = user;

    localStorage.setItem("users", JSON.stringify(register_users));

    alert("Producto añadido a favoritos correctamente")
}

//para llegar a la pag de detalle de product
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
fetchData();