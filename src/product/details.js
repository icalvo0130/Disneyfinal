const params = new URLSearchParams(window.location.search);
const nameFromUrl = params.get('name');

async function fetchData() {
    let response = await fetch('https://raw.githubusercontent.com/icalvo0130/DISNEYpage/refs/heads/main/DISNEYpage/src/data/data.json')
    let json = await response.json()
    return getProduct(json)
}

function getProduct(data) {
    for (let i = 0; i < data.length; i++) {
        let map = data[i];
        if (nameFromUrl === map.name) {
            let product = new Product(
                map["name"],
                map["caracteristica1"],
                map["caracteristica2"],
                map["caracteristica3"],
                map["precio"],
                map["cantidad"],
                map["imagenes"]
            );
            return product;
        }  
    }
}

async function renderProduct() {
    let product = await fetchData();
    if (!product) {
        console.error("No se encontró el producto");
        return;
    }

    let titleH1 = document.getElementById("title");
    titleH1.innerHTML = product.name;

    let caracteristica1Li = document.getElementById("caracteristica1");
    caracteristica1Li.innerHTML = product.caracteristica1;

    let caracteristica2Li = document.getElementById("caracteristica2");
    caracteristica2Li.innerHTML = product.caracteristica2;

    let caracteristica3Li = document.getElementById("caracteristica3");
    caracteristica3Li.innerHTML = product.caracteristica3;

    let priceH4 = document.getElementById("price");
    priceH4.innerHTML = "$" + product.precio;

    let mainImg = document.getElementById("main-img");
    mainImg.src = product.imagenes[0];

    let image1 = document.getElementById("image1");
    image1.src = product.imagenes[1];

    let image2 = document.getElementById("image2");
    image2.src = product.imagenes[2];

    //para lo de los botones de mas o menos
    setupQuantityButtons();
}

function setupQuantityButtons() {
    let cantidad = 1;
    const cantidadElement = document.getElementById('section');
    
    // botones de añadir massss
    const botonesAnadir = document.querySelectorAll('.añadir a');
    
    if (botonesAnadir.length >= 2) {
        // para aumentar (primer botón)
        botonesAnadir[0].addEventListener('click', function(e) {
            e.preventDefault();
            if (cantidad < 4) { 
                cantidad++;
                cantidadElement.textContent = cantidad;
            }
        });

        // para bajarle (segundo botón)
        botonesAnadir[1].addEventListener('click', function(e) {
            e.preventDefault();
            if (cantidad > 1) {
                cantidad--;
                cantidadElement.textContent = cantidad;
            }
        });
    }
}

const register_users = JSON.parse(localStorage.getItem("users")) || [];
const login_user = JSON.parse(localStorage.getItem("login")) || null;

document.getElementById("fav").addEventListener("click", async function(event) {
    event.preventDefault()

    let product = await fetchData()

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
})

function isLogged() {
    if (login_user === null) {
        alert("Debes iniciar sesión antes de ingresar")
        window.location.href = "../login/login.html"
    }
}

isLogged();
renderProduct();