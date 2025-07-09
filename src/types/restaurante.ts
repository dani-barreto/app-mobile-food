// restaurante.ts - criado automaticamente
export interface Restaurante {
  id: string;
  nome: string;
  endereco: string;
  cnpj: string;
  latitude: string;
  longitude: string;
}

export const restaurants: Restaurante[] = [
  {
    id: '1',
    nome: 'Restaurante Sabor Brasil',
    endereco: 'Rua das Flores, 123, Centro, São Paulo - SP',
    cnpj: '12.345.678/0001-90',
    latitude: '-23.550520',
    longitude: '-46.633308'
  },
  {
    id: '2',
    nome: 'Delícias do Nordeste',
    endereco: 'Avenida Brasil, 456, Jardim América, Recife - PE',
    cnpj: '98.765.432/0001-10',
    latitude: '-8.047562',
    longitude: '-34.876964'
  }
];
