// Schema definition with Drizzle ORM
export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  patientId: text("patient_id").notNull().default(''),
  visitReason: text("visit_reason").notNull().default('general'),
  status: text("status").notNull().default('registered'),
  assignedDoctor: text("assigned_doctor").notNull().default('Dr. Smith'),
  createdAt: timestamp("created_at").defaultNow(),
});

// Database operations implementation
export class DatabaseStorage implements IStorage {
  async getAllPatients(): Promise<Patient[]> {
    return await db.select().from(patients).orderBy(desc(patients.createdAt));
  }
  
  async getPatient(id: number): Promise<Patient | undefined> {
    const [patient] = await db.select().from(patients).where(eq(patients.id, id));
    return patient || undefined;
  }
  
  async createPatient(insertPatient: InsertPatient): Promise<Patient> {
    const [patient] = await db
      .insert(patients)
      .values(insertPatient)
      .returning();
    return patient;
  }
}
