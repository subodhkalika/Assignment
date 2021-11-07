import React, { useEffect, useState } from "react";
import config from "../../config/config";
import axios from "../../config/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { makeSelectJobs } from "./selectors";
import ENUMS from "./enums";
import { setJobs } from "./actions";
import { Tabs } from "../../components/Tabs";

const stateSelector = createSelector(makeSelectJobs, (jobs) => ({
    jobs
}));

const actionDispatch = ((dispatch)=> ({
    setJobList: (jobs) => dispatch(setJobs(jobs))
}));

export function Leads(props) {
    const { jobs } = useSelector(stateSelector);
    const { setJobList } = actionDispatch(useDispatch());

    const fetchJobs = async () => {
        const response = await axios.get(config.API_URL + ENUMS.API_ROUTES.JOBS).catch(err => {
            console.log('Err', err);
        });
        setJobList(response.data.data);
    };

    const [headers, setHeaders] = useState([{
        tabId: 1,
        label: ENUMS.HEADER_TYPE.INVITED.label,
        type: ENUMS.HEADER_TYPE.INVITED.type,
        selected: true
    },
    {
        tabId: 2,
        label: ENUMS.HEADER_TYPE.ACCEPTED.label,
        type: ENUMS.HEADER_TYPE.ACCEPTED.type,
        selected: false
    }]);

    const setActiveTab = (selectedHeader) => {
        console.log(selectedHeader)
        const newHeader = [...headers].map(header => {
            return {
                ...header,
                selected: (header.tabId === selectedHeader.tabId) ? true : false
            }
        });
        setHeaders(newHeader);
    }

    const actionHandler = async (job, status) => {
        await axios.patch(
            config.API_URL + ENUMS.API_ROUTES.JOBS + "/" + job.id, 
            { status }
        ).catch(err => {
            console.log('Err', err);
        });
        fetchJobs();
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    return <div>
        {
            jobs && jobs.length > 0
            ? <Tabs
                headers={headers}
                setActiveTab={setActiveTab}
                handleAction={actionHandler}
            ></Tabs>
            : <div>No Leads. Visit again later.</div>
        }
    </div>;
}