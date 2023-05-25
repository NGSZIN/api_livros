const form = document.querySelector('#livroForm')
const tituloInput = document.querySelector('#tituloInput')
const autorInput = document.querySelector('#autorInput')
const ano_publicacaoInput = document.querySelector('#ano_publicacaoInput')
const tableBody = document.querySelector('#livrosTabela')

const URL = 'http://localhost:8080/livros.php'

function carregarLivros() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(livros => {
            tableBody.innerHTML = ''


            livros.forEach(livros => {
                const tr = document.createElement('tr')
                tr.innerHTML = `
            <td>${livros.id}</td>
            <td>${livros.titulo}</td>
            <td>${livros.autor}</td>
            <td>${livros.ano_publicacao}</td>
            
            <td>
            <button data-id="${livros.id}" onclick="atualizarLivro(${livros.id})">Editar</button>
            <button onclick="excluirLivro(${livros.id})">Excluir</button>
            </td>
            `
                tableBody.appendChild(tr)

            })
        })
}

function adicionarLivro(event) {
    event.preventDefault()

    const titulo = tituloInput.value
    const autor = autorInput.value
    const ano_publicacao = ano_publicacaoInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `titulo=${encodeURIComponent(titulo)}&autor=${encodeURIComponent(autor)}&ano_publicacao=${encodeURIComponent(ano_publicacao)}`
    })
        .then(response => {
            if (response.ok) {
                carregarLivros()
                tituloInput.value = ''
                autorInput.value = ''
                ano_publicacaoInput.value = ''
            } else {
                console.error('Erro ao add livro')
                alert('Erro ao add Livro')
            }
        })
}

function excluirLivro(id) {
    if (confirm('Deseja excluir esse livro?')) {
        fetch(`${URL}?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    carregarLivros()
                } else {
                    console.error('Erro ao excluir livros')
                    alert('Erro ao excluir livro')
                }
            })
    }

}

function atualizarLivro(id){
 const novoTitulo = prompt('Digite o novo titulo')
 const novoAutor = prompt('Digite o novo Autor')
 const novoAno = prompt('Digite o novo ano de publicação')

 if(novoTitulo && novoAno && novoAutor) {
    fetch(`${URL}?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `titulo=${encodeURIComponent(novoTitulo)}&autor=${encodeURIComponent(novoAutor)}&ano_publicacao=${encodeURIComponent(novoAno)}`
    })
    
    .then(response => {
        if(response.ok){
          carregarLivros()  
        } else {
            console.error('Erro ao atualizar livro')
            alert('Erro ao atualizar livro')
        }
    })
}
}



form.addEventListener('submit', adicionarLivro)
carregarLivros()
