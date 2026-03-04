export interface CreateItemCategory {
  title: string;
  description: string;
  categoryId: string;
  userId: string;
}

export interface UpdateItemCategory {
  title?: string;
  description?: string;
  categoryId?: string;
}

export interface GetItemParamsCategory {
  page?: number;
  perPage?: number;
  title?: string;
  description?: string;
  categoryId?: string;
  userId?: string;
}
