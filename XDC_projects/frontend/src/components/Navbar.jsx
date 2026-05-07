import {
  useSelector
} from "react-redux";

import WalletButton from
  "./WalletButton";

import {
  shortAddress
} from "../utils/format";


const Navbar = () => {

  const { account } =
    useSelector(
      state => state.wallet
    );

  return (

    <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-700">

      <h1 className="text-xl font-bold">
        XDC Payment App
      </h1>

      {
        account
          ? (
            <div>
              {shortAddress(account)}
            </div>
          )
          : <WalletButton />
      }

    </div>
  );
};

export default Navbar;