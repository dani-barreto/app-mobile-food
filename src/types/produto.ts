// produto.ts - criado automaticamente
export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  restaurantId: number;
}


export const products: Produto[] = [
  {
    id: '1',
    restaurantId: 1,
    nome: 'Feijoada',
    descricao: 'Feijão preto com carnes variadas, servido com arroz.',
    preco: 'R$ 25,00',
    imagem: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80'
  },
  {
    id: '2',
     restaurantId: 1,
    nome: 'Moqueca',
    descricao: 'Peixe cozido com leite de coco, azeite de dendê e temperos.',
    preco: 'R$ 30,00',
    imagem: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=80&q=80'
  },
  {
    id: '3',
    restaurantId: 2,
    nome: 'Escondidinho',
    descricao: 'Purê de mandioca com carne seca desfiada.',
    preco: 'R$ 22,00',
    imagem: 'https://images.unsplash.com/photo-1523987355523-c7b5b0723c6a?auto=format&fit=crop&w=80&q=80'
  }
];