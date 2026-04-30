import ProfilePicture from "../shapes/profilePicture";
import { useTranslation } from "react-i18next";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

type GuestBookCommentProps = {
  author: string;
  profilePicture?: string;
  content: string;
  timestamp: Date;
  timestampLocale?: Intl.DateTimeFormat;
};

function GuestBookComment({
  author,
  profilePicture,
  content,
  timestamp,
  timestampLocale = new Intl.DateTimeFormat(navigator.language, options),
}: GuestBookCommentProps) {

    const { t } = useTranslation();
    const isMobile = window.innerWidth < 640;

    const mobileOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const mobileLocale = new Intl.DateTimeFormat(navigator.language, mobileOptions);

  return (
    <div className="p-4 mb-4 flex justify-center max-h-full overflow-y-auto w-full rounded-xl glass border-glow">
      <div className="flex flex-col md:flex-row items-center md:items-start w-full">
        <ProfilePicture
          src={profilePicture ?? ""}
          className="w-20 h-20 md:w-24 md:h-24 mb-2 md:mb-0 md:mr-4 flex-shrink-0"
        />
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-baseline justify-center md:justify-start flex-wrap">
            <span className="font-bold text-base" style={{ color: "var(--color-text)" }}>
              {author} &nbsp;
            </span>
            <span className="text-sm md:ml-2 mt-1 md:mt-0" style={{ color: "var(--color-muted)" }}>
              { isMobile || <>{t("schrieb am")} &nbsp;</> }
            </span>
            <span className="text-sm md:ml-1 mt-1 md:mt-0" style={{ color: "var(--color-muted)" }}>
              {isMobile ? mobileLocale.format(timestamp) : timestampLocale.format(timestamp)}
            </span>
          </div>
          <p className="mt-2 whitespace-pre-line break-words text-sm" style={{ color: "var(--color-text-secondary)" }}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default GuestBookComment;
