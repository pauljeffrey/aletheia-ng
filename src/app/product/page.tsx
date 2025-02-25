import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";

const Product = () => {
    return (
      <>
      <Header />
      <section className="py-16">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-gray-800 py-4">Try Out Our Model</h2>                
          <div className="py-8 relative overflow-hidden" style={{ paddingTop: "56.25%" }}>
            <iframe
              src="https://beardedmonster-sabiyarn-125m-713d121.hf.space"
              style={{ 
                border: 0,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
              title="AI Model Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
      <Footer />
      </>
    );
  };

export default Product;

