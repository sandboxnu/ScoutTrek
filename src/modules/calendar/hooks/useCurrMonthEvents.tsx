import moment from 'moment';
import { useState } from 'react';

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getMonthObject(datestring: string) {
  const absDate = new Date(datestring);
  const offset = absDate.getTimezoneOffset() * 60 * 1000;
  const date = new Date(absDate.getTime() + offset);
  let monthObject: { [key: string]: any } = {};
  for (let i = 1; i <= daysInMonth(date); i++) {
    const dateKeyString: string = `${date.getFullYear()}-${(
      '0' +
      (date.getMonth() + 1)
    ).slice(-2)}-${('0' + i).slice(-2)}`;
    monthObject[dateKeyString] = [];
  }
  return monthObject;
}

type CalData = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

const useCurrMonthEvents = () => {
  const [currMonthEvents, setCurrMonthEvents] = useState({});

  const loadItemsForMonth = (allEvents: any, calData: CalData) => {
    if (calData) {
      const eventsInCurrMonth = allEvents.filter(
        ({ date }) => new Date(date).getMonth() + 1 === calData.month
      );
      const items = getMonthObject(calData.dateString);
      if (!eventsInCurrMonth.length) {
        setCurrMonthEvents((prevItems) => ({ ...prevItems, ...items }));
      } else {
        eventsInCurrMonth.forEach(({ id, title, creator, date, type }) => {
          const name = creator.name.split(' ');
          if (type === 'TroopMeeting') {
            type = 'Meeting';
          }
          if (type === 'SpecialEvent') {
            type = 'Special Event';
          }
          if (type === 'SummerCamp') {
            type = 'Camp';
          }
          const strDate = moment(date).format('YYYY-MM-DD');
          items[strDate].push({
            title,
            type,
            id,
            date: new Date(date),
            labels: [
              `${name[0]} ${name[1] ? name[1].substring(0, 1) : ''}`,
              type,
            ],
          });

          setCurrMonthEvents((prevItems) => ({ ...prevItems, ...items }));
        });
      }
    }
  };

  return { currMonthEvents, loadItemsForMonth };
};

export default useCurrMonthEvents;
