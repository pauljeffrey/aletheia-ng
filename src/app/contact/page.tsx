import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";

const Contact = () => {
  return (
    <>
    <Header />
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
        <p className="mt-4 text-gray-600">
          Have questions or want to collaborate? Get in touch with us.
        </p>
        <p className="mt-6">
          <strong>Email:</strong> <a href="mailto:drjeffrey.paul@aletheia.com.ng" className="text-blue-500">drjeffrey.paul@aletheia.com.ng</a>
        </p>
        <p>
          <strong>Phone:</strong> +234 902 772 8309
        </p>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Contact;

