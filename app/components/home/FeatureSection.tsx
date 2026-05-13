import { Truck, RotateCcw, BadgePercent, Headphones } from "lucide-react";

const features = [
  {
    icon: <Truck className="text-[#22A7D0]" size={32} strokeWidth={1.5} />,
    title: "Free Delivery",
    description: "Orders from all item",
  },
  {
    icon: <RotateCcw className="text-[#22A7D0]" size={32} strokeWidth={1.5} />,
    title: "Return & Refund",
    description: "Money-back guarantee",
  },
  {
    icon: <BadgePercent className="text-[#22A7D0]" size={32} strokeWidth={1.5} />,
    title: "Member Discount",
    description: "Orders over ₦100,000",
  },
  {
    icon: <Headphones className="text-[#22A7D0]" size={32} strokeWidth={1.5} />,
    title: "Support 24/7",
    description: "Contact us 24 hours a day",
  },
];

export default function FeatureSection() {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center gap-5 p-8 rounded-xl bg-[#F8F9FA] border border-gray-50 hover:shadow-md transition-shadow duration-300"
            >
              <div className="shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-[17px]   text-slate-900 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1 font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}