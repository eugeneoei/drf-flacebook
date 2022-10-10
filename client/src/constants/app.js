const LOCAL_STORAGE_TOKEN = "token";
const LOCAL_STORAGE_REFRESH_TOKEN = "refresh";
const COUNT_FORMATS = [
    {
        // 0 - 999
        letter: "",
        limit: 1e3
    },
    {
        // 1,000 - 999,999
        letter: "K",
        limit: 1e6
    },
    {
        // 1,000,000 - 999,999,999
        letter: "M",
        limit: 1e9
    },
    {
        // 1,000,000,000 - 999,999,999,999
        letter: "B",
        limit: 1e12
    },
    {
        // 1,000,000,000,000 - 999,999,999,999,999
        letter: "T",
        limit: 1e15
    }
];

export { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_REFRESH_TOKEN, COUNT_FORMATS };
