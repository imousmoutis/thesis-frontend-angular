import {Deserializable} from './deserializable';

export class Expense implements Deserializable {
  id: string;
  amount: number;
  category: number;
  date: string;
  description: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

}
