import { Link } from "react-router-dom";
import service from "../appwrite/config.service";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {featuredImage ? (
            <img
              src={console.log(service.getFilePreview(featuredImage))}
              alt={title}
              className="rounded-xl"
            />
          ) : (
            <div className="h-40 bg-gray-300 rounded-xl flex items-center justify-center">
              <span>No image</span>
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
