import Joi from "joi";

export const songSchema = Joi.object({
    name: Joi.string().required(),
    youtubeLink: Joi.string()
});

export const genreSchema = Joi.object({
    name: Joi.string().required()
})