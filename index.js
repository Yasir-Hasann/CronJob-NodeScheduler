// module imports
require('dotenv').config();
const cors = require('cors');
const express = require('express');

// file imports
const NodeScheduler = require('./utils/node-scheduler');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const firstFunction = () => console.log('1st Function');
const secondFunction = () => console.log('2nd Function');
const thirdFunction = () => console.log('3rd Function');

try {
  const nodeSchedulerObj = new NodeScheduler();
  nodeSchedulerObj.schedule({ date: new Date('2024-05-10T04:50:00'), func: firstFunction });
  nodeSchedulerObj.schedule({ rule: '*/2 * * * *', func: secondFunction });

  const rule = {
    dayOfWeek: [0, 1, 2, 3, 4, 5, 6],
    hour: 17,
    minute: 15,
    // tz: 'Etc/UTC'
    tz: 'Asia/Karachi'
  };
  nodeSchedulerObj.schedule({ rule: rule, func: thirdFunction });
} catch (error) {
  console.error(error);
}

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port: ${process.env.PORT || 5001}`);
});

console.log(process.env.NODE_ENV.toUpperCase());