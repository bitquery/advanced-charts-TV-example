import axios from "axios";
import * as Bitquery from "./components/callBitquery";

export const getBars = async (
  symbolInfo,
  resolution,
  periodParams, //compulsorily needed
  onHistoryCallback,
  onErrorCallback
) => {
  try {
    console.log("getBars called");

    let bars_data = new Array(75);

    const response = await axios.post(
      Bitquery.endpoint,
      {
        query: Bitquery.TOKEN_DETAILS,
        mode: "cors",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer ory...u-CAEW8",
        },
      }
    );

    for (let i = 0; i < 75; i++) {
      const respdata = response.data.data.EVM.DEXTradeByTokens[i];
      console.log(">>33");
      if (respdata && respdata.Trade && respdata.Block && respdata.Block.testfield) {
        const open = Number(respdata.Trade.open.toFixed(18));
        const close = Number(respdata.Trade.close.toFixed(18));
        let high = Number(respdata.Trade.high.toFixed(18));
        let low = Number(respdata.Trade.low.toFixed(18));
        let resdate = new Date(respdata.Block.testfield);
        let utcdate = resdate.getTime();

        bars_data.push({ // Push data as an object to the array
          time: utcdate * 1000,
          low: low,
          high: high,
          open: open,
          close: close,
        });
      }
    }
    console.log(">>51", bars_data);

    if (bars_data) {
      console.log(">>53");
      onHistoryCallback(bars_data, { noData: false });
      
    } else {
      onHistoryCallback([], { noData: true });
    }
  } catch (err) {
    console.log(err);
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
