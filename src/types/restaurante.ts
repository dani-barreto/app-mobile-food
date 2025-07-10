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
export const restaurantes: Restaurante[] = [
  {
    id: '1',
    nome: 'Restaurante A',
    endereco: 'Rua A, 123',
    cnpj: '12.345.678/0001-90',
    latitude: '-23.550520',
    longitude: '-46.633308',
    produtos: [
      {
        id: '1',
        nome: 'Feijoada',
        descricao: 'Feijão preto com carnes variadas, servido com arroz.',
        preco: 'R$ 25,00',
        imagem: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80'
      },
      {
        id: '2',
        nome: 'Moqueca',
        descricao: 'Peixe cozido com leite de coco, azeite de dendê e temperos.',
        preco: 'R$ 30,00',
        imagem: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=80&q=80'
      }
    ]
  },
  {
    id: '2',
    nome: 'Restaurante B',
    endereco: 'Rua B, 456',
    cnpj: '98.765.432/0001-10',
    latitude: '-23.550520',
    longitude: '-46.633308',
    produtos: [
      {
        id: '3',
        nome: 'Escondidinho',
        descricao: 'Purê de mandioca com carne seca desfiada.',
        preco: 'R$ 22,00',
        imagem: 'https://images.unsplash.com/photo-1523987355523-c7b5b0723c6a?auto=format&fit=crop&w=80&q=80'
      }
    ]
  }
];