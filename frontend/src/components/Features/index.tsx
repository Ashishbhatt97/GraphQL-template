import { motion } from "motion/react";

const features = [
  {
    title: "Efficient Data Fetching",
    description:
      "Fetch only the data you need, reducing over-fetching and under-fetching.",
    icon: "🚀",
  },
  {
    title: "Single Endpoint",
    description:
      "Access all your data through a single endpoint, simplifying API management.",
    icon: "🔗",
  },
  {
    title: "Strongly Typed",
    description:
      "GraphQL schemas are strongly typed, ensuring data consistency and validation.",
    icon: "📜",
  },
  {
    title: "Real-Time Updates",
    description:
      "Use subscriptions to get real-time updates for your applications.",
    icon: "⏱️",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <div id="features" className="py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Features
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-neutral-800/90 backdrop-blur-md shadow-2xl shadow-violet-500/20 hover:shadow-violet-500/50 rounded-lg p-6 border border-neutral-700 hover:border-violet-600 transition-all duration-300 "
              variants={cardVariants}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-4  cursor-default">
                {feature.title}
              </h3>
              <p className="text-neutral-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;
