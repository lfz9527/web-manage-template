import type { EnumKey } from './type';
/**
 * # 标准字典
 * 用于全局固定枚举字典的声明
 * @author Hamm.cn
 */
export interface Dictionary<K extends EnumKey = EnumKey> {
  /**
   * ### 字典的值
   */
  key: K;

  /**
   * ### 字典的显示标题
   */
  label: string;
  /**
   * ### 是否被禁用
   *  如禁用, 下拉选项中将显示但无法选中
   */
  disabled?: boolean;

  /**
   * ### 子字典
   */
  children?: this[];
}
