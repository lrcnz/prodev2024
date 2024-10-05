import { clsx, type ClassValue } from 'clsx';
import { formatUnits } from 'ethers';
import numbro from 'numbro';
import { twMerge } from 'tailwind-merge';

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type FormatOptions = {
  output?: 'currency' | 'percent' | 'number';
  thousandSeparated?: boolean;
  mantissa?: number;
  trimMantissa?: boolean;
  average?: boolean;
  ellipsis?: boolean;
  rounding?: 'round' | 'floor' | 'ceil';
  fallback?: string;
  errorValue?: string;
  zeroValue?: string;
  prefix?: string;
  showBalance?: boolean;
  decimals?: number;
};

export const formatNumber = (
  value: string | number | undefined | bigint,
  {
    output = 'number',
    thousandSeparated = true,
    mantissa,
    trimMantissa = true,
    average = false,
    rounding = 'floor',
    fallback = '--',
    errorValue = undefined,
    zeroValue = undefined,
    ellipsis = false,
    prefix = undefined,
    showBalance = true,
    decimals = undefined,
  }: FormatOptions = {}
) => {
  let num: number | string;
  if (showBalance === false) return '******';
  if (value === '' || value === undefined || value === null) return fallback;
  if (typeof value === 'bigint' && decimals) {
    num = formatUnits(value, decimals);
  } else {
    num = Number(value);
  }

  if (zeroValue && Number(num) === 0) return zeroValue;
  if (isNaN(num as any) || !isFinite(num as any)) return errorValue;

  const options: any = {
    average,
    output,
    thousandSeparated,
    trimMantissa,
    roundingFunction: rounding === 'ceil' ? Math.ceil : rounding === 'floor' ? Math.floor : Math.round,
  };

  if (typeof mantissa === 'number') {
    options.mantissa = mantissa;
  }

  if (output === 'currency') {
    options.output = 'number';
  }

  if (output === 'percent' && ellipsis && Number(num) >= 100) {
    const value = numbro(100).format(options);
    return `${prefix || ''}${value.split('%')[0]}+%`;
  }

  if (output === 'percent' && ellipsis && num && Number(num) < 0.0001) {
    // const value = numbro(100).format(options);
    return `<0.01%`;
  }

  try {
    return `${prefix || ''}${output === 'currency' ? '$' : ''}${numbro(num).format(options).toUpperCase()}`;
  } catch (error) {
    console.error(error);
    return errorValue;
  }
};
