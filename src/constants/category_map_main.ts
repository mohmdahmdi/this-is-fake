type BusinessType = string;

type service = {
  serviceName: string;
  price: number;
};

type SubCategory = {
  translation: string;
  services: service[];
};
type Category = {
  translation: string;
  subCategories: SubCategory;
};

export type CategoryMapMain = Record<BusinessType, Category>;
