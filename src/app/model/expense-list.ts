import {Deserializable} from './deserializable';
import {Expense} from './expense';

export class ExpenseList implements Deserializable {
  results: Expense[];
  size: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.results = input.results.map(result => new Expense().deserialize(result));
    return this;
  }
}
