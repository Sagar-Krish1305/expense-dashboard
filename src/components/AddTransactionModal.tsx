import AddTransactionForm from './forms/AddTransactionForm';

export default function AddTransactionModal({
  isVisible,
  setVisibility,
}: {
  isVisible: boolean;
  setVisibility: (visibility: boolean) => void;
}) {
  if (!isVisible) return null;

  return (
    <div
      onClick={() => setVisibility(false)}
      className="
        fixed inset-0
        bg-black/60
        z-50
        flex items-center justify-center
      "
    >
      {/* Modal content */}
      <AddTransactionForm />
    </div>
  );
}
