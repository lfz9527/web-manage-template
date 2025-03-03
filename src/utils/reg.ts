// 域名正则
export const domainRegex =
  /^(?!-)[A-Za-z0-9-]+([-.]{1}[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const validReg = (reg: RegExp, value: string | number) => {
  return reg.test(String(value));
};

// 域名校验
export const validDomain = (value: string) => {
  return validReg(domainRegex, value);
};
