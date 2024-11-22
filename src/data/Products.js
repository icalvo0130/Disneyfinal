class Product {
  constructor(
    name,
    caracteristica1,
    caracteristica2,
    caracteristica3,
    precio,
    cantidad,
    imagenes
  ) {
    this.name = name;
    this.caracteristica1 = caracteristica1;
    this.caracteristica2 = caracteristica2;
    this.caracteristica3 = caracteristica3;
    this.precio = precio;
    this.cantidad = cantidad;
    this.imagenes = imagenes;
  }

  htmlCard(pos) {
    return `
        <div class="card" onclick="productSelected(${pos})">
            <div class="image">
                <img src="${this.imagenes[0]}" alt="${this.name}">
            </div>
            <div class="content">
                <h3>${this.name}</h3>
                <div class="ajust">
                    <p class="precio">$ ${this.precio}</p>
                    <div class="iconos">
                        <span onclick="toFavorites(${pos})" class="fav"><i class='bx bx-heart'></i></span>
                        <a href="producto1.html?name=${this.name}" class="look"><i class='bx bx-info-circle'></i></a>
                    </div>
                </div>
            </div>
        </div>
        `;
  }
}
