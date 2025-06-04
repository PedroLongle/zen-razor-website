'use client';

import Image from "next/image";
import { useFunctions } from "@/hooks/use-functions";
export default function TeamPage() {
  const { data } = useFunctions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center font-heading">Our Team</h1>
      <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12 font-sans">
        Meet the skilled professionals behind Zen Razor. Our experienced barbers are dedicated to providing exceptional service and helping you achieve your best look.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data?.barbers.map((member) => (
          <div 
            key={member.id} 
            className="border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary hover:scale-[1.02]"
          >
            <div className="aspect-square bg-accent relative">
              <Image 
                src={member.image} 
                alt={member.name} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover" 
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-xl mb-1 font-heading">{member.name}</h3>
              <p className="text-primary text-sm mb-3 font-sans">{member.title}</p>
              <p className="text-muted-foreground text-sm mb-4 font-sans">{member.bio}</p>
              <div>
                <h4 className="text-md font-medium mb-2 font-heading">Specialties:</h4>
                <ul className="flex flex-wrap gap-2">
                  {member.specialties?.map((specialty, index) => (
                    <li 
                      key={index}
                      className="bg-muted text-xs px-2 py-1 rounded-full transition-colors duration-300 hover:bg-primary hover:text-primary-foreground font-sans"
                    >
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 