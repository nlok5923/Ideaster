import web3 from "./web3";
import Manager from "./build/ideaFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x69fD14735d923733766806A6D4df7a55B51cf3f7"
);

export default instance;
