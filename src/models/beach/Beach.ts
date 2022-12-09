import mongoose, { Document, Model } from "mongoose";
import { IBeach } from "./IBeach";

const schema = new mongoose.Schema<BeachModel>({
    lat: { type: Number, require: true },
    lng: { type: Number, require: true },
    name: { type: String, require: true },
    position: { type: String, require: true },
},
{
    toJSON: {
        transform: (_, ret): void => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

interface BeachModel extends Omit<IBeach, '_id'>, Document {}
export const Beach: Model<BeachModel> = mongoose.model('Beach', schema);