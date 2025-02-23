import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "es", name: "Español", flag: "ES" },
  { code: "fr", name: "Français", flag: "FR" },
  { code: "ar", name: "العربية", flag: "MA" },
  { code: "en", name: "English", flag: "GB" },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const switchLanguage = (lang: string) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shadow-none border-none bg-gray-100 rounded-full"
        >
          {/* <Globe className="h-[1.2rem] w-[1.2rem]" /> */}
          <Flag
            code={
              languages.find((lang) => lang.code === i18n.language)?.flag ||
              "FR"
            }
            classN="w-7 h-7 bg-red-600 rounded-full  "
          />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div
          className="  rounded-lg mb-2 overflow-hidden bg-[url('/bus.jpg')] bg-cover bg-center"
          style={{ minWidth: "12rem" }}
        >
          <div
            className="flex items-center justify-between w-full p-4 bg-black/50"
            style={{ minWidth: "12rem" }}
          >
            <h1
              className="text-sm font-semibold text-white text-center "
              style={{ minWidth: "12rem" }}
            >
              {t("Select_your_language")}
            </h1>
          </div>
        </div>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={
              "cursor-pointer  mb-2 shadow-none " +
              (i18n.language === lang.code
                ? "font-semibold bg-blue-600 text-white hover:bg-blue-600"
                : "bg-slate-50 hover:bg-slate-100")
            }
          >
            {/* <span className="mr-2">{lang.flag}</span> */}
            <Flag code={lang.flag} classN="w-8  mr-4" />
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Flag = ({ code, classN }: { code: string; classN: string }) => (
  <img
    src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
    alt={code}
    className={classN}
  />
);
