import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();
  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
    };

    emailjs
      .send(
        "service_v01mtcu",
        "template_3a1r5xp",
        templateParams,
        "YcOimjllS64zn4ghK"
      )
      .then(() => {
        toast.success("Thank You! Your message has been sent successfully.");
        setLoading(false);
        navigateTo("/");
      })
      .catch(() => {
        toast.error("Failed to send message.");
        setLoading(false);
      });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:pl-72 pt-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="relative bg-gray-800/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-gray-700 overflow-hidden">
          {/* Decorative blurred gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 blur-3xl rounded-full -ml-32 -mb-32" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-800/30 backdrop-blur-sm rounded-3xl" />

          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight animate-slide-up">
              Contact Us
            </h3>
            <form className="space-y-8" onSubmit={handleContactForm}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 tracking-wide">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-700/30 hover:bg-gray-700/50 text-gray-100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 tracking-wide">Your Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-700/30 hover:bg-gray-700/50 text-gray-100"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 tracking-wide">Your Phone</label>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-700/30 hover:bg-gray-700/50 text-gray-100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 tracking-wide">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-700/30 hover:bg-gray-700/50 text-gray-100"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 tracking-wide">Message</label>
                <textarea
                  rows={7}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-700/30 hover:bg-gray-700/50 text-gray-100"
                  required
                />
              </div>
              <button
                className="bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto font-semibold hover:from-indigo-600 hover:to-purple-600 text-xl transition-all duration-300 py-3 px-8 rounded-xl text-white block shadow-lg shadow-indigo-500/25"
                type="submit"
              >
                {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;