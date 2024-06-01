import ReturnAmountCard from "@/components/ReturnAmountCard";
import TicketCard from "@/components/TicketCard";
import { fetchTicketById } from "@/services/ticketServices";

export default async function Preview({ params }) {
  const { id } = params;
  const data = await fetchTicketById(id);
  let ticket = data?.data;
  //   console.log(ticket);

  if (!ticket) {
    return (
      <>
        <h2>Sorry the ticket you are looking for is not available.</h2>
      </>
    );
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
      <h1>Preview</h1>
      <>
        <TicketCard ticket={ticket} />
      </>
      {/* Return Amount & Status along with date */}
      <div className="mt-10">
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
    </>
  );
}
