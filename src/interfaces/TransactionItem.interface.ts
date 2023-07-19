export interface TransactionItemInterface {
  id?: number;
  idCard?: number;
  date: string;
  description: string;
  tipoTransacao: number;
  categoriaGasto?: number;
  value: number;
  status: number;
}
