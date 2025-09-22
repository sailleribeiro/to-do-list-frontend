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

export function DropdownUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={socialMediaLinks.githubphoto}
            alt="@sailleribeiro"
          />
          <AvatarFallback>Ellias Ribeiro</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Conheça minhas redes</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            window.open(socialMediaLinks.linkedin, "_blank");
          }}
        >
          LinkedIn
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            window.open(socialMediaLinks.github, "_blank");
          }}
        >
          GitHub
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            window.open(socialMediaLinks.behance, "_blank");
          }}
        >
          Behance
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
