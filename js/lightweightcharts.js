async function fetchCandlestickData(symbol, interval, limit) {
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.map((kline) => ({
      time: kline[0] / 1000, // Convert timestamp from milliseconds to seconds
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
  const chart = LightweightCharts.createChart(
    document.getElementById("container"),
    {
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
      width: 800,
      height: 300,
    }
  );

  const candleStickData = await fetchCandlestickData("BTCUSDT", "1h", 100);
  const mainSeries = chart.addCandlestickSeries({
    wickUpColor: "rgb(54, 116, 217)",
    upColor: "rgb(54, 116, 217)",
    wickDownColor: "rgb(225, 50, 85)",
    downColor: "rgb(225, 50, 85)",
    borderVisible: false,
  });
  mainSeries.setData(candleStickData);

  const lineData = candleStickData.map((datapoint) => ({
    time: datapoint.time,
    value: (datapoint.close + datapoint.open) / 2,
  }));

  const areaSeries = chart.addAreaSeries({
    lastValueVisible: false,
    crosshairMarkerVisible: false,
    lineColor: "transparent",
    topColor: "rgba(56, 33, 110,0.6)",
    bottomColor: "rgba(56, 33, 110, 0.1)",
  });
  areaSeries.setData(lineData);

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

  window.addEventListener("resize", () => {
    chart.resize(window.innerWidth, window.innerHeight);
  });
});
