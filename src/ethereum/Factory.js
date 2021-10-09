import web3 from "./web3";
import Manager from "./build/Factory.json";

const instance = new web3.eth.Contract(
  JSON.parse(Manager.interface),
  "0x6Cb6E80F84b8D849c71696ED500fa165450D4A86"
);

export default instance;
