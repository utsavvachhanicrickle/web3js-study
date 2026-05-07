import Navbar from
  "../components/Navbar";

import PaymentCard from
  "../components/PaymentCard";

import ReceiptCard from
  "../components/ReceiptCard";


const Home = () => {

  return (

    <div className="min-h-screen p-6">

      <Navbar />

      <PaymentCard />

      <ReceiptCard />

    </div>
  );
};

export default Home;