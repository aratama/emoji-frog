import { Head } from "$fresh/runtime.ts";
import { ApplicationURL } from "../data/constants.ts";
import EmojiForm from "../islands/EmojiForm.tsx";
import EmojiList from "../islands/EmojiList.tsx";

export default function Home() {
  const intentURL = new URL("https://twitter.com/intent/tweet");
  intentURL.searchParams.set("text", "Emoji Frog");
  intentURL.searchParams.set("url", ApplicationURL);
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
            <div class="flex justify-between items-center">
              <h1 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                <img src="/favicon.png" class="w-8 h-8" />
                <span>Emoji Frog</span>
                <span class="text-sm text-gray-400 ml-2">Version 0.5</span>
              </h1>
              <div>
                <a
                  href={intentURL.toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors text-xs"
                >
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  シェア
                </a>
              </div>
            </div>
          </div>
        </header>
        <main class="mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col lg:flex-row gap-8">
            {/* Left Panel */}
            <div class="w-full lg:w-1/2 p-6 rounded-lg shadow">
              <h2 class="text-xl font-semibold mb-4">
                1.元になる絵文字を選んでください
              </h2>

              {/* Desktop view - always visible */}
              <div class="hidden lg:block">
                <EmojiList scroll={false} />
              </div>

              {/* Mobile view - with disclosure */}
              <div class="lg:hidden">
                <EmojiList scroll />
              </div>
            </div>

            {/* Center Panel */}
            <div class="w-full lg:w-1/2 flex flex-col gap-8">
              <div class="p-6 rounded-lg shadow">
                <h2 class="text-xl font-semibold mb-4">
                  2.編集内容を入力してください
                </h2>
                <EmojiForm />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
