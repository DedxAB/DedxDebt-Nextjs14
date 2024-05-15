import TicketCard from "@/components/TicketCard";
import { Button } from "@/components/ui/button";
import { fetchTicketById } from "@/services/ticketServices";
import { baseUrl } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function TicketDetails({ params }) {
  const user = await currentUser();

  const { id } = params;

  const { data: note } = await fetchTicketById(id);
  // console.log(note);

  // check if the user is the owner of the ticket, if not redirect to the home page
  if (user?.emailAddresses[0].emailAddress !== note?.lender?.email) {
    redirect("/");
  }

  const paymentsBackArray = note?.paymentsBack;
  // Calculate the total payback amount
  let totalPaybackAmount = 0;
  paymentsBackArray.forEach((p) => {
    totalPaybackAmount += p.paybackAmount;
  });

  // Calculate the left amount to be paid
  const leftAmount = note?.loanAmount - totalPaybackAmount;
  // console.log(totalPaybackAmount, leftAmount);

  return (
    <>
      <div>
        <TicketCard note={note} />
      </div>

      {/* Updating the ticket details */}
      <div className="flex gap-3 my-3">
        <Link href={`${baseUrl}/update-ticket/${note?._id}`}>
          <Button>Update</Button>
        </Link>
        <Button>Delete</Button>
      </div>

      {/* All payback details will be shown here */}
      <div className="my-3">
        {paymentsBackArray?.length > 0 ? (
          paymentsBackArray?.map((p, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-2 flex-wrap justify-start"
              >
                <div className="flex flex-col gap-2 my-2">
                  <h1>Payback Amount {index + 1}</h1>
                  <p
                    className={`${
                      note?.paybackStatus === "pending"
                        ? "bg-red-200"
                        : note?.paybackStatus === "partiallyPaid"
                        ? "bg-yellow-200"
                        : "bg-green-200"
                    } text-black font-semibold py-2 px-4 rounded-md text-center`}
                  >
                    Rs. {p.paybackAmount}
                  </p>
                </div>
                <div className="flex flex-col gap-2 my-2">
                  <h1>Payback Date {index + 1}</h1>
                  <p
                    className={`${
                      note?.paybackStatus === "pending"
                        ? "bg-red-200"
                        : note?.paybackStatus === "partiallyPaid"
                        ? "bg-yellow-200"
                        : "bg-green-200"
                    } text-black font-semibold py-2 px-4 rounded-md`}
                  >
                    {format(p.paybackDate, "PPPP")}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No payback details found</h1>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="">
          <h1>Payback Status</h1>
          <p
            className={`${
              note?.paybackStatus === "pending"
                ? "bg-red-200"
                : note?.paybackStatus === "partiallyPaid"
                ? "bg-yellow-200"
                : "bg-green-200"
            } text-black font-semibold py-2 px-4 text-center rounded-md`}
          >
            {note?.paybackStatus === "pending"
              ? "Pending"
              : note?.paybackStatus === "partiallyPaid"
              ? "Partially Paid"
              : "Fully Paid"}
          </p>
        </div>

        <div>
          <h1>Total Paid Amount</h1>
          <p className="bg-green-200 text-black font-semibold py-2 px-4 text-center rounded-md">
            Rs. {totalPaybackAmount}
          </p>
        </div>
        <div>
          <h1>Left Amount to be paid</h1>
          <p className="bg-red-200 text-black font-semibold text-center py-2 px-4 rounded-md">
            Rs. {leftAmount}
          </p>
        </div>
      </div>

      {/* Updating the status of the ticket */}
      <div className="my-3 flex flex-col gap-2">
        <h1>Want to update status? </h1>
        <div>
          <Link href={`${baseUrl}/update-ticket/${note?._id}/payment-status`}>
            <Button>Update Status</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
