import * as express from 'express';
import controller from '../Controllers/jobs';

const router = express.Router();

router.get('/jobs', controller.getAllJobs);
router.patch('/jobs/:id', controller.updateJobStatus);

export default router;
