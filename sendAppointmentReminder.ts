// Email service with SendGrid
export async function sendAppointmentReminder(appointment: FollowUpAppointment): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn("SENDGRID_API_KEY is not set, cannot send email reminders");
      return false;
    }
    
    const patient = await storage.getPatient(appointment.patientId);
    const doctor = await storage.getDoctor(appointment.doctorId);
    
    if (!patient || !doctor || !patient.email) {
      console.warn("Cannot send reminder: missing patient, doctor, or email information");
      return false;
    }
    
    const msg = {
      to: patient.email,
      from: 'hospital@example.com',
      subject: 'Appointment Reminder',
      text: `Dear ${patient.name}, this is a reminder of your follow-up appointment with ${doctor.name} on ${format(new Date(appointment.appointmentDate), 'PPP')} at ${appointment.appointmentTime}.`,
      html: `<p>Dear ${patient.name},</p><p>This is a reminder of your follow-up appointment with ${doctor.name} on <strong>${format(new Date(appointment.appointmentDate), 'PPP')}</strong> at <strong>${appointment.appointmentTime}</strong>.</p><p>Please arrive 15 minutes before your scheduled time.</p><p>Regards,<br>Hospital Staff</p>`,
    };
    
    await mailService.send(msg);
    return true;
  } catch (error) {
    console.error("Failed to send appointment reminder:", error);
    return false;
  }
}
