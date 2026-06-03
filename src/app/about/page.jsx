import TeamMember from '@/components/TeamMember'

export default function About() {
  const teamMembers = [
    {
      name: "Ahmed Khan",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "With over 15 years of experience in real estate and technology, Ahmed leads PakHub's vision to transform Pakistan's property market."
    },
    {
      name: "Sara Malik",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Sara brings her expertise in software development and digital innovation to create seamless property solutions."
    },
    {
      name: "Usman Ali",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "Usman ensures smooth operations and maintains the highest standards of service quality across all PakHub platforms."
    }
  ]

  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-white'>About PakHub</h1>
      <p className='mb-4 text-gray-300'>PakHub is Pakistan's premier real estate platform, dedicated to revolutionizing the property market in the country. We specialize in connecting buyers, sellers, and renters with their ideal properties across Pakistan's most sought-after locations. Our innovative platform makes property transactions seamless and transparent.</p>
      <p className='mb-4 text-gray-300'>
        Our mission is to simplify the real estate journey for every Pakistani. Whether you're looking to buy your dream home, invest in property, or find the perfect rental, PakHub provides expert guidance, market insights, and a user-friendly platform to make your real estate goals a reality. We're committed to making property transactions accessible, secure, and efficient for everyone.
      </p>
      <p className='mb-4 text-gray-300'>At PakHub, we understand that finding the right property is more than just a transaction – it's about finding a place to call home. Our team of local experts has in-depth knowledge of Pakistan's diverse property market, from bustling urban centers to serene suburban neighborhoods. We're here to guide you through every step of your real estate journey, ensuring you make informed decisions with confidence.</p>

      {/* Company Values Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-white">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
            <p className="text-gray-300">Continuously evolving our platform to provide cutting-edge solutions for Pakistan's real estate market.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">Integrity</h3>
            <p className="text-gray-300">Building trust through transparent transactions and honest communication with our clients.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-3">Excellence</h3>
            <p className="text-gray-300">Delivering exceptional service and maintaining the highest standards in everything we do.</p>
          </div>
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-white">Our Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  )
}