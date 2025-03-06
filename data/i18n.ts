// i18nextの型定義
interface I18nType {
  t: (key: string, options?: Record<string, unknown>) => string;
  language?: string;
  changeLanguage: (lng: string) => void;
  use: (plugin: unknown) => I18nType;
  init: (options: unknown) => void;
  on: (event: string, callback: (lng: string) => void) => void;
}

import { Languages } from "./signals.tsx";
import { JaNames, categories } from "./emoji/index.ts";

const translations = {
  選択した絵文字のSVG画像を生成AIで加工するツール: {
    en: "Tool to generate and process SVG images of selected emojis with AI",
    zh_CN: "选择的表情符号的SVG图像生成AI处理工具",
    zh_TW: "選擇的表情符號的SVG圖像生成AI處理工具",
    es: "Herramienta para generar y procesar imágenes SVG de emojis seleccionados con IA",
    fr: "Outil pour générer et traiter des images SVG d'émojis sélectionnés avec l'IA",
  },
  "絵文字を選択: {0}": {
    en: "Select emoji: {0}",
    zh_CN: "选择表情符号: {0}",
    zh_TW: "選擇表情符號: {0}",
    es: "Seleccionar emoji: {0}",
    fr: "Sélectionner emoji: {0}",
  },
  "例: サングラスを青くしてください": {
    en: "Example: Make the sunglasses blue",
    zh_CN: "例如：把太阳镜变成蓝色",
    zh_TW: "例如：把太陽眼鏡變成藍色",
    es: "Ejemplo: Haz las gafas de sol azules",
    fr: "Exemple : Rendre les lunettes de soleil bleues",
  },
  "残り {0} 文字": {
    en: "{0} characters remaining",
    zh_CN: "剩余 {0} 个字符",
    zh_TW: "剩餘 {0} 個字符",
    es: "{0} caracteres restantes",
    fr: "{0} caractères restants",
  },
  絵文字を選択してください: {
    en: "Please select an emoji",
    zh_CN: "请选择表情符号",
    zh_TW: "請選擇表情符號",
    es: "Por favor, seleccione un emoji",
    fr: "Veuillez sélectionner un emoji",
  },
  絵文字の生成に失敗しました: {
    en: "Failed to generate emoji",
    zh_CN: "生成表情符号失败",
    zh_TW: "生成表情符號失敗",
    es: "Error al generar emoji",
    fr: "Échec de la génération de l'emoji",
  },
  APIからの無効な応答: {
    en: "Invalid response from API",
    zh_CN: "API的无效响应",
    zh_TW: "API的無效回應",
    es: "Respuesta inválida de la API",
    fr: "Réponse invalide de l'API",
  },
  "編集中...": {
    en: "Editing...",
    zh_CN: "编辑中...",
    zh_TW: "編輯中...",
    es: "Editando...",
    fr: "Édition en cours...",
  },
  絵文字編集: {
    en: "Emoji Editor",
    zh_CN: "表情符号编辑器",
    zh_TW: "表情符號編輯器",
    es: "Editor de Emoji",
    fr: "Éditeur d'Emoji",
  },
  SVGとしてダウンロード: {
    en: "Download as SVG",
    zh_CN: "下载为SVG",
    zh_TW: "下載為SVG",
    es: "Descargar como SVG",
    fr: "Télécharger en SVG",
  },
  PNGとしてダウンロード: {
    en: "Download as PNG",
    zh_CN: "下载为PNG",
    zh_TW: "下載為PNG",
    es: "Descargar como PNG",
    fr: "Télécharger en PNG",
  },
  シェア: {
    en: "Share",
    zh_CN: "分享",
    zh_TW: "分享",
    es: "Compartir",
    fr: "Partager",
  },
  元になる絵文字を選んでください: {
    en: "Please select the base emoji",
    zh_CN: "请选择基本表情符号",
    zh_TW: "請選擇基本表情符號",
    es: "Por favor, seleccione el emoji base",
    fr: "Veuillez sélectionner l'emoji de base",
  },
  編集内容を入力してください: {
    en: "Please enter the editing content",
    zh_CN: "请输入编辑内容",
    zh_TW: "請輸入編輯內容",
    es: "Por favor, introduzca el contenido de edición",
    fr: "Veuillez saisir le contenu de l'édition",
  },
} as const;

type TranslationKey = keyof typeof translations | JaNames;

// 翻訳関数
export const getTranslation =
  (language: Languages) =>
  (key: TranslationKey, options?: Record<string, unknown>): string => {
    const category = categories.find((category) => category.name_ja === key);
    const categoryName = category
      ? language === "ja"
        ? category.name_ja
        : category.name_en
      : undefined;

    const map = (
      translations as unknown as Record<
        string,
        { en: string; zh_CN: string; zh_TW: string; es: string; fr: string }
      >
    )[key];

    let translation: string | undefined;

    switch (language) {
      case "ja":
        translation = key as string;
        break;
      case "zh-CN":
        translation = map?.zh_CN;
        break;
      case "zh-TW":
        translation = map?.zh_TW;
        break;
      case "es":
        translation = map?.es;
        break;
      case "fr":
        translation = map?.fr;
        break;
      default:
        translation = map?.en;
        break;
    }

    let result = categoryName ?? translation ?? key;

    // オプションがある場合、プレースホルダーを置換
    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        result = result.replace(`{${key}}`, String(value));
      });
    }

    return result;
  };
