import ImageUpload from "@/components/images_upload";
import ShimmerText from "@/components/kokonutui/shimmer-text";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <ShimmerText text="Куй свои изображения как хочешь." />
      <ImageUpload />
    </div>
  );
}
