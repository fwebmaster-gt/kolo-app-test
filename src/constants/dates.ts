import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatDateEs(date: string | Date) {
  return format(new Date(date), "dd 'de' MMMM 'del' yyyy", {
    locale: es,
  });
}
