import { useState } from 'react';
import './ApplicationForm.css';

export const STATUS_OPTIONS = ['Saved', 'Applied', 'Interviewing', 'Offer', 'Rejected'];

const MAX_LENGTH = 100;

const EMPTY_APPLICATION = {
  company: '',
  jobTitle: '',
  status: 'Applied',
};

export function validateApplication(values) {
  const errors = {};
  const company = values.company.trim();
  const jobTitle = values.jobTitle.trim();

  if (!company) {
    errors.company = 'Company is required.';
  } else if (company.length > MAX_LENGTH) {
    errors.company = `Company must be ${MAX_LENGTH} characters or fewer.`;
  }

  if (!jobTitle) {
    errors.jobTitle = 'Job title is required.';
  } else if (jobTitle.length > MAX_LENGTH) {
    errors.jobTitle = `Job title must be ${MAX_LENGTH} characters or fewer.`;
  }

  if (!STATUS_OPTIONS.includes(values.status)) {
    errors.status = 'Choose a valid status.';
  }

  return errors;
}

// Add Application form. It does not save anything yet: on a valid submit it
// passes the cleaned values to onSubmit so the parent can decide what to do.
export default function ApplicationForm({ initialValues = EMPTY_APPLICATION, onSubmit, onCancel }) {
  const [values, setValues] = useState({ ...EMPTY_APPLICATION, ...initialValues });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    // Once a field has been touched, re-check it as the user types.
    if (touched[name]) {
      setErrors(validateApplication(nextValues));
    }
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validateApplication(values));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateApplication(values);
    setErrors(nextErrors);
    setTouched({ company: true, jobTitle: true, status: true });

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const application = {
      company: values.company.trim(),
      jobTitle: values.jobTitle.trim(),
      status: values.status,
    };

    if (onSubmit) {
      onSubmit(application);
    }
  }

  function handleCancel() {
    setValues({ ...EMPTY_APPLICATION, ...initialValues });
    setErrors({});
    setTouched({});
    if (onCancel) {
      onCancel();
    }
  }

  const showError = (name) => touched[name] && errors[name];

  return (
    <form className="application-form" onSubmit={handleSubmit} noValidate>
      <h2>Add application</h2>

      <div className="form-field">
        <label htmlFor="company">Company *</label>
        <input
          id="company"
          name="company"
          type="text"
          value={values.company}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={MAX_LENGTH}
          aria-invalid={Boolean(showError('company'))}
          aria-describedby={showError('company') ? 'company-error' : undefined}
        />
        {showError('company') && (
          <p id="company-error" className="form-error">{errors.company}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="jobTitle">Job title *</label>
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          value={values.jobTitle}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={MAX_LENGTH}
          aria-invalid={Boolean(showError('jobTitle'))}
          aria-describedby={showError('jobTitle') ? 'jobTitle-error' : undefined}
        />
        {showError('jobTitle') && (
          <p id="jobTitle-error" className="form-error">{errors.jobTitle}</p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={values.status}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(showError('status'))}
          aria-describedby={showError('status') ? 'status-error' : undefined}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {showError('status') && (
          <p id="status-error" className="form-error">{errors.status}</p>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="button-secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="button-primary">
          Save application
        </button>
      </div>
    </form>
  );
}
