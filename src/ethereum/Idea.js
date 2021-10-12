import web3 from "./web3";
import Idea from "./build/idea.json";

export default (address) => {
  return new web3.eth.Contract(JSON.parse(Idea.interface), address);
};
