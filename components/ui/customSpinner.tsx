function CustomSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2379BC] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading campaign details...</p>
      </div>
    </div>
  );
}
export default CustomSpinner;
