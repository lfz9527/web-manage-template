const isTrue = (value: string | boolean) => {
  return value === 'true' || value === true;
};

const isFalse = (value: string | boolean) => {
  return value === 'false' || value === false;
};

const isNull = (value: any, checkZero: boolean = false) => {
  if (checkZero) {
    return value === null || value === undefined || value === 0;
  }
  return value === null || value === undefined;
};

export { isFalse, isNull, isTrue };
