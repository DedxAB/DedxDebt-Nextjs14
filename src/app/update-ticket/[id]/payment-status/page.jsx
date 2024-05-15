import TicketCard from "@/components/TicketCard";
import UpdateStatusForm from "@/components/UpdateStatusForm";
import { fetchTicketById } from "@/services/ticketServices";

export default async function PaymentStatusUpdate({ params }) {
  const { id } = params;
  const { data } = await fetchTicketById(id);

  return (
    <div>
      Update Status
      <div>
        <TicketCard note={data} />
      </div>
      <div>
        <UpdateStatusForm note={data} />
      </div>
    </div>
  );
}
