import { createLogger, transports } from 'winston';

import { isProduction } from './shared/utils/is_production';

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: `/api/v2/logs?dd-api-key=${process.env.DD_API_KEY}&ddsource=nodejs&service=maliwspaniali`,
  ssl: true,
};

export const logger = createLogger({
  transports: [
    isProduction()
      ? new transports.Http(httpTransportOptions)
      : new transports.Console(),
  ],
});
