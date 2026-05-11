const fs = require("fs")

// Ler arquivo JSON
const banco = fs.readFileSync("banco_de_dados.json", "utf-8")

// Converter JSON para objeto
let produtos = JSON.parse(banco)

// =========================
// Mostrar dados
// =========================
function mostrarProdutos() {
  console.log("\nLISTA DE PRODUTOS:\n")

  produtos.forEach((produto) => {
    console.log(`
Nome: R${produto.nome}
Valor: R${produto.valor}
Quantidade: R${produto.quantidade}
Peso: R${produto.peso}
Marca: R${produto.marca}
Codigo: R${produto.codigo}

--------------------------
`)
  })
}

// =========================
// Adicionar Produto
// =========================
function adicionarProduto(novoProduto) {
  produtos.push(novoProduto)

  fs.writeFileSync(
    "banco_de_dados.json",
    JSON.stringify(produtos, null, 2)
  )

  console.log("Produto adicionado com sucesso!")
}

// =========================
// filtrarPorPreco
// =========================
function filtrarPorPreco(valor) {
  const filtrados = produtos.filter((produto) => produto.preco < valor)

  console.log(`\nProdutos com preço menor que R$${valor}:\n`)
  console.log(filtrados)
}

// =========================
// aplicarDesconto
// =========================
function aplicarDesconto(percentual) {
  produtos = produtos.map((produto) => {
    produto.preco = produto.preco - (produto.preco * percentual / 100)
    return produto
  })

  fs.writeFileSync(
    "banco_de_dados.json",
    JSON.stringify(produtos, null, 2)
  )

  console.log(`Desconto de ${percentual}% aplicado!`)
}

// =========================
// encontrarProduto
// =========================
function encontrarProduto(nomeProduto) {
  const encontrado = produtos.find(
    (produto) =>
      produto.nome.toLowerCase() === nomeProduto.toLowerCase()
  );

  if (encontrado) {
    console.log("\nProduto encontrado:")
    console.log(encontrado)
  } else {
    console.log("Produto não encontrado.")
  }
}

// =========================
// Testes
// =========================

mostrarProdutos()

adicionarProduto({
  nome: "Webcam Full HD",
  valor: 300,
  quantidade: 100,
  peso: 8,
  marca: "Logitech",
  codigo: 1234,
  
  
});

filtrarPorPreco(500)

aplicarDesconto(10)

encontrarProduto("SSD 1TB")
