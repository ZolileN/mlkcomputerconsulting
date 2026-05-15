import { m } from 'framer-motion';
import { Card } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'

const PackagesSection = ({ onGetStarted }) => {
  const packages = [
    {
      name: 'Starter',
      price: 'R6,500',
      period: 'once-off',
      description: 'Get online with a clean, professional website that represents your business well.',
      features: [
        '5-page mobile-ready website',
        'Contact form & Google Maps',
        'Basic SEO setup',
        'Domain & hosting guidance',
        '1 month post-launch support'
      ],
      featured: false
    },
    {
      name: 'Business Ready',
      price: 'R12,000',
      period: 'once-off',
      description: 'Everything you need to look professional, get found on Google, and support your customers.',
      features: [
        'Full website (up to 8 pages)',
        'Google Business Profile setup',
        'Professional business email',
        'Advanced SEO + speed optimisation',
        '3 months support included',
        'WhatsApp enquiry button'
      ],
      featured: true
    },
    {
      name: 'Growth Partner',
      price: 'R1,800',
      period: '/month',
      description: 'Ongoing tech partnership - we handle everything so you never have to worry about IT again.',
      features: [
        'Monthly website updates',
        'IT support (remote & on-site)',
        'Performance monitoring',
        'Security & backup management',
        'Priority response',
        'Quarterly strategy review'
      ],
      featured: false
    }
  ];

  return (
    <section id="packages" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Simple, transparent packages</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No surprises. No jargon. Just clear pricing for real results.
          </p>
        </m.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <Card
                className={`h-full p-8 rounded-3xl transition-all duration-300 ${
                  pkg.featured
                    ? 'border-0 bg-zinc-950 text-zinc-50 shadow-2xl shadow-blue-900/20 scale-[1.01]'
                    : 'border border-border/70 bg-card shadow-sm hover:shadow-lg'
                }`}
              >
                {pkg.featured && (
                  <Badge className="mb-5 bg-blue-600 text-white border border-blue-500 hover:bg-blue-600 uppercase tracking-wide">
                    Most popular
                  </Badge>
                )}
                <h3 className={`text-sm uppercase tracking-[0.16em] font-semibold mb-3 ${pkg.featured ? 'text-zinc-300' : 'text-muted-foreground'}`}>
                  {pkg.name}
                </h3>
                <div className="text-4xl font-bold mb-3">
                  {pkg.price}{' '}
                  <span className={`text-base font-medium ${pkg.featured ? 'text-zinc-400' : 'text-muted-foreground'}`}>
                    {pkg.period}
                  </span>
                </div>
                <p className={`mb-6 ${pkg.featured ? 'text-zinc-300' : 'text-muted-foreground'}`}>
                  {pkg.description}
                </p>
                <div className={`h-px mb-6 ${pkg.featured ? 'bg-zinc-800' : 'bg-border'}`} />
                <ul className="space-y-3 mb-8 text-left">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span
                        className={`mt-2 h-2 w-2 rounded-full shrink-0 ${
                          pkg.featured ? 'bg-blue-500' : 'bg-emerald-600'
                        }`}
                      />
                      <span className={pkg.featured ? 'text-zinc-200' : ''}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => onGetStarted(pkg)}
                  className={`w-full rounded-full font-semibold ${
                    pkg.featured
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-muted text-foreground hover:bg-muted/80 border border-border'
                  }`}
                >
                  Get started
                </Button>
              </Card>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
