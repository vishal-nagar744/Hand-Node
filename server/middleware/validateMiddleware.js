import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ succuss: false, errors: errors.array().map((err) => err.msg), });
    }

    next();
};