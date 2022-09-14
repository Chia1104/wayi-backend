import { z } from 'zod';

export const taiwanPhoneSchema = z.string().regex(/^09\d{8}$/);
export const hongKongPhoneSchema = z.string().regex(/^(5|6|9)\d{7}$/);
export const macaoPhoneSchema = z.string().regex(/^6\d{7}$/);

export type TaiwanPhone = z.infer<typeof taiwanPhoneSchema>;
export type HongKongPhone = z.infer<typeof hongKongPhoneSchema>;
export type MacaoPhone = z.infer<typeof macaoPhoneSchema>;
