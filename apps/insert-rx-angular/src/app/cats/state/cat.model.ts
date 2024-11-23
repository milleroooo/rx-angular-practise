export interface Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
}

export interface CatsState {
  cats: Cat[];
  cat?: Cat;
}
