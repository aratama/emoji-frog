import { Head } from "$fresh/runtime.ts";
import { Disclosure } from "../islands/Disclosure.tsx";
import EmojiDisplay from "../islands/EmojiDisplay.tsx";
import EmojiForm from "../islands/EmojiForm.tsx";
import EmojiList from "../islands/EmojiList.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Emoji Frog</title>
        <meta
          name="description"
          content="選択した絵文字のSVG画像を生成AIで加工するツール"
        />
        <link rel="icon" href="/favicon.png" sizes="any" type="image/png" />
      </Head>
      <div class="min-h-screen bg-gray-50">
        <header class="bg-white shadow">
          <div class="mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 class="text-xl font-bold text-gray-900 flex items-center gap-2">
              <img src="/favicon.png" class="w-8 h-8" />
              <span>Emoji Frog</span>
              <span class="text-sm text-gray-400 ml-2">Version 0.4</span>
            </h1>
          </div>
        </header>
        <main class="mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col lg:flex-row gap-8">
            {/* Left Panel */}
            <div class="w-full lg:w-1/2 p-6 rounded-lg shadow">
              {/* Desktop view - always visible */}
              <div class="hidden lg:block">
                <h2 class="text-xl font-semibold mb-4">
                  1.絵文字を選択してください
                </h2>
                <EmojiList />
              </div>

              {/* Mobile view - with disclosure */}
              <div class="lg:hidden">
                <Disclosure title="1.絵文字を選択してください" defaultOpen>
                  <EmojiList />
                </Disclosure>
              </div>
            </div>

            {/* Center Panel */}
            <div class="w-full lg:w-1/2 flex flex-col gap-8">
              <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-4">
                  2.変更内容を入力してください
                </h2>
                <EmojiForm />
              </div>
              <div class="bg-white p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-4">3.変更後の絵文字</h2>
                <EmojiDisplay />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
