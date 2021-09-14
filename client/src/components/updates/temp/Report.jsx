import { ReportContainer, Icons } from './styles';

import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['green', 'Blue', 'red', 'gray'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5],
      weight: 2,
      backgroundColor: ['#00B87C', '#2F80ED', '#F44336', '#e0e0e0'],
      borderColor: ['#00B87C', '#2F80ED', '#F44336', '#e0e0e0'],
    },
  ],
};

const options = {
  plugins: {
    cutoutPercentage: 70,
    title: {
      display: true,
      text: 'Custom Chart Title',
    },
    legend: {
      display: true,
      labels: {},
    },
  },
};

const Report = () => {
  return (
    <ReportContainer className="report_section">
      <div className="header">
        <div className="folder">
          <h4 className="folder_text">FOLDER:</h4>
          <button type="button" className="folder_btn">
            All Goals <Icons />
          </button>
        </div>
        <div className="export">
          <h5 className="export_text">ExportReport</h5>
        </div>
      </div>

      <div className="piechart">
        <Doughnut options={options} data={data} />
      </div>
    </ReportContainer>
  );
};

export default Report;
