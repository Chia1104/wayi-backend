import { z } from 'zod';

export enum STATUS {
  SUCCESS = 'Success',
  ERROR = 'Error',
}
export const statusSchema = z.nativeEnum(STATUS);
export type Status = z.infer<typeof statusSchema>;
