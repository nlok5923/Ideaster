import web3 from "./web3";
import Manager from "./build/ideaFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x41BA73Bc4e50360C35A94C7fa521bb06AaF50b61"
);

export default instance;
