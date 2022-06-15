import { useSelector, useDispatch } from 'react-redux';
import { AddJudge } from '../Redux/JudgForPlan/JudgForPlanThunk'
import { useParams, useNavigate } from 'react-router-dom';
import { GetAllJudgesFromServer } from '../Redux/Judge/JudgeThunk';
import { useState } from 'react';



const AddJudgesForCurrentPlan = () => {
    let myDispatch = useDispatch();
    let params = useParams();
    let navigate=useNavigate();

    const [index, setIndex] = useState(0);

    // //בעת טעינת הקומפוננטה- שליפת כל השופטים
    // useEffect(async () => {
    //     try {
    //         let response = await GetAllJudgesFromServer(myDispatch);
    //         console.log(response);
    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }, []);

    //שליפת כל השופטים מהסטור
    const AllJudgesFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Judges.Judges);
        return store.Judges.Judges;
    });

    // //שליפת שופטים שמחכים לאישור
    // const AllJudgForPlanWaitingToOkManager = useSelector((store) => {
    //     console.log("store", store);
    //     console.log(store.Judge.listJudgerWaitForOk);
    //     return store.Judge.listJudgerWaitForOk;
    // });

    const SendToServer = (event) => {
        event.preventDefault();
        debugger
        alert("jj")
        console.log(event);
        var count = 0;
        var myJudge
        for (let i = 0; i < AllJudgesFromStore.length && count < 3; i++) {
            if (event.target[i].checked == true) {
                count++
                myJudge = {
                    UserId: AllJudgesFromStore[i].userId,
                    PlanId: Number(params.idPlan),
                }
                console.log("myJudge", myJudge);
                myFuncAddJudge(myJudge)
            }
        }
        alert("!!!התוכנית נוספה בהצלחה")
        navigate('/Nav')

        // event.target[index].checked

    }

    //הוספת שופט לשרת
    const myFuncAddJudge = async (JudageToAdd) => {
        debugger
        console.log("JudageToAdd", JudageToAdd);
        //הוספת שופט לשרת
        var p = await AddJudge(myDispatch, JudageToAdd);
        await console.log("p", p);
    }

    // const myFuncUpdateJudge = async (JudageToAdd) => {
    //     debugger
    //     console.log("JudageToAdd", JudageToAdd);
    //     //הוספת שופט לשרת
    //     var p = await AddJudge(myDispatch, JudageToAdd);
    //     await console.log("p", p);

    // }

    // const addThisJudgeToThisPlan = (item) => {
    //     if (params.addOrUpdate == 1) {
    //         const MyJudgeToAdd =
    //         {

    //         }
    //         myFuncAddJudge(MyJudgeToAdd);
    //     }
    //     else {
    //         const MyJudgeToUpdate =
    //         {

    //         }
    //         myFuncUpdateJudge(MyJudgeToUpdate);
    //     }

    // }

    return <>

        <h1>בחירת שופטים לתוכנית</h1>
        <form onSubmit={(e) => { SendToServer(e) }}>

            <table style={{ marginLeft: "250px" }} >
                <tr class="w3-white">
                    <td>מספר שופט</td>
                    <th>שם פרטי</th>
                    <th>שם משפחה</th>
                    <th>כתובת מייל</th>
                    <th>עיר מגורים</th>
                    <th>מין</th>
                    <th>סגנון</th>
                    <td>סיבה</td>
                    <td>רזומה</td>
                    <td>תמונה</td>
                    <td>בחר</td>
                </tr>
                {/* מיפוי על כל המשתמשים מהסטור */}
                {
                    AllJudgesFromStore && AllJudgesFromStore.map((item, index) => {
                        return <tr class="w3-hover-gray">
                            <td>{item.userId}</td>
                            <td>{item.userFirstName}</td>
                            <td>{item.userLastName}</td>
                            <td>{item.userEmail}</td>
                            <td>{item.userCity}</td>
                            <td>{item.userGender}</td>
                            <td>{item.judgeType}</td>
                            <td>{item.judgeCancalingReason}</td>
                            {/* <td><embed src={`https://localhost:44324/Resume/${item.judgeResume}`} width="800px" height="2100px" /></td> */}
                            {/* <td>{Desktop.getDesktop().open(new File(`https://localhost:44324/Resume/${item.judgeResume}`))}  </td> */}
                            {/* לא מציג רזומה */}
                            <td><file width="5%" height="5%" src={`https://localhost:44324/Resume/${item.judgeResume}`} ></file></td>
                            <td><img width="5%" height="5%" src={`https://localhost:44324/Images/${item.judgePic}`}></img></td>
                            <td><input id={index++} type="checkbox"  ></input></td>
                            
                        </tr>
                        setIndex(index)
                    })

                }
            </table>

            <input type='submit' value="הוסף שופטים אלו לתוכנית" />

        </form>





        {/* <table style={{ marginLeft: "250px" }}>
            <tr class="w3-white">
                <th>UserFirstName</th>
                <th>UserLastName</th>
                <th>UserEmail</th>
                <th>UserCity</th>
                <th>UserGender</th>
                <th>UserGenre</th>
                <th>JudgeType</th>
                <th>JudgePic</th>
                <th>JudgeCancalingReason</th>
                <th>JudgeResume</th>
                <th>בחר</th>
            </tr>

            {AllJudgForPlanWaitingToOkManager && AllJudgForPlanWaitingToOkManager.map((item) => {
                return <tr class="w3-hover-gray">
                    <td>{item.userFirstName}</td>
                    <td>{item.userLastName}</td>
                    <td>{item.userEmail}</td>
                    <td>{item.userCity}</td>
                    <td>{item.userGender}</td>
                    <td>{item.userGenre}</td>
                    <td>{item.judgeType}</td>
                    <td>{item.judgePic}</td>
                    <td>{item.judgeCancalingReason}</td>
                    <td>{item.judgeResume}</td>
                    <td><input type='button' onClick={addThisJudgeToThisPlan(item)}></input></td>
                </tr>
            })
            }
        </table> */}
    </>


}

export default AddJudgesForCurrentPlan;