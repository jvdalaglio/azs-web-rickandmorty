export declare type Response<T> = {
  info: ResponseInfo;
  results: T[];
};

export declare type ResponseInfo = {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
};
