export type BrowserType =
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
	| 'netfront'
	| 'node'
	| 'opera'
	| 'opera-mini'
	| 'pie'
	| 'phantomjs'
	| 'safari'
	| 'samsung'
	| 'searchbot'
	| 'silk'
	| 'yandexbrowser'
;

export type OsType =
	"aix"
	| 'Amazon OS'
	| 'android'
	| 'Android OS'
	| 'BeOS'
	| 'BlackBerry OS'
	| 'Chrome OS'
	| "cygwin"
	| "darwin"
	| "freebsd"
	| "haiku"
	| 'iOS'
	| "linux"
	| 'Linux'
	| 'Mac OS'
	| "netbsd"
	| "openbsd"
	| 'Open BSD'
	| 'OS/2'
	| 'QNX'
	| "sunos"
	| 'Sun OS'
	| 'Windows 10'
	| 'Windows 2000'
	| "Windows 3.11"
	| 'Windows 7'
	| 'Windows 8'
	| 'Windows 8.1'
	| "Windows 95"
	| "Windows 98"
	| 'Windows CE'
	| 'Windows ME'
	| 'Windows Mobile'
	| 'Windows Server 2003'
	| 'Windows Vista'
	| 'Windows XP'
	| 'win32'
;

export type PlatformType =
	'bot'
	| 'bot-device'
	| 'browser'
	| 'server'
	| 'react-native'
;

export type Platform = {
	readonly name: BrowserType | null;
	readonly os: OsType | null;
	readonly type: PlatformType | null;
	readonly version: string | null;
}

export { default as getPlatform } from './getPlatform';