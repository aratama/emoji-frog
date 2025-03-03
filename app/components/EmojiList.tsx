"use client";

import Image from "next/image";
import { useState } from "react";
import { categories, EnNames } from "../emoji";

interface EmojiListProps {
  onSelectEmoji: (svgKey: string, svgContent: string) => void;
}

export default function EmojiList({ onSelectEmoji }: EmojiListProps) {
  const [selectedCategory, setSelectedCategory] = useState<EnNames | null>(
    categories[0].name_en
  );
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleSelectCategory = (category: EnNames) => {
    setSelectedCategory(category);
    setSelectedEmoji(null);
  };

  const handleSelectEmoji = async (category: string, emoji: string) => {
    const emojiKey = `${category}/${emoji}`;
    setSelectedEmoji(emojiKey);
    const response = await fetch(`/assets/${category}/${emoji}`);
    if (!response.ok) {
      console.error(`Failed to fetch ${emoji}: ${response.statusText}`);
      return;
    }
    const content = await response.text();
    console.log(`Selected ${emojiKey}:`, content.substring(0, 50) + "...");
    // SVGのキーとコンテンツの両方を渡す
    const svgKey = `${category}/${emoji.replace(".svg", "")}`;
    onSelectEmoji(svgKey, content);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="pb-4 w-full after:content-[''] after:table after:clear-both">
        <div className="flex flex-wrap">
          {categories.map((category) => (
            <button
              key={category.name_en}
              className={`px-4 py-2 rounded-lg whitespace-nowrap m-1 ${
                selectedCategory === category.name_en
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleSelectCategory(category.name_en)}
            >
              {category.name_ja}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
          {categories
            .find((cat) => cat.name_en === selectedCategory)
            ?.files.map((emoji) => {
              const emojiKey = `${selectedCategory}/${emoji}`;
              return (
                <button
                  key={emojiKey}
                  className={`p-2 rounded-lg w-full ${
                    selectedEmoji === emojiKey
                      ? "bg-blue-100 ring-2 ring-blue-500"
                      : "bg-white hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelectEmoji(selectedCategory, emoji)}
                  aria-label={`Select ${emoji.replace(".svg", "")} emoji`}
                >
                  <div className="w-full h-auto aspect-square relative">
                    <Image
                      loading="lazy"
                      src={`/assets/${selectedCategory}/${emoji}`}
                      alt={emoji.replace(".svg", "")}
                      className="w-full h-full object-contain"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
