import {createSelector} from "reselect";

const leadPageState = (state) => state.leadPageReducer;

export const makeSelectJobs = createSelector(
    leadPageState,
    (leads) => leads.jobs
);