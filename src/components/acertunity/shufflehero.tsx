import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-6xl font-bold text-gray-100 font-garamond">
          Glow Like You Mean It{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-purple-600">
            Because You Deserve to Shine
          </span>
        </h1>
        <p className="text-3xl md:text-lg text-amber-600 my-4 md:my-6 font-serif">
          Beauty isn’t just about how you look, it’s about how you feel within.
          When your skin glows with care, your confidence shines naturally.
          Taking care of yourself isn’t a luxury—it’s a form of self-love you
          truly deserve
        </p>
      </div>
      <ShuffleGrid />
    </section>
  );
};

type Square = (typeof squareData)[number];

const shuffle = <T,>(items: readonly T[]): T[] => {
  const array = [...items];
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1598528738936-c50861cc75a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1608979048467-6194dabc6a3d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
  },
];

const ShuffleGrid = () => {
  const [squares, setSquares] = useState<Square[]>(() => shuffle(squareData));

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const shuffleSquares = () => {
      setSquares(shuffle(squareData));
      timeout = setTimeout(shuffleSquares, 3000);
    };
    timeout = setTimeout(shuffleSquares, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="grid grid-cols-3 grid-rows-3 h-112.5 gap-1 rounded-2xl">
      {squares.map((square) => (
        <motion.div
          key={square.id}
          layout
          transition={{ duration: 1.5, type: "spring" }}
          className="w-full h-full"
          style={{
            backgroundImage: `url(${square.src})`,
            backgroundSize: "cover",
            borderRadius: "1rem",
            backgroundPosition: "center",
          }}
        />
      ))}
    </div>
  );
};

export default ShuffleHero;
