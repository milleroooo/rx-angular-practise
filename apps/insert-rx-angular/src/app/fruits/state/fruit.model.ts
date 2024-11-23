export interface Fruit {
  id: string;
  name: string;
  color: string;
  taste: string;
}

export interface FruitsState {
  fruits: Fruit[];
  fruit?: Fruit;
}
