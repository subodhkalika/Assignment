import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ENUMS from "../containers/Leads/enums";
import JobsUtil from "../util/JobsUtil";

const JobCardWrapper = styled.div`
    width: 100%;
    background-color: #fff;
    margin-bottom: 20px;
    box-shadow: 0 0 3px 0 rgba(0,0,0,.1);
`;

const CardSection = styled.div`
    padding: 15px;
    border-bottom: 1px solid #eeeeee;
`;

const BoldText = styled.div`
    font-weight: bold;
    text-align: left;
    color: #4a4a4a;
    line-height: 1.5;
`;

const NormalText = styled.div`
    text-align: left;
    color: #8f8f8f;
    line-height: 1.5;
`;

const InfoText = styled.a`
    text-align: left;
    color: #ec9548;
    line-height: 1.5;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
`;

const FlexVCenter = styled.div`
    display: flex;
    align-items: center;
`;

const Avatar = styled.div`
    width: 50px;
    height: 50px;
    background: #ed9d40;
    color: #fff;
    border-radius: 50%;
    font-size: 40px;
    margin-right:15px;
`;

const Button = styled.div`
    padding: 10px 20px;
    background: ${props => props.primary ? "#e8782a" : "#eeeeee"};
    color: ${props => props.primary ? "#fff" : "#4a4a4a"};
    font-weight: bold;
    border-bottom: ${props => props.primary ? "3px solid #cc6224" : "2px solid #bebebe"};
    margin-right: 15px;
    cursor: pointer;
`;

const EllipsisText = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
`;

export function JobCard(props) {
    const job = props.job;

    return <JobCardWrapper>
        <CardSection>
            <FlexVCenter>
                <Avatar>{JobsUtil.getInitialFromName(job.contact_name)}</Avatar>
                <div>
                    <BoldText>{job.contact_name}</BoldText>
                    <NormalText>{JobsUtil.formatDateAndTime(job.created_at)}</NormalText>
                </div>
            </FlexVCenter>
        </CardSection>
        <CardSection>
            <FlexVCenter>
                <NormalText className="mr-20"><i className="fa fa-map-marker icon"></i>{job.suburb.name}&nbsp;{job.suburb.postcode}</NormalText>
                <NormalText className="mr-20"><i className="fa fa-briefcase icon"></i>{job.category.name}</NormalText>
                <NormalText className="mr-20">Job id: {job.id}</NormalText>
                {
                    props.type === ENUMS.HEADER_TYPE.ACCEPTED.type
                    ? <React.Fragment><NormalText>${job.price.toFixed(2)}</NormalText>&nbsp; 
                    <NormalText>Lead Invitation</NormalText></React.Fragment>
                    : ""
                }
            </FlexVCenter>            
        </CardSection>
        <CardSection>
            {
                props.type === ENUMS.HEADER_TYPE.ACCEPTED.type
                ? <FlexVCenter>
                    <InfoText className="mr-20" href={"tel: " + job.contact_phone}><i className="fa fa-phone icon"></i>{job.contact_phone}</InfoText>
                    <InfoText className="mr-20" href={"mail: " + job.contact_email}><i className="fa fa-envelope icon"></i>{job.contact_email}</InfoText>
                </FlexVCenter>
                : ""
            }
            <NormalText><EllipsisText>{job.description}</EllipsisText></NormalText>
        </CardSection>
        {
            props.type === ENUMS.HEADER_TYPE.INVITED.type
            ? <CardSection>
                <FlexVCenter>
                    <Button onClick={(e) => props.handleAction(job, ENUMS.JOB_STATUS.ACCEPTED)} primary={true}>Accept</Button>
                    <Button onClick={(e) => props.handleAction(job, ENUMS.JOB_STATUS.DECLINED)}>Decline</Button>
                    <BoldText>${job.price.toFixed(2)}</BoldText>&nbsp; 
                    <NormalText>Lead Invitation</NormalText>
                </FlexVCenter>
            </CardSection>
            : ""
        }
    </JobCardWrapper>
}