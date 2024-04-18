async function fetchCandlestickData(symbol, interval, limit) {
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.map((kline) => ({
      time: kline[0] / 1000,
      open: parseFloat(kline[1]),
      high: parseFloat(kline[2]),
      low: parseFloat(kline[3]),
      close: parseFloat(kline[4]),
    }));
  } catch (error) {
    console.error("Error fetching candlestick data:", error);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const chartContainer = document.getElementById("container");
  const chart = LightweightCharts.createChart(chartContainer, {
    layout: {
      backgroundColor: "#222",
      textColor: "#DDD",
    },
    grid: {
      vertLines: {
        color: "#444",
      },
      horzLines: {
        color: "#444",
      },
    },
    width: 1000,
    height: 500,
  });

  const mainSeries = chart.addCandlestickSeries({
    wickUpColor: "rgb(54, 116, 217)",
    upColor: "rgb(54, 116, 217)",
    wickDownColor: "rgb(225, 50, 85)",
    downColor: "rgb(225, 50, 85)",
    borderVisible: false,
  });

  const areaSeries = chart.addAreaSeries({
    lastValueVisible: false,
    crosshairMarkerVisible: false,
    lineColor: "transparent",
    topColor: "rgba(56, 33, 110,0.6)",
    bottomColor: "rgba(56, 33, 110, 0.1)",
  });

  chart.applyOptions({
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
      vertLine: {
        color: "#C3BCDB44",
        width: 1,
        style: 0,
        visible: true,
        labelVisible: true,
      },
      horzLine: {
        color: "#C3BCDB44",
        width: 1,
        style: 0,
        visible: true,
        labelVisible: true,
      },
    },
  });

  let symbols = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT"];
  let currentIndex = 0;

  async function switchChart() {
    const symbol = symbols[currentIndex];
    document.getElementById("chartLabel").innerText = symbol.replace(
      "USDT",
      "/USDT"
    );
    const candleStickData = await fetchCandlestickData(symbol, "1h", 100);
    mainSeries.setData(candleStickData);

    const lineData = candleStickData.map((datapoint) => ({
      time: datapoint.time,
      value: (datapoint.close + datapoint.open) / 2,
    }));
    areaSeries.setData(lineData);
  }

  document.getElementById("nextChart").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % symbols.length;
    switchChart();
  });

  document.getElementById("prevChart").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + symbols.length) % symbols.length;
    switchChart();
  });

  // Inicializar con BTC
  switchChart();
});
