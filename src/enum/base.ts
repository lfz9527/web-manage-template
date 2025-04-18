import type { Dictionary } from '@/types/dictionary';
import type { ClassConstructor, EnumKey, IJson } from '@/types/type';

export class Enum<K extends EnumKey = string> implements Dictionary<K> {
  /**
   * 枚举的值
   */
  key!: K;

  /**
   * 枚举的描述
   */
  label!: string;

  /**
   * 是否被禁用
   * 如禁用, 下拉选项中将显示但无法选中
   */
  disabled?: boolean;

  /**
   * 子枚举
   */
  children?: this[];

  /**
   * ### 实例化创建一个枚举项目
   * @param key 枚举值
   * @param label 枚举描述
   * @param color `可选` 枚举扩展的颜色
   * @param disable `可选` 是否禁用
   */
  constructor(key: K, label: string, disable?: boolean) {
    this.key = key;
    this.label = label;
    this.disabled = disable;
  }
  /**
   * 查找一个枚举选项
   * @param key 枚举值
   * @returns 枚举选项
   */
  static get<K extends EnumKey, E extends Enum<K>>(
    this: ClassConstructor<E>,
    key: EnumKey,
  ): E | null {
    return (
      (this as IJson).toArray().find((item: E) => item.key === key) || null
    );
  }

  /**
   *  将枚举转为数组
   * @returns 枚举数组
   */
  static toArray<K extends EnumKey, E extends Enum<K>>(
    this: ClassConstructor<E>,
  ): E[] {
    return Object.values(this).filter((item) => item instanceof this);
  }
  /**
   *  判断key 是否相等
   * @param key
   * @returns
   */
  equalsKey(key: EnumKey): boolean {
    return this.key === key;
  }
  /**
   * 判断key 是否不相等
   * @param key 枚举值
   * @returns 是否不相等
   */
  notEqualsKey(key: K): boolean {
    return this.key !== key;
  }
}
