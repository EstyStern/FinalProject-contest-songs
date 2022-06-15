import produce from 'immer';

const JudgesInitialState = {
    Judges: [],
    // JudgForPlan:[],
    listJudgerWaitForOk: [],
    //0-לא בשלב שפיטה
    //1-בשלב שפיטה
    IfStepInJudge: 0
}

export const JudgesReducer = produce((state, action) => {
    debugger
    switch (action.type) {
        case 'LOAD_GET_ALL_JUDGES':
            {
                state.Judges = action.payload;
                break;
            }
        case 'WAIT_OK_Judge':
            {
                debugger
                state.listJudgerWaitForOk.push(action.payload)
            }
        case 'IF_STEP_IN_JUDE':
            {
                debugger
                state.IfStepInJudge=action.payload;
            }
    }
}, JudgesInitialState)