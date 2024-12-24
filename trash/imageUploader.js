// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// const ImageUploader = () => {
//   const [image, setImage] = useState(null); // For holding the selected file
//   const [uploadStatus, setUploadStatus] = useState(""); // To show success or error messages
//   const [uploadedImage, setUploadedImage] = useState(null); // Display the uploaded image
//   const [allimages, setAllimages] = useState([])
//   const [loading,setLoading]=useState(false); //
//   useEffect(() => {
//     const fetchImages = async () => {
//       setLoading(true);
//       try {

//         const res = await fetch("/api/getimages", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await res.json();
//         console.log("succesfuly sent to client");
//         console.log(data)
//         setAllimages(data.data);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//       finally{
//         setLoading(false);
//       }

//     };
//     fetchImages();

//   },[uploadStatus])


//   const convertToBase64AndCompress = (e, maxSizeKB) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = () => {
//       const img = document.createElement("img"); // Create a native HTMLImageElement

//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         if (!ctx) {
//           console.error("Canvas context not available.");
//           return;
//         }

//         let quality = 1.0;
//         let newDataUrl = "";

//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.fillStyle = "white";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(img, 0, 0);
//         newDataUrl = canvas.toDataURL("image/jpeg", quality);

//         let targetSizeKB = newDataUrl.length / 1024;

//         while (targetSizeKB > maxSizeKB && quality > 0.1) {
//           quality -= 0.1;
//           ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
//           ctx.fillStyle = "white";
//           ctx.fillRect(0, 0, canvas.width, canvas.height);
//           ctx.drawImage(img, 0, 0);
//           newDataUrl = canvas.toDataURL("image/jpeg", quality);
//           targetSizeKB = newDataUrl.length / 1024;
//         }

//         setImage(newDataUrl); // Update the image preview
//       };

//       if (reader.result) {
//         img.src = reader.result; // Assign the base64 data URL to the native image's src
//       }
//     };

//     reader.readAsDataURL(file);

//     reader.onerror = (err) => {
//       console.error("Error reading file:", err);
//     };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       setUploadStatus("Please select an image to upload.");
//       return;
//     }



//     try {
//       const response = await fetch("/api/upload", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({image}),
//       });

//       if (!response.ok) {
//         const errorResponse = await response.text();
//         setUploadStatus(errorResponse || "Failed to upload image.");
//         return;
//       }

//       const result = await response.json(); 

//       if (response.ok) {
//         setUploadStatus("Image uploaded successfully!");
//         // setUploadedImage(URL.createObjectURL(image)); // Display the uploaded image
//         alert("Image uploaded successfully!");
//       }
//       // console.log("succesfull");
//     } catch (err) {
//       setUploadStatus("An error occurred while uploading the image.");
//       console.error("Upload error: ", err);
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-center gap-4 p-4">
//       <h2 className="text-2xl font-bold">Upload an Image</h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="file"
//           accept="image/*"
//           // onChange={handleFileChange}
//           onChange={(e) => convertToBase64AndCompress(e, 200)}
//           multiple={true}
//           className="border p-2"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded-md"
//         >
//           Upload
//         </button>
//       </form>
//         {
//           loading ? <div className="loader">
//             <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//             </svg>
//             <p>Loading...</p> </div>
//              :
//               allimages && allimages.map(image => 
//         <div key={image._id}>
//         <Image src={image.data} alt="Data source" height={150} width={150} />
//         </div>
//         )      
//         }



//     </div>
//   );
// };

// export default ImageUploader;



"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const ImageUploader = () => {
  const [images, setImages] = useState([]); // Array for holding the selected files
  const [uploadStatus, setUploadStatus] = useState(""); // To show success or error messages
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/getimages", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setAllImages(data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [uploadStatus]);

  // const convertToBase64AndCompress = (e, maxSizeKB) => {
  //   const files = e.target.files;
  //   if (!files) return;

  //   const newImages = [];

  //   Array.from(files).forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       const img = document.createElement("img");

  //       img.onload = () => {
  //         const canvas = document.createElement("canvas");
  //         const ctx = canvas.getContext("2d");

  //         if (!ctx) {
  //           console.error("Canvas context not available.");
  //           return;
  //         }

  //         let quality = 1.0;
  //         let newDataUrl = "";

  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         ctx.fillStyle = "white";
  //         ctx.fillRect(0, 0, canvas.width, canvas.height);
  //         ctx.drawImage(img, 0, 0);
  //         newDataUrl = canvas.toDataURL("image/jpeg", quality);

  //         let targetSizeKB = newDataUrl.length / 1024;

  //         while (targetSizeKB > maxSizeKB && quality > 0.1) {
  //           quality -= 0.1;
  //           ctx.clearRect(0, 0, canvas.width, canvas.height);
  //           ctx.fillStyle = "white";
  //           ctx.fillRect(0, 0, canvas.width, canvas.height);
  //           ctx.drawImage(img, 0, 0);
  //           newDataUrl = canvas.toDataURL("image/jpeg", quality);
  //           targetSizeKB = newDataUrl.length / 1024;
  //         }

  //         newImages.push(newDataUrl);
  //         setImages((prev) => [...prev, ...newImages]);
  //       };

  //       if (reader.result) {
  //         img.src = reader.result;
  //       }
  //     };

  //     reader.readAsDataURL(file);

  //     reader.onerror = (err) => {
  //       console.error("Error reading file:", err);
  //     };
  //   });
  // };

  const convertToBase64AndCompress = (e, maxSizeKB) => {
    const files = e.target.files;
    if (!files) return;
  
    const newImages = []; // Initialize newImages outside the loop
    
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const img = document.createElement("img");
  
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
  
          if (!ctx) {
            console.error("Canvas context not available.");
            return;
          }
  
          let quality = 1.0;
          let newDataUrl = "";
  
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          newDataUrl = canvas.toDataURL("image/jpeg", quality);
  
          let targetSizeKB = newDataUrl.length / 1024;
  
          // Reduce quality to fit within the size limit
          while (targetSizeKB > maxSizeKB && quality > 0.1) {
            quality -= 0.1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            newDataUrl = canvas.toDataURL("image/jpeg", quality);
            targetSizeKB = newDataUrl.length / 1024;
          }
  
          // Add the compressed image to the newImages array
          newImages.push(newDataUrl);
  
          // After all images are processed, update the state
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages]);
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
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!images.length) {
  //     setUploadStatus("Please select images to upload.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("/api/upload", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ images }),
  //     });

  //     if (!response.ok) {
  //       const errorResponse = await response.text();
  //       setUploadStatus(errorResponse || "Failed to upload images.");
  //       return;
  //     }

  //     const result = await response.json();

  //     if (response.ok) {
  //       setUploadStatus("Images uploaded successfully!");
  //       alert("Images uploaded successfully!");
  //     }
  //   } catch (err) {
  //     setUploadStatus("An error occurred while uploading the images.");
  //     console.error("Upload error: ", err);
  //   }
  // };

  // const convertToBase64AndCompress = (e, maxSizeKB) => {
  //   const files = e.target.files;
  //   if (!files) return;
  
  //   const newImages = [];
  
  //   Array.from(files).forEach((file) => {
  //     const reader = new FileReader();
  
  //     reader.onload = () => {
  //       const img = document.createElement("img");
  
  //       img.onload = () => {
  //         const canvas = document.createElement("canvas");
  //         const ctx = canvas.getContext("2d");
  
  //         if (!ctx) {
  //           console.error("Canvas context not available.");
  //           return;
  //         }
  
  //         let quality = 1.0;
  //         let newDataUrl = "";
  
  //         canvas.width = img.width;
  //         canvas.height = img.height;
  //         ctx.fillStyle = "white";
  //         ctx.fillRect(0, 0, canvas.width, canvas.height);
  //         ctx.drawImage(img, 0, 0);
  //         newDataUrl = canvas.toDataURL("image/jpeg", quality);
  
  //         let targetSizeKB = newDataUrl.length / 1024;
  
  //         while (targetSizeKB > maxSizeKB && quality > 0.1) {
  //           quality -= 0.1;
  //           ctx.clearRect(0, 0, canvas.width, canvas.height);
  //           ctx.fillStyle = "white";
  //           ctx.fillRect(0, 0, canvas.width, canvas.height);
  //           ctx.drawImage(img, 0, 0);
  //           newDataUrl = canvas.toDataURL("image/jpeg", quality);
  //           targetSizeKB = newDataUrl.length / 1024;
  //         }
  
  //         newImages.push(newDataUrl);
  //         setImages((prev) => [...prev, ...newImages]); // Make sure the images are in the correct format
  //       };
  
  //       if (reader.result) {
  //         img.src = reader.result;
  //       }
  //     };
  
  //     reader.readAsDataURL(file);
  
  //     reader.onerror = (err) => {
  //       console.error("Error reading file:", err);
  //     };
  //   });
  // };
  


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!images.length) {
  //     setUploadStatus("Please select images to upload.");
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch("/api/upload", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ images }), // Send all images in one request
  //     });
  
  //     if (!response.ok) {
  //       const errorResponse = await response.text();
  //       setUploadStatus(errorResponse || "Failed to upload images.");
  //       return;
  //     }
  
  //     const result = await response.json();
  
  //     if (response.ok) {
  //       setUploadStatus("Images uploaded successfully!");
  //       alert("Images uploaded successfully!");
  //     }
  //   } catch (err) {
  //     setUploadStatus("An error occurred while uploading the images.");
  //     console.error("Upload error: ", err);
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!images.length) {
      setUploadStatus("Please select images to upload.");
      return;
    }
  
    // Log images before sending
    console.log("Uploading images:", images);
  
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images }), // Send all images in one request
      });
  
      if (!response.ok) {
        const errorResponse = await response.text();
        setUploadStatus(errorResponse || "Failed to upload images.");
        return;
      }
  
      const result = await response.json();
  
      if (response.ok) {
        setUploadStatus("Images uploaded successfully!");
        alert("Images uploaded successfully!");
      }
    } catch (err) {
      setUploadStatus("An error occurred while uploading the images.");
      console.error("Upload error: ", err);
    }
  };
  

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Upload Images</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          multiple // Allow multiple file selection
          onChange={(e) => convertToBase64AndCompress(e, 200)}
          className="border p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Upload
        </button>
      </form>
      {/* {loading ? (
        <div className="loader">
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
          <p>Loading...</p>
        </div>
      ) : (
        allImages &&
        allImages.map((image) => (
          <div key={image._id}>
            <Image src={image.data} alt="Uploaded Image" height={150} width={150} />
          </div>
        ))
      )} */}
      {allImages &&
  allImages.map((record) =>
    record.data.map((img, idx) => (
      <div key={`${record._id}-${idx}`}>
        <Image src={img} alt="Uploaded Image" height={150} width={150} />
      </div>
    ))
  )}


    </div>
  );
};



export default ImageUploader;
