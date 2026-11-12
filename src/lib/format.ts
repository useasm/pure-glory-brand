export const formatPrice = (value: number) =>
  `${value.toLocaleString('en-US')} ₽`;

export const plural = (n: number, one: string, many: string) =>
  n === 1 ? one : many;
