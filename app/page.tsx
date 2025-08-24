import AnimatedListDemo from "../components/animated-list-demo"

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
        </div>
        <AnimatedListDemo />
      </div>
    </div>
    </>
  );
}
