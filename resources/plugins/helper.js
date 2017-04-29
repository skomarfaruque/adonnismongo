let helper = {}

helper.covertTimetoInt = (timeStr) => {
  const [time, modifier] = timeStr.split(' ')

  let [hours, minutes] = time.split(':')

  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12
  }
  return parseInt(hours) * 60 + parseInt(minutes)
}

export default helper
