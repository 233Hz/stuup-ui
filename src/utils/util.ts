export const formatDate = (
  time: string,
  format: string = 'YYYY-MM-DD hh:mm:ss',
) => {
  const date = new Date(time)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const preArr = Array.apply(null, Array(10)).map((item, index) => '0' + index)

  return format
    .replace(/YYYY/g, String(year))
    .replace(/MM/g, preArr[month] || String(month))
    .replace(/DD/g, preArr[day] || String(day))
    .replace(/hh/g, preArr[hour] || String(hour))
    .replace(/mm/g, preArr[minute] || String(minute))
    .replace(/ss/g, preArr[second] || String(second))
}
