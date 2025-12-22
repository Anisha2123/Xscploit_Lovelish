import React from "react";

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description?: string;
  href?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  icon,
  title,
  value,
  description,
  href,
}) => {
  const Wrapper = href ? "a" : "div";

  return (
    <Wrapper
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`group flex gap-4 p-4 rounded-xl transition
        ${href ? "cursor-pointer hover:bg-white/5" : ""}
      `}
    >
      <div className="text-[#00ff9d] text-lg mt-1">
        {icon}
      </div>

      <div>
        <h4 className="text-white font-medium">{title}</h4>

        <p className="text-sm text-gray-300 group-hover:text-[#00ff9d] transition">
          {value}
        </p>

        {description && (
          <p className="mt-1 text-xs text-gray-500">
            {description}
          </p>
        )}
      </div>
    </Wrapper>
  );
};

export default ContactInfo;
