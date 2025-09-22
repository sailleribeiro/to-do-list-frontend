import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { socialMediaLinks } from "@/constants/social-media";
import { Github, Linkedin, Palette } from "lucide-react";

export function DropdownUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex flex-row items-center gap-2 cursor-pointer bg-accent px-4 py-2 rounded-full hover:opacity-80 transition">
          Ellias Ribeiro
          <Avatar>
            <AvatarImage
              src={socialMediaLinks.githubphoto}
              alt="@sailleribeiro"
            />
            <AvatarFallback>Ellias Ribeiro</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Conheça minhas redes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            window.open(socialMediaLinks.linkedin, "_blank");
          }}
        >
          <Linkedin />
          LinkedIn
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            window.open(socialMediaLinks.github, "_blank");
          }}
        >
          <Github />
          GitHub
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            window.open(socialMediaLinks.behance, "_blank");
          }}
        >
          <Palette />
          Behance
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
