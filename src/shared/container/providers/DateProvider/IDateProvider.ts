interface IDateProvider {
	addDays(days: number): Date;
	addHours(hours: number): Date;
	compareIfBefore(start_date: Date, end_date: Date): boolean;
	dateNow(): Date;
}

export { IDateProvider };
