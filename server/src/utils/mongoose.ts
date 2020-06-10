import { Model } from 'mongoose';

export type DocumentType<M extends Model<any, any>> = M extends Model<infer I> ? I : never;
