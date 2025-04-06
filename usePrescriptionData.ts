// Data fetching with TanStack Query
const { data: patientDetails, isLoading: isLoadingDetails } = useQuery({
  queryKey: [`/api/patient-details/${selectedPatientId}`],
  enabled: !!selectedPatientId,
});

// Mutation for updating data
const prescriptionMutation = useMutation({
  mutationFn: async (values: PrescriptionFormValues) => {
    const response = await apiRequest('POST', '/api/prescriptions', {
      patientId,
      doctorId,
      diagnosis: values.diagnosis,
      instructions: values.instructions || '',
      followUp: values.followUp,
      medicines: values.medicines,
    });
    return response.json();
  },
  onSuccess: () => {
    // Invalidate queries to refresh data
    queryClient.invalidateQueries({ queryKey: [`/api/prescriptions/patient/${patientId}`] });
    if (onSuccess) onSuccess();
    form.reset();
  },
});
