import { GetFinancial, PersistFinancial } from './financial.dto';

export type GetProduction = {
  id?: number,
  name?: string,
  staffQuantity?: number,
  financial?: GetFinancial
  productionCost: GetProductionCost[]
}

export interface GetProductionCost {
  id?: number,
  name?: string,
  quantity?: number,
  production?: number,
  financial?: GetFinancial
}

export interface PersistProduction {
  name: string,
  staffQuantity?: number,
  eventId?: number,
  financial?: GetFinancial
  productionCost: PersistProductionCost[]
}

export interface PersistProductionCost {
  name: string,
  quantity: number,
  productionId?: number,
  financial?: PersistFinancial
}
