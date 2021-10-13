import { useState, useEffect, createContext } from "react";
import web3 from "../ethereum/web3";
import { getParticularUserProfile } from "../Services/profileServices";

export const UserContext = createContext({
  info: {
    userAddress: "",
    age: 0,
    city: "",
    country: "",
    gender: "",
    profession: "",
    terms: [],
    state: "",
  },
});

const UserProvider = (props) => {
  const [info, setInfo] = useState({ user: null });
  useEffect(async () => {
    const accounts = await web3.eth.getAccounts();
    const userData = await getParticularUserProfile(accounts[0]);
    setInfo({
      userAddress: accounts[0],
      age: userData.age,
      city: userData.city,
      country: userData.country,
      gender: userData.gender,
      profession: userData.profession,
      terms: userData.terms,
      state: userData.state,
    });
  }, []);
  return (
    // eslint-disable-next-line react/prop-types
    <UserContext.Provider value={info}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
