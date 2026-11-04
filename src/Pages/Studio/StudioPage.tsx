import StoreShell from "@/components/layout/StoreShell";
import ShapeHero from "@/pages/Studio/components/effects/shapeshero";
import { TextParallaxContentExample } from "@/pages/Studio/components/effects/textparallelcontext";
import ThreeDHoverGallery from "@/pages/Studio/components/effects/ThreeDHoverGallery";
import Gallery from "@/pages/Studio/components/effects/studiogallery";
import Scroll from "@/pages/Studio/components/effects/Scrolllightwind";
import ParticleOrbitContainer from "@/pages/Studio/components/effects/ParticleOrbitEffect";
import { AngledSlider } from "@/pages/Studio/components/effects/AngledCard";
import ThreeDSlider from "@/pages/Studio/components/effects/SliderItem";
import SmoothScrollHero from "@/pages/Studio/components/effects/ScrollEffect";

const sliderItems = [
  {
    title: "Look 01",
    num: "01",
    imageUrl:
      "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D",
    data: { id: 1 },
  },
  {
    title: "Look 02",
    num: "02",
    imageUrl:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    data: { id: 2 },
  },
  {
    title: "Look 03",
    num: "03",
    imageUrl:
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    data: { id: 3 },
  },
  {
    title: "Look 04",
    num: "04",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1675186049222-0b5018db6ce9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    data: { id: 4 },
  },
  {
    title: "Look 05",
    num: "05",
    imageUrl:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    data: { id: 5 },
  },
  {
    title: "Look 06",
    num: "06",
    imageUrl:
      "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D",
    data: { id: 6 },
  },
  {
    title: "Look 07",
    num: "07",
    imageUrl:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    data: { id: 7 },
  },
  {
    title: "Look 08",
    num: "08",
    imageUrl:
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    data: { id: 9 },
  },
  {
    title: "Look 09",
    num: "09",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1675186049222-0b5018db6ce9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    data: { id: 9 },
  },
  {
    title: "Look 10",
    num: "10",
    imageUrl:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
    data: { id: 10 },
  },
];

const images = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=1000&q=80",
    title: "Studio look",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=1000&q=80",
    title: "Studio look",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=80",
    title: "Studio look",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1000&q=80",
    title: "Studio look",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1000&q=80",
    title: "Studio look",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1000&q=80",
    title: "Studio look",
  },
];

const StudioScreen = () => {
  return (
    <StoreShell className="dd-studio">

      <ParticleOrbitContainer
        particleCount={20}
        radius={120}
        particleSpeed={0.015}
        radiusScale={2}
        intensity={0.7}
        fadeOpacity={0.08}
        autoColors={true}
        followMouse={true}
        particleSize={3.5}
        colorRange={[180, 360]}
      >
        <ShapeHero />
      </ParticleOrbitContainer>

      <SmoothScrollHero />

      <ThreeDSlider items={sliderItems} />

      {/* <AuroraTextEffect
        text="Darling Desire"
        fontSize="clamp(3rem, 8vw, 7rem)"
        colors={{
          first: "bg-cyan-400",
          second: "bg-yellow-400",
          third: "bg-green-400",
          fourth: "bg-primarylw",
        }}
        blurAmount="blur-lg"
      /> */}
      <TextParallaxContentExample />
      <ThreeDHoverGallery />
      <Gallery />
      <Scroll />
      <AngledSlider items={images} speed={30} />
    </StoreShell>
  );
};

export default StudioScreen;
