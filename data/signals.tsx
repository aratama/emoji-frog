import { signal } from "@preact/signals";

export const selectedSvgKeySignal = signal<string | null>(null);
export const selectedSvgContentSignal = signal<string | null>(null);
export const generatedSvgContentSignal = signal<string | null>(null);
export const isLoadingSignal = signal<boolean>(false);
export const description = signal<string>("");
