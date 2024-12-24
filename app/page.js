import Image from "next/image";
import Link from "next/link";
import Navbar from "./pages/navbar/Navbar";
import Starting from "./pages/starting/Starting";
import Footer from "./pages/footer/Footer";
import ImageUploader from "./pages/uploadimage/ImageUploader";
export default function Home() {
  return (
<div className="w-full   bg-slate-400">

   <div className="h-full">
   <Starting/>
   </div>
    {/* <ImageUploader/> */}
</div>
  );
}
