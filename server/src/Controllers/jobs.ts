import { Request, Response, NextFunction } from 'express';
import { Jobs } from '../Entities/Jobs';

const getAllJobs = (req: Request, res: Response, next: NextFunction) => {
    Jobs.find({ relations: ['category', 'suburb'] }).then((data) => {
        res.status(200).json({
            message: 'Jobs list.',
            data,
        });
    });
};

const updateJobStatus = async (req: Request, res: Response, next: NextFunction) => {
    const requestPayload = req.body;
    if (!requestPayload || !req.params.id || !requestPayload.status) {
        res.status(400).json({
            message: 'Bad request. Missing required parameters id and status.',
        });

        return;
    }
    const statuses = ['new', 'accepted', 'declined'];
    if (statuses.indexOf(requestPayload.status) < 0) {
        res.status(400).json({
            message: 'Bad request. Incorrect status.',
        });

        return;
    }
    try {
        const job = await Jobs.findOne({ id: req.params.id });
        if (!job) {
            res.status(400).json({
                message: 'Job not found.',
            });

            return;
        }
        try {
            job.status = requestPayload.status;
            Jobs.save(job);
            res.status(200).json({
                message: 'Update job.',
                job,
            });
        } catch (e) {
            res.status(500).json({
                message: 'Error occured',
                erroe: e,
            });
        }
    } catch (e) {
        res.status(500).json({
            message: 'Error occured',
            erroe: e,
        });
    }
};

export default {
    getAllJobs,
    updateJobStatus,
};
