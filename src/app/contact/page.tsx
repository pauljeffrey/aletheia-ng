import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";

const Contact = () => {
  return (
    <>
    <Header />
    <section className="py-16 bg-bg-dark">
      <div className="container mx-auto text-center max-w-3xl">
        <h1 className="text-4xl font-bold gradient-text">Contact Us</h1>
        <p className="mt-4 text-text-light">
          Have questions or want to collaborate? Get in touch with us.
        </p>
        <div className="mt-8 space-y-3 text-text-light">
          <p>
            <strong className="text-text-white">Email:</strong>{" "}
            <a href="mailto:drjeffrey.paul@aletheia.com.ng" className="text-primary-green hover:text-cyan transition-colors">
              drjeffrey.paul@aletheia.com.ng
            </a>
          </p>
          <p>
            <strong className="text-text-white">Phone:</strong> +234 902 772 8309
          </p>
        </div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Contact;

