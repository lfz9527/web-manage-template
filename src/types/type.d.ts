/**
 *  枚举的键
 */
type EnumKey = string | number | boolean;

/**
 * 标准的 `JSON` 数据
 * @author Hamm.cn
 */
export interface IJson<V = any> {
  /**
   * `JSON` 的键
   */
  [x: string]: V;
}

/**
 * 类包装
 */
export type ClassConstructor<T = any> = {
  // eslint-disable-next-line no-unused-vars
  new (...args: any[]): T;
};
