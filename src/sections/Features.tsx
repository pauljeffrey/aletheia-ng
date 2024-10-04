import Image from "next/image";
import Cylinder from "@/assets/cylinder.png"

const features = [
    {
        title: "Catalyzing Product Commercialization",
        description: "We excel in fusing our commercial life sciences knowledge with our grasp of healthcare markets and public health principles."
    },
    {
        title: "Transforming Healthcare Delivery",
        description: "We empower public and non-profit health organizations to establish premier programs, expand capabilities, refine systems, and achieve transformative outcomes."
    },
    {
        title: "Advancing Public Affairs",
        description: "Our extensive network with policymakers and thought leaders enables us to forge pioneering partnerships that drive bold policy initiatives, secure funding, and shape the healthcare landscape."
    },
    {
        title: "Enabling Health System",
        description: "We guide our partners in deploying avant-garde technologies and solutions that significantly broaden access to essential health products and services."
    }
]


export const Features = () => {
    return (
        <div className="py-[72px]">
            <div className="container">
                <h2 className="text-center text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">Areas of Expertise</h2>
                <div className="max-w-xl mx-auto">
                    <p className="text-center mt-5 text-xl text-[#010D3E] tracking-light">Our deep-rooted understanding of healthcare systems and markets equips us with a distinctive perspective that merges commercial acumen with public health insights. We tackle the intricate issues faced by healthcare entities and pioneers, crafting tailor-made solutions that honor the distinctiveness of each locale we serve.</p>
                </div>
                <div className="mt-16 flex flex-col lg:flex-row gap-4">
                    {features.map(({ title, description }, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md px-5 py-10 text-center lg:flex-1">
                                <div className="inline-flex h-14 w-14 justify-center items-center">
                                    <Image src={Cylinder} alt="icon" />
                                </div>
                                <h3 className="mt-6 font-bold">{title}</h3>
                                <p className="mt-2 text-gray-600">{description}</p>
                            </div>
                    ))}
                </div>
            </div>
        </div>
    )
};