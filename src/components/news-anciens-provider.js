import * as React from 'react';

const DateProvider = React.createContext({
    month: 0,
    year: 2021
});

export default DateProvider;