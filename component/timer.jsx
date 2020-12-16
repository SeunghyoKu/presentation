import { Boostact } from "boostact";
import { Context } from "../Main";
import classes from "./style";

/** @jsx Boostact.createElement */

const initialValue = {
    seconds: 0,
    minutes: 7,
};

const numPad = (num) => {
    if (typeof num === "number" && num >= 0 && num < 10) {
        num = "0" + num;
    }
    return num;
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SECONDS": {
            if (state.seconds === 0) {
                if (state.minutes === 0) {
                    console.log("done");
                    return;
                }
                return { seconds: 59, minutes: state.minutes - 1 };
            }
            return { seconds: state.seconds - 1, minutes: state.minutes };
        }
        default:
            break;
    }
};

let prevTimer = new Date().getSeconds();

const Timer = () => {
    const [state, dispatch] = Boostact.useReducer(reducer, initialValue);
    const { work } = Boostact.useContext(Context);
    Boostact.useEffect(() => {
        console.log(work);
        let interval;
        if (work) {
            interval = setInterval(() => {
                const timer = new Date().getSeconds();
                if (prevTimer !== timer) {
                    dispatch({ type: "SET_SECONDS" });
                }
                prevTimer = timer;
            }, 500);
        }
        return (interval) => {
            clearImmediate(interval);
        };
    }, [state.seconds, work, new Date().getSeconds()]);

    return (
        <div className={classes.timer}>
            <div className={classes.timeBox}>{numPad(0)}</div>
            <div>:</div>
            <div className={classes.timeBox}>{numPad(state.minutes)}</div>
            <div>:</div>
            <div className={classes.timeBox}>{numPad(state.seconds)}</div>
        </div>
    );
};

export default Timer;
