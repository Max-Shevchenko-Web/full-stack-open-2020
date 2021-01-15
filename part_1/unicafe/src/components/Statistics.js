import React from 'react'
import Statistic from './Statistic';
import NoStatistics from './NoStatistics';

const Statistics = ({ statistics  }) => {
  if (!statistics) {
    return <NoStatistics />
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value ={statistics.good} />
        <Statistic text="neutral" value={statistics.neutral} />
        <Statistic text="bad" value ={statistics.bad} />
        <Statistic text="average" value ={statistics.average } />
        <Statistic text="positive" value ={statistics.positive } />
      </tbody>
    </table>
  )
}

export default Statistics
