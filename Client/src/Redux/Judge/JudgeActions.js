export function LoadGetAllJudges(items){
    debugger
    console.log(items)
    return {type:"LOAD_GET_ALL_JUDGES",payload:items}
}

export function WaitForOkJudge(item) {
    return { type: "WAIT_OK_Judge", payload: item };
}

export function IfStepInJudge(item) {
    return { type: "IF_STEP_IN_JUDE", payload: item };
}

