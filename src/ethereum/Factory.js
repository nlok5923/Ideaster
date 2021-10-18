import web3 from "./web3";
import Manager from "./build/ideaFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x5749FA936de1Bf61AB23220256A6f295F673cAA6"
);

export default instance;
