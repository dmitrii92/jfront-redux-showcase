import React from "react";
import { FeatureSearchTemplate } from "./api/feature/FeatureInterface";

export interface SearchContextInterface {
  getId(): string;
  setId(searchId: string): void;
  getTemplate(): FeatureSearchTemplate;
  setTemplate(template: FeatureSearchTemplate): void;
}

export const SearchContext = React.createContext<SearchContextInterface | null>(null);
