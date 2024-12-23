import type { LocaleObject } from "#i18n";

const languages: LocaleObject[] = [
	{
		code: "ar",
		iso: "ar-AR",
		name: "Arabic",
		file: "ar-AR.json",
		dir: "rtl",
	},
	{
		code: "de",
		iso: "de-DE",
		name: "Deutch",
		file: "de-DE.json",
		dir: "ltr",
	},
	{
		code: "id",
		iso: "id-ID",
		name: "Bahasa Indonesia",
		file: "id-ID.json",
		dir: "ltr",
	},
	{
		code: "pt",
		iso: "pt-PT",
		name: "Portuguese",
		file: "pt-PT.json",
		dir: "ltr",
	},
	{
		code: "zh",
		iso: "zh-ZH",
		name: "Chinese",
		file: "zh-ZH.json",
		dir: "ltr",
	},
	{
		code: "en",
		iso: "eng-US",
		name: "English",
		file: "en-US.json",
		dir: "ltr",
	},
];

export default languages;
