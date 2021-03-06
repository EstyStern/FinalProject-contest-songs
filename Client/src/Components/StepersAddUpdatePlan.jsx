import FileUploadIcon from '@mui/icons-material/FileUpload';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useNavigate, Outlet } from "react-router-dom"
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import { useState } from 'react';
import { AddPlan, UpdatePlan } from '../Redux/Plan/PlanThunk'
import { UpdateSteps, AddSteps } from '../Redux/StepInPlan/StepInPlanThunk'

export const StepersAddUpdatePlan = () => {
    const myDispatch = useDispatch();
    const QontoConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 10,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)',
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#784af4',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#784af4',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderTopWidth: 3,
            borderRadius: 1,
        },
    }));

    const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#784af4',
        }),
        '& .QontoStepIcon-completedIcon': {
            color: '#784af4',
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }));

    function QontoStepIcon(props) {
        const { active, completed, className } = props;

        return (
            <QontoStepIconRoot ownerState={{ active }} className={className}>
                {completed ? (
                    <Check className="QontoStepIcon-completedIcon" />
                ) : (
                    <div className="QontoStepIcon-circle" />
                )}
            </QontoStepIconRoot>
        );
    }

    QontoStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
    };

    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 22,
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 0,
            backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderRadius: 1,
        },
    }));

    const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        }),
    }));

    function ColorlibStepIcon(props) {
        const { active, completed, className } = props;

        const icons = {
            1: <LooksOneIcon></LooksOneIcon>,
            2: <LooksTwoIcon></LooksTwoIcon>,
            3: <Looks3Icon></Looks3Icon>,
        };

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }

    ColorlibStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
        /**
         * The label displayed in the step icon.
         */
        icon: PropTypes.node,
    };

    //?????????? ???? ???????????????? ????????????
    const AllPlansFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Plans.Plans);
        return store.Plans.Plans;
    });

    //?????????? ???? ????????????   ????????????
    const AllstepsFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.StepInPlans.StepsToAdd);
        return store.StepInPlans.StepsToAdd;
    });

    //  -?????????? ???? ???????????? ???????????? ????????????
    const StepsFromStoreToAdd = useSelector((store) => {
        console.log("store", store);
        console.log(store.StepInPlans.StepsToAdd);
        return store.StepInPlans.StepsToAdd;
    });
    //  -?????????? ???? ???????????? ???????????? ????????????
    const StepsFromStoreToUpdate = useSelector((store) => {
        console.log("store", store);
        console.log(store.StepInPlans.StepsToUpadte);
        return store.StepInPlans.StepsToUpadte;
    });

    //  -?????????? ???? ???????????????? ???????????? ????????????
    const PlansToUpdateFromStoreToUpdate = useSelector((store) => {
        console.log("store", store);
        console.log(store.Plans.PlanToUpdate);
        return store.Plans.PlanToUpdate;
    });
    //  -?????????? ???? ???????????????? ???????????? ????????????
    const PlansToUpdateFromStoreToAdd = useSelector((store) => {
        console.log("store", store);
        console.log(store.Plans.PlanToAdd);
        return store.Plans.PlanToAdd;
    });



    let navigate = useNavigate()
    const params = useParams()
    var myIdplanToUpdate = params.idPlan
    const [activeStep, setActiveStep] = useState(0);

    console.log("myIdplanToUpdate!!!!!!!", myIdplanToUpdate);
    // var myIdplanToUpdate =2
    const myPlanToUpdate = AllPlansFromStore.filter(x => x.planId == myIdplanToUpdate)
    const addOrUpdate = (myPlanToUpdate.length != 0) ? '?????????? ????????????' : '?????????? ????????????'
    const addOrUpdateStep = (myPlanToUpdate.length != 0) ? '?????????? ???????? ????????????' : '?????????? ???????? ????????????'
    const steps = [addOrUpdate, addOrUpdateStep, '??????????'];


    ///????
    var ifSucced = true//???????? ???? ???????????? ???????? ????????????
    const nevigateByStep = (lable) => {
        debugger
        let i = -1
        for (let index = 0; index < steps.length || i == index; index++) {
            if (steps[index] == lable)
                i = index;
        }
        debugger
        if (lable == '?????????? ????????????' || lable == '?????????? ????????????') {
            setActiveStep(i)
            navigate(`/Nav/StepersAddUpdatePlan/${myIdplanToUpdate}/AddOrUpdatePlan/${myIdplanToUpdate}`)

        }
        // `/Nav/First/${params.code}/Second/${id}`
        else
            if (lable == '?????????? ???????? ????????????' || lable == '?????????? ???????? ????????????') {
                setActiveStep(i)
                navigate(`/Nav/StepersAddUpdatePlan/${myIdplanToUpdate}/AddOrUpdateSteps/${myIdplanToUpdate}`)
            }

            else {//?????????? ????????????
                debugger
                setActiveStep(i)
                if (params.addOrUpdate == 1)//?????????? ???????????? ??????????????
                    navigate(`/Nav/StepersAddUpdatePlan/${Number(myIdplanToUpdate)}/AddJudgeForCurrentPlan/${Number(myIdplanToUpdate)}/1`)
                else//?????????? ????????????
                    navigate(`/Nav/StepersAddUpdatePlan/${Number(myIdplanToUpdate)}/AddJudgeForCurrentPlan/${Number(myIdplanToUpdate)}/0`)
            }


        //     setActiveStep(i)
        //     var MyUpdatePlan
        //     var MyUpdateStep
        //     if (myIdplanToUpdate != 1 && PlansToUpdateFromStoreToUpdate != undefined) {
        //         MyUpdatePlan = UpdatePlan(myDispatch, PlansToUpdateFromStoreToUpdate);
        //         console.log("MyUpdatePlan", MyUpdatePlan);
        //         MyUpdateStep = UpdateSteps(myDispatch, StepsFromStoreToUpdate[0])
        //         if (MyUpdateStep == undefined)
        //             ifSucced = false
        //         MyUpdateStep = UpdateSteps(myDispatch, StepsFromStoreToUpdate[1])
        //         if (MyUpdateStep == undefined)
        //             ifSucced = false
        //         MyUpdateStep = UpdateSteps(myDispatch, StepsFromStoreToUpdate[2])
        //         if (MyUpdateStep == undefined)
        //             ifSucced = false
        //         console.log("MyUpdateStep", MyUpdateStep);




        //     }
        //     else {
        //         debugger
        //         // var MyAddPlan
        //         // var MyAddStep


        //         // if (myIdplanToUpdate == 1 && PlansToUpdateFromStoreToAdd != undefined) {
        //         //     // MyAddPlan = AddPlan(myDispatch, PlansToUpdateFromStoreToAdd);
        //         //     // console.log("MyAddPlan", MyAddPlan);
        //         //     // MyAddStep = AddSteps(myDispatch, StepsFromStoreToAdd[0])
        //         //     // debugger
        //         //     if (MyAddStep == undefined)
        //         //         ifSucced = false
        //         //     MyAddStep = AddSteps(myDispatch, StepsFromStoreToAdd[1])
        //         //     if (MyAddStep == undefined)
        //         //         ifSucced = false
        //         //     MyAddStep = AddSteps(myDispatch, StepsFromStoreToAdd[2])
        //         //     if (MyAddStep == undefined)
        //         //         ifSucced = false
        //         //     console.log("MyAddStep", MyAddStep);
        //         // }




        //     }
        //     debugger
        //     if (ifSucced == true) {
        //         alert("??????????")
        //         setActiveStep(i)
        //         if (params.addOrUpdate == 1)//?????????? ???????????? ??????????????
        //             navigate(`/Nav/StepersAddUpdatePlan/${myIdplanToUpdate}/AddJudgeForCurrentPlan/${myIdplanToUpdate}/1`)
        //         else//?????????? ????????????
        //             navigate(`/Nav/StepersAddUpdatePlan/${myIdplanToUpdate}/AddJudgeForCurrentPlan/${myIdplanToUpdate}/0`)
        //     }

        //     else
        //         alert("????????")

        // }




    }



    return <>

        <Stack sx={{ width: '100%' }} spacing={4}>

            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label} onClick={() => nevigateByStep(label)}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
        <Outlet></Outlet>
    </>


}

export default StepersAddUpdatePlan;