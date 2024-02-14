export interface MyPluginSettings {
	mySetting: string;
	viewGuide: boolean;
	userId: string;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
	viewGuide: true,
	userId: '',
}
