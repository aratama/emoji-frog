import { Languages, languages } from "../data/signals.tsx";

export default function LanguageSwitcher(props: { langCode: Languages }) {
  const { langCode } = props;

  const handleLanguageChange = (langCode: Languages) => {
    const url = new URL(globalThis.location.href);
    url.searchParams.set("lang", langCode);
    globalThis.location.href = url.toString();
  };

  return (
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          id="language-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => {
            const menu = document.getElementById("language-dropdown");
            if (menu) {
              menu.classList.toggle("hidden");
            }
          }}
        >
          {languages.find((lang) => lang.code === langCode)?.name || "Language"}
          <svg
            class="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        class="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="language-menu"
        id="language-dropdown"
      >
        <div class="py-1" role="none">
          {languages.map((lang) => (
            <button
              type="button"
              key={lang.code}
              class={`block w-full text-left px-4 py-2 text-sm ${
                langCode === lang.code
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              role="menuitem"
              onClick={() => {
                handleLanguageChange(lang.code);
                const menu = document.getElementById("language-dropdown");
                if (menu) {
                  menu.classList.add("hidden");
                }
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
