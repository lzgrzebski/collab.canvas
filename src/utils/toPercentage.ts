export const toPercentage = (number: number) =>
    `${((number ?? 0) * 100).toFixed(0)}%`;
