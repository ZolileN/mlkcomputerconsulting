import { motion } from 'framer-motion';

const WorkSection = () => {
  const projects = [
    {
      src: "/libo.webp",
      alt: "Libo Project",
      title: "Libo Insights",
      description: "South Africa's most complete data platform.",
      tags: ["Property & Rental", "Healthcare"]
    },
    {
      src: "/18gm.webp",
      alt: "18 GM Project",
      title: "18 GM",
      description: "Africa's first living museum.",
      tags: ["Tours", "Museum"]
    },
    {
      src: "/andrea.webp",
      alt: "Andrea Project",
      title: "Andrea Dondolo",
      description: "Award winning actress.",
      tags: ["Writter", "Actress"]
    },
    {
      src: "/mintry.webp",
      alt: "Mintry-Fabric",
      title: "Mintry-Fabric",
      description: "Mintry Fabric is a high-performance, real-time AI metering and policy enforcement layer.",
      tags: ["AI Metering", "Policy Enforcement"]
    },
    {
      src: "/signaldesk.webp",
      alt: "SignalDesk Africa",
      title: "SignalDesk Africa",
      description: "SignalDesk Africa is a premium media intelligence and creator monetisation platform.",
      tags: ["Media Intelligence", "Creator Monetisation"]
    },
    {
      src: "/obsido.webp",
      alt: "obsido Project",
      title: "Obsido Interiors",
      description: "Premium Interior Solutions.",
      tags: ["Custom Furniture", "Design"]
    }
  ];

  return (
    <section id="work" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Explore some of our recent projects and see how we've helped businesses transform their digital presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden h-64">
                <img 
                  src={project.src} 
                  alt={project.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-muted rounded-full text-sm">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
