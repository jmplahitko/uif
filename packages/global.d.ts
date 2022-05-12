var __DEBUG__: boolean;

// This stuff needs to be moved to Types package when it's created.

declare type Selector<T, P = any> = (obj: T) => P;
declare type Static<T> = { new (...args: any[]): T };

declare type BrowserType =
	'android'
	| 'aol'
	| 'bb10'
	| 'beaker'
	| 'chrome'
	| 'chromium-webview'
	| 'crios'
	| 'curl'
	| 'edge'
	| 'edge-chromium'
	| 'edge-ios'
	| 'facebook'
	| 'firefox'
	| 'fxios'
	| 'ie'
	| 'instagram'
	| 'ios'
	| 'ios-webview'
	| 'kakaotalk'
	| 'miui'
	| 'node'
	| 'opera'
	| 'opera-mini'
	| 'phantomjs'
	| 'safari'
	| 'samsung'
	| 'searchbot'
	| 'silk'
	| 'yandexbrowser'
;

declare type OsType =
	'Amazon OS'
	| 'Android OS'
	| 'BeOS'
	| 'BlackBerry OS'
	| 'Chrome OS'
	| 'iOS'
	| 'Linux'
	| 'Mac OS'
	| 'Open BSD'
	| 'OS/2'
	| 'QNX'
	| 'Sun OS'
	| 'Windows Mobile'
	| "Windows 3.11"
	| "Windows 95"
	| "Windows 98"
	| 'Windows 2000'
	| 'Windows XP'
	| 'Windows Server 2003'
	| 'Windows Vista'
	| 'Windows 7'
	| 'Windows 8'
	| 'Windows 8.1'
	| 'Windows 10'
	| 'Windows ME'
	| 'android'
	| 'win32'
	| "aix"
	| "darwin"
	| "freebsd"
	| "linux"
	| "openbsd"
	| "sunos"
	| "cygwin"
	| "netbsd"
;

declare type PlatformType =
	'bot'
	| 'bot-device'
	| 'browser'
	| 'server'
	| 'react-native'
;

declare type Platform = {
	readonly name: BrowserType | null;
	readonly os: OsType | null;
	readonly type: PlatformType | null;
	readonly version: string | null;
}