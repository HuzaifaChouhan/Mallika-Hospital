import { useState } from 'react'
import { FaPaperPlane, FaWhatsapp, FaCircleCheck } from 'react-icons/fa6'

/* There is no server, so submitting opens WhatsApp with the details filled in,
   addressed to this number. The patient only has to press Send. */
const WHATSAPP_NUMBER = '919082097421'

const departments = [
  'Physician & Diabetology',
  'Nephrology',
  'Cardiology',
  'Neurology',
  'Oncology',
  'Gastroenterology',
  'Hematology',
  'Dermatology',
  'Pediatrician',
  'General Surgery',
  'Onco Surgery',
  'Obstetrics & Gynecology',
  'Orthopedic',
  'Neuro Surgery',
  'Urology',
  'ENT',
  'Proctology',
  'Plastic Surgery',
  'Pediatric Surgery',
  'Not sure / General enquiry',
]

/* Add real doctors here. A doctor dropdown appears only for departments that
   have at least one doctor listed, and startTime fills in the time field.
   Example:
   { id: 1, name: 'Dr. Full Name', department: 'Cardiology', startTime: '10:00' }
*/
const doctors = []

const emptyForm = { name: '', phone: '', department: '', doctor: '', date: '', time: '', reason: '' }

// Today's date and the current time in the visitor's own timezone
const todayLocal = () =>
  new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)
const nowLocalTime = () => new Date().toTimeString().slice(0, 5)

const formatDate = (iso) => iso.split('-').reverse().join('-')
const to12h = (t) => {
  const [h, m] = t.split(':').map(Number)
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}

const inputClass = (hasError) =>
  `w-full border bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
    hasError
      ? 'border-brand-red focus:border-brand-red focus:ring-brand-red/30'
      : 'border-slate-300 focus:border-brand-blue focus:ring-brand-blue/30'
  }`

function Field({ id, label, error, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-brand-blue-dark">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm font-medium text-brand-red">{error}</p>}
    </div>
  )
}

export default function AppointmentForm() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [waUrl, setWaUrl] = useState(null)

  const deptDoctors = doctors.filter((d) => d.department === form.department)
  const clearError = (name) => setErrors((prev) => ({ ...prev, [name]: undefined }))

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    clearError(name)
  }

  const handleDepartmentChange = (e) => {
    setForm((prev) => ({ ...prev, department: e.target.value, doctor: '', time: '' }))
    clearError('department')
    clearError('doctor')
  }

  const handleDoctorChange = (e) => {
    const id = e.target.value
    const doc = doctors.find((d) => String(d.id) === id)
    setForm((prev) => ({ ...prev, doctor: id, time: doc?.startTime || prev.time }))
    clearError('doctor')
    clearError('time')
  }

  // Props shared by the plain inputs
  const bind = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    'aria-invalid': !!errors[name],
    className: inputClass(errors[name]),
  })

  const validate = () => {
    const found = {}
    if (form.name.trim().length < 2) found.name = 'Please enter your full name.'

    const digits = form.phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '')
    if (!/^[6-9]\d{9}$/.test(digits)) found.phone = 'Enter a valid 10-digit mobile number.'

    if (!form.department) found.department = 'Please choose a department.'
    if (deptDoctors.length && !form.doctor) found.doctor = 'Please choose a doctor.'
    if (!form.date) found.date = 'Please pick a date.'

    if (!form.time) found.time = 'Please pick a time.'
    else if (form.date === todayLocal() && form.time < nowLocalTime())
      found.time = 'That time has already passed today.'

    if (form.reason.trim().length < 3) found.reason = 'Please tell us the reason for your visit.'
    return found
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length) return

    const doctorName = doctors.find((d) => String(d.id) === form.doctor)?.name
    const lines = [
      'Hello Mallika Hospital, I would like to book an appointment.',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Department: ${form.department}`,
      doctorName && `Doctor: ${doctorName}`,
      `Date: ${formatDate(form.date)}`,
      `Time: ${to12h(form.time)}`,
      `Reason: ${form.reason.trim()}`,
    ].filter(Boolean)

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(url, '_blank', 'noopener')
    setWaUrl(url)
  }

  const resetForm = () => {
    setForm(emptyForm)
    setErrors({})
    setWaUrl(null)
  }

  return (
    <div id="appointment-form" className="border-t-4 border-brand-blue bg-white p-6 shadow-md ring-1 ring-slate-100 sm:p-8">
      {waUrl ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <FaCircleCheck className="text-6xl text-brand-green" />
          <h3 className="mt-5 text-2xl font-bold text-brand-blue-dark">Almost done!</h3>
          <p className="mt-3 max-w-md text-slate-600">
            WhatsApp should have opened with your request filled in. Press <strong>Send</strong> there to confirm it.
            If nothing opened, use the button below.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-brand-blue px-6 py-3 font-semibold text-white shadow-md transition hover:bg-brand-blue-dark"
            >
              <FaWhatsapp /> Open WhatsApp
            </a>
            <button
              type="button"
              onClick={resetForm}
              className="border-2 border-brand-blue px-6 py-3 font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
            >
              Book Another
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full Name" error={errors.name}>
              <input {...bind('name')} type="text" autoComplete="name" placeholder="Your full name" />
            </Field>

            <Field id="phone" label="Phone Number" error={errors.phone}>
              <input
                {...bind('phone')}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="10-digit mobile number"
              />
            </Field>

            <Field
              id="department"
              label="Select Department"
              error={errors.department}
              className={deptDoctors.length ? '' : 'sm:col-span-2'}
            >
              <select {...bind('department')} onChange={handleDepartmentChange}>
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>

            {deptDoctors.length > 0 && (
              <Field id="doctor" label="Select Doctor" error={errors.doctor}>
                <select {...bind('doctor')} onChange={handleDoctorChange}>
                  <option value="">Select a doctor</option>
                  {deptDoctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            <Field id="date" label="Date" error={errors.date}>
              <input {...bind('date')} type="date" min={todayLocal()} />
            </Field>

            <Field id="time" label="Time" error={errors.time}>
              <input {...bind('time')} type="time" />
            </Field>
          </div>

          <Field id="reason" label="Reason" error={errors.reason}>
            <textarea {...bind('reason')} rows={4} placeholder="Tell us briefly what you need" />
          </Field>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2.5 bg-brand-blue px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-brand-blue-dark sm:w-auto"
          >
            <FaPaperPlane />
            Send via WhatsApp
          </button>
          <p className="text-sm text-slate-500">
            This opens WhatsApp with your details filled in. Nothing is sent until you press Send there.
          </p>
        </form>
      )}
    </div>
  )
}