<?php
header('Access-Control-Allow-Origin: *');//permite acesso de todas as origins

header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');//permite acesso dos metodos
//PUT é utilizado para fazer um UPDATE no banco
//DELETE é utilizado para deletar algo do banco
header('Access-Control-Allow-Headers: Content-Type');//permite com que qualquer header consiga acessar o sitema

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    exit;
}

include 'conexao.php';
//inclui os dados de conexao com o banco de dados no sistema abaixo


//rota para obter todos os livros utilizando o get
if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $stmt = $conn->prepare("SELECT * FROM livros");
    $stmt -> execute();
    $livros = $stmt ->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($livros);
    //converter dados em json
}


//Utilizando o Post

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $titulo = $_POST['titulo'];
    $autor = $_POST['autor'];
    $ano_publicacao = $_POST['ano_publicacao'];

    $stmt = $conn->prepare("INSERT INTO livros (titulo, autor, ano_publicacao) values 
    (:titulo, :autor, :ano_publicacao)");

    $stmt -> bindParam(':titulo', $titulo);
    $stmt -> bindParam(':autor', $autor);
    $stmt -> bindParam(':ano_publicacao', $ano_publicacao);

    if($stmt->execute()){
        echo 'livro criado com sucesso!';
    }else{
        echo 'erro ao criar o livro';
    }
}




//rota para atualizar um livro existente

if($_SERVER['REQUEST_METHOD']==='PUT' && isset($_GET['id'])){
    //convertendo dados recebidos em string
    parse_str(file_get_contents("php://input"), $_PUT);


    $id = $_GET['id'];
    $novoTitulo = $_PUT['titulo'];
    $novoAutor = $_PUT['autor'];
    $novoAno = $_PUT['ano_publicacao'];

    $stmt = $conn->prepare("UPDATE livros SET titulo = :titulo, autor = :autor, ano_publicacao = :ano_publicacao WHERE id = :id");
    $stmt->bindParam(':titulo', $novoTitulo);
    $stmt->bindParam(':autor', $novoAutor);
    $stmt->bindParam(':ano_publicacao', $novoAno);
    $stmt->bindParam(':id', $id);


    if($stmt->execute()){
        echo "livro atualizado com sucesso!!";

    } else{
        echo "erro ao att livro :(";
    }

}

if($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])){
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM livros WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "Livro excluido com sucesso!!";
    } else {
        echo "erro ao excluir livro";
    }
}


?>