import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { 
  Menu, 
  X, 
  Code, 
  Palette, 
  Smartphone, 
  Globe, 
  Lightbulb, 
  Users, 
  Award, 
  Server,
  Search,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Coffee,
  TrendingUp,
  FileCode,
  Infinity,
  ChevronDown,
  Moon,
  Sun,
  ArrowRight,
  CheckCircle,
  Star,
  Send,
  ArrowUp,
  Download  // Add this import
} from 'lucide-react'
import BackToTop from './components/BackToTop';
import TeamViewerDownload from './components/TeamViewerDownload'; // Add this import
import './App.css'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: ''
  });
  const [wordCount, setWordCount] = useState(0);
  const maxWords = 350;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ 
    success: null, 
    message: '' 
  });
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 200])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  // Animated counters
  const [counters, setCounters] = useState({
    coffee: 0,
    developers: 0,
    lines: 339170,
    loops: 0
  })

  useEffect(() => {
    // Loading animation
    const timer = setTimeout(() => setIsLoading(false), 2000)
    
    // Dark mode detection
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Scroll spy for active section
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'process', 'work', 'facts', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const scrollToSection = (sectionId) => {
    // Close the mobile menu
    setIsMenuOpen(false);
    
    // Add a small delay to ensure the menu is closed before scrolling
    setTimeout(() => {
      // Handle 'home' specially since it's the root path
      const elementId = sectionId === 'home' ? '' : sectionId;
      const element = elementId ? document.getElementById(elementId) : document.documentElement;
      
      if (element) {
        // Use scrollIntoView with smooth behavior
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  }

  const animateCounters = () => {
    const targets = { 
      coffee: 18500, 
      developers: 18539500, 
      lines: 339170, 
      loops: 20000 
    }
    const duration = 2000
    const steps = 60

    Object.keys(targets).forEach(key => {
      let current = key === 'lines' ? 0 : 0
      const increment = (targets[key] - (key === 'lines' ? 0 : 0)) / steps
      const timer = setInterval(() => {
        current += increment
        if (current >= targets[key]) {
          current = targets[key]
          clearInterval(timer)
        }
        setCounters(prev => ({ 
          ...prev, 
          [key]: Math.floor(key === 'lines' ? 339170 - (targets[key] - current) : current) 
        }))
      }, duration / steps)
    })
  }

  const services = [
    {
      icon: Code,
      title: "Software Development",
      description: "We work closely with you to plan, prototype, build and finally launch your product to your target audience.",
      color: "bg-blue-500"
    },
    {
      icon: Globe,
      title: "Web Design",
      description: "We analyze your industry and your competitors to deliver compelling digital experiences that establishes your brand ahead of the curve.",
      color: "bg-green-500"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "We have embraced simplicity and minimalism to produce work that gives user a peace-of-mind.",
      color: "bg-purple-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Development",
      description: "We craft experiences across smartphones and tablets, with our expertise in native iOS, Android development and cross-platform frameworks such as React Native.",
      color: "bg-orange-500"
    },
    {
      icon: Lightbulb,
      title: "Logo Design",
      description: "We believe an effective logo should be timeless – that is, it will endure the ages. Will the logo still be effective in 10, 20, 50 years?",
      color: "bg-yellow-500"
    },
    {
      icon: Award,
      title: "Branding",
      description: "We are all emotional beings and we have emotional relationships with brands we trust.",
      color: "bg-red-500"
    },
    {
      icon: Users,
      title: "IT Consulting",
      description: "We truly provide a premium service due to our culture of not resting on our laurels.",
      color: "bg-indigo-500"
    },
    {
      icon: Server,
      title: "Hosting",
      description: "At MLK Computer, we are constantly looking for better solutions and more efficient ways to maintain systems.",
      color: "bg-teal-500"
    }
  ]

  const processes = [
    { 
      title: "Research", 
      description: "First we learn & research about client's requirements", 
      icon: Search,
      color: "bg-blue-500"
    },
    { 
      title: "Prototype", 
      description: "We create an outline from our research result", 
      icon: FileCode,
      color: "bg-green-500"
    },
    { 
      title: "Design", 
      description: "We craft beautiful design for client's project", 
      icon: Palette,
      color: "bg-purple-500"
    },
    { 
      title: "Front-end", 
      description: "Purely hand coded front-end development with HTML, CSS, JavaScript, Reactjs & Tailwindcss", 
      icon: Code,
      color: "bg-orange-500"
    },
    { 
      title: "Back-end", 
      description: "Development for website's functionalities with Python, Django, Ruby on Rails & Node.js", 
      icon: Server,
      color: "bg-yellow-500"
    },
    { 
      title: "Server", 
      description: "Highly reliable & fast cloud server", 
      icon: Globe,
      color: "bg-red-500"
    },
    { 
      title: "Maintenance", 
      description: "We continuously work with our clients to help them maintain the website.", 
      icon: CheckCircle,
      color: "bg-indigo-500"
    },
    { 
      title: "Quality assurance", 
      description: "We assure the website's code quality, performance, style & spelling in every manner", 
      icon: Star,
      color: "bg-teal-500"
    }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'message') {
      const words = value.trim() ? value.trim().split(/\s+/) : [];
      if (words.length > maxWords) {
        return; // Don't update if word limit exceeded
      }
      setWordCount(words.length);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '09737e46-3f39-45f2-b217-961580653a05',
          ...formData,
          subject: `New Contact Form Submission - ${formData.service || 'No Service Selected'}`
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus({ 
          success: true, 
          message: 'Message sent successfully! We will get back to you soon.' 
        });
        setFormData({
          name: '',
          email: '',
          message: '',
          service: ''
        });
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: error.message || 'An error occurred. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-primary">MLK Computer</h2>
          <p className="text-muted-foreground">Loading amazing experiences...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <img 
              src="/favicon.png" 
              alt="MLK Computer Logo" 
              className="h-10 w-auto rounded-lg"
            />
            <span className="text-xl font-bold">MLK Computer Consulting</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'services', 'process', 'work', 'facts', 'contact'].map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-colors ${
                  activeSection === item ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item}
              </motion.button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="ml-4"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-background border-t border-border fixed top-16 left-0 right-0 z-50 overflow-hidden shadow-lg"
            >
              <div className="container mx-auto px-4 py-4 space-y-2 bg-background">
                {['home', 'about', 'services', 'process', 'work', 'facts', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left capitalize py-3 px-4 rounded-lg text-foreground hover:bg-muted/50 transition-colors text-base font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/hero-image.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-teal-600/20"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute inset-0 opacity-20 bg-gradient-to-tr from-transparent via-primary/5 to-transparent"
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              AN INNOVATIVE ICT SOLUTIONS PROVIDER &<br />
              DESIGN AGENCY
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We love the Web and the work we do. We work closely with our clients to deliver the best possible solutions for their needs
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('services')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              >
                Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Us</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              We are an innovative ICT solutions provider. We offer a comprehensive range of products and services that best enable an organisation and individuals to achieve their goals through the optimal utilisation of technology. We help our clients use innovative information and communication technology to solve business challenges, combining world-class software with acumen, insight and experience to give you the competitive edge.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Customers first",
                description: "Everything we do at MLK Computer is based on the success of the Technology experiences we provide our customers. The goal of each discipline within the company - be it design, programming or customer support - is to make our customer experience as fun as possible for as many people as we can reach.",
                icon: Users,
                color: "text-blue-600"
              },
              {
                title: "Commit to quality",
                description: "\"Epic polish\" doesn't just refer to our customer experiences, but to every aspect of our jobs. We approach each task carefully and seriously. We seek honest feedback and use it to improve the quality of our work.",
                icon: Award,
                color: "text-emerald-600"
              },
              {
                title: "Every voice matters",
                description: "Great ideas can come from anywhere. MLK Computer is what it is today because of the voices of our customers and of each member of the company. Every employee is encouraged to speak up, listen, be respectful of other opinions.",
                icon: MessageCircle,
                color: "text-purple-600"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30 group">
                  <CardHeader>
                    <div className={`w-14 h-14 ${item.color.replace('text', 'bg')}/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className={`h-7 w-7 ${item.color} transition-colors duration-300`} />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors duration-300">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base group-hover:text-foreground/90 transition-colors duration-300">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our solutions are designed to meet our clients strategic and operation needs, which we develop and maintain
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Processes</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We use the following processes to make you a smart and stunning web or mobile app at an affordable rate
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processes.map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className={`w-10 h-10 ${process.color} text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform duration-300`}>
                          <process.icon className="h-5 w-5" />
                        </div>
                        <span className="absolute -top-2 -right-2 bg-foreground text-background text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {index + 1}
                        </span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">{process.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="group-hover:text-foreground/90 transition-colors duration-300">
                      {process.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                
                {index < processes.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Section */}
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
            {/* Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden h-64">
                <img 
                  src="/cocare.png" 
                  alt="Cocare Project" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Cocare Health Solutions</h3>
                <p className="text-muted-foreground mb-4">A comprehensive healthcare management system for patient care coordination.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Web App</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Healthcare</span>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden h-64">
                <img 
                  src="/idbanc.png" 
                  alt="iDBanc Project" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">iDentityBanc</h3>
                <p className="text-muted-foreground mb-4">Digital iDentity Verification APP.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Mobile App</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Finance</span>
                </div>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden h-64">
                <img 
                  src="/andrea.png" 
                  alt="Andrea Project" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Andrea Dondolo</h3>
                <p className="text-muted-foreground mb-4">award winning actress.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Writter</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Actress</span>
                </div>
              </div>
            </motion.div>

            {/* Project 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden h-64">
                <img 
                  src="/lasos.png" 
                  alt="LaSOS Project" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">LaSosRanelo Greeen Solutions</h3>
                <p className="text-muted-foreground mb-4">A purpose driven communications for a sustainable future.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Sustainability</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Marketing & Communication</span>
                </div>
              </div>
            </motion.div>

            {/* Project 5 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden h-64">
                <img 
                  src="/njozela.png" 
                  alt="Njozela Project" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Njozela Attorneys</h3>
                <p className="text-muted-foreground mb-4">Providing Legal Services in Khayelitsha Since 2002.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Legal Services</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Justice</span>
                </div>
              </div>
            </motion.div>

            {/* Project 6 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden h-64">
                <img 
                  src="/uhuru.png" 
                  alt="Uhuru Project" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">UhuruAdvance</h3>
                <p className="text-muted-foreground mb-4">Electricity Advance System for South Africans.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Web App</span>
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">Social Good</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section id="facts" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onViewportEnter={animateCounters}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Fun Facts About Us</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              It is important to us to be there for you when and where you need us. We pride ourselves on being able to offer a same day response to allow you, your staff and your customers to gain the most value from your technology investment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Coffee, number: counters.coffee, label: "Cups Of Coffee", color: "text-orange-500" },
              { icon: Users, number: counters.developers, label: "Developers in the world", color: "text-blue-500" },
              { icon: FileCode, number: counters.lines, label: "Lines of code", color: "text-green-500" },
              { icon: Infinity, number: counters.loops, label: "while (true) { learn; code; }", color: "text-purple-500" }
            ].map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <fact.icon className={`h-12 w-12 ${fact.color} mx-auto mb-4`} />
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    {fact.number.toLocaleString()}
                  </div>
                  <p className="text-muted-foreground">{fact.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or need technical assistance? Reach out to us and let's discuss how we can help.
            </p>
            
            {/* Add TeamViewer Download Button */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Need Remote Support?</h3>
              <TeamViewerDownload />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-6 w-full max-w-2xl">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Input 
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Input 
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      >
                        <option value="">Select a service needed</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="E-commerce Solutions">E-commerce Solutions</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Software Development">Software Development</option>
                        <option value="IT Consulting">IT Consulting</option>
                        <option value="Cloud Services">Cloud Services</option>
                        <option value="Logo Design">Logo Design</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="Hosting Services">Hosting Services</option>
                        <option value="SEO Services">SEO Services</option>
                        <option value="Maintenance & Support">Maintenance & Support</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Your Message
                        </label>
                        <span className="text-xs text-muted-foreground">
                          {wordCount}/{maxWords} words
                        </span>
                      </div>
                      <Textarea
                        id="message"
                        name="message"
                        rows="6"
                        placeholder="Type your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      {wordCount === maxWords && (
                        <p className="text-xs text-amber-600 mt-1">
                          Maximum {maxWords} words reached
                        </p>
                      )}
                    </div>

                    {submitStatus.message && (
                      <div className={`p-3 rounded-md ${
                        submitStatus.success 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {submitStatus.message}
                      </div>
                    )}

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Get in touch with us through any of these channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>hello@mlkcomputer.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+27 (082) 531-9901</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>The Bandwidth Barn Lookout Hill, Cnr Mew way & Spine road, Khayelitsha, Cape Town, South Africa</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Office Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="text-lg font-bold">MLK Computer Consulting</span>
              </div>
              <p className="text-muted-foreground">
                Innovative ICT solutions provider and design agency dedicated to accelerating your ambitions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Software Development</li>
                <li>Web Design</li>
                <li>UI/UX Design</li>
                <li>Mobile Development</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a 
                    href="#about" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('about');
                    }}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a 
                    href="#services" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('services');
                    }}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a 
                    href="#process" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('process');
                    }}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Our Process
                  </a>
                </li>
                <li>
                  <a 
                    href="#work" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('work');
                    }}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Recent Projects
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                    className="hover:text-primary transition-colors cursor-pointer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/MlkComputerConsulting/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://x.com/mlkcomputer" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/mlk-computer-consulting/?" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 MLK Computer Consulting. All rights reserved. Built with ❤️ and modern web technologies.</p>
          </div>
        </div>
      </footer>
      <BackToTop />
    </div>
  )
}

export default App
