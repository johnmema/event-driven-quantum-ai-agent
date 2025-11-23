"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is Playbill Picks?",
    a: "Playbill Picks automatically enters you into daily Broadway show lotteries so you never miss a chance to win discounted tickets.",
  },
  {
    q: "How does it work?",
    a: "After you create a free account, you choose which Broadway shows you want to enter. Playbill Picks handles the daily submissions automatically.",
  },
  {
    q: "Is this official?",
    a: "Playbill Picks isn’t affiliated with any specific show or producer. It automates the same public lottery entry forms that audiences can access manually.",
  },
  {
    q: "Is it safe to use?",
    a: "Yes. We never store your payment details. You only provide the same basic information required by official lottery forms — name, email, and zip code.",
  },
  {
    q: "How will I know if I win?",
    a: "You’ll get the same confirmation email from the official show lottery. We also notify you in your Playbill Picks dashboard.",
  },
];

export function FAQ() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24" id="faq">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-black mb-8 sm:mb-10 md:mb-12 text-left">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="space-y-3 text-left">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-gray-300 pb-3"
            >
              <AccordionTrigger className="text-2xl sm:text-3xl md:text-4xl font-medium hover:no-underline text-black text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-lg sm:text-xl md:text-2xl font-normal leading-relaxed text-gray-700 mt-2">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
    </section>
  );
}
