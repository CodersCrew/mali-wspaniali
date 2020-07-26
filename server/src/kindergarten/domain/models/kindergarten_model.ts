export interface KindergartenProps {
  readonly _id?: string;
  readonly city: string;
  readonly number: string;
  readonly name: string;
}

export class Kindergarten {
  private constructor(private readonly props: KindergartenProps) {}

  getProps(): KindergartenProps {
    return this.props;
  }
}
