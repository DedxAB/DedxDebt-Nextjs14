"use client";

import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";

export default function TicketCard({ note }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="border p-5 my-3 rounded-md cursor-pointer"
      onClick={() => router.push(`/ticket/${note?._id}/details`)}
    >
      <h2>Lender Name: {note.lender.name}</h2>
      <p>Lender email: {note.lender.email}</p>
      <h2>Borrower: {note.borrowerName}</h2>
      <p>Address: {note.borrowerAddress}</p>
      <p>Email: {note.borrowerContactDetails.borrowerEmail}</p>
      <p>Phone No.: {note.borrowerContactDetails.borrowerPhoneNumber}</p>
      <p>Loan Amount: Rs.&nbsp;{note.loanAmount}</p>
      <h3>Reason: {note.loanReason}</h3>
      <p>Loan Date: {dayjs(note.loanDate).format("MMM D, YYYY")}</p>
      {/* {pathname === `/ticket/${note._id}/details` && (
        <>
          <p>
            Payback Status:{" "}
            {note.paybackStatus === "partiallyPaid"
              ? "Some Paid"
              : note.paybackStatus}
          </p>
          <div>
            {note.paymentsBack.map((payment) => (
              <div key={payment._id}>
                <p>
                  Payback Date:&nbsp;
                  {dayjs(payment.paybackDate).format("MMM D, YYYY")}
                </p>
                <p>Payback Amount: Rs. {payment.paybackAmount}</p>
              </div>
            ))}
          </div>
        </>
      )} */}
    </div>
  );
}
