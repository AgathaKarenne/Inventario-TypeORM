import "reflect-metadata";
import inquirer from "inquirer";
import { CategoriaService } from "./services/CategoriaService";
import { AppDataSource } from "./data-source";

async function start() {
  try {
    await AppDataSource.initialize();
    console.log("Conexão com o banco de dados bem-sucedida!");

    // Lógica da sua aplicação, como criação de categorias ou produtos

  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

start();

const categoriaService = new CategoriaService();

async function mainMenu() {
  const { choice } = await inquirer.prompt({
    type: "list",
    name: "choice",
    message: "Escolha uma opção:",
    choices: [
      "Criar Categoria",
      "Listar Categorias",
      "Buscar Categoria",
      "Atualizar Categoria",
      "Remover Categoria",
      "Sair"
    ]
  });

  switch (choice) {
    case "Criar Categoria":
      // Código para criar categoria
      break;
    case "Listar Categorias":
      const categorias = await categoriaService.listarCategorias();
      console.table(categorias);
      break;
    case "Buscar Categoria":
      // Código para buscar categoria
      break;
    case "Atualizar Categoria":
      // Código para atualizar categoria
      break;
    case "Remover Categoria":
      // Código para remover categoria
      break;
    case "Sair":
      process.exit();
    default:
      break;
  }

  mainMenu();
}

mainMenu();
