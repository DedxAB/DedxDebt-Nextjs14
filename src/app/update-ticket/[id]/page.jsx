import TicketCard from "@/components/TicketCard";
import UpdateTicketForm from "@/components/UpdateTicketForm";
import { fetchTicketById } from "@/services/ticketServices";

export default async function UpdateTicket({ params }) {
  const { id } = params;
  const { data } = await fetchTicketById(id);
  return (
    <div>
      UpdateTicket
      <div>
        <TicketCard note={data} />
      </div>
      <div>
        <UpdateTicketForm note={data} />
      </div>
    </div>
  );
}
