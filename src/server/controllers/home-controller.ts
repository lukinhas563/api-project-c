import { Request, Response } from 'express';

export const home = (req: Request, res: Response) => {
    res.json({ result: 'OK' });
};

export const homePost = (req: Request, res: Response) => {
    res.status(200).json({ result: req.body });
};
