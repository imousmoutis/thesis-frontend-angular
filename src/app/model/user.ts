import {UserAttribute} from './user-attribute';
import {Deserializable} from './deserializable';

export class User implements Deserializable {
  username: string;
  status: number;
  userAttributes: UserAttribute[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.userAttributes = input.userAttributes.map(userAttribute => new UserAttribute().deserialize(userAttribute));
    return this;
  }

  findAttribute(name: string): string {
    return this.userAttributes.find(userAttribute => userAttribute.name === name).data;
  }
}
