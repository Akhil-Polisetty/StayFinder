"use client";
import React, { useState } from "react";
import Image from "next/image";

const ImageUploader = ({ onImageUpload }) => {
  const [images, setImages] = useState([]); // State to hold selected images

  const convertToBase64AndCompress = (e, maxSizeKB) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = document.createElement("img");

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          let quality = 1.0;
          let newDataUrl = "";

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          newDataUrl = canvas.toDataURL("image/jpeg", quality);

          let targetSizeKB = newDataUrl.length / 1024;

          while (targetSizeKB > maxSizeKB && quality > 0.1) {
            quality -= 0.1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            newDataUrl = canvas.toDataURL("image/jpeg", quality);
            targetSizeKB = newDataUrl.length / 1024;
          }

          newImages.push(newDataUrl);

          if (newImages.length === files.length) {
            setImages(newImages);
            onImageUpload(newImages); // Pass the images back to parent
          }
        };

        if (reader.result) {
          img.src = reader.result;
        }
      };

      reader.readAsDataURL(file);

      reader.onerror = (err) => {
        console.error("Error reading file:", err);
      };
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Upload Images</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => convertToBase64AndCompress(e, 200)}
        className="border p-2"
      />
      <div>
        {images.length > 0 &&
          images.map((img, idx) => (
            <Image key={idx} src={img} alt={`Uploaded Preview ${idx}`} height="150" width="150" />
          ))}
      </div>
    </div>
  );
};

export default ImageUploader;
