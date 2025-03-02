"use client";

import { useState, useEffect } from "react";

const MAX_DESCRIPTION_LENGTH = 200;

interface EmojiFormProps {
  onSubmit: (description: string) => void;
  isLoading: boolean;
}

export default function EmojiForm({ onSubmit, isLoading }: EmojiFormProps) {
  const [description, setDescription] = useState("");
  const [remainingChars, setRemainingChars] = useState(MAX_DESCRIPTION_LENGTH);

  useEffect(() => {
    setRemainingChars(MAX_DESCRIPTION_LENGTH - description.length);
  }, [description]);

  const handleButtonClick = () => {
    console.log("Button clicked with description:", description);
    if (description.trim()) {
      onSubmit(description);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          変更内容
        </label>
        <textarea
          id="description"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="例: 笑顔の絵文字にサングラスをつけて"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={MAX_DESCRIPTION_LENGTH}
          required
        />
        <div className="mt-1 text-sm text-gray-500 text-right">
          残り {remainingChars} 文字
        </div>
      </div>
      <button
        type="button"
        disabled={isLoading || !description.trim()}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isLoading || !description.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        onClick={handleButtonClick}
      >
        {isLoading ? "生成中..." : "絵文字生成"}
      </button>
    </div>
  );
}
