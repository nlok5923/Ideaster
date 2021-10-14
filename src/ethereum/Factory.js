import web3 from "./web3";
import Manager from "./build/ideaFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x84B051400e305Eb0E4B67088F27302d3c4164b4A"
);

export default instance;
