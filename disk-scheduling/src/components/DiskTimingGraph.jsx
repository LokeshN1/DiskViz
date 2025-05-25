import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DiskTimingGraph = ({ seekTimes }) => {
  const data = {
    labels: seekTimes.map((_, index) => `Operation ${index + 1}`),
    datasets: [
      {
        label: 'Seek Time (ms)',
        data: seekTimes,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Seek Time History'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        Max:4000,
        title: {
          display: true,
          text: 'Time (ms)'
        }
      }
    }
  };

  return (
    <div className="h-[500px] w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default DiskTimingGraph;