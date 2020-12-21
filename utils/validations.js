import Joi from "joi";

export const phone_pattern = /^(\+[0123456789]{2,4}[ ])?[0123456789]{6,20}$/;
export const cvv_pattern = /^[0123456789]{3}$/;

export const email = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required();
export const phone = Joi.string().pattern(phone_pattern).required();
export const cvv = Joi.string().pattern(cvv_pattern).required();
export const name = Joi.string().min(2).required();
export const date = Joi.date().required();
export const passNumber = Joi.string().required();
export const gender = Joi.string().valid("male", "female");

export const password = Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()]{7,30}$')).required();
export const repassword = Joi.ref('password');

export const banknumber = Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()]{2,30}$')).required();
export const rebanknumber = Joi.ref('banknumber');