"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import * as z from "zod";
import EmojiDisplay from "./components/EmojiDisplay";
import EmojiForm from "./components/EmojiForm";
import EmojiList from "./components/EmojiList";

const responseSchema = z.object({
  svg: z.string(),
});

export default function Home() {
  const [selectedSvgKey, setSelectedSvgKey] = useState<string | null>(null);
  const [selectedSvgContent, setSelectedSvgContent] = useState<string | null>(
    null
  );
  const [generatedSvgContent, setGeneratedSvgContent] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  // Reference to the disclosure button to programmatically close it
  const disclosureButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSelectEmoji = (svgKey: string, svgContent: string) => {
    console.log(
      "Selected emoji in Home component:",
      `Key: ${svgKey}, Content: ${svgContent.substring(0, 50)}...`
    );
    setSelectedSvgKey(svgKey);
    setSelectedSvgContent(svgContent);
    setGeneratedSvgContent(null);

    // Close the disclosure panel on mobile when an emoji is selected
    if (disclosureButtonRef.current && window.innerWidth < 1024) {
      disclosureButtonRef.current.click();
    }
  };

  const handleSubmit = async (description: string) => {
    console.log("Submitting form with description:", description);

    if (!selectedSvgKey) {
      console.error("No emoji selected");
      alert("絵文字を選択してください");
      return;
    }

    console.log("Selected SVG key:", selectedSvgKey);

    setIsLoading(true);

    const response = await fetch("/api/generate-emoji", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ svgKey: selectedSvgKey, description }),
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
          <h1 className="text-xl font-bold text-gray-900">
            Emoji Modifier
            <span className="text-sm text-gray-400 ml-2">Version 0.3</span>
          </h1>
        </div>
      </header>
      <main className="mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel */}
          <div className="w-full lg:w-1/2 p-6 rounded-lg shadow">
            {/* Desktop view - always visible */}
            <div className="hidden lg:block">
              <h2 className="text-xl font-semibold mb-4">
                1.絵文字を選択してください
              </h2>
              <EmojiList onSelectEmoji={handleSelectEmoji} />
            </div>

            {/* Mobile view - with disclosure */}
            <div className="lg:hidden">
              <Disclosure as="div" defaultOpen={true}>
                {({ open }) => (
                  <>
                    <DisclosureButton
                      type="button"
                      ref={disclosureButtonRef}
                      className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
                      onClick={() => {}}
                    >
                      <h2 className="text-xl font-semibold">
                        1.絵文字を選択してください
                      </h2>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-5 w-5 text-blue-500`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="pt-4 pb-2 text-sm text-gray-500">
                      <EmojiList onSelectEmoji={handleSelectEmoji} />
                    </DisclosurePanel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>

          {/* Center Panel */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                2.変更内容を入力してください
              </h2>

              <div className="flex flex-col items-center mb-4">
                {selectedSvgContent ? (
                  <div
                    className="w-24 h-24 sm:w-32 sm:h-32"
                    dangerouslySetInnerHTML={{ __html: selectedSvgContent }}
                  />
                ) : (
                  <div className="flex items-center justify-center text-gray-500 py-4">
                    <span className="hidden lg:inline">左側で</span>
                    <span className="lg:hidden">上の</span>
                    絵文字を選択してください
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
