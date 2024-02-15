import MediumPlugin from "../../../main";
import { requestUrl, RequestUrlParam } from "obsidian";

export class MediumApiHandler {
	app: MediumPlugin;
	constructor(app: MediumPlugin) {
		this.app = app;
	}

	async getUserId() {
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
}
