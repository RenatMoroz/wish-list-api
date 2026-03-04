import { HydratedDocument, InferSchemaType, model, Schema } from 'mongoose';

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'categorys',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export type Item = InferSchemaType<typeof itemSchema>;
export type ItemDocument = HydratedDocument<Item>;

export const ItemCollection = model<Item>('items', itemSchema);
