export interface UpdateCategory {
  title?: string;
  description?: string;
  background?: string;
}

export interface CreateCategory {
  title: string;
  description: string;
  background: string;
  userId: string;
}

export interface GetCategoryParams {
  page?: number;
  perPage?: number;
  title?: string;
  description?: string;
  background?: string;
  userId?: string;
}
