"use client";

import { useState } from "react";
import EmojiList from "./components/EmojiList";
import EmojiForm from "./components/EmojiForm";
import EmojiDisplay from "./components/EmojiDisplay";
import * as z from "zod";

const responseSchema = z.object({
  svg: z.string(),
});

export default function Home() {
  const [selectedSvgContent, setSelectedSvgContent] = useState<string | null>(
    null
  );
  const [generatedSvgContent, setGeneratedSvgContent] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectEmoji = (svgContent: string) => {
    console.log(
      "Selected emoji in Home component:",
      svgContent.substring(0, 50) + "..."
    );
    setSelectedSvgContent(svgContent);
    setGeneratedSvgContent(null);
  };

  const handleSubmit = async (description: string) => {
    console.log("Submitting form with description:", description);

    if (!selectedSvgContent) {
      console.error("No emoji selected");
      alert("絵文字を選択してください");
      return;
    }

    console.log(
      "Selected SVG content:",
      selectedSvgContent.substring(0, 50) + "..."
    );

    setIsLoading(true);

    const response = await fetch("/api/generate-emoji", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ svgContent: selectedSvgContent, description }),
    });

    const json = await response.json();

    if (!response.ok) {
      console.error("Failed to generate emoji:", json);
      alert("絵文字の生成に失敗しました");
      setIsLoading(false);
      return;
    }

    const result = responseSchema.safeParse(json);

    if (!result.success) {
      console.error("Invalid response from API:", result.error.format());
      alert("APIからの無効な応答");
      setIsLoading(false);
      return;
    }

    setGeneratedSvgContent(result.data.svg);
    setIsLoading(false);
    console.log("Generated SVG:", result.data.svg.substring(0, 100) + "...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">emoji-modifier</h1>
        </div>
      </header>
      <main className="mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Panel */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              1.絵文字を選択してください
            </h2>
            <EmojiList onSelectEmoji={handleSelectEmoji} />
          </div>

          {/* Center Panel */}
          <div className="w-full md:w-1/2 flex flex-col gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                2.変更内容を入力してください
              </h2>

              <div className="flex flex-col items-center">
                {selectedSvgContent ? (
                  <div
                    className={`w-32 h-32`}
                    dangerouslySetInnerHTML={{ __html: selectedSvgContent }}
                  />
                ) : (
                  <div className="flex items-center justify-center text-gray-500">
                    左側で絵文字を選択してください
                  </div>
                )}
              </div>

              <div className="mb-6">
                <EmojiForm onSubmit={handleSubmit} isLoading={isLoading} />
              </div>
            </div>
            <div className=" bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">3.変更後の絵文字</h2>

              <EmojiDisplay
                svgContent={generatedSvgContent}
                isLoading={isLoading}
                showDownloadButtons={true}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
