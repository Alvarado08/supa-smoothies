import { useParams, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

import LoadingIndicator from "../components/LoadingIndicator";

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating || +rating > 5 || +rating < 1) {
      setFormError("Please fill in all fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update({ title, method, rating })
      .eq("id", id)
      .select();

    if (error) {
      setFormError("Could not update the smoothie");
    }

    if (data) {
      setFormError(null);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        // replace current url with home page
        navigate("/", { replace: true });
      }

      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        setIsLoading(false);
      }
    };

    fetchSmoothies();
  }, [id, navigate]);
  if (isLoading) {
    return (
      <div className="p-8">
        <LoadingIndicator />
      </div>
    );
  }
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="text-xl text-gray-800 font-bold sm:text-3xl">
            Update smoothie
          </h2>

          {formError && <p className="text-red-500 mt-2">{formError}</p>}
        </div>

        <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 sm:mb-8">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Mango Blaster"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4 sm:mb-8">
              <label
                htmlFor="rating"
                className="block mb-2 text-sm font-medium"
              >
                Rating
              </label>
              <input
                type="number"
                id="rating"
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Rating (1-5)"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="method"
                className="block mb-2 text-sm font-medium"
              >
                Method
              </label>
              <div className="mt-1">
                <textarea
                  id="method"
                  name="method"
                  rows="3"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Leave your comment here..."
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="mt-6 grid">
              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
