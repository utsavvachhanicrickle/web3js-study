import {
  useSelector
} from "react-redux";


const ReceiptCard = () => {

  const { currentReceipt } =
    useSelector(
      state => state.payment
    );

  if (!currentReceipt) {

    return null;
  }

  return (

    <div className="bg-slate-800 p-6 rounded mt-6">

      <h2 className="text-lg font-bold mb-4">
        Transaction Receipt
      </h2>

      <p>
        Hash:
        {currentReceipt.txHash}
      </p>

      <p>
        Gas Fee:
        {currentReceipt.gasFee}
      </p>

      <p>
        Status:
        {currentReceipt.status}
      </p>

      <p>
        Block:
        {currentReceipt.blockNumber}
      </p>

    </div>
  );
};

export default ReceiptCard;