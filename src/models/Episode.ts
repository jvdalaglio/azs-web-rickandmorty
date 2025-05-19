import { Character } from "./Character";

export declare type Episode = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters: Character[];
};
