import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import  baseURL  from "../utils/api";

const Contact = () => {
 const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`${baseURL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert(data.message || "Failed to send");
    }
  };


  return (
    <div className="min-h-screen bg-[#080b10] text-white px-4 py-20">

      {/* Page Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-semibold text-[#00ff9d] tracking-tight">
          Contact Us
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          Have a question, need support, or want to collaborate?  
          Our team is ready to help.
        </p>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-5 grid sm:grid-cols-2 gap-12">

        {/* Left: Contact Info */}
        <div className="space-y-6">

          <ContactInfo
            icon={<FaEnvelope />}
            title="Email"
            value="support@xsploit.com"
            description="Reach out for technical or billing support"
          />

          <ContactInfo
            icon={<FaPhoneAlt />}
            title="Phone"
            value="+91 98765 43210"
            description="Available Mon–Fri, 10AM–6PM IST"
          />

          <ContactInfo
            icon={<FaMapMarkerAlt />}
            title="Office"
            value="India"
            description="Remote-first, globally available"
          />

        </div>

        {/* Right: Contact Form */}
        <div className="bg-[#0b0f14] border border-[#00ff9d15] rounded-2xl p-8 shadow-lg">

          <h2 className="text-xl font-semibold mb-6 text-white">
            Send us a message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    value={formData.name}
    onChange={handleChange}
    className="w-full p-3 rounded-md bg-[#0c1015] border border-[#00ff9d30] text-white"
    required
  />

  <input
    type="email"
    name="email"
    placeholder="Your Email"
    value={formData.email}
    onChange={handleChange}
    className="w-full p-3 rounded-md bg-[#0c1015] border border-[#00ff9d30] text-white"
    required
  />

  <textarea
    name="message"
    placeholder="Your Message"
    rows={5}
    value={formData.message}
    onChange={handleChange}
    className="w-full p-3 rounded-md bg-[#0c1015] border border-[#00ff9d30] text-white"
    required
  />

  <button
    type="submit"
    className="w-full py-3 bg-[#00ff9d] text-black font-semibold rounded-md hover:scale-[1.03] transition"
  >
    Send Message
  </button>
</form>

        </div>

      </div>
    </div>
  );
};

export default Contact;


const ContactInfo = ({ icon, title, value, description }: any) => (
  <div className="flex items-start gap-4 bg-[#0b0f14] border border-[#00ff9d10] rounded-xl p-5">
    <div className="text-[#00ff9d] text-lg mt-1">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-base font-medium text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  </div>
);

const Input = ({ label, type = "text", placeholder }: any) => (
  <div>
    <label className="text-sm text-gray-400">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="mt-2 w-full rounded-lg bg-[#080b10] border border-[#00ff9d20] px-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#00ff9d]"
    />
  </div>
);
