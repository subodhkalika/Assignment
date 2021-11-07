import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import styled from "styled-components";
import ENUMS from "../containers/Leads/enums";
import { makeSelectJobs } from "../containers/Leads/selectors";
import { JobCard } from "./JobCard";

const TabsContainer = styled.div`
    width: 100%;
`;

const TabHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.1);
    margin-bottom: 25px;
    background-color: #fff;
`;

const Tab = styled.div`
    width: 100%;
    padding: 15px 0;
    font-size: 18px;
    box-shadow: 1px -1px #e0e0e0;
    cursor: pointer;
    border-bottom: ${props => props.active ? "3px solid #e8782a" : "none"};
    font-weight: ${props => props.active ? "bold" : "normal"};
`;

const TabBody = styled.div`
    width: 100%;
`

const stateSelector = createSelector(makeSelectJobs, (jobs) => ({
    jobs
}));

export function Tabs(props) {
    const { jobs } = useSelector(stateSelector);
    
    const [type, setType] = useState(ENUMS.HEADER_TYPE.INVITED.type);

    const setActiveHeader = (header) => {
        setType(header.type);
        props.setActiveTab(header);
    }

    return (
        <div>
            <TabsContainer>
                <TabHeader>
                    {props.headers.map((header) => {
                        return <Tab
                            key={header.tabId}
                            active={header.selected}
                            onClick={(e) => setActiveHeader(header)}
                        >
                            {header.label}
                        </Tab>
                    })}
                </TabHeader>
                <TabBody>
                    {
                        jobs.filter(job => 
                            (type === ENUMS.HEADER_TYPE.INVITED.type && job.status == ENUMS.JOB_STATUS.NEW)
                            || (
                                type === ENUMS.HEADER_TYPE.ACCEPTED.type
                                && job.status == ENUMS.JOB_STATUS.ACCEPTED
                            )).map(job => {
                            return <JobCard 
                                job={job}
                                key={job.id}
                                type={type}
                                handleAction={props.handleAction}
                                handleAction={props.handleAction}
                            >
                            </JobCard>
                        })
                    }
                </TabBody>
            </TabsContainer>                
        </div>
    )
}
