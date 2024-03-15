const $secciones = document.querySelectorAll("section[data-scroll-spy]");

const cb = (entradas) => {
  entradas.forEach((i) => {
    const $id = i.target.getAttribute("id");
    const $elemento = document.querySelector(
      `a[data-scroll-spy][href="#${$id}"]`
    );

    if ($elemento) {
      if (i.isIntersecting) {
        $elemento.classList.add("activo");
      } else {
        $elemento.classList.remove("activo");
      }
    }
  });
};

const observador = new IntersectionObserver(cb, { threshold: [0.5, 0.75] });

$secciones.forEach((i) => observador.observe(i));
//insertar lenguajes
async function obtenerLenguajes(clase, key) {
  //clase => contenedor donde se insertara los elementos
  // key =>calve del json a iterar
  const $tarjeta = document.querySelector(clase);
  const $fragmento = document.createDocumentFragment();
  try {
    let res = await fetch("datos/datos.json"),
      json = await res.json();
    if (!res.ok) throw { estado: res.status, estadoTexto: res.statusText };
    json[key].forEach((i) => {
      const $div = document.createElement("div");
      const $img = document.createElement("img");
      const $p = document.createElement("p");

      $img.src = i.imagen;
      $img.alt = i.nombre;
      $p.textContent = i.nombre;

      $div.appendChild($img);
      $div.appendChild($p);

      $fragmento.appendChild($div);
    });
    $tarjeta.appendChild($fragmento);
  } catch (error) {
    let $mensaje = `<p>error${error}</p>`;
    $tarjeta.insertAdjacentHTML("beforeend", $mensaje);
  }
}
//insertar proyectos
async function insertarProyectos(clase, key) {
  //clase => contenedor donde se insertara los elementos
  // key =>calve del json a iteral
  const $tarjeta = document.querySelector(clase);
  const $div = document.querySelector(clase);
  try {
    let res = await fetch("datos/datos.json"),
      json = await res.json();
    if (!res.ok) throw { estado: res.status, estadoTexto: res.statusText };
    json[key].forEach((i) => {
      $templete = `
        <!--tarjetas-->
        <div class="proyectos-targeta">
          <img  src="${i.imagen}" alt="${i.titulo}">
          <div class="targeta-informacion">
            <p class="targeta-informacion-titulo">${i.titulo}</p>
            <p class="targeta-p">${i.descripcion} </p>
            <div>
              <a href="${i.codigo}" class="codigo" target="_blank">Código</a>
              <a href="${i.web}" class="web" target="_blank">Sitio web</a>
            </div>
            </div>
        </div>`;
      $div.insertAdjacentHTML("beforeend", $templete);
    });
  } catch (error) {
    let $mensaje = `<p>error${error}</p>`;
    $tarjeta.insertAdjacentHTML("beforeend", $mensaje);
  }
}
//insertar datos del modal
async function insertarDiseños(clase, key) {
  //clase => contenedor donde se insertara los elementos
  // key =>calve del json a iterar
  const $div = document.querySelector(clase);
  try {
    let res = await fetch("datos/datos.json"),
      json = await res.json();
    if (!res.ok) throw { estado: res.status, estadoTexto: res.statusText };
    json[key].forEach((i) => {
      if (i.creado) {
        // este templete se inserta el proyecto ya esta creado
        let $templete = `  
          <div class="grid-card">
            <img src="${i.imgPoster}" class="grid-img" alt="${i.nombre}" />
            <div class="card-info">
              <a href="${i.enlace}">
                <img
                  width="20"
                  height="20"
                  src="https://img.icons8.com/ios-glyphs/30/external-link.png"
                  alt="external-link"
                />
              </a>
              <p>${i.nombre}</p>
            </div>
            </div>
            `;
        $div.insertAdjacentHTML("beforeend", $templete);
      } else {
        // este templete se inserta el proyecto no esta creado
        let $templete = `
          <div class="grid-card">
            <img src="${i.imgPoster}" class="grid-img" alt="${i.nombre}" />
            <div class="card-info">
              <p>${i.nombre}</p>
            </div>
            </div>`;
        $div.insertAdjacentHTML("beforeend", $templete);
      }
    });
  } catch (error) {
    let $mensaje = `<p>error${error}</p>`;
    $div.insertAdjacentHTML("beforeend", $mensaje);
  }
}
obtenerLenguajes(".lenguajes", "lenguajes");
insertarProyectos(".pagina3-proyectos", "proyectos");
insertarDiseños(".pagina4-grid", "diseños");
