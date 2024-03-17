
const ligar = document.getElementById("ligar")
const desligar = document.getElementById("desligar")

ligar?.addEventListener('click', () => {
  fetch("http://localhost:8080/ligar", {method: "POST"}).then(res => console.log(res)).catch(err => console.log(err))
})

desligar?.addEventListener('click', () => {
  fetch("http://localhost:8080/desligar", {method: "POST"}).then(res => console.log(res)).catch(err => console.log(err))
})