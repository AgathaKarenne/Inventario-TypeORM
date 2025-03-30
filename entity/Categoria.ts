import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Produto } from "./Produto";  // Supondo que Produto é a outra entidade

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  // Relacionamento de 1:N entre Categoria e Produto
  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}
