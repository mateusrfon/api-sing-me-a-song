import Joi from "joi";

export const songSchema = Joi.object({
    name: Joi.string().required(),
    youtubeLink: Joi.string()
});