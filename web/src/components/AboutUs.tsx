"use client";

export function AboutUs() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24" id="about">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-black mb-8 sm:mb-10 md:mb-12 text-left">
          About Us
        </h2>

        <div className="space-y-6 sm:space-y-8 text-left">
          <p className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-gray-700">
            Playbill Picks was built for Broadway fans who never want to miss a
            chance at the magic of live theater. Our goal is simple: make the
            Broadway lottery experience effortless and fair for everyone.
          </p>

          <p className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-gray-700">
            Instead of spending time filling out daily lottery forms, Playbill
            Picks automates your entries across all participating shows — safely
            and securely. You get the same official entries and notifications,
            without the hassle.
          </p>

          <p className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-gray-700">
            We’re a small team of developers and theater lovers who believe that
            access to Broadway shouldn’t depend on luck or time. We’re here to
            help you focus on what matters most: being in the audience when the
            curtain rises.
          </p>
        </div>
    </section>
  );
}
