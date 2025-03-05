export function downloadAsSVG(source: string) {
  const blob = new Blob([source], {
    type: "image/svg+xml",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "emoji.svg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadAsPNG(source: string, div: HTMLDivElement) {
  const svgElement = div.querySelector("svg");
  if (!svgElement) return;

  // Get SVG dimensions
  const svgWidth = svgElement.width.baseVal.value || 128;
  const svgHeight = svgElement.height.baseVal.value || 128;

  // Get device pixel ratio (higher on Retina/high-DPI displays)
  const pixelRatio = globalThis.devicePixelRatio || 1;

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
  let processedSvgContent = source;
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
}
