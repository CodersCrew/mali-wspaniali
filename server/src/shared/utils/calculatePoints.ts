interface AssessmentParam {
  a: number;
  b: number;
  lowerLimit: number;
  lowerLimitPoints: number;
  upperLimit: number;
  upperLimitPoints: number;
  badStageLimit: number;
  weakStageLimit: number;
  middleStageLimit: number;
  goodStageLimit: number;
  veryGoodStageLimit: number;
  minScale: number;
  scale39: number;
  scale49: number;
  scale59: number;
  maxScale: number;
}

export const calculatePoints = (
  value: number,
  param: AssessmentParam,
): number => {
  if (!value) return 0;

  if (!param) return 0;

  const points = param.a * value + param.b;

  if (param.a < 0) {
    if (points < param.upperLimitPoints) return param.upperLimitPoints;
    if (points > param.lowerLimitPoints) return param.lowerLimitPoints;

    return Math.round(points);
  }

  if (points > param.upperLimitPoints) return param.upperLimitPoints;
  if (points < param.lowerLimitPoints) return param.lowerLimitPoints;

  return Math.round(points);
};
