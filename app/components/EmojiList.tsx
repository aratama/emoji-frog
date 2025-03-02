"use client";

import { useState, useEffect } from "react";

interface CategoryData {
  name: string;
  files: string[];
}

interface EmojiListProps {
  onSelectEmoji: (svgContent: string) => void;
}

export default function EmojiList({ onSelectEmoji }: EmojiListProps) {
  const [categories, setCategories] = useState<Record<string, CategoryData>>(
    {}
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the list of emoji files from the JSON file and then fetch their contents
    const fetchEmojis = async () => {
      try {
        // First fetch the emoji categories from the JSON file
        const response = await fetch("/emojis.json");
        if (!response.ok) {
          console.error(`Failed to fetch emoji list: ${response.statusText}`);
          return;
        }
        const data = await response.json();
        setCategories(data.categories);

        // Set the default selected category to the first one
        if (Object.keys(data.categories).length > 0) {
          setSelectedCategory(Object.keys(data.categories)[0]);
        }
      } catch (error) {
        console.error("Error in fetchEmojis:", error);
      }
    };

    fetchEmojis();
  }, []);

  const handleSelectCategory = (category: string) => {
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
    onSelectEmoji(content);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="pb-4 w-full after:content-[''] after:table after:clear-both">
        <div className="flex flex-wrap">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg whitespace-nowrap m-1 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => handleSelectCategory(category)}
            >
              {categories[category].name}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className="grid grid-cols-8 gap-4">
          {categories[selectedCategory].files.map((emoji) => {
            const emojiKey = `${selectedCategory}/${emoji}`;
            return (
              <button
                key={emojiKey}
                className={`p-2 rounded-lg w-20 ${
                  selectedEmoji === emojiKey
                    ? "bg-blue-100 ring-2 ring-blue-500"
                    : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleSelectEmoji(selectedCategory, emoji)}
                aria-label={`Select ${emoji.replace(".svg", "")} emoji`}
              >
                <div className="w-16 h-16 relative">
                  <img
                    loading="lazy"
                    src={`/assets/${selectedCategory}/${emoji}`}
                    alt={emoji.replace(".svg", "")}
                    width={64}
                    height={64}
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
