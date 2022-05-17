import { model, Schema, Types } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IMovie {
    name: string;
    url: string;
}

// 2. Create a Schema corresponding to the document interface.
export const movieSchema = new Schema<IMovie>({
    name: { type: String, required: true },
    url: { type: String, required: true },
});

const Movie = model<IMovie>("movies", movieSchema);

export default Movie;
