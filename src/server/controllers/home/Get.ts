import { Request, Response } from 'express';

export const get = (req: Request, res: Response) => {
    return res.json({ result: 'SERVER OK' });
};
