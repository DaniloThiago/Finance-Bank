export default interface transactionItem {
  id: number;
  idCard: number;
  date: string;
  description: string;
  tipoTransacao: number;
  categoriaGasto: number;
  value: number;
  status: number;
};