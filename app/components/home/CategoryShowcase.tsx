import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Electronics",
    count: 5,
    image: "/electronics-category-img.png",
    href: "/category/electronics",
  },
  {
    name: "Computers",
    count: 3,
    image: "/computers-category-img.png",
    href: "/category/computers",
  },
  {
    name: "Phones & Tablets",
    count: 16,
    image: "/phone-tablets.png",
    href: "/category/phones-tablets",
  },
  {
    name: "Gaming",
    count: 0,
    image: "/gaming-category-img.png",
    href: "/category/gaming",
  },
  {
    name: "Kitchen Items",
    count: 0,
    image: "/kitchen-items-category-img.png", // Assuming this follows the naming convention
    href: "/category/kitchen",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="bg-[#F0F5F7] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {categories.map((cat, i) => (
            <Link 
              key={i} 
              href={cat.href}
              className="flex flex-col items-center group"
            >
              {/* Circular Image Container */}
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#E1F1FF] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-sky-200/50">
                <div className="relative w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="mt-6 text-center">
                <h3 className="text-lg md:text-xl   text-slate-800 group-hover:text-sky-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-400 mt-1 font-medium">
                  {cat.count} {cat.count === 1 ? 'product' : 'products'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}