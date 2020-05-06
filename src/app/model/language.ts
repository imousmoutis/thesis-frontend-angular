import {Deserializable} from './deserializable';

export class Language implements Deserializable {
  name: string;
  locale: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
