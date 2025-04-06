// Using Tailwind classes and Shadcn UI components
<Card className="lg:col-span-2">
  <CardContent className="pt-6">
    {selectedPatientId === null ? (
      <div className="text-center py-12">
        <svg className="h-16 w-16 mx-auto text-gray-400" /* ... */ />
        <h3 className="mt-4 text-lg font-medium text-gray-800">No Patient Selected</h3>
        <p className="text-gray-600">Select a patient from the queue to view details</p>
      </div>
    ) : (
      // Patient details UI
    )}
  </CardContent>
</Card>
