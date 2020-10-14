export interface Feature {
  featureId: number;
  featureName: string;
  featureNameEn: string;
  description: string;
  dateIns: Date;
  featureStatus?: {
    name: string;
    value: number
  };
  author?: {
    name: string;
    value: number;
  };
  responsible?: {
    name: string;
    value: number;
  };
}

export type FeatureCreate = {
  featureName: string;
  featureNameEn: string;
  description?: string;
}

export type FeatureUpdate = {
  featureName: string;
  featureNameEn: string;
  description?: string;
  responsibleId?: number;
}

export type FeatureSearchTemplate = {
  featureId?: number;
  featureNameTemplate?: string;
  featureNameEnTemplate?: string;
  dateInsFrom?: Date;
  dateInsTo?: Date;
  statusCodeList?: string[];
  /*authorId: number;
  responsibleId: number;
  maxRowCount: number;*/
}