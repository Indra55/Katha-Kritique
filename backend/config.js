import dotenv from 'dotenv';


dotenv.config();

export const PORT = process.env.PORT || 5555;
export const mongodburl = process.env.MONGODBURL;
export const googleAPIKey = process.env.GOOGLEAPIKEY;

