interface StatCardProps {
  title: string;
  value: number;
}

const StatCard = ({ title, value }: StatCardProps) => (
  <div className="bg-[#0b0f14] border border-[#00ff9d15] rounded-xl p-6 shadow-sm hover:border-[#00ff9d40] transition">
    <p className="text-xs uppercase tracking-wider text-gray-500">
      {title}
    </p>
    <h2 className="text-3xl font-semibold text-white mt-2">
      {value}
    </h2>
  </div>
);
