// const formProdutos = document.getElementById("formProdutos")
// const listaProdutos = document.getElementById("listaProdutos")
// const dadosProdutos = []

// formProdutos.addEventListener("submit", function(event){
//     event.preventDefault()

//     const produto = document.getElementById("produto").value.trim()

//     dadosProdutos.push(produto)

//     listaProdutos.innerHTML = ""

//     if(produto === "")return

//    dadosProdutos.forEach(function(item){
//     const li = document.createElement("li")
//     li.textContent =  item
//     listaProdutos.appendChild(li)
//    })

//   document.getElementById("produto").value = "" 

// })

// const botaoExcluir = document.getElementById("btnExcluir")

// botaoExcluir.addEventListener("click", function(event){
//     event.preventDefault()

//     dadosProdutos.length = 0
//     listaProdutos.innerHTML = ""
// })

  document.addEventListener("DOMContentLoaded", function() {

      const formProdutos = document.getElementById("formProdutos")
      const listaProdutos = document.getElementById("listaProdutos")
      const btnIrParaLista = document.getElementById("btnIrParaLista")
      const btnAdicionarMais = document.getElementById("btnAdicionarMais")
      const botaoExcluir = document.getElementById("btnExcluir")

      const dadosProdutos = []

      const storedProdutos = localStorage.getItem("dadosProdutos")

      if(storedProdutos) {

          dadosProdutos.push(...JSON.parse(storedProdutos))

      }

      function renderList() {

          if(!listaProdutos) return

          listaProdutos.innerHTML = ""

          dadosProdutos.forEach(function(item, index) {
              const li = document.createElement("li")
              const span = document.createElement("span")
              span.textContent = `${item.produto} - ${item.preco} - ${item.origem} - ${item.categoria} - ${item.lote} - ${item.validade}`
              li.appendChild(span)

              const btnEditar = document.createElement("button")

              btnEditar.textContent = "Editar"
              btnEditar.addEventListener("click", function() {
                  const novoProduto = prompt("Editar produto:", item.produto)
                  const novoPreco = prompt("Editar preço:", item.preco)
                  const novaOrigem = prompt("Editar origem:", item.origem)
                  const novaCategoria = prompt("Editar categoria:", item.categoria)
                  const novoLote = prompt("Editar lote:", item.lote)
                  const novaValidade = prompt("Editar validade:", item.validade)

                  if(novoProduto !== null) item.produto = novoProduto.trim()
                  if(novoPreco !== null) item.preco = novoPreco.trim()
                  if(novaOrigem !== null) item.origem = novaOrigem.trim()
                  if(novaCategoria !== null) item.categoria = novaCategoria
                  if(novoLote !== null) item.lote = novoLote.trim()
                  if(novaValidade !== null) item.validade = novaValidade

                  localStorage.setItem("dadosProdutos", JSON.stringify(dadosProdutos))
                  renderList()
              })

              li.appendChild(btnEditar)

              const btnExcluirItem = document.createElement("button")

              btnExcluirItem.textContent = "Excluir"
              
              btnExcluirItem.addEventListener("click", function() {
                  dadosProdutos.splice(index, 1)
                  localStorage.setItem("dadosProdutos", JSON.stringify(dadosProdutos))
                  renderList()
              })

              li.appendChild(btnExcluirItem)

              listaProdutos.appendChild(li)
          })
      }

      renderList()

      if(formProdutos) {
          formProdutos.addEventListener("submit", function(event) {
              event.preventDefault()

              const produto = document.getElementById("produto").value.trim()
              const preco = document.getElementById("preco").value.trim()
              const origem = document.getElementById("origem").value.trim()
              const categoria = document.getElementById("categoria").value
              const lote = document.getElementById("lote").value.trim()
              const validade = document.getElementById("data").value

              if(produto === "") return

              dadosProdutos.push({ produto, preco, origem, categoria, lote, validade })
              localStorage.setItem("dadosProdutos", JSON.stringify(dadosProdutos))
              formProdutos.reset()
              renderList()
          })
      }

      if(botaoExcluir) {
          botaoExcluir.addEventListener("click", function(event) {
              event.preventDefault()
              dadosProdutos.length = 0
              localStorage.setItem("dadosProdutos", JSON.stringify(dadosProdutos))
              renderList()
          })
      }

      if(btnIrParaLista) {
          btnIrParaLista.addEventListener("click", () => {
              window.location.href = "lista.html"
          })
      }

      if(btnAdicionarMais) {
          btnAdicionarMais.addEventListener("click", () => {
              window.location.href = "formulario.html"
          })
      }
  })


