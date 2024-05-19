import ApologyForm from "@/components/ApologyForm";
import { fetchTicketById } from "@/services/ticketServices";
import { currentUser } from "@clerk/nextjs/server";

export default async function page({ params }) {
  const user = await currentUser();

  const { id } = params;

  const { data: ticket } = await fetchTicketById(id);
  // console.log(ticket);

  // check if the user is the owner of the ticket, if not redirect to the home page
  if (user?.emailAddresses[0].emailAddress !== ticket?.lender?.email) {
    redirect("/dashboard");
  }
  return (
    <>
      <div>Appologize</div>
      <>
        <ApologyForm ticket={ticket} />
      </>
    </>
  );
}
