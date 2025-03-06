import { activities } from "./activities.ts";
import { animals } from "./animals.ts";
import { body } from "./body.ts";
import { facilities } from "./facilities.ts";
import { fantasy } from "./fantasy.ts";
import { flags } from "./flags.ts";
import { food } from "./food.ts";
import { gesture } from "./gesture.ts";
import { nature } from "./nature.ts";
import { objects } from "./objects.ts";
import { people } from "./people.ts";
import { relationships } from "./relationships.ts";
import { roles } from "./roles.ts";
import { smileys } from "./smileys.ts";
import { sports } from "./sports.ts";
import { symbols } from "./symbols.ts";
import { travel } from "./travel.ts";

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

export type JaNames = (typeof categories)[number]["name_ja"];

export type EnNames = (typeof categories)[number]["name_en"];
