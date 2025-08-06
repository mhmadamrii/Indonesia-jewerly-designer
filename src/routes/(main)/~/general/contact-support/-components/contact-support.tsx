import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { ContactForm } from "./contact-form";
import { ContactInformation } from "./contact-information";
import { FloatingChatbot } from "./floating-chatbot";

export function ContactSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-600">
              <MessageCircle className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Hubungi Kami</h1>
          <p className="mx-auto max-w-2xl text-xl">
            Kami siap membantu mewujudkan perhiasan impian Anda. Hubungi tim ahli kami
            untuk konsultasi gratis
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <ContactInformation />
          <ContactForm
            formData={formData}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
      <FloatingChatbot />
    </div>
  );
}
