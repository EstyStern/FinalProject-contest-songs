import {
    // main component
    Chart,
    // graphs
    Bars, Cloud, Dots, Labels, Lines, Pies, RadialLines, Ticks, Title,
    // wrappers
    Layer, Animate, Transform, Handlers,
    // helpers
    helpers, DropShadow, Gradient
} from 'rumble-charts';

// import {
//     Line, CartesianGrid, Tooltip, XAxis, LineChart

// } from 'recharts'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Outlet, useHistory, useNavigate, useParams } from "react-router-dom";
import { GetAllRatingByIdSongFromServer } from "../Redux/Rating/RatingThunk";
import Timer from './Timer';

import g from '../images/gragh2.jpg'


const ShowRaiting = () => {
    let params = useParams()
    let myDispatch = useDispatch()
    let navigate = useNavigate()

    useEffect(async () => {
        try {
            let response = await GetAllRatingByIdSongFromServer(myDispatch, params.idSong);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    const AllRatingByIdSongFromServer = useSelector((store) => {
        return store.Rating.RatingByIdSong;
    });
    console.log(AllRatingByIdSongFromServer, AllRatingByIdSongFromServer);

    const seriesByMusical = [
        // { data: [10] },
        // { data: [90] },
        // { data: [10] },
        // { data: [10] },
        // { data: [20] },
        // { data: [40] }
    ];
    const seriesByMatchSong = [
        // { data: [80] },
        // { data: [10] },
        // { data: [40] },
        // { data: [30] },
        // { data: [30] },
        // { data: [40] }
    ];
    const seriesByMatchShow = [
        // { data: [50] },
        // { data: [20] },
        // { data: [30] },
        // { data: [10] },
        // { data: [70] },
        // { data: [60] }
    ];


    const funcNavigateToAllSong = () => {

        navigate(`/Nav/AllStepInPlans/${params.idPlan}`)
    }

    const funcNavigateToSingerArea = () => {

        navigate(`/Nav/SingerArea`)
    }

    return <>
        {
            (params.idPlan != 0) ?
                < button onClick={funcNavigateToAllSong}>חזרה לצפייה בשירים</button> :
                < button onClick={funcNavigateToSingerArea}>חזרה לאזור האישי </button>
        }


        {
            AllRatingByIdSongFromServer && AllRatingByIdSongFromServer.map((item) => {
                seriesByMatchShow.push({ data: [item.ratingByMatchSong] })
                seriesByMusical.push({ data: [item.ratingByMusical] })
                seriesByMatchSong.push({ data: [item.ratingByMatchShow] })

                console.log(seriesByMatchShow, seriesByMatchShow);
                console.log(seriesByMusical, seriesByMusical);
                console.log(seriesByMatchSong, seriesByMatchSong);

            })

        }
        <h2>דרוג לפי מוזיקליות</h2>
        <Chart width={600} height={250} series={seriesByMusical} minY={0} maxY={100} seriesIndex={5} viewBox="bfbgngngfnfg" >
            <Bars innerPadding={3} groupPadding={50} />
            <Lines />
            {/* <Dots /> */}
        </Chart>
        <img src={g} width="1.8%" ></img>

        <hr></hr>

        <h2>דרוג לפי הופעה</h2>

        <Chart width={600} height={250} series={seriesByMatchShow} minY={0} maxY={100} >
            <Bars innerPadding={3} groupPadding={50} pointIndex={30} />
            <Lines />
            {/* <Dots /> */}
            {/* <Title textAnchor="start"> </Title> */}
        </Chart>;
        <img src={g} width="1.8%" ></img>
        <hr></hr>

        <h2>דרוג לפי התאמה לשיר</h2>

        <Chart width={600} height={250} series={seriesByMatchSong} minY={0} maxY={100} seriesIndex={5} >

            <Bars innerPadding={3} groupPadding={50} />
            <Lines />
            <Gradient type='linear'></Gradient>
            <DropShadow id='#387908'></DropShadow>
            <Ticks labelVisible="cscd">FDSFDS</Ticks>
            <textarea>cbfbfcb</textarea>

            {/* <Dots /> */}
            {/* <Title textAnchor="start"> </Title> */}
        </Chart>;
        <img src={g} width="1.8%" ></img>


        {/* <LineChart
            width={400}
            height={400}
            data={series}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
            <XAxis dataKey="name" />
            <Tooltip />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
            <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
        </LineChart> */}


        {/* <Chart layerWidth={600} layerHeight={400} minY={0} series={[{ "data": [1, 2, 3] }, { "data": [5, 7, 11] }, { "data": [13, 17, 19] }]}>
            <Bars colors='set1' innerPadding='1%' groupPadding='2%' />
        </Chart> */}

        <Outlet></Outlet>
    </>
}
export default ShowRaiting












