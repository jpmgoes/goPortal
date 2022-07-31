import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import * as fs from "fs";
import Handlebars from "handlebars";
import { IMailProvider } from "../IMailProvider";
@injectable()
class MailtrapMailProvider implements IMailProvider {
	private client: Transporter;
	constructor() {
		const transport = nodemailer.createTransport({
			host: "smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "293c13ed759d63",
				pass: "feab579078cac3",
			},
		});
		this.client = transport;
	}

	async sendMail(
		to: string,
		subject: string,
		variables: any,
		path: string
	): Promise<void> {
		const templateFileContent = fs.readFileSync(path).toString("utf-8");
		const templateParse = Handlebars.compile(templateFileContent);
		const templateHtml = templateParse(variables);

		await this.client.sendMail({
			from: "Portal <noreply@portal.com.br>",
			to,
			subject,
			html: templateHtml,
		});
	}
}

export { MailtrapMailProvider };
