import { EventDate } from './event-date';

export type Event = {
  start: EventDate,
  end: EventDate,
  summary: string,
  id: string
};
