import { ActionTypes } from './constants';

export const setJobs = (jobs) => ({
    type : ActionTypes.SET_JOBS,
    payload: jobs
})