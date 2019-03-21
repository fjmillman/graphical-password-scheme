import { store } from "react-easy-state";

const state = store({
    page: 0,
    scheme: 1,
    startTime: 0,
    isRegistration: 1,
    isLogin: 0,
    iterations: 0,
    stage: 0,
    pastStages: [],
    passIcons: [
        "star",
        "face",
        "home",
        "print",
        "room",
        "visibility",
        "flag",
        "forward",
        "wifi",
        "work",
        "warning",
        "weekend",
        "computer",
        "watch",
        "headset",
        "sync",
        "ac_unit",
        "beach_access",
        "all_inclusive",
        "cake",
        "email"
    ],
    currentPassIcons: [],
    setPassIcons: [
        "work",
        "warning",
        "weekend",
        "computer",
        "watch",
        "headset"
    ],
    selected: [],
    icons: {
        pass: [],
        skip: [],
        flag: []
    },
    authentication: {
        registration: {},
        logins: []
    },
    schemeResult: {
        authentications: [],
        guesses: []
    },
    result: {
        scheme1: {},
        scheme2: {},
        age: "",
        gender: ""
    },
    formError: false
});

export default state;
