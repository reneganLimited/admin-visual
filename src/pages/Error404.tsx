import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export const Error404 = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg-black w-full border py-2"></nav>
      <main className="text-center flex justify-center h-[80vh] items-center text-[13px] ">
        <div>
          <h3 className="font-bold text-[20px]">Sorry! Page not found</h3>
          <p className="py-4">
            The page you are looking for does not exist or has been removed
          </p>
          <Link to={"/"}>
            <Button
              text="Go Home"
              style={" font-semibold py-2 px-9 bg-[#FFBD59] rounded-lg"}
              handleClick={() => {
                navigate("/");
              }}
            />
          </Link>
        </div>
      </main>
    </>
  );
};
