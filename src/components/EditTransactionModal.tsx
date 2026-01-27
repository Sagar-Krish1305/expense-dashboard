import EditTransactionForm from './forms/EditTransactionForm';
import type { TransactionDetails } from '../types/transaction.types';

export default function EditTransactionModal({
  isVisible,
  setVisibility,
  transaction,
}: {
  isVisible: boolean;
  setVisibility: (visibility: boolean) => void;
  transaction: TransactionDetails;
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
      <EditTransactionForm
        transaction={transaction}
        setModalVisibility={setVisibility}
      />
    </div>
  );
}
