export default function Badge({ status }) {
  const styles = {
    Selesai: 'bg-green-100 text-green-700 border border-green-200',
    Disetujui: 'bg-green-100 text-green-700 border border-green-200',
    Menunggu: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    Diproses: 'bg-blue-100 text-blue-700 border border-blue-200',
    Ditolak: 'bg-red-100 text-red-700 border border-red-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}
