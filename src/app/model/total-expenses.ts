import {Deserializable} from './deserializable';

export class TotalExpenses implements Deserializable {
  dates: string[];
  totalExpenses: [];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
