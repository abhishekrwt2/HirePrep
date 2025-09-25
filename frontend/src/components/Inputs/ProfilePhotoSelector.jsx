import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const newPreview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(newPreview);
      }
      setPreviewUrl(newPreview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-28 h-28 rounded-full bg-gray-800 flex flex-col items-center justify-center text-gray-400">
          <LuUser className="w-12 h-12 mb-2" />
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-semibold"
            onClick={onChooseFile}
          >
            <LuUpload className="w-4 h-4" />
            Upload
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="profile pic"
            className="w-28 h-28 rounded-full object-cover border-2 border-orange-500"
          />
          <button
            type="button"
            className="absolute top-0 right-0 bg-black bg-opacity-60 p-2 rounded-full text-red-500 hover:text-red-600"
            onClick={handleRemoveImage}
          >
            <LuTrash className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
