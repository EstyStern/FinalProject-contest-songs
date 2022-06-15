import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllMessageFromServer } from '../Redux/Message/MessageThunk'

export const AllMessage = (props) => {
    const myDispatch = useDispatch();

    //בעת טעינת הקומפוננטה- שליפת כל ההודעות
    useEffect(async () => {
        try {
            let response = await GetAllMessageFromServer(myDispatch);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    //שליפת כל ההודעות מהסטור
    const AllMessageFromStore = useSelector((store) => {
        console.log("store", store);
        console.log(store.Message.Message);
        return store.Message.Message;
    });

    return <>
        <h1>All Messages</h1>

        <table style={{ marginLeft: "250px" }}>
            <tr class="w3-white">
                <th>MessageId</th>
                <th>UserId</th>
                <th>MessageDate</th>
                <th>MessageValue</th>
            </tr>
            {/* מיפוי על כל ההודעות מהסטור */}
            {
                AllMessageFromStore && AllMessageFromStore.map((item) => {
                    console.log("props",props.location.props.id);
                    if (item.UserId == props.location.props.id) {
                        return <>
                            <tr class="w3-hover-gray">
                                <td>{item.messageId}</td>
                                <td>{item.userId}</td>
                                <td>{item.messageDate}</td>
                                <td>{item.messageValue}</td>
                            </tr>
                        </>
                    }
                })
            }
        </table>
    </>

}