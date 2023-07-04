import { ResponseKind } from "./enums";

export type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};
