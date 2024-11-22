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

    for (let i = 0; i < 3; i++) {
        let product = products[i];
        container.innerHTML += product.htmlCard(i); 
    }
}

fetchData();