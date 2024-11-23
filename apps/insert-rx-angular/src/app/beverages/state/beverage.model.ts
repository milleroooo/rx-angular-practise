export interface Beverage {
  id: number;
  name: string;
  type: string;
  volumeInLiters: number;
  isCarbonated: boolean;
}

export interface BeveragesState {
  beverages: Beverage[];
  beverage?: Beverage;
}
