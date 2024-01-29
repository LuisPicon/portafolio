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
  // key =>calve del json a iteral
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

//inserta de un json el texto de los proximos lenguajes
async function obtenerProximosLenguajes(clase, key) {
  //clase => contenedor donde se insertara los elementos
  // key =>calve del json a iteral
  const $tarjeta = document.querySelector(clase);
  const $fragmento = document.createDocumentFragment();
  try {
    let res = await fetch("datos/datos.json"),
      json = await res.json();
    if (!res.ok) throw { estado: res.status, estadoTexto: res.statusText };
    json[key].forEach((i) => {
      const $div = document.createElement("div");
      const $p = document.createElement("p");
      $p.textContent = i.nombre;
      $div.appendChild($p);
      $div.style.backgroundColor = i.color;
      $fragmento.appendChild($div);
    });
    $tarjeta.appendChild($fragmento);
  } catch (error) {
    let $mensaje = `<p>error${error}</p>`;
    $tarjeta.insertAdjacentHTML("beforeend", $mensaje);
  }
}

async function obtenerEdutubers(clase, key) {
  //clase => contenedor donde se insertara los elementos
  // key =>calve del json a iteral
  const $tarjeta = document.querySelector(clase);
  const $fragmento = document.createDocumentFragment();
  try {
    let res = await fetch("datos/datos.json"),
      json = await res.json();
    if (!res.ok) throw { estado: res.status, estadoTexto: res.statusText };
    json[key].forEach((i) => {
      const $div = document.createElement("div");
      const $a = document.createElement("a");
      $a.href = i.canal;
      $a.alt = i.nombre;
      $a.target = "_blank";
      $a.textContent = i.nombre;
      $div.appendChild($a);
      $div.style.backgroundColor = i.color;
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
        <!--targetas-->
        <div class="proyectos-targeta">
          <img  src="${i.imagen}" alt="${i.titulo}">
          <div class="targeta-informacion">
            <p class="targeta-informacion-titulo">${i.titulo}</p>
            <p class="targeta-p">${i.descripcion} </p>
            <div>
              <a href="${i.codigo}" class="codigo" target="_blank">Codigo</a>
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
  // key =>calve del json a iteral
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
            <img src="${i.imgPoster}" class="img" alt="${i.nombre}" />
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
            </div>`;
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

async function insertarModalDiseños(clase, key, p) {
  //clase => contenedor donde se insertara los elementos
  // key =>calve del json a iteral
  const $div = document.querySelector(clase);
  try {
    let res = await fetch("datos/datos.json"),
      json = await res.json();
    if (!res.ok) throw { estado: res.status, estadoTexto: res.statusText };
    json[key].forEach((i) => {
      console.log(i[p][0]);
      let $templete = `
      <div class="modal">
        
        <div class="modal-contenido">
        <div>
          <h3>${p}</h3>
          <p>
            ${i[p][0]}
          </p>  
        </div>
          <img src="${i[p][1]}" class="img" alt="${p}" />
          <img src="${i[p][2]}" class="img" alt="${p}" />
        </div>
      </div>
      `;
      $div.insertAdjacentHTML("beforeend", $templete);
    });
  } catch (error) {
    let $mensaje = `<p>error${error}</p>`;
    console.error($mensaje);
  }
}

obtenerLenguajes(".targeta2-lenguajes", "lenguajes");
obtenerProximosLenguajes(".targeta3-lenguajes", "proximosLenguajes");
obtenerEdutubers(".targeta4-edutubers", "edutubers");
insertarProyectos(".pagina3-proyectos", "proyectos");
insertarDiseños(".pagina4-grid", "diseños");
/*
    codigo para el modal
  */

const $contenedorModal = document.querySelector(".pagina4-modal");

document.addEventListener("click", (e) => {
  const $evento = e.target.classList;
  if ($evento.contains("grid-img")) {
    let $p = e.target.parentNode.querySelector("p").innerText;

    $contenedorModal.classList.remove("invisible");
    $contenedorModal.classList.add("visible");
    document.documentElement.classList.add("scroll-none");
    insertarModalDiseños(".pagina4-modal", "datosModal", $p);
  }
  if ($evento.contains("cerrar-modal")) {
    let $modal = document.querySelector(".modal");
    document.documentElement.classList.remove("scroll-none");

    $contenedorModal.classList.remove("visible");
    $contenedorModal.classList.add("invisible");
    $modal.remove();
  }
});
