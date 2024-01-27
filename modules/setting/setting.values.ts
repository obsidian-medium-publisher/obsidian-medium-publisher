export interface MyPluginSettings {
	mySetting: string;
	viewGuide: boolean;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
	viewGuide: true
}
