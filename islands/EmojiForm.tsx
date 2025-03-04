import { useEffect, useState } from "preact/hooks";
import {
  selectedSvgKeySignal,
  isLoadingSignal,
  generatedSvgContentSignal,
  description,
} from "../data/signals.tsx";

const MAX_DESCRIPTION_LENGTH = 200;

export default function EmojiForm() {
  const [remainingChars, setRemainingChars] = useState(MAX_DESCRIPTION_LENGTH);

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
    <div class="space-y-4">
      <div className="flex flex-col items-center mb-4">
        {selectedSvgKeySignal.value ? (
          <img
            className="w-24 h-24 sm:w-32 sm:h-32"
            src={`/assets/${selectedSvgKeySignal.value}.svg`}
          />
        ) : (
          <div className="flex items-center justify-center text-gray-500 py-4">
            <span className="hidden lg:inline">左側で</span>
            <span className="lg:hidden">上の</span>
            絵文字を選択してください
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          変更内容
        </label>
        <textarea
          id="description"
          rows={4}
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="例: 笑顔の絵文字にサングラスをつけて"
          value={description}
          onInput={(e) =>
            (description.value = (e.target as HTMLTextAreaElement).value)
          }
          maxLength={MAX_DESCRIPTION_LENGTH}
          required
        />
        <div class="mt-1 text-sm text-gray-500 text-right">
          残り {remainingChars} 文字
        </div>
      </div>
      <button
        type="button"
        disabled={isLoadingSignal.value || description.value.trim().length == 0}
        class={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isLoadingSignal.value || !description.value.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        onClick={handleButtonClick}
      >
        {isLoadingSignal.value ? "生成中..." : "絵文字生成"}
      </button>
    </div>
  );
}
