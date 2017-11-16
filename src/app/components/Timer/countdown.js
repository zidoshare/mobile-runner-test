//补零操作
export const leftPad = (num, len = 2, ch = '0') => {
  num = '' + num
  len = len - num.length
  let i = 0
  while (i++ < len) {
    num = ch + num
  }
  return num
}
class DownDate {
  years
  mouths
  days
  hours
  minutes
  seconds
  front
  constructor(years, mouths, days, hours, minutes, seconds,front) {
    this.years = years
    this.mouths = mouths
    this.days = days
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
    this.front = front
  }
  regs = [
    /Y/,
    /M/,
    /d/,
    /h/,
    /m/,
    /s/,
  ]
  formart(fmt = 'dd天hh:mm:ss') {
    return fmt.replace('dd', leftPad(this.days)).replace('hh', leftPad(this.hours)).replace('mm', leftPad(this.minutes)).replace('ss', leftPad(this.seconds))
  }
}

export default (startTime, endTime, option = {
  years: false,
  mouths: true,
  days: true,
  hours: true,
  minutes: true,
  seconds: true,
}) => {
  if (!(startTime instanceof Date)) {
    startTime = new Date(startTime)
  }
  if (!(endTime instanceof Date)) {
    endTime = new Date(endTime)
  }
  let remain = endTime.getTime() - startTime.getTime()
  let front = remain > 0
  remain = remain > 0 ? remain : -remain
  let result = new DownDate()
  if (option.years) {
    result.years = Math.floor(remain / (12 * 30 * 24 * 3600 * 1000))
    remain = remain % (12 * 30 * 24 * 3600 * 1000)
  }
  if (option.mouths) {
    result.mouths = Math.floor(remain / (30 * 24 * 3600 * 1000))
    remain = remain % (30 * 24 * 3600 * 1000)
  }
  if (option.days) {
    result.days = Math.floor(remain / (24 * 3600 * 1000))
    remain = remain % (24 * 3600 * 1000)
  }
  if (option.hours) {
    result.hours = Math.floor(remain / (3600 * 1000))
    remain = remain % (3600 * 1000)
  }
  if (option.minutes) {
    result.minutes = Math.floor(remain / (60 * 1000))
    remain = remain % (60 * 1000)
  }
  if (option.seconds) {
    result.seconds = Math.floor(remain / 1000)
    remain = remain % 1000
  }
  result.front = front
  return result
}