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
    <section className="w-full py-24" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-instrument-serif text-5xl font-bold text-black mb-12 text-left">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="space-y-6 text-left">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-gray-300 pb-6"
            >
              <AccordionTrigger className="text-3xl font-bold hover:no-underline font-instrument-serif text-black">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-2xl font-instrument-serif leading-relaxed text-gray-700 mt-2">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
