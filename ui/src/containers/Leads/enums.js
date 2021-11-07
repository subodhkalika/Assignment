const API_ROUTES = {
    JOBS: '/api/jobs'
};

const JOB_STATUS = {
    ACCEPTED: "accepted",
    NEW: "new",
    DECLINED: "declined"
};

const HEADER_TYPE = {
    INVITED: {
        label: "Invited",
        type: "invited"
    },
    ACCEPTED: {
        label: "Accepted",
        type: "accepted"
    },
}

const ENUMS = {
    API_ROUTES,
    JOB_STATUS,
    HEADER_TYPE
}
export default ENUMS;