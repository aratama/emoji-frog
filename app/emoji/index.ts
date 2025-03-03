import { activities } from "./activities";
import { animals } from "./animals";
import { body } from "./body";
import { facilities } from "./facilities";
import { fantasy } from "./fantasy";
import { flags } from "./flags";
import { food } from "./food";
import { gesture } from "./gesture";
import { nature } from "./nature";
import { objects } from "./objects";
import { people } from "./people";
import { relationships } from "./relationships";
import { roles } from "./roles";
import { smileys } from "./smileys";
import { sports } from "./sports";
import { symbols } from "./symbols";
import { travel } from "./travel";

export type Category = {
  name_en: string;
  name_ja: string;
  files: string[];
};

export const categories = [
  smileys,
  gesture,
  people,
  animals,
  food,
  travel,
  activities,
  objects,
  symbols,
  flags,
  body,
  facilities,
  sports,
  roles,
  fantasy,
  relationships,
  nature,
] as const;

export type EmojiCategory = {
  name: string;
  files: string[];
};

export type EnNames = (typeof categories)[number]["name_en"];
