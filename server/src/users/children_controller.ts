import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import * as json2xlsx from 'icg-json-to-xlsx';
import { PassThrough } from 'stream';
import { Response } from 'express';
import { QueryBus } from '@nestjs/cqrs';

import { GqlAuthGuard } from './guards/jwt_guard';
import { GetAllChildrenQuery } from './domain/queries/impl/get_all__children_query';

@UseGuards(GqlAuthGuard)
@Controller('children/result_sheet')
export class ChildrenController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getExcel(@Res() res: Response): Promise<void> {
    const data = [
      {
        childId: '23',
        firstname: 'John',
        lastname: 'Smith',
        dob: new Date().getFullYear(),
        location: 'miasto',
        sex: 'm',
        age: 5,
        t_str: 80,
        t_str_points: 27,
        t_str_mark: 'niski,niedostatecznypoziomcechy',
        t_dex: 80,
        t_dex_points: 27,
        t_dex_mark: 'niski,niedostatecznypoziomcechy',
        t_speed: 80,
        t_speddr_points: 27,
        t_speed_mark: 'niski,niedostatecznypoziomcechy',
        t_pow: 80,
        t_pow_points: 27,
        t_pow_mark: 'niski,niedostatecznypoziomcechy',
        sum: 157,
      },
    ];

    const children = await this.queryBus.execute(new GetAllChildrenQuery());

    const results = children.map(child => {
      const result = { ...data[0] };

      result.childId = child._id.toString();
      result.firstname = child.firstname;

      return result;
    });

    const out = json2xlsx.writeBuffer(results, {
      headers: [
        'Id dziecka',
        'Imię',
        'Nazwisko',
        'Data urodzenia',
        'lokacja',
        'płeć',
        'wiek',
        'Próba siły: rzutpiłkąlekarską(cm)',
        'punkty',
        'ocena',
        'Próba zwinności: bieg wahadłowy4x5m(sek)',
        'punkty',
        'ocena',
        'Próba szybkości: biegna 20m(sek)',
        'punkty',
        'ocena',
        'Próba mocy: skok w dal z miejsca(cm)',
        'punkty',
        'ocena',
        'Suma punktów',
      ],
      sheetName: 'Przedszkole Agatka',
    });

    const readStream = new PassThrough();

    res.set('Content-Type', 'application/vnd.openxmlformats');
    res.set(
      'Content-Disposition',
      'attachment; filename= test-przedszkole-agatka.xlsx',
    );

    const buffer = new Buffer(out, 'binary');

    readStream.end(buffer);

    readStream.pipe(res);
  }
}
