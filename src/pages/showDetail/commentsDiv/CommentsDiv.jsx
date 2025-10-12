import { FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";

const CommentsDiv = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <section className="pb-10">
      <h2 className="flex items-center gap-2 my-6 text-2xl font-bold">
        <FaComment className="w-8 h-8 text-[#3590F3]" />
        Comments Now
      </h2>
      <div className="w-full mx-auto border border-white rounded-md md:w-11/12 h-96">
        {isLoggedIn ? (
          <div className="h-96">You are not logIn to see the Comments</div>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
};

export default CommentsDiv;
