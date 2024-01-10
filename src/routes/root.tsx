import { useContext } from "react";
import { UserContext } from "../auth";

//components
import { SignUpModal } from "../components/Modals";

function Root() {
  const { user } = useContext(UserContext);
  return (
    <div className="w-full h-lvh bg-gradient-to-tr from-slate-900 to-slate-800">
      {user ? (
        <p>signed in</p>
      ) : (
        <SignUpModal/>
      )}
    </div>
  );
}

export default Root;
