import dotenv from 'dotenv';


dotenv.config();

export const PORT = process.env.PORT || 5555;
export const mongodburl = 'mongodb+srv://root:root@katha-kritique.mdjws7b.mongodb.net/test?retryWrites=true&w=majority';
export const googleAPIKey = process.env.googleAPIKey;
