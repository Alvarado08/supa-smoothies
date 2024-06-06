import { Link } from "react-router-dom";

import supabase from "../config/supabaseClient";

import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";

export default function Card({ smoothie, handleDeleteUpdate }) {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      handleDeleteUpdate(smoothie.id);
    }
  };
  return (
    <div className="shadow rounded p-4 relative">
      <h1 className="text-2xl mb-2 font-bold">{smoothie.title}</h1>
      <p>{smoothie.method}</p>
      <span className="absolute -top-4 -right-2 text-white bg-purple-500 p-2 rounded text-sm size-10 text-center">
        {smoothie.rating}
      </span>
      <div className="flex items-center justify-end gap-3">
        <Link to={`/${smoothie.id}`}>
          <EditIcon />
        </Link>
        <DeleteIcon onClick={handleDelete} />
      </div>
    </div>
  );
}
