import "reflect-metadata";
import { DataSource } from "typeorm";
import { Categoria } from "./entity/Categoria";
import { Produto } from "./entity/Produto";


export const AppDataSource = new DataSource({
  type: "sqlite",  // Pode ser MySQL, PostgreSQL, etc.
  database: "db.sqlite",  // Nome do banco de dados
  synchronize: true,  // Sincroniza as entidades com o banco de dados
  logging: false,  // Habilita o log, útil durante o desenvolvimento
  entities: [Categoria, Produto],
  migrations: [],
  subscribers: [],
});
