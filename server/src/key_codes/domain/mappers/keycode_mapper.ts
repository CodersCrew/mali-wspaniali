import { classToPlain } from 'class-transformer';
import { transformAndValidateSync } from 'class-transformer-validator';
import { KeyCode, KeyCodeCore } from '../models/key_code_model';

export class KeyCodeMapper {
  static toDomain(value: KeyCodeCore): KeyCode {
    return KeyCode.create(
      transformAndValidateSync(KeyCodeCore, value, {
        transformer: { excludeExtraneousValues: true },
        validator: { validationError: { target: false, value: false } },
      }),
    );
  }

  static toDomainMany(values: KeyCodeCore[]): KeyCode[] {
    return values.map(value => KeyCodeMapper.toDomain(value));
  }

  static toPlain(value: KeyCode): KeyCodeCore {
    const props = value.getProps();

    return classToPlain(props, {
      excludeExtraneousValues: true,
    }) as KeyCodeCore;
  }

  static toPlainMany(values: KeyCode[]): KeyCodeCore[] {
    return values.map(value => KeyCodeMapper.toPlain(value));
  }
}
