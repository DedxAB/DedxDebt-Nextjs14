import TicketCard from "@/components/TicketCard";
import UpdateTicketForm from "@/components/UpdateTicketForm";
import { fetchTicketById } from "@/services/ticketServices";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function UpdateTicket({ params }) {
  const user = await currentUser();
  const { id } = params;
  const { data: ticket } = await fetchTicketById(id);

  // check if the user is the owner of the ticket, if not redirect to the home page
  if (user?.emailAddresses[0].emailAddress !== ticket?.lender?.email) {
    redirect("/");
  }

  return (
    <div>
      UpdateTicket
      <div>
        <TicketCard note={ticket} />
      </div>
      <div>
        <UpdateTicketForm note={ticket} />
      </div>
    </div>
  );
}
