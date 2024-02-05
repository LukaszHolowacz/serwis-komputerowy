import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';

export function formatDate(dateString) {
  const parsedDate = parseISO(dateString);
  return format(parsedDate, "d MMMM yyyy HH:mm", { locale: pl });
}
