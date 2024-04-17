export type HourlyForecast = {
  list: {
    main: {
      temp: number
    }
    weather: {
      main: string
      id: number
    }[]
    wind: {
      speed: number
    }
    dt_txt: string
  }[]
};
