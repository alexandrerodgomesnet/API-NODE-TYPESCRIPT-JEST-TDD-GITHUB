import { Controller, Post } from '@overnightjs/core';
import { Beach } from '@src/models';
import { BeachApi } from '@src/services/beach-api';
import { Request, Response } from 'express';

@Controller('beaches')
export class BeachesController {
    @Post('')
    public async create(req: Request, res: Response): Promise<void> {

        /**
         * const beach = new Beach(req.body);
         * const result = await beach.save();
         */

        const api = new BeachApi('/beaches');
        const result = await api.Inserir(req.body);
        res.status(201).send(result);
    }
}
