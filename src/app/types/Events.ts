export type Events = {
  items: Event[],
  summary: string
};

export type Event = {
  start: EventDate,
  end: EventDate,
  summary: string,
  id: string
};

export type EventDate = {
  dateTime: string,
  timeZone: string
};
