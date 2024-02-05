export interface MyPluginSettings {
	mediumDevToken: string;
	viewGuide: boolean;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	mediumDevToken: "default",
	viewGuide: true,
};
