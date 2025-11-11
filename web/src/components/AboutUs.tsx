"use client";

export function AboutUs() {
  return (
    <section className="w-full py-24" id="about">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-instrument-serif text-5xl font-bold text-black mb-12 text-left">
          About Us
        </h2>

        <div className="space-y-8 text-left">
          <p className="text-2xl font-instrument-serif leading-relaxed text-gray-700">
            Playbill Picks was built for Broadway fans who never want to miss a
            chance at the magic of live theater. Our goal is simple: make the
            Broadway lottery experience effortless and fair for everyone.
          </p>

          <p className="text-2xl font-instrument-serif leading-relaxed text-gray-700">
            Instead of spending time filling out daily lottery forms, Playbill
            Picks automates your entries across all participating shows — safely
            and securely. You get the same official entries and notifications,
            without the hassle.
          </p>

          <p className="text-2xl font-instrument-serif leading-relaxed text-gray-700">
            We’re a small team of developers and theater lovers who believe that
            access to Broadway shouldn’t depend on luck or time. We’re here to
            help you focus on what matters most: being in the audience when the
            curtain rises.
          </p>
        </div>
      </div>
    </section>
  );
}
