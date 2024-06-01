import DeleteTicket from "@/components/DeleteTicket";
import ReturnAmountCard from "@/components/ReturnAmountCard";
import SendFullPaymentEmail from "@/components/SendFullPaymentEmail";
import SendReminderEmail from "@/components/SendReminderEmail";
import TicketCard from "@/components/TicketCard";
import { Button } from "@/components/ui/button";
import { fetchTicketById } from "@/services/ticketServices";
import { baseUrl } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function TicketDetails({ params }) {
  const user = await currentUser();

  const { id } = params;

  const { data: ticket } = await fetchTicketById(id);
  // console.log(ticket?.reminderSent);

  // check if the user is the owner of the ticket, if not redirect to the home page
  if (user?.emailAddresses[0].emailAddress !== ticket?.lender?.email) {
    redirect("/dashboard");
  }

  const paymentsBackArray = ticket?.paymentsBack;
  // Calculate the total payback amount
  let totalPaybackAmount = 0;
  paymentsBackArray.forEach((p) => {
    totalPaybackAmount += p.paybackAmount;
  });

  // Calculate the left amount to be paid
  const leftAmount = ticket?.loanAmount - totalPaybackAmount;
  // console.log(totalPaybackAmount, leftAmount);

  return (
    <>
      <>
        <TicketCard ticket={ticket} />
      </>

      {/* Updating the ticket details */}
      <div className="flex gap-3 my-3 justify-end items-center flex-wrap">
        {
          // If the ticket is not paid, then only show the reminder button
          leftAmount > 0 && <SendReminderEmail ticket={ticket} />
        }

        <Link href={`/preview/${ticket?._id}/details`}>
          <Button variant={`outline`}>Preview</Button>
        </Link>
        {leftAmount > 0 && (
          <Link href={`${baseUrl}/update-ticket/${ticket?._id}`}>
            <Button>Update</Button>
          </Link>
        )}
        <>
          <DeleteTicket ticket={ticket} />
        </>
      </div>

      {
        // If the ticket is fully paid, then only show the send full payment email button
        !ticket?.reminderSent && leftAmount === 0 && (
          <>
            <SendFullPaymentEmail ticket={ticket} />
          </>
        )
      }

      <div className="my-4 flex flex-col items-start justify-between gap-2">
        <h1>Details send to a wrong person? </h1>
        <Link href={`${baseUrl}/update-ticket/${ticket?._id}/apologize`}>
          <Button>Apologize</Button>
        </Link>
      </div>

      {/* Return Amount & Status along with date */}
      <div>
        <h1>Return Amount & Status along with date</h1>
      </div>
      {/* All payback details will be shown here */}
      <div className="my-3 flex flex-wrap gap-3 border px-5 py-3 rounded-md">
        {paymentsBackArray?.length > 0 ? (
          paymentsBackArray?.map((p, index) => {
            return (
              <ReturnAmountCard
                key={index}
                p={p}
                index={index}
                paybackStatus={ticket?.paybackStatus}
              />
            );
          })
        ) : (
          <div className="text-muted-foreground">
            No return amount added yet
          </div>
        )}
      </div>

      {/* Return Amount Status */}
      <div className="flex flex-wrap gap-3 border py-3 px-5 rounded-md">
        <div className="flex flex-col gap-1">
          <h1>Status</h1>
          <p
            className={`${
              ticket?.paybackStatus === "pending"
                ? "bg-red-200"
                : ticket?.paybackStatus === "partiallyPaid"
                ? "bg-yellow-200"
                : "bg-green-200"
            } text-black font-semibold py-1 px-3 text-center rounded-md`}
          >
            {ticket?.paybackStatus === "pending"
              ? "Pending"
              : ticket?.paybackStatus === "partiallyPaid"
              ? "Partially Paid"
              : "Fully Paid"}
          </p>
        </div>

        <div className="flex gap-1 flex-col">
          <h1>Total Paid</h1>
          <p className="bg-green-200 text-black font-semibold py-1 px-3 text-center rounded-md">
            ₹{totalPaybackAmount}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h1>Left Amount</h1>
          <p className="bg-red-200 text-black font-semibold text-center py-1 px-3 rounded-md">
            ₹{leftAmount}
          </p>
        </div>
      </div>

      {/* Updating the status of the ticket */}
      <div className="my-3 flex flex-col gap-2 items-end">
        <h1>Want to update status? </h1>
        <div>
          <Link href={`${baseUrl}/update-ticket/${ticket?._id}/payment-status`}>
            <Button>Update</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
