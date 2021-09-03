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
        label="Date picker dialog"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        fullWidth
        style={{
          fontFamily: 'Lato',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '16px',
          marginTop: '2rem',
          border: 'none',
          outline: 'none',
          color: '#999999',
          borderBottom: '0.5px solid #00b87c',
          width: '100%',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
