window.addEventListener('load', start);

function start() {

  var listaSlider = Array.from(document.getElementsByClassName('slider'));
  listaSlider.forEach(element => {
    element.nextElementSibling.value = element.value
    element.addEventListener("input", setRgbInput)
  });
  setRgbDiv()
}

function setRgbInput(event) {
  event.target.nextElementSibling.value = event.target.value
  setRgbDiv()
}

function setRgbDiv() {
  var colorSquare = document.querySelector(".colorSquare")
  var r = document.getElementById("rColor").value
  var g = document.getElementById("gColor").value
  var b = document.getElementById("bColor").value

  colorSquare.setAttribute("style", `background-color: rgb(${r}, ${g}, ${b})`);
}