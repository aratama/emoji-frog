"use client";
import { useRef } from "react";

interface EmojiDisplayProps {
  svgContent: string | null;
  isLoading: boolean;
  showDownloadButtons?: boolean;
}

export default function EmojiDisplay({
  svgContent,
  isLoading,
  showDownloadButtons = false,
}: EmojiDisplayProps) {
  const svgRef = useRef<HTMLDivElement>(null);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!svgContent) {
    return (
      <div className="flex items-center justify-center text-gray-500">
        <p>変更内容を入力して、「絵文字生成」を押してください</p>
      </div>
    );
  }

  const downloadAsSVG = () => {
    if (!svgContent) return;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "emoji.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsPNG = () => {
    if (!svgContent || !svgRef.current) return;

    const svgElement = svgRef.current.querySelector("svg");
    if (!svgElement) return;

    // Get SVG dimensions
    const svgWidth = svgElement.width.baseVal.value || 128;
    const svgHeight = svgElement.height.baseVal.value || 128;

    // Get device pixel ratio (higher on Retina/high-DPI displays)
    const pixelRatio = window.devicePixelRatio || 1;

    // Create a canvas with dimensions adjusted for device pixel ratio
    const canvas = document.createElement("canvas");
    canvas.width = svgWidth * pixelRatio;
    canvas.height = svgHeight * pixelRatio;

    // Set display size (css pixels)
    canvas.style.width = `${svgWidth}px`;
    canvas.style.height = `${svgHeight}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Scale all drawing operations by the pixel ratio
    ctx.scale(pixelRatio, pixelRatio);

    // Create an image from the SVG
    const img = new Image();

    // Ensure SVG has explicit dimensions
    let processedSvgContent = svgContent;
    if (
      !processedSvgContent.includes("width=") ||
      !processedSvgContent.includes("height=")
    ) {
      // Add width and height attributes if they don't exist
      processedSvgContent = processedSvgContent.replace(
        "<svg",
        `<svg width="${svgWidth}" height="${svgHeight}"`
      );
    }

    const svgBlob = new Blob([processedSvgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      // Draw the image on the canvas at the correct size
      ctx.drawImage(img, 0, 0, svgWidth, svgHeight);

      // Convert canvas to PNG
      const pngUrl = canvas.toDataURL("image/png");

      // Download the PNG
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "emoji.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={svgRef}
        className={`w-24 h-24 sm:w-32 sm:h-32 ${
          showDownloadButtons ? "mb-4" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />

      {showDownloadButtons && (
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <button
            onClick={downloadAsSVG}
            className="px-4 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm w-full sm:w-auto"
          >
            SVGとしてダウンロード
          </button>
          <button
            onClick={downloadAsPNG}
            className="px-4 py-3 bg-green-500 text-white rounded hover:bg-green-600 text-sm w-full sm:w-auto"
          >
            PNGとしてダウンロード
          </button>
        </div>
      )}
    </div>
  );
}
