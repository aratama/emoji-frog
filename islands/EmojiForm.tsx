import { useEffect, useRef, useState } from "preact/hooks";
import {
  selectedSvgKeySignal,
  isLoadingSignal,
  generatedSvgContentSignal,
  description,
} from "../data/signals.tsx";
import { downloadAsPNG, downloadAsSVG } from "../data/export.ts";

const MAX_DESCRIPTION_LENGTH = 200;

export default function EmojiForm() {
  const [remainingChars, setRemainingChars] = useState(MAX_DESCRIPTION_LENGTH);

  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRemainingChars(MAX_DESCRIPTION_LENGTH - description.value.length);
  }, [description.value]);

  const handleButtonClick = async () => {
    console.log("Button clicked with description:", description);
    if (!description.value.trim()) return;

    if (!selectedSvgKeySignal.value) {
      console.error("No emoji selected");
      alert("絵文字を選択してください");
      return;
    }

    console.log("Selected SVG key:", selectedSvgKeySignal.value);

    isLoadingSignal.value = true;

    const response = await fetch("/api/generate-emoji", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        svgKey: selectedSvgKeySignal.value,
        description: description,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      console.error("Failed to generate emoji:", json);
      alert("絵文字の生成に失敗しました");
      isLoadingSignal.value = false;
      return;
    }

    if (!json.svg) {
      console.error("Invalid response from API:", json);
      alert("APIからの無効な応答");
      isLoadingSignal.value = false;
      return;
    }

    generatedSvgContentSignal.value = json.svg;
    isLoadingSignal.value = false;
    console.log("Generated SVG:", json.svg.substring(0, 100) + "...");
  };

  return (
    <div class="space-y-4" id="emoji-form">
      <div className="flex items-center mb-4 gap-8 justify-center">
        {selectedSvgKeySignal.value ? (
          <img
            className="w-24 h-24 sm:w-32 sm:h-32"
            src={`/assets/${selectedSvgKeySignal.value}.svg`}
          />
        ) : (
          <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-md bg-white">
            <div className="text-center"></div>
          </div>
        )}

        <img class="w-12 h-12" src="/assets/symbols/27a1.svg" />

        {generatedSvgContentSignal.value ? (
          <div
            ref={svgRef}
            class="w-24 h-24 sm:w-32 sm:h-32"
            // deno-lint-ignore react-no-danger
            dangerouslySetInnerHTML={{
              __html: generatedSvgContentSignal.value,
            }}
          />
        ) : (
          <div class="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-md bg-white"></div>
        )}
      </div>

      <div>
        <div class="mt-1 text-sm text-gray-500 text-right">
          残り {remainingChars} 文字
        </div>
        <textarea
          id="description"
          rows={4}
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="例: サングラスを青くしてください"
          value={description}
          onInput={(e) =>
            (description.value = (e.target as HTMLTextAreaElement).value)
          }
          maxLength={MAX_DESCRIPTION_LENGTH}
          required
        />
      </div>
      <button
        type="button"
        disabled={isLoadingSignal.value || description.value.trim().length == 0}
        class={`w-full py-2 px-4 rounded-md text-white font-medium bg-blue-600 ${
          isLoadingSignal.value ||
          !description.value.trim() ||
          !selectedSvgKeySignal.value
            ? "disabled:opacity-20"
            : ""
        }`}
        onClick={handleButtonClick}
      >
        {isLoadingSignal.value ? "編集中..." : "絵文字編集"}
      </button>

      <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto justify-center">
        <button
          type="button"
          onClick={() =>
            generatedSvgContentSignal.value &&
            downloadAsSVG(generatedSvgContentSignal.value)
          }
          class="px-4 py-3 bg-blue-500 text-white rounded enable:hover:bg-blue-600 text-sm w-full sm:w-auto disabled:opacity-20"
          disabled={!generatedSvgContentSignal.value}
        >
          SVGとしてダウンロード
        </button>
        <button
          type="button"
          onClick={() => {
            if (!generatedSvgContentSignal.value || !svgRef.current) {
              return;
            }
            downloadAsPNG(generatedSvgContentSignal.value, svgRef.current);
          }}
          class="px-4 py-3 bg-green-500 text-white rounded enable:hover:bg-green-600 text-sm w-full sm:w-auto disabled:opacity-20"
          disabled={!generatedSvgContentSignal.value}
        >
          PNGとしてダウンロード
        </button>
      </div>
    </div>
  );
}
