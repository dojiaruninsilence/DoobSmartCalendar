// flags for event repeats
export const REPEAT_FREQUENCY = {
    NONE: 0,
    DAILY: 1 << 0, //1
    EVERY_OTHER_DAY: 1 << 1, //2
    WEEKLY: 1 << 2, //4
    BI_WEEKLY: 1 << 3, //8
    MONTHLY: 1 << 4, //16
    BI_MONTHLY: 1 << 5, //32
    QUARTERLY: 1 << 6, //64
    SEMI_ANNUAL: 1 << 7, //128
    ANNUAL: 1 << 8, //256
    BI_ANNUAL: 1 << 9, //512
    SPECIFIC_DAYS: 1 << 10 //1024
};

export const REPEAT_DURATION = {
    FOREVER: 1 << 11, //2048
    UNTIL: 1 << 12, //4096
    TIMES: 1 << 13 // 8192
};

export const REPEAT_TIME = {
    SET_TIME: 1 << 14, // 16384
    TIME_RANGE: 1 << 15, // 32768
    ANY_TIME: 1 << 16 // 65536
};

export const REPEAT_DAYS = {
    NONE: 0,
    SUNDAY: 1 << 17, // 131072
    MONDAY: 1 << 18, // 262144
    TUESDAY: 1 << 19, // 524288
    WEDNESDAY: 1 << 20, // 1048576
    THURSDAY: 1 << 21, // 2097152
    FRIDAY: 1 << 22, // 4194304
    SATURDAY: 1 << 22, // 8388608
};