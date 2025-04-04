
import React, { ReactNode } from "react";

interface ActivityItemProps {
  icon: ReactNode;
  iconBackgroundColor: string;
  iconColor: string;
  text: string;
  timeAgo: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  iconBackgroundColor,
  iconColor,
  text,
  timeAgo,
}) => {
  return (
    <li className="flex items-center gap-4">
      <div className={`${iconBackgroundColor} ${iconColor} p-2 rounded-full`}>
        {icon}
      </div>
      <div>
        <p className="text-sm">{text}</p>
        <p className="text-xs text-gray-500">{timeAgo}</p>
      </div>
    </li>
  );
};

export default ActivityItem;
