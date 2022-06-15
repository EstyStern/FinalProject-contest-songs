export function LoadGetAllPlans(items) {
    debugger
    console.log(items)
    return { type: "LOAD_GET_ALL_PLANS", payload: items }
}

export function LoadAddPlan(items) {
    debugger
    console.log(items)
    return { type: "ADD_PLAN", payload: items }
}

export function LoadUpdateMyPlan(items) {
    debugger
    console.log(items)
    return { type: "UPDATE_PLAN", payload: items }
}

export function LoadUpdateMyPlanFromStore(items) {
    debugger
    console.log(items)
    return { type: "UPDATE_PLAN_FROM_STORE", payload: items }
}
export function LoadAddMyPlanFromStore(items) {
    debugger
    console.log(items)
    return { type: "ADD_PLAN_FROM_STORE", payload: items }
}

export function SaveAllPlansToShow(items) {
    debugger
    console.log(items)
    return { type: "SAVE_ALL_PLANS_TO_SHWO", payload: items }
}

export function LoadCalcWins(items) {
    debugger
    console.log(items)
    return { type: "WINS_FROM_STORE", payload: items }
}