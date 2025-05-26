import useAuthStore from "./store/useAuthStore";
import { jwtDecode } from "jwt-decode";
import Login from "./components/Login";
import Socket from "./components/Socket";

import { handleLogout } from "./utils/auth";

if (localStorage.getItem("TEMPTOKEN") === null) {
  console.log("For testing ", {
    "usernmae:": "parry",
    password: "parry123",
  });
}

const App = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <div className="min-h-screen bg-neutral-900 p-4 text-neutral-200 font-mono text-2xl flex flex-col gap-4">
      <div className="max-w-3xl w-full p-5 border border-neutral-600  mx-auto my-2">
        
        {/* Heading || LOGIN */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col justify-center mx-auto gap-4">
            <h1 className="text-4xl truncate text-neutral-600 font-extrabold ">Testing chat app</h1>
            {token ? "MONO CHAT TESTING APP" : <Login />}
          </div>
          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-500/90 text-white/90 px-3 py-1 cursor-pointer  active:bg-red-300"
            >
              Logout
            </button>
          )}
        </div>

        {/* MAIN BODY  */}
        {token && (
          <>
            <div className="text-green-400 py-8">
              Token info: {JSON.stringify(jwtDecode(token), null, 2)}
            </div>
            <Socket />
          </>
        )}
      </div>
    </div>
  );
};

export default App;


