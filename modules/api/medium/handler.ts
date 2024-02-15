import MediumPlugin from "../../../main";
import { requestUrl, RequestUrlParam } from "obsidian";

export class MediumApiHandler {
	app: MediumPlugin;
	constructor(app: MediumPlugin) {
		this.app = app;
	}

	async getUserId() {
		if (this.app.settingModule.settings.userId !== "") {
			return this.app.settingModule.settings.userId;
		}

		const url = "https://api.medium.com/v1/me";
		const token = this.app.settingModule.settings.mySetting;
		const requestUrlParam: RequestUrlParam = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			url,
		};
		const result = await requestUrl(requestUrlParam);
		const id = result?.json?.data?.id;
		if (id === undefined || id === "") throw Error("userId is undefined");
		return id;
	}

	async postActiveMd(userId: string, title: string, content: string) {
		const token = this.app.settingModule.settings.mySetting;
		const url = `https://api.medium.com/v1/users/${userId}/posts`;

		const result = await requestUrl({
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			url,
			body: JSON.stringify({
				title,
				contentFormat: "markdown",
				content,
			}),
		});
		console.log(result);
	}
}
