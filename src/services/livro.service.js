// SERVICE: Aqui mora a lógica de negócio da aplicação.
// Esta camada não conhece Express, não conhece req, não conhece res.
// Simulação do acervo — em breve será uma query no Postgres
const pool = require('../database/connection')

// Lista todos os livros do acervo
const listarTodosLivros = async () => {
  try{
    const resultado = await pool.query('SELECT * FROM livros ORDER BY id')
    return resultado.rows
  }catch (error) {
    console.log('Erro ao digitar todos os livros', error.message)
    throw error
  }
};

// Busca um livro específico pelo ID
const buscarLivroPorId = async (id) => {
  const resultado = await pool.query('SELECT * FROM livros WHERE id = $1', [
    id,
  ])
   return resultado.rows[0]
};

// Criar um novo livro no acervo
const criarLivro = async ({ titulo, autor, isbn, ano_publicacao, categoria_id }) => {
  try{
    const query = `INSERT INTO livros (titulo, autor, isbn, ano_publicacao, categoria_id ) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const res = await pool.query([
      titulo, 
      autor, 
      isbn,
      ano_publicacao,
      categoria_id,
    ])
  }catch (error){
    
  }
  return res.rows[0]
};

module.exports = { listarTodosLivros, buscarLivroPorId, criarLivro };
