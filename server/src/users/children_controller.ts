import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import * as json2xlsx from 'icg-json-to-xlsx';
import { PassThrough } from 'stream';
import { Response } from 'express';
import { QueryBus } from '@nestjs/cqrs';

import { GqlAuthGuard } from './guards/jwt_guard';
import { GetAllChildrenQuery } from './domain/queries/impl/get_all_children_query';
import { parseDateToAge } from '@app/shared/utils/parse_date_to_age';
import { countParams } from '@app/shared/utils/count_params';
import { calculatePoints } from '@app/shared/utils/calculatePoints';
import { GetAssessmentsQuery } from '@app/assessment/domain/queries/impl';
import { Assessment } from '@app/assessment/domain/models/assessment_model';
// import { filter } from 'rxjs/operators';

@UseGuards(GqlAuthGuard)
@Controller('children/result_sheet')
export class ChildrenController {
  constructor(private queryBus: QueryBus) {}

  @Get(':assessmentId')
  async getExcel(
    @Res() res: Response,
    @Param('assessmentId') assessmentId: string,
  ): Promise<void> {
    const assessment: Assessment | undefined = await this.queryBus.execute(
      new GetAssessmentsQuery(assessmentId),
    );

    const getTotalMark = (total) => {
      const resultDescription = {
        scale39: 'niski, niedostateczny poziom sprawności fizycznej',
        scale49: 'dostateczny poziom sprawności fizycznej',
        scale59: 'dobry poziom sprawności fizycznej',
        maxScale: 'wysoki, bardzo dobry poziom sprawności fizycznej',
      };
      if (total < 39 * 4) return resultDescription.scale39;
      if (total < 49 * 4) return resultDescription.scale49;
      if (total < 59 * 4) return resultDescription.scale59;

      return resultDescription.maxScale;
    };

    const data = [
      {
        kindergartenName: '1',
        firstname: 'John',
        lastname: 'Smith',
        yob: 2018,
        qob: 2,

        tf_sex: 'm',
        tf_age: 5,
        tf_str: 80,
        tf_str_points: 27,
        tf_dex: 80,
        tf_dex_points: 27,
        tf_speed: 80,
        tf_speed_points: 27,
        tf_pow: 80,
        tf_pow_points: 27,
        tf_total_points: 157,
        tf_total_mark: 'niski,niedostatecznypoziomcechy',

        tl_sex: 'm',
        tl_age: 5,
        tl_str: 80,
        tl_str_points: 27,
        tl_dex: 80,
        tl_dex_points: 27,
        tl_speed: 80,
        tl_speed_points: 27,
        tl_pow: 80,
        tl_pow_points: 27,
        tl_total_points: 157,
        tl_total_mark: 'niski,niedostatecznypoziomcechy',

        kindergarten: 'P00',
        location: 'miasto',
      },
    ];

    const children = await this.queryBus.execute(new GetAllChildrenQuery());

    children.forEach((child) => {
      if (child.results.length) {
        child.results = child.results.filter(
          (result) => result.assessmentId === assessmentId,
        );
      }
    });

    const childrenInAssessment = children.filter(
      (child) => child.results.length,
    );

    const results = childrenInAssessment
      .filter((child) => !!child.results.length)
      .filter(
        (child) =>
          child.results[0].firstMeasurementJumpResult &&
          child.results[0].firstMeasurementRunResult &&
          child.results[0].firstMeasurementThrowResult &&
          child.results[0].firstMeasurementPendelumRunResult,
        // TODO: customize! Distinguish FIRST test, LAST test, or both
        // child.results[0].firstMeasurementPendelumRunResult &&
        // child.results[0].lastMeasurementJumpResult &&
        // child.results[0].lastMeasurementRunResult &&
        // child.results[0].lastMeasurementThrowResult &&
        // child.results[0].lastMeasurementPendelumRunResult,
      )
      .map((child) => {
        const result = { ...data[0] };

        const firstCurrentParams = countParams(
          {
            birthYear: child.child.birthYear,
            birthQuarter: child.child.birthQuarter,
            sex: child.child.sex,
          },
          assessment.firstMeasurementStartDate,
        );

        const lastCurrentParams = countParams(
          {
            birthYear: child.child.birthYear,
            birthQuarter: child.child.birthQuarter,
            sex: child.child.sex,
          },
          assessment.lastMeasurementStartDate,
        );

        /*
        Object.keys(currentParams).forEach((param) => {
          const scaleInPoints = {
            scale39InPoints: calculatePoints(
              currentParams[param].scale39,
              currentParams[param],
            ),
            scale49InPoints: calculatePoints(
              currentParams[param].scale49,
              currentParams[param],
            ),
            scale59InPoints: calculatePoints(
              currentParams[param].scale59,
              currentParams[param],
            ),
          };

          currentParams[param] = { ...currentParams[param], ...scaleInPoints };
        });
*/

        result.kindergartenName = child.kindergarten.name;
        result.firstname = child.child.firstname;
        result.lastname = child.child.lastname;
        result.yob = child.child.birthYear;
        result.qob = child.child.birthQuarter + 1;

        result.tf_sex = child.child.sex === 'male' ? 'M' : 'K';
        result.tf_age = parseDateToAge(
          child.child.birthYear,
          child.child.birthQuarter,
          assessment.firstMeasurementStartDate,
        );
        result.tl_sex = child.child.sex === 'male' ? 'M' : 'K';
        result.tl_age = parseDateToAge(
          child.child.birthYear,
          child.child.birthQuarter,
          assessment.lastMeasurementStartDate,
        );

        result.tf_str = child.results[0].firstMeasurementThrowResult;
        result.tf_str_points = calculatePoints(
          child.results[0].firstMeasurementThrowResult,
          firstCurrentParams.throw,
        );
        result.tl_str = child.results[0].lastMeasurementThrowResult;
        result.tl_str_points = calculatePoints(
          child.results[0].lastMeasurementThrowResult,
          lastCurrentParams.throw,
        );

        result.tf_dex = child.results[0].firstMeasurementPendelumRunResult;
        result.tf_dex_points = calculatePoints(
          child.results[0].firstMeasurementPendelumRunResult,
          firstCurrentParams.pendelumRun,
        );
        result.tl_dex = child.results[0].lastMeasurementPendelumRunResult;
        result.tl_dex_points = calculatePoints(
          child.results[0].lastMeasurementPendelumRunResult,
          lastCurrentParams.pendelumRun,
        );

        result.tf_speed = child.results[0].firstMeasurementRunResult;
        result.tf_speed_points = calculatePoints(
          child.results[0].firstMeasurementRunResult,
          firstCurrentParams.run,
        );
        result.tl_speed = child.results[0].lastMeasurementRunResult;
        result.tl_speed_points = calculatePoints(
          child.results[0].lastMeasurementRunResult,
          lastCurrentParams.run,
        );

        result.tf_pow = child.results[0].firstMeasurementJumpResult;
        result.tf_pow_points = calculatePoints(
          child.results[0].firstMeasurementJumpResult,
          firstCurrentParams.jump,
        );
        result.tl_pow = child.results[0].lastMeasurementJumpResult;
        result.tl_pow_points = calculatePoints(
          child.results[0].lastMeasurementJumpResult,
          lastCurrentParams.jump,
        );

        result.tf_total_points =
          result.tf_speed_points +
          result.tf_pow_points +
          result.tf_dex_points +
          result.tf_str_points;

        result.tf_total_mark = getTotalMark(result.tf_total_points);

        result.tl_total_points =
          result.tl_speed_points +
          result.tl_pow_points +
          result.tl_dex_points +
          result.tl_str_points;

        result.tl_total_mark = getTotalMark(result.tl_total_points);

        result.kindergarten = `P${child.kindergarten.number}`;

        return result;
      });

    const out = json2xlsx.writeBuffer(results, {
      headers: [
        'Nazwa przedszkola',
        'Imię',
        'Nazwisko',
        'Rok urodzenia',
        'Kwartał urodzenia',

        'Płeć',
        'Wiek',
        'Próba siły: rzut piłką lekarską (cm)',
        'punkty',
        'Próba zwinności: bieg wahadłowy 4x5m (s)',
        'punkty',
        'Próba szybkości: bieg na 20m (s)',
        'punkty',
        'Próba mocy: skok w dal z miejsca (cm)',
        'punkty',
        'Suma punktów',
        'Poziom sprawności',

        'Płeć',
        'Wiek',
        'Próba siły: rzut piłką lekarską (cm)',
        'punkty',
        'Próba zwinności: bieg wahadłowy 4x5m (s)',
        'punkty',
        'Próba szybkości: bieg na 20m (s)',
        'punkty',
        'Próba mocy: skok w dal z miejsca (cm)',
        'punkty',
        'Suma punktów',
        'Poziom sprawności',

        'Przedszkole',
        'Lokalizacja',
      ],
      sheetName: assessment.title.replace(/[\\|\/|"|:|\*|\?]/g, '_'),
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
