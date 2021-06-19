export class ChildUpdatedEvent {
  constructor(
    public readonly childId: string,
    public readonly update: {
      [index: string]: string | number | boolean | Date;
    },
  ) {}
}
