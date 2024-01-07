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
obtenerLenguajes(".targeta2-lenguajes", "lenguajes");

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

obtenerProximosLenguajes(".targeta3-lenguajes", "proximosLenguajes");
