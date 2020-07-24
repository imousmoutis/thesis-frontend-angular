import {Deserializable} from './deserializable';

export class ExpenseCategory implements Deserializable {
  id: number;
  name: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
