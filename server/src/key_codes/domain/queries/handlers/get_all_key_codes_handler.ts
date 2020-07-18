import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllKeyCodesQuery } from '../impl/get_all_key_codes_query';
import { KeyCodeRepository } from '../../repositories/key_codes_repository';
import { KeyCodeProps } from '../../models/key_code_model';

@QueryHandler(GetAllKeyCodesQuery)
export class GetAllKeyCodesHandlerHandler
  implements IQueryHandler<GetAllKeyCodesQuery> {
  constructor(private readonly repository: KeyCodeRepository) {}

  async execute(): Promise<KeyCodeProps[]> {
    return this.repository.getAll();
  }
}
