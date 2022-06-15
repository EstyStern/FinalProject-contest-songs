import React from 'react';
import { useTimer } from 'react-timer-hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimerStyled from './TimerStyled';

//expiryTimestamp=תאריך אחרון לדרוג
function MyTimer({expiryTimestamp} ) {
  let endTimeTorate=new Date(expiryTimestamp.props)
  
  useEffect(async () => {
    
    try {

      var date = new Date()
        console.log("date", date);
        console.log("date-endddddddddddddddd", endTimeTorate);
        // const month = date.getMonth()
        // const day = date.getDay()
        // const year = date.getFullYear()
        // const h = date.getHours()
        // const i = date.getMinutes()
        // const s = date.getSeconds()

        //const MyDate = new Date(month, day, year, h, i, s)
        //console.log("MyDate", MyDate);

        const diffFunc = diff_hours(endTimeTorate, date)
        console.log(diffFunc);

        const diffTime = endTimeTorate - date;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");

        const secontInDay = 86400
        const myDiff = diffDays * secontInDay

        // const time=new Date()
        // time.setSeconds(time.getSeconds() + myDiff);
        // time.setSeconds(myDiff);
        // restart(time)

        const time = new Date()
        //time.setSeconds(time.getSeconds() + (diffFunc * 3600));

        //מחשב רק הפקרש בימים
        time.setSeconds(time.getSeconds() + (diffDays * 86400));
        restart(time)

    } catch (error) {
      console.error(error.message);
    }
  }, []);

  // console.log(expiryTimestamp, expiryTimestamp);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  



  function diff_hours(dt2, dt1) {
    debugger
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));

  }


  return (
    <div style={{ textAlign: 'center' }}>
      <TimerStyled seconds={seconds} minutes={minutes} hours={hours} days={days} />
      {/* <div style={{ fontSize: '100px' }}>
        <span> נותר עוד {days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds} לדרוג </span>
      </div> */}

      {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}

      {/* <button onClick={() => {
        debugger
        var date = new Date()
        console.log("date", date);
        // const month = date.getMonth()
        // const day = date.getDay()
        // const year = date.getFullYear()
        // const h = date.getHours()
        // const i = date.getMinutes()
        // const s = date.getSeconds()

        //const MyDate = new Date(month, day, year, h, i, s)
        //console.log("MyDate", MyDate);

        const diffFunc = diff_hours(expiryTimestamp, date)
        console.log(diffFunc);

        const diffTime = expiryTimestamp - date;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");

        const secontInDay = 86400
        const myDiff = diffDays * secontInDay

        // const time=new Date()
        // time.setSeconds(time.getSeconds() + myDiff);
        // time.setSeconds(myDiff);
        // restart(time)

        const time = new Date()
        //time.setSeconds(time.getSeconds() + (diffFunc * 3600));

        //מחשב רק הפקרש בימים
        time.setSeconds(time.getSeconds() + (diffDays * 86400));
        restart(time)
      }}></button> */}
    </div>
  );
}

///////  propsמקבל כ   /////
///////  תאריך   אחרון לדרוג/////
//זמן שנשאר: מהיום עד תאריך אחרון לדרוג

export default function Timer(props) {
  console.log("props-Timer", Date(props));
  const EndDate = new Date('2022-05-4 00:00:00.000')
  console.log("EndDateeeeeeeeeeeeeeeeee", EndDate);
  console.log("EndDateeeeeeeeeeeeeeeeeepropos!!!!!!!", Date(props));
  return (
    <div>
      {/* //<MyTimer expiryTimestamp={props} /> */}
      {/* <MyTimer expiryTimestamp={EndDate} /> */}
      <MyTimer expiryTimestamp={props} />

    </div>
  );
}