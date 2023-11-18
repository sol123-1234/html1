import { MaiPrice } from "@/types/mai"

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${month}-${day}`
}

export function calculateAverageGap(arr: number[]) {
  if (arr.length <= 1) {
    return 0 // 如果数组长度小于等于1，返回0
  }

  let totalGap = 0

  for (let i = 1; i < arr.length; i++) {
    const gap = arr[i] - arr[i - 1]
    totalGap += gap
  }

  const averageGap = totalGap / (arr.length - 1)
  return Math.abs(averageGap)
}

export const formatYAxis = (tickFormat: any) => {
  return tickFormat.toFixed(4)
}

export function calculateIntervalValues(data: MaiPrice[], numValues: number) {
  const lastPrices = data.map(item => Number(item.lastPrice));

  // 找出 lastPrice 最大值和最小值
  const maxLastPrice = Math.max(...lastPrices);
  const minLastPrice = Math.min(...lastPrices);
  const adjustedGap = (maxLastPrice - minLastPrice) / numValues // 每个的间隔

  // 计算等间隔步长
  const gap = ((maxLastPrice + adjustedGap) - (minLastPrice - adjustedGap)) / (numValues - 1)

  const newMinLastPrice = minLastPrice - adjustedGap

  // 在步长范围内选取等间隔的值
  const selectedValues = Array.from({ length: numValues }, (_, index) => {
    const value = newMinLastPrice + index * gap
    return Number(value.toFixed(4)) || 0;
  });

  return selectedValues;
}