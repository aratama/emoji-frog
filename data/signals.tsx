import { signal } from "@preact/signals";
import * as z from "zod";

export const languages: { code: Languages; name: string }[] = [
  { code: "en", name: "English" },
  { code: "ja", name: "日本語" },
  { code: "zh-CN", name: "简体中文" },
  { code: "zh-TW", name: "繁體中文" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
];

export const languageSchema = z.enum([
  "en",
  "ja",
  "zh-CN",
  "zh-TW",
  "es",
  "fr",
]);

export type Languages = z.infer<typeof languageSchema>;

export const selectedSvgKeySignal = signal<string | null>(null);
export const selectedSvgContentSignal = signal<string | null>(null);
export const generatedSvgContentSignal = signal<string | null>(null);
export const isLoadingSignal = signal<boolean>(false);
export const description = signal<string>("");
