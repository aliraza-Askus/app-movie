import { DeleteMethod } from "./PostApi";
const CardCrud = ({ ApiCardData, onDelete }) => {
const { id, title, body } = ApiCardData;
const DeleteonClick = async (id) => {
  try {
    const Deleteitem = await DeleteMethod(id);
    console.log(Deleteitem);
    if (Deleteitem.status === 200) {
     onDelete(id);
     console.log(`Deleted item is :${id}`);
    }
  } catch (error) {
  console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-5 m-4 border border-gray-200 h-[400px] flex flex-col">
      <span className="text-sm text-gray-500 block">ID: {id}</span>
      <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[60px]">
        {title.split(" ").slice(0, 9).join(" ")}{" "}
      </h2>
      <p className="text-gray-600 flex-1 overflow-y-auto p-4 border border-gray-200 rounded-md max-h-[150px]">
        {body}
      </p>
      <div className="flex space-x-4 mt-3 -mb-3 justify-center">
        <button className="bg-blue-500 text-white px-3 py-2 rounded-md">
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md"
          onClick={() => DeleteonClick(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardCrud;
