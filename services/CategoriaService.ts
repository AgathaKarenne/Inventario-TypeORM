import { AppDataSource } from "../data-source";
import { Categoria } from "../entity/Categoria";
import { Produto } from "../entity/Produto";  // Supondo que você tenha essa entidade
import { Repository } from "typeorm";

export class CategoriaService {
  private categoriaRepository: Repository<Categoria>;

  constructor() {
    this.categoriaRepository = AppDataSource.getRepository(Categoria);
  }

  // Criar categoria
  async criarCategoria(nome: string, descricao: string): Promise<Categoria> {
    const categoria = new Categoria();
    categoria.nome = nome;
    categoria.descricao = descricao;
    return this.categoriaRepository.save(categoria);
  }

  // Listar todas as categorias
  async listarCategorias(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  // Buscar categoria por id ou nome
  async buscarCategoria(id: number | string): Promise<Categoria | undefined> {
    if (typeof id === "number") {
      return this.categoriaRepository.findOne({
        where: { id },
        relations: ["produtos"], // Certifique-se de carregar os produtos associados
      });
    } else {
      return this.categoriaRepository.findOne({
        where: { nome: id },
        relations: ["produtos"], // Certifique-se de carregar os produtos associados
      });
    }
  }

  // Atualizar categoria
  async atualizarCategoria(id: number, nome: string, descricao: string): Promise<Categoria | undefined> {
    const categoria = await this.buscarCategoria(id);
    if (categoria) {
      categoria.nome = nome;
      categoria.descricao = descricao;
      return this.categoriaRepository.save(categoria);
    }
    return undefined;
  }

  // Remover categoria
  async removerCategoria(id: number): Promise<void> {
    const categoria = await this.buscarCategoria(id);
    if (categoria) {
      // Verifica se há produtos associados à categoria
      if (categoria.produtos && categoria.produtos.length === 0) {
        await this.categoriaRepository.remove(categoria);
      } else {
        throw new Error("Não é possível remover a categoria, pois ela possui produtos associados.");
      }
    } else {
      throw new Error("Categoria não encontrada.");
    }
  }
}
