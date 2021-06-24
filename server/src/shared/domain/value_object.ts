import { shallowEqual } from 'shallow-equal-object';

export interface Props<T> {
  value: T;
}

export abstract class ValueObject<T> {
  public props: Props<T>;

  constructor(props: Props<T>) {
    this.props = Object.freeze(props);
  }

  get value() {
    return this.props.value;
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) return false;

    if (vo.props === undefined) return false;

    return shallowEqual(this.props, vo.props);
  }
}
