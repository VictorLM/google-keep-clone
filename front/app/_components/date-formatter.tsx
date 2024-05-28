import { parseISO, format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <time
      dateTime={dateString}
      className="smaller text-muted fw-light fst-italic"
    >
      {format(date, "d LLLL, yyyy HH:mm", { locale: ptBR })}
    </time>
  );
};

export default DateFormatter;
