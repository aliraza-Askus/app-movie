import { Form, useNavigate } from "react-router-dom";
import ContactForm from "../../Components/ui/form/contact-form";
export const ContactFormData = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Server Response:", result);
    if (!response.ok) {
      throw new Error(result.message || "Something went wrong!");
    }
    return result;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export const Contact = () => {
  const navigate = useNavigate();

  return (
   <ContactForm/>
  );
};
