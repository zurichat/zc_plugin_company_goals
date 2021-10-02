import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { useState, useEffect } from 'react';
import { ReportContainer, Icons, Label } from './styles';
import ExportReport from '../Modal/ExportModal/ExportReport';
import { selectPieChart } from '../../redux/pieChartSlice';
import { useSelector } from 'react-redux';
import { set } from 'date-fns';

// totalGoals, isComplete, isExpired, inProgress;

const Report = () => {
  const pieChartData = useSelector(selectPieChart);

  const [count, setCount] = useState('Kehinde');
  const [dotChange, setDotChange] = useState('Expired');

  const data = {
    labels: ['Completed', 'In progress', 'Expired', 'Goals'],
    datasets: [
      {
        // circumference:180,
        label: '# of Votes',
        data: [],
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
    radius: '75%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: [],
      },
    },
  };
  const setChartPercentage = (dataMark, label) => {
    const piePercentage =
      (dataMark /
        (pieChartData.totalGoals + pieChartData.isComplete + pieChartData.isExpired + pieChartData.inProgress)) *
      100;

    setCount({ countlabel: label, countPercentage: Math.round(piePercentage) });
  };

  useEffect(() => {
    if (pieChartData) {
      setChartPercentage(pieChartData['isExpired'], 'Expired');
    }
  },[pieChartData]);

 const setCountLabel = (key, status) => {
   setDotChange(status);
   setChartPercentage(pieChartData[key], status);
 };

  const clickArea = (event) => {
    switch (event[0].index) {
      case 0:
        setCountLabel('isComplete', 'Completed');
        break;
      case 1:
        setCountLabel('inProgress', 'In Progress');
        break;
      case 2:
        setCountLabel('isExpired', 'Expired');
        break;
      default:
        setCountLabel('totalGoals', 'Total Goals');
    }
  };


  if (!pieChartData) return null;

   data.datasets[0].data = [
     pieChartData['isComplete'],
     pieChartData['inProgress'],
     pieChartData['isExpired'],
     pieChartData['totalGoals'],
   ];

  return (
    <ReportContainer className="report_section" dotChange={dotChange}>
      <div className="header">
        <div className="folder">
          <h4 className="folder_text">FOLDER:</h4>
          <button type="button" className="folder_btn">
            All Goals <Icons />
          </button>
        </div>
        <div className="export">
          <ExportReport />
        </div>
      </div>

      <div className="piechart">
        <Doughnut options={options} data={data} getElementAtEvent={clickArea} />
        <div className="percentage">
          <h1 className="count">{`${count.countPercentage}%`}</h1>
          <p className="status">{count.countlabel}</p>
          <div className="dot_pagination">
            <div
              onClick={() => setCountLabel('isExpired', 'Expired')}
              className={`dots ${dotChange == 'Expired' && 'yellow'}`}
            ></div>
            <div
              onClick={() => setCountLabel('isComplete', 'Completed')}
              className={`dots ${dotChange == 'Completed' && 'yellow'}`}
            ></div>
            <div
              onClick={() => setCountLabel('inProgress', 'In Progress')}
              className={`dots ${dotChange == 'In Progress' && 'yellow'}`}
            ></div>
            <div
              onClick={() => setCountLabel('totalGoals', 'Total Goals')}
              className={`dots ${dotChange == 'Total Goals' && 'yellow'}`}
            ></div>
          </div>
        </div>
      </div>
      <div className="labels_container">
        <div className="labels">
          <div className="indexs">
            <div className="each red">
              <Label className="red" bgc="#EBEBEB"></Label>
             
              <p>{pieChartData['totalGoals']} Goals</p>
            </div>
            <div className="each green">
              <Label className="red" bgc="#F44336"></Label>
              <p>{pieChartData['inProgress']} in progress</p>
            </div>
          </div>
          <div className="indexs">
            <div className="each gray">
              <Label className="red" bgc="#2F80ED"></Label>
              <p>{pieChartData['isExpired']} Expired</p>
            </div>
            <div className="each blue">
              <Label className="red" bgc="#00B87C"></Label>
              <p>{ pieChartData['isComplete']} Completed</p>
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
