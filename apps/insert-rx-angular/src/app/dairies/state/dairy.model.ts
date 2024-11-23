export interface Dairy {
  id: string;
  name: string;
  type: string;
  fatContent: number;
}

export interface DairiesState {
  dairies: Dairy[];
  dairy?: Dairy;
}

