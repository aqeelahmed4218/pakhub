import Image from 'next/image'

export default function TeamMember({ name, role, image, description }) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-blue-400 mb-2">{role}</p>
      <p className="text-gray-300">{description}</p>
    </div>
  )
} 