import { useState, useEffect } from "react";

import LoadingIndicator from "../components/LoadingIndicator";

import supabase from "../config/supabaseClient";

import Card from "../components/Card";
import OrderBadge from "../components/OrderBadge";

export default function Home() {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDeleteUpdate = async (id) => {
    setSmoothies(smoothies.filter((smoothie) => smoothie.id !== id));
  };

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false });
      if (error) {
        setFetchError("Could not fetch the smoothies");
        setSmoothies(null);
        setIsLoading(false);
        console.log(error);
      } else {
        setSmoothies(data);
        setFetchError(null);
        setIsLoading(false);
      }
    };

    fetchSmoothies();
  }, [orderBy]);

  if (isLoading) {
    return (
      <div className="p-8">
        <LoadingIndicator />
      </div>
    );
  }

  if (fetchError) {
    return <p className="p-8 text-red-500">{fetchError}</p>;
  }

  return (
    <>
      <article className="flex items-center gap-3 p-8">
        <OrderBadge
          name={"Latest"}
          orderSlug={"created_at"}
          isSelected={orderBy === "created_at"}
          onClick={() => setOrderBy("created_at")}
        />
        <OrderBadge
          name={"Title"}
          orderSlug={"title"}
          isSelected={orderBy === "title"}
          onClick={() => setOrderBy("title")}
        />
        <OrderBadge
          name={"Rating"}
          orderSlug={"rating"}
          isSelected={orderBy === "rating"}
          onClick={() => setOrderBy("rating")}
        />
      </article>
      {smoothies && smoothies.length === 0 && (
        <p className="p-8">No smoothies yet...</p>
      )}
      {smoothies && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {smoothies.map((smoothie) => (
            <Card
              key={smoothie.id}
              smoothie={smoothie}
              handleDeleteUpdate={handleDeleteUpdate}
            />
          ))}
        </div>
      )}
    </>
  );
}
