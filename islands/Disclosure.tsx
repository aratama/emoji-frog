import { JSX } from "preact";
import { useState } from "preact/hooks";

interface DisclosureProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  defaultOpen?: boolean;
}

export function Disclosure({
  title,
  children,
  defaultOpen = false,
}: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        class="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 class="text-xl font-semibold">{title}</h2>
        <svg
          class={`${
            isOpen ? "rotate-180 transform" : ""
          } h-5 w-5 text-blue-500`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M14.77 12.79a.75.75 0 01-1.06 0L10 9.06l-3.71 3.71a.75.75 0 01-1.06-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      {isOpen && <div class="pt-4 pb-2 text-sm text-gray-500">{children}</div>}
    </div>
  );
}
