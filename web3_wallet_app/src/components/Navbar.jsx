import ThemeToggle from "./ThemeToggle";

const Navbar = ({ account }) => {
  return (
    <div className="bg-[rgb(var(--card))] border-b border-[rgb(var(--border))] p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Web3 Dashboard</h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <p className="text-sm">
          {account
            ? account.slice(0, 6) + "..." + account.slice(-4)
            : "Not Connected"}
        </p>
      </div>
    </div>
  );
};

export default Navbar;
