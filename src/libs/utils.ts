export const fetcher = (url: string) => fetch(url).then(res => res.json())

export function formatPrice(price: number) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return formatter.format(price)
}

export function formatPercent(value: string) {
  return parseFloat(value).toFixed(2)
}

export function formatAddress(address: string, length: number = 10) {
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`
}
