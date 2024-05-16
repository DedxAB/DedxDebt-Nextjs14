import TicketCard from "@/components/TicketCard";
import UpdateStatusForm from "@/components/UpdateStatusForm";
import { fetchTicketById } from "@/services/ticketServices";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PaymentStatusUpdate({ params }) {
  const user = await currentUser();
  const { id } = params;
  const { data: ticket } = await fetchTicketById(id);

  // check if the user is the owner of the ticket, if not redirect to the home page
  if (user?.emailAddresses[0].emailAddress !== ticket?.lender?.email) {
    redirect("/");
  }

  return (
    <div>
      Update Status
      <div>
        <TicketCard ticket={ticket} />
      </div>
      <div>
        <UpdateStatusForm ticket={ticket} />
      </div>
    </div>
  );
}
