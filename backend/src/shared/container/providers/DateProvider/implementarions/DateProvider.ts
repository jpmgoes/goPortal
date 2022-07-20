import dayjs from "dayjs";
import { IDateProvider } from "../IDateProvider";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class DateProvider implements IDateProvider {
	dateNow(): Date {
		return dayjs().toDate();
	}
	addHours(hours: number): Date {
		return dayjs().add(hours, "hour").toDate();
	}
	addDays(days: number): Date {
		return dayjs().add(days, "days").toDate();
	}
	compareIfBefore(start_date: Date, end_date: Date): boolean {
		return dayjs(start_date).isBefore(end_date);
	}
}

export { DateProvider };
