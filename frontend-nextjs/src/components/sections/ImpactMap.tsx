export default function ImpactMap() {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">

          <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full">
            Notre présence
          </span>

          <h2 className="text-5xl font-bold mt-6">
            Nos actions dans le monde
          </h2>

          <p className="mt-5 text-gray-600">
            Une présence qui grandit chaque année.
          </p>

        </div>

        <div className="rounded-[30px] overflow-hidden shadow-xl">

          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b"
            alt="Carte"
            className="w-full h-[550px] object-cover"
          />

        </div>

      </div>

    </section>
  );
}