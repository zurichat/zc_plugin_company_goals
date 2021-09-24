import { Doughnut } from 'react-chartjs-2';
import { ReportContainer, Icons, Label } from './styles';

const data = {
  labels: ['green', 'Blue', 'red', 'gray'],
  datasets: [
    {
      // circumference:180,
      label: '# of Votes',
      data: [12, 19, 3, 5],
      weight: 2,
      // offset: 40,
      borderAlign: 'inner',
   
      backgroundColor: ['#00B87C', '#2F80ED', '#F44336', '#e0e0e0'],
      borderColor: ['#00B87C', '#2F80ED', '#F44336', '#e0e0e0'],
    },
  ],
};

const options = {
  cutout: '80%',
  radius: "75%",
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    title: {
      display: false,
     
    },
    legend: {
      display: false,
      position: 'bottom',
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
        <div className="percentage">
          <h2 className="count">10%</h2>
          <p className="status">Expired</p>
        </div>
      </div>
      <div className="labels_container">
        <div className="labels">
          <div className="indexs">
            <div className="each red">
              <Label className="red" bgc="#EBEBEB"></Label>
              <p>60 Goals</p>
            </div>
            <div className="each green">
              <Label className="red" bgc="#F44336"></Label>
              <p>60 in progress</p>
            </div>
          </div>
          <div className="indexs">
            <div className="each gray">
              <Label className="red" bgc="#2F80ED"></Label>
              <p>60 Expired</p>
            </div>
            <div className="each blue">
              <Label className="red" bgc="#00B87C"></Label>
              <p>60 Completed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="averge">
        <h1 className="text">Average Progress Rate</h1>
        <div className="progrress">
        <div className="bar"></div>
        </div>
        <h3 className="prcent">Progress Rate 73%</h3>
      </div>
    </ReportContainer>
  );
};

export default Report;
