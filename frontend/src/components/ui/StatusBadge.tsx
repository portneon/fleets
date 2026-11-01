import React from 'react';

export type BadgeStatus = 'pending' | 'in_review' | 'verified' | 'rejected' | 'active';

interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className = '',
}) => {
  const configs: Record<
    BadgeStatus,
    { bg: string; text: string; dot: string; defaultLabel: string }
  > = {
    pending: {
      bg: 'bg-[#F0EEF5]',
      text: 'text-[#362F4F]',
      dot: 'bg-[#362F4F]',
      defaultLabel: 'Pending Submission',
    },
    in_review: {
      bg: 'bg-[#FEF9C3]',
      text: 'text-[#B7791F]',
      dot: 'bg-[#B7791F]',
      defaultLabel: 'Under Verification',
    },
    verified: {
      bg: 'bg-[#DCFCE7]',
      text: 'text-[#23845B]',
      dot: 'bg-[#23845B]',
      defaultLabel: 'Verified',
    },
    rejected: {
      bg: 'bg-[#FEE2E2]',
      text: 'text-[#C84C4C]',
      dot: 'bg-[#C84C4C]',
      defaultLabel: 'Action Required',
    },
    active: {
      bg: 'bg-[#DCFCE7]',
      text: 'text-[#23845B]',
      dot: 'bg-[#23845B]',
      defaultLabel: 'Active',
    },
  };

  const config = configs[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{label || config.defaultLabel}</span>
    </span>
  );
};

