import Visivo from "@/components/visivo/Visivo";

export default function Home() {
  return (
    <div className="space-y-12 bg-gray-900 px-12 py-16 lg:px-16">
      {/* Header Section */}
      <header className="mb-16 text-center">
        <div className="relative inline-block">
          <h1 className="animate-fade-in mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-6xl font-extrabold text-transparent">
            Visual Search Assistant
          </h1>
          <div className="absolute -inset-1 -z-10 rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 opacity-20 blur"></div>
        </div>
        <p className="animate-fade-in mx-auto max-w-2xl text-xl text-gray-400 delay-100">
          Experience the power of AI vision combined with voice interaction.
          Upload an image or take a photo to get detailed audio descriptions.
        </p>
      </header>

      {/* Visivo Component */}
      <Visivo />

      {/* How It Works Section */}
      <section className="animate-fade-in mb-4 rounded-3xl border border-gray-700/50 bg-gray-800/30 p-10 shadow-lg backdrop-blur-sm delay-300">
        <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Upload",
              color: "purple-300",
              description:
                "Simply drag and drop or upload any image you want to analyze. Our system supports various image formats.",
            },
            {
              title: "Analyze",
              color: "blue-300",
              description:
                "Our AI powered by Gemini analyzes your image in detail, identifying objects, scenes, and context.",
            },
            {
              title: "Listen",
              color: "pink-300",
              description:
                "Get audio descriptions of your images with natural voice synthesis, making content more accessible.",
            },
          ].map(({ title, color, description }, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-6 transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <h3 className={`text-${color} mb-3 text-xl font-semibold`}>
                {title}
              </h3>
              <p className="text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="animate-fade-in mb-4 rounded-3xl border border-gray-700/50 bg-gray-800/30 p-10 shadow-lg backdrop-blur-sm delay-300">
        <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-center text-3xl font-bold text-transparent">
          Key Features
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              title: "Real-time Analysis",
              description:
                "Get immediate feedback on your images as our AI analyzes them in real-time.",
            },
            {
              title: "Multi-format Support",
              description:
                "Supports a variety of image formats including JPEG, PNG, and GIF.",
            },
            {
              title: "Accessibility",
              description:
                "Designed to make content accessible for everyone, especially those with visual impairments.",
            },
            {
              title: "User -Friendly Interface",
              description:
                "An intuitive interface that makes it easy to upload images and receive audio descriptions.",
            },
          ].map(({ title, description }, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-700/50 bg-gray-800/50 p-6 transition-transform  hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="mb-3 text-xl font-semibold text-purple-300">
                {title}
              </h3>
              <p className="text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
