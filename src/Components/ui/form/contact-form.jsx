import { Form } from "react-router-dom";

const ContactForm = () => {
return(
    <>
     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Contact Us
      </h2>

      <Form method="POST" action="/contact" className="flex flex-col space-y-4">
        <label className="text-lg font-semibold text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="text-lg font-semibold text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="text-lg font-semibold text-gray-700">Message</label>
        <textarea
          name="message"
          placeholder="Write your message..."
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </Form>
    </div></>
)
}
export default ContactForm;