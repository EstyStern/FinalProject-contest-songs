export function LoadGetAllStepInPlans(items){
    debugger
    console.log(items)
    return {type:"LOAD_GET_ALL_STEP_IN_PLANS",payload:items}
}

export function GetCurrentStep(item){
    debugger
    return {type:"GET_CURRENT_STEP",payload:item}
}

export function loadAddStepsToStore(item){
    debugger
    return {type:"STEP_ADD_TO_STORE",payload:item}
}

export function loadUpdateStepsToStore(item){
    debugger
    return {type:"STEP_UPDATE_TO_STORE",payload:item}
}

export function LoadAddSteps(items){
    debugger
    console.log(items)
    return {type:"ADD_STEPS",payload:items}
}

export function LoadUpdateSteps(items){
    debugger
    console.log(items)
    return {type:"UPDATE_STEPS",payload:items}
}