export default function ImpactPage() {
  return (
    <main className="pt-32 min-h-screen bg-white">

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-16">

          <p className="text-primary-600 font-semibold mb-4">
            NOTRE IMPACT
          </p>

          <h1 className="text-5xl font-bold mb-6">
            Des résultats concrets sur le terrain
          </h1>

          <p className="text-neutral-600 max-w-3xl mx-auto">
            Chaque action menée améliore durablement la vie des communautés.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            {
              value: "50 000+",
              label: "Bénéficiaires accompagnés",
            },

            {
              value: "35",
              label: "Pays touchés",
            },

            {
              value: "120",
              label: "Projets réalisés",
            },
          ].map((item) => (

            <div
              key={item.label}
              className="
                bg-white
                rounded-3xl
                shadow-xl
                p-10
                text-center
              "
            >

              <div className="text-5xl font-bold text-primary-700 mb-4">
                {item.value}
              </div>

              <div className="text-neutral-600">
                {item.label}
              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}