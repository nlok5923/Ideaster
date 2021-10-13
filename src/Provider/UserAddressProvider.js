import { useState, useEffect, createContext } from "react";
import web3 from "../ethereum/web3";

export const UserContext = createContext({
  info: { userAddress: "" },
});

const UserProvider = (props) => {
  const [info, setInfo] = useState({ user: null });
  useEffect(async () => {
    const accounts = await web3.eth.getAccounts();
    setInfo({ userAddress: accounts[0] });
  }, []);
  return (
    // eslint-disable-next-line react/prop-types
    <UserContext.Provider value={info}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
