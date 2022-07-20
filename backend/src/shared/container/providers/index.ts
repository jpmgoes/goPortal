import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DateProvider } from "./DateProvider/implementarions/DateProvider";

container.registerSingleton<IDateProvider>("DayjsDateProvider", DateProvider);
