import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllKeyCodeSeriesQuery } from '../impl';
import { KeyCodeRepository } from '../../repositories/key_codes_repository';
import { KeyCodeSeriesProps } from '../../models/key_code_model';

@QueryHandler(GetAllKeyCodeSeriesQuery)
export class GetAllKeyCodeSeriesHandler
  implements IQueryHandler<GetAllKeyCodeSeriesQuery> {
  constructor(private readonly repository: KeyCodeRepository) {}

  async execute(): Promise<KeyCodeSeriesProps[]> {
    const series = await this.repository.getAllSeries();
    const foundKeycodes: KeyCodeSeriesProps[] = [];

    for (let seriesId of series) {
      const keyCode = await this.repository.getOne({ series: seriesId });
      const count = await this.repository.count(seriesId);

      foundKeycodes.push({ ...keyCode, count });
    }

    return foundKeycodes;
  }
}
