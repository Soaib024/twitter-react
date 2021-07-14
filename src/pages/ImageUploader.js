import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { uploads } from "./../api/uploads";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const ImageUploader = ({ type, onClose}) => {
  const [image, setImage] = useState(null);
  const [cropper, setCropper] = useState();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const postImage = (e) => {
    e.preventDefault();
    if (typeof cropper != "undefined") {
      cropper.getCroppedCanvas().toBlob(function (blob) {
        const formData = new FormData();
        formData.append("image", blob);
        uploads(formData, type);
      });
      window.location.reload(true)
    }
    
    
    
  };

  return (
    <div className="p-2">
      <div className="flex w-full justify-between">
        <input type="file" accept=".png, .jpg, .jpeg" onChange={onChange} />
        <div onClick={onClose}>
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </div>
      </div>
      <Cropper
        style={{ height: 400, width: "100%" }}
        zoomTo={0.5}
        initialAspectRatio={type=== "profile" ? 1 : 21/9}
        aspectRatio={type=== "profile" ? 1 : 21/9}
        src={image}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        minCanvasHeight={128}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
        onInitialized={(instance) => {
          setCropper(instance);
        }}
        guides={true}
      />
      <div className="flex justify-center">
        <button
          onClick={postImage}
          className="border p-2 rounded-lg hover:border-twitter_blue"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
