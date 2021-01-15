import React from 'react'
import Statistic from './Statistic';
import NoStatistics from './NoStatistics';

const Statistics = ({ statistics  }) => {
  if (!statistics) {
    return <NoStatistics />
  }

  console.log(statistics)

  return (
    <div>
      <Statistic text="good:" value ={statistics.good} />
      <Statistic text="neutral:" value={statistics.neutral} />
      <Statistic text="bad:" value ={statistics.bad} />
      <Statistic text="average :" value ={statistics.average } />
      <Statistic text="positive :" value ={statistics.positive } />
    </div>
  )
}

export default Statistics
