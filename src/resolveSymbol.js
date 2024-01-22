export const resolveSymbol = (
  symbolName,
  onSymbolResolvedCallback,
  onResolveErrorCallback,
  extension
) => {
  //get token symbol from query or hardcode it
  const tokenSymbol = "USDT";

  if (!tokenSymbol) {
    onResolveErrorCallback();
  } else {
    const symbolInfo = {
      ticker: tokenSymbol,
      name: `${tokenSymbol}/WETH`,
      session: "24x7",
      timezone: "Etc/UTC",
      minmov: 1,
      pricescale: 1000,
      has_intraday: true,
      intraday_multipliers: ["1", "5", "15", "30", "60"],
      has_empty_bars: false,
      has_weekly_and_monthly: false,
      supported_resolutions: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
      supported_intervals: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
      // volume_precision: 1,
      // data_status: "streaming",
      countBack: 30,
      volume_precision: 2,
      visible_plots_set: 'ohlcv',
    };
    onSymbolResolvedCallback(symbolInfo);
  }
};