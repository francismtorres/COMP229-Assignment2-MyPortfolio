import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { personalInfo } from "../data/portfolioData.js";

// Initial (empty) values for every field in the form
const emptyFormValues = {
  firstName: "",
  lastName: "",
  contactNumber: "",
  emailAddress: "",
  message: "",
};

/**
 * validateForm: returns an object of error messages (empty object = valid).
 */
function validateForm(formValues) {
  const validationErrors = {};

  if (!formValues.firstName.trim()) validationErrors.firstName = "Please enter your first name.";
  if (!formValues.lastName.trim()) validationErrors.lastName = "Please enter your last name.";

  // Phone is required: allow digits, spaces, dashes, parentheses and a leading +
  const digitCount = formValues.contactNumber.replace(/\D/g, "").length;
  if (!/^[+\d\s().-]+$/.test(formValues.contactNumber) || digitCount < 7) {
    validationErrors.contactNumber = "Please enter a valid phone number.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.emailAddress)) {
    validationErrors.emailAddress = "Please enter a valid email address.";
  }
  if (formValues.message.trim().length < 10) {
    validationErrors.message = "Please write a message of at least 10 characters.";
  }
  return validationErrors;
}

/**
 * Contact: contact details panel plus an interactive message form.
 * On a valid submit the data is captured and the visitor is redirected to Home.
 */
export default function Contact() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(emptyFormValues);
  const [formErrors, setFormErrors] = useState({});

  // Keeps React state in sync with whatever the visitor types
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previousValues) => ({ ...previousValues, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(formValues);
    setFormErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // The form is not wired to a server yet: log the captured data, then
    // redirect to the Home page with the submitted details attached.
    const submittedMessage = {
      firstName: formValues.firstName.trim(),
      lastName: formValues.lastName.trim(),
      contactNumber: formValues.contactNumber.trim(),
      email: formValues.emailAddress.trim(),
      message: formValues.message.trim(),
    };
    console.info("Contact form submission captured:", submittedMessage);
    navigate("/", { state: { submittedMessage } });
  };

  // Small helper so each field renders its label, input and error the same way
  const renderField = (fieldName, label, inputType = "text", autoComplete) => (
    <div className="form-field">
      <label htmlFor={fieldName}>{label}</label>
      <input
        id={fieldName}
        name={fieldName}
        type={inputType}
        autoComplete={autoComplete}
        value={formValues[fieldName]}
        onChange={handleFieldChange}
        aria-invalid={Boolean(formErrors[fieldName])}
        aria-describedby={formErrors[fieldName] ? `${fieldName}-error` : undefined}
      />
      {formErrors[fieldName] && <p className="field-error" id={`${fieldName}-error`}>{formErrors[fieldName]}</p>}
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow="Contact me"
        title="Let's talk"
        intro="Questions, co-op opportunities or a project idea? Send me a message."
      />

      <section className="section">
        <div className="container contact-grid">
          {/* Contact information panel */}
          <aside className="card contact-panel" aria-label="Contact information">
            <div className="card-body">
              <h2>Contact information</h2>
              <dl className="contact-list">
                <div><dt>Email</dt><dd><a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a></dd></div>
                <div><dt>Phone</dt><dd><a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a></dd></div>
                <div><dt>Location</dt><dd>{personalInfo.location}</dd></div>
                <div><dt>LinkedIn</dt><dd><a href={personalInfo.linkedInUrl} target="_blank" rel="noreferrer">linkedin.com/in/francis-torres</a></dd></div>
                <div><dt>GitHub</dt><dd><a href={personalInfo.gitHubUrl} target="_blank" rel="noreferrer">github.com/francismtorres</a></dd></div>
              </dl>
            </div>
          </aside>

          {/* Message form */}
          <form className="card contact-form" onSubmit={handleSubmit} noValidate>
            <div className="card-body">
              <h2>Send a message</h2>
              <div className="form-row">
                {renderField("firstName", "First name", "text", "given-name")}
                {renderField("lastName", "Last name", "text", "family-name")}
              </div>
              <div className="form-row">
                {renderField("contactNumber", "Contact number", "tel", "tel")}
                {renderField("emailAddress", "Email address", "email", "email")}
              </div>
              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formValues.message}
                  onChange={handleFieldChange}
                  aria-invalid={Boolean(formErrors.message)}
                  aria-describedby={formErrors.message ? "message-error" : undefined}
                />
                {formErrors.message && <p className="field-error" id="message-error">{formErrors.message}</p>}
              </div>
              <button type="submit" className="button button-primary">Send message</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
