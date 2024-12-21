import { mongoose, Schema, model, BlackList } from "../../interface";
import { RESOURCE } from "../../constants";

const blackListSchema: Schema<BlackList> = new Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    }
});

const BlackList = model(RESOURCE.BLACKLIST, blackListSchema);

export default BlackList;