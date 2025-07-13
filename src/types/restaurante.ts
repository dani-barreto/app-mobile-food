import { Produto } from "./produto";

export interface Restaurante {
  id: string;
  nome: string;
  endereco: string;
  cnpj: string;
  latitude: string;
  longitude: string;
  produtos: Produto[];
}