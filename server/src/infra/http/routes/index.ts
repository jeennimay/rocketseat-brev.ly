import { createShortLink } from "./create-short-link";
import { deleteLink } from "./delete-link";
import { exportLinks } from "./export-links";
import { getLinks } from "./get-links";
import { getLink } from "./get-one-link";
import { increaseLinkAccesss } from "./increase-link-access";

export const routes = {
    createShortLink,
    deleteLink,
    exportLinks,
    getLink,
    getLinks,
    increaseLinkAccesss,
}