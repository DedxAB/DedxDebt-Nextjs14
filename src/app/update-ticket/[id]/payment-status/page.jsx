import TicketCard from "@/components/TicketCard";
import UpdateStatusForm from "@/components/UpdateStatusForm";
import { fetchTicketById } from "@/services/ticketServices";
import { fetchUserByClerkId } from "@/services/userServices";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PaymentStatusUpdate({ params }) {
  const user = await currentUser();
  const { id } = params;

  // fetch user data from the database
  const data = await fetchUserByClerkId(user?.id);
  let currentUserData = data?.data ? data?.data : null;

  const { data: ticket } = await fetchTicketById(id);

  // check if the user is the owner of the ticket, if not redirect to the home page
  if (user?.emailAddresses[0].emailAddress !== ticket?.lender?.email) {
    redirect("/");
  }

  return (
    <div>
      Update Status
      <>
        <TicketCard ticket={ticket} />
      </>
      <>
        <UpdateStatusForm ticket={ticket} currentUserData={currentUserData} />
      </>
    </div>
  );
}
