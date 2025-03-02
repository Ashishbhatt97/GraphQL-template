import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { motion } from "motion/react";
import { TooltipProvider } from "../ui/tooltip";

const benefits = [
  {
    title: "Flexible Queries",
    description:
      "Clients can request exactly the data they need, no more, no less.",
  },
  {
    title: "Network Requests",
    description: "Combine multiple API calls into a single request.",
  },
  {
    title: "Improved Developer Experience",
    description:
      "Strong typing and introspection make development faster and safer.",
  },
  {
    title: "Backward Compatible",
    description: "Evolve your API without breaking existing queries.",
  },
];

const WhyUseGraphQLSection = () => {
  return (
    <div className="py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Why Use GraphQL?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-neutral-900/50 backdrop-blur-md rounded-lg p-6 border border-neutral-800 hover:border-violet-600"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="text-2xl font-semibold text-white mb-4 truncate cursor-default">
                      {benefit.title}
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent>{benefit.title}</TooltipContent>
                  <p>{benefit.description}</p>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUseGraphQLSection;
