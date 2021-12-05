import web3 from "./web3";
import Manager from "./build/ideaFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x978305105F21Cba46BD8B7Ab8C112E21e841F148"
);

export default instance;
