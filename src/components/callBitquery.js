export const endpoint = "https://streaming.bitquery.io/graphql";

//for subscription version of the query use:
// subscription{
//   EVM{

//   }
// }

export const TOKEN_DETAILS = `
{
  EVM(network: eth, dataset: archive) {
    DEXTradeByTokens(
      orderBy: {ascendingByField: "Block_testfield"}
      where: {Trade: {Currency: {SmartContract: {is: "0xdac17f958d2ee523a2206206994597c13d831ec7"}}, Side: {Currency: {SmartContract: {is: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}}}}
      Block:{Time:{since:"2023-11-05T00:00:40Z", till:"2024-01-18T00:00:00Z"}}
      }
       
      limit: {count: 1000}
     
    ) {

      Block {
        testfield: Time(interval: {in: days, count: 1})
      }
      volume: sum(of: Trade_Amount)
      Trade {
        high: Price(maximum: Trade_Price)
        low: Price(minimum: Trade_Price)
        open: Price(minimum: Block_Number)
        close: Price(maximum: Block_Number)
      }
      count
    }
  }
}



  `;
