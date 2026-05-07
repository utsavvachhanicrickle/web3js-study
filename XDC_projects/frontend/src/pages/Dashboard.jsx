import {
  useEffect
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import api from "../api/axios";

import socket from "../services/socket";

import {
  setTransactions,
  addTransaction
} from "../features/payment/paymentSlice";



const Dashboard = () => {

  const dispatch = useDispatch();

  const { transactions } =
    useSelector(
      state => state.payment
    );



  const fetchTransactions = async () => {

    try {

      const response =
        await api.get(
          "/payments"
        );

      dispatch(
        setTransactions(
          response.data.transactions
        )
      );

    } catch (error) {

      console.log(
        error.message
      );
    }
  };



  useEffect(() => {

    fetchTransactions();

    // realtime socket listener
    socket.on(
      "payment-success",
      (data) => {

        console.log(
          "Realtime Payment:",
          data
        );

        dispatch(
          addTransaction(data)
        );
      }
    );

    return () => {

      socket.off(
        "payment-success"
      );
    };

  }, []);




  return (

    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* header */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-slate-400 mt-1">
            Realtime Blockchain Payments
          </p>

        </div>

      </div>



      {/* stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* total tx */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">

          <h2 className="text-slate-400 text-sm">
            Total Transactions
          </h2>

          <p className="text-3xl font-bold mt-3">
            {transactions.length}
          </p>

        </div>


        {/* success tx */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">

          <h2 className="text-slate-400 text-sm">
            Successful Payments
          </h2>

          <p className="text-3xl font-bold mt-3 text-green-400">

            {
              transactions.filter(
                tx =>
                  tx.status === "success"
              ).length
            }

          </p>

        </div>


        {/* gas */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">

          <h2 className="text-slate-400 text-sm">
            Total Gas Fees
          </h2>

          <p className="text-2xl font-bold mt-3 text-yellow-400">

            {
              transactions.reduce(

                (acc, tx) =>
                  acc +
                  Number(tx.gasFee || 0),

                0
              )
            }

          </p>

        </div>

      </div>




      {/* transaction table */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">

        <div className="p-5 border-b border-slate-800">

          <h2 className="text-xl font-bold">
            Recent Transactions
          </h2>

        </div>



        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="text-left p-4">
                  Hash
                </th>

                <th className="text-left p-4">
                  Wallet
                </th>

                <th className="text-left p-4">
                  Amount
                </th>

                <th className="text-left p-4">
                  Gas Fee
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Block
                </th>

              </tr>

            </thead>



            <tbody>

              {
                transactions.map((tx) => (

                  <tr
                    key={tx._id}
                    className="border-b border-slate-800 hover:bg-slate-800/40"
                  >

                    {/* hash */}
                    <td className="p-4 text-sm">

                      {tx.txHash?.slice(0, 12)}...

                    </td>


                    {/* wallet */}
                    <td className="p-4 text-sm">

                      {tx.walletAddress?.slice(0, 10)}...

                    </td>


                    {/* amount */}
                    <td className="p-4">

                      {tx.amount}

                    </td>


                    {/* gas */}
                    <td className="p-4 text-yellow-400">

                      {tx.gasFee}

                    </td>


                    {/* status */}
                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold

                        ${
                          tx.status === "success"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }
                      `}
                      >

                        {tx.status}

                      </span>

                    </td>


                    {/* block */}
                    <td className="p-4">

                      {tx.blockNumber}

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;