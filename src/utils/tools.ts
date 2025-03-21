const isProduction = process.env.NODE_ENV === 'production';

/**
 * 给图片链接添加前缀
 * @param link 图片链接
 * @returns
 */
const formatImageUrl = (link: string) => {
  if (!link) return '';
  if (link && link.startsWith('http')) {
    return link;
  } else {
    return `${UPLOAD_URL}${link}`;
  }
};

export type FileSizeUnit = 'B' | 'KB' | 'MB' | 'GB';

/**
 * 文件大小单位转换函数
 * @param size 文件大小，支持数字或字符串格式
 * @param fromUnit 原始单位，支持 B、KB、MB、GB
 * @param toUnit 目标单位，支持 B、KB、MB、GB
 * @param decimalPlaces 保留的小数位数，默认为 2
 * @returns 转换后的文件大小数值
 * @example
 * convertFileSize(1024, 'B', 'KB') // 返回 1
 * convertFileSize('2048', 'KB', 'MB') // 返回 2
 */
const convertFileSize = (
  size: number | string,
  fromUnit: FileSizeUnit,
  toUnit: FileSizeUnit,
  decimalPlaces = 2,
) => {
  let numberSize = typeof size === 'string' ? Number(size) : size;
  if (!size) return 0;

  const units = ['B', 'KB', 'MB', 'GB'];
  const fromIndex = units.indexOf(fromUnit);
  const toIndex = units.indexOf(toUnit);

  if (fromIndex === -1 || toIndex === -1) {
    throw new Error('单位不正确');
  }

  const difference = toIndex - fromIndex; // 修改：计算方向改变
  const unsetDecimalPlaces = decimalPlaces === -1;

  if (difference > 0) {
    // 如果目标单位大于源单位（例如 B -> KB），则除以 1024

    if (unsetDecimalPlaces) {
      return Number(numberSize / Math.pow(1024, difference));
    }

    return Number(
      (numberSize / Math.pow(1024, difference)).toFixed(decimalPlaces),
    );
  } else {
    // 如果目标单位小于源单位（例如 KB -> B），则乘以 1024
    if (unsetDecimalPlaces) {
      return Number(numberSize * Math.pow(1024, Math.abs(difference)));
    }
    return Number(
      (numberSize * Math.pow(1024, Math.abs(difference))).toFixed(
        decimalPlaces,
      ),
    );
  }
};

/**
 * 格式化文件大小
 * @param size
 * @param from
 * @param to
 * @returns
 */
const formatSize = (
  size: number | string = 0,
  from: FileSizeUnit = 'B',
  to: FileSizeUnit = 'KB',
) => {
  let value = typeof size === 'string' ? Number(size) : size;
  if (value <= 0) return 0 + from;
  value = convertFileSize(size, from, to);

  const units: FileSizeUnit[] = ['B', 'KB', 'MB', 'GB'];
  let currentUnitIndex = units.indexOf(to);
  while (value >= 1024 && currentUnitIndex < units.length - 1) {
    currentUnitIndex++;
    value = convertFileSize(size, from, units[currentUnitIndex]);
  }
  return `${value} ${units[currentUnitIndex]}`;
};

/**
 * 格式化时间
 * @param time 时间字符串，支持 ISO 格式
 * @param format 输出格式，默认 YYYY-MM-DD HH:mm:ss
 * @returns 格式化后的时间字符串
 * @example
 * formatTime('2025-03-12T06:31:52') // 返回 2025-03-12 06:31:52
 */
const formatTime = (time: string, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  if (!time) return '';
  const date = new Date(time);

  const formatMap: Record<string, number> = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
  };

  return format.replace(/(YYYY|MM|DD|HH|mm|ss)/g, (match) => {
    const value = formatMap[match];
    return value < 10 ? `0${value}` : String(value);
  });
};

export {
  convertFileSize,
  formatImageUrl,
  formatSize,
  formatTime,
  isProduction,
};
