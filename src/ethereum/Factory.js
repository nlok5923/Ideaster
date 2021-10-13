import web3 from "./web3";
import Manager from "./build/ideaFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x26588d64eC08c8937f8A27b924Da48A0Bcb2FB02"
);

export default instance;
