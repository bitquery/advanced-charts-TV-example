import axios from "axios";
import * as Bitquery from "./components/callBitquery";
const BITQUERY_API = "your key";

export const getBars = async (
  symbolInfo,
  resolution,
  periodParams, //compulsorily needed
  onHistoryCallback,
  onErrorCallback
) => {
  try {
    const fromTime = new Date(periodParams.from * 1000).toISOString();
    const toTime = new Date(periodParams.to * 1000).toISOString();

    const requiredBars = 300;

    const bars = new Array(periodParams.countBack + 1);
    let time = new Date(periodParams.to * 1000);
    time.setUTCHours(0);
    time.setUTCMinutes(0);
    time.setUTCMilliseconds(0);

    const response = await axios.post(
      Bitquery.endpoint,
      {
        query: Bitquery.TOKEN_DETAILS,
        mode: "cors",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": BITQUERY_API,
        },
      }
    );

    console.log("response ", response);
    for (let i = 302; i > -1; i--) {
      const data = response.data.data.EVM.DEXTradeByTokens[i];

      if (data) {
        const open = Number(data.Trade.open.toFixed(18));
        const close = Number(data.Trade.close.toFixed(18));
        let high = Number(data.Trade.high.toFixed(18));
        let low = Number(data.Trade.low.toFixed(18));
        const resdate = new Date(data.Block.Time);

        bars[i] = {
          time: resdate,
          open: open,
          high: high,
          low: low,
          close: close,
          volume: data.Trade.volume,
        };
      } else {
        bars[i] = {
          time: time.getTime(),

          open: 0,
          high: 0,
          low: 0,
          close: 0,
          volume: 0,
        };
      }

      time.setUTCDate(time.getUTCDate() - 1);
    }

    if (bars.length === 0) {
      onHistoryCallback([], { noData: true });
    } else {
      onHistoryCallback(bars, { noData: false });
    }
  } catch (err) {
    console.error(err);
    onErrorCallback(err);
  }
};

export const subscribeBars = (
  symbolInfo,
  resolution,
  onRealtimeCallback,
  subscriberUID,
  onResetCacheNeededCallback
) => {
  
  // Implement your subscription logic here
};

export const unsubscribeBars = (subscriberUID) => {
 
  // Implement your unsubscription logic here
};
