export function getWeekDay() {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2023, 10, day))))
    .map((weekDay) => {
      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    })
}
