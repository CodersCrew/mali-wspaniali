import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllKeyCodesQuery } from '../impl';
import { KeyCodeRepository } from '../../repositories/key_codes_repository';
import { KeyCode } from '../../models/key_code_model';

@QueryHandler(GetAllKeyCodesQuery)
export class GetAllKeyCodesHandlerHandler
  implements IQueryHandler<GetAllKeyCodesQuery> {
  constructor(private readonly repository: KeyCodeRepository) {}

  async execute({ series }): Promise<KeyCode[]> {
    return this.repository.getAll(series);
  }
}
