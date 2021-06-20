expect.extend({
  async toHaveValidationError(received, error): Promise<any> {
    try {
      await received;
    } catch (e) {
      if (
        e.find(err =>
          Object.values(err.constraints).find(
            errMessage => errMessage === error,
          ),
        )
      ) {
        return {
          pass: true,
        };
      } else {
        return { pass: false, message: () => 'There is no such error' };
      }
    }
    if (!received.rejects) {
      return { pass: false, message: () => 'Response should be rejected' };
    }
  },

  toHaveValidationErrorSync(received, error): any {
    try {
      received();
    } catch (e) {
      if (
        e.find(err =>
          Object.values(err.constraints).find(
            errMessage => errMessage === error,
          ),
        )
      ) {
        return {
          pass: true,
        };
      } else {
        return { pass: false, message: () => 'There is no such error' };
      }
    }
    if (!received.rejects) {
      return { pass: false, message: () => 'Response should be rejected' };
    }
  },
});
