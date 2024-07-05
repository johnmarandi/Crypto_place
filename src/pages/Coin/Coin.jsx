import React, { useContext, useEffect, useState } from 'react'
import '../Coin/Coin.css'
import '../../App'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/Coincontext'
import LineChart from '../../Components/LineChart/LineChart'


const Coin = (props) => {
  const {coinId} = useParams();
  const [coinData,setCoinData]=useState();
  const[HostoricalData,SetHistoricalData]=useState();
  const {currency}=useContext(CoinContext)


  const fetchcoinData =async()=> {
    const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
  .then(response => response.json())
  .then(response => setCoinData(response))
  .catch(err => console.error(err));

  }
  const fetchHistoricalData=async()=>{


    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => SetHistoricalData(response))
      .catch(err => console.error(err));
}





  useEffect(()=>{
    fetchcoinData();
    fetchHistoricalData();
  
  },[currency])

  if(coinData,HostoricalData){     
    return (
      <div className='coin'>
      <div className='coin-name'>
      <img src={coinData.image.large} alt=''/>
      <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
       </div>
       <div className='coin-chart'>
    <LineChart HostoricalData={HostoricalData}/>
       </div>
       <div className='coin-info'>
      <ul>
        <li>Crypto Market Rank</li>
        <li>{coinData.market_cap_rank}</li>
      </ul>
      <ul>
        <li>Crypto Market Rank</li>
        <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
      </ul>

      <ul>
        <li>Market Cap</li>
        <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour high</li>
        <li>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
        <li>24 Hour low</li>
        <li>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
      </ul>


       </div>
      </div>
    )
}else{
  return (
    <div className='spinner'>
      <div className='spin'></div>
    </div>
  )
}
  
}

export default Coin
