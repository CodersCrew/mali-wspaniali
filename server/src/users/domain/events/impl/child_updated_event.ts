export class ChildUpdatedEvent {
  constructor(
    public childId: string,
    public update: {
      [index: string]: string | number | boolean | Date;
    },
  ) {}
}
