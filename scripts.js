const $secciones = document.querySelectorAll("section[data-scroll-spy]");

const cb = (entradas) => {
  entradas.forEach((i) => {
    const $id = i.target.getAttribute("id");
    if (i.isIntersecting) {
      document
        .querySelector(`a[data-scroll-spy][href="#${$id}"]`)
        .classList.add("activo");
    } else {
      document
        .querySelector(`a[data-scroll-spy][href="#${$id}"]`)
        .classList.remove("activo");
    }
  });
};
const observador = new IntersectionObserver(cb, { threshold: [0.5, 0.75] });

$secciones.forEach((i) => observador.observe(i));
