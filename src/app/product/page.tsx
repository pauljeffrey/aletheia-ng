import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";

const Product = () => {
  return (
    <>
    <Header />
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">Try Out Our Model</h2>                
        <div className="py-8">
          <iframe
            src="https://beardedmonster-sabiyarn-125m-713d121.hf.space"
            style={{ border: 0 }}
            width="1050"
            height="650"
          ></iframe>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Product;

