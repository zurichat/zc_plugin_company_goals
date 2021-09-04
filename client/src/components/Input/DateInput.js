import 'date-fns';
import React from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export default function DateInput() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        format="MM/dd/yyyy"
        value={selectedDate}
        placeholder="End Date"
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        fullWidth
        style={{
          fontFamily: 'Lato',
          outline: 'none',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '16px',
          marginTop: '2rem',
          border: 'none',
          color: '#999999',
          width: '100%',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
