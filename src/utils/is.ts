const isTrue = (value: string | boolean) => {
  return value === 'true' || value === true;
};

const isFalse = (value: string | boolean) => {
  return value === 'false' || value === false;
};

export { isFalse, isTrue };
