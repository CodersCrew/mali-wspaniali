import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllKeyCodeSeriesQuery } from '../impl';
import { KeyCodeRepository } from '../../repositories/key_codes_repository';
import { KeyCode } from '../../models/key_code_model';

@QueryHandler(GetAllKeyCodeSeriesQuery)
export class GetAllKeyCodeSeriesHandler
  implements IQueryHandler<GetAllKeyCodeSeriesQuery> {
  constructor(private repository: KeyCodeRepository) {}

  async execute(): Promise<Array<{ keyCodeSeries: KeyCode; count: number }>> {
    const series = await this.repository.getAllSeries();
    const foundKeycodes: Array<{ keyCodeSeries: KeyCode; count: number }> = [];

    for (let seriesId of series) {
      const keyCode = await this.repository.getOne({ series: seriesId });
      const count = await this.repository.count(seriesId);

      foundKeycodes.push({ keyCodeSeries: keyCode, count });
    }

    return [...foundKeycodes].sort(
      (a, b) =>
        b.keyCodeSeries.createdAt.getTime() -
        a.keyCodeSeries.createdAt.getTime(),
    );
  }
}
