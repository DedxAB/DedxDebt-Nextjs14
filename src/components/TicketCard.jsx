"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TicketCard({ ticket }) {
  const router = useRouter();

  const paymentsBackArray = ticket?.paymentsBack;
  // Calculate the total payback amount
  let totalPaybackAmount = 0;
  paymentsBackArray.forEach((p) => {
    totalPaybackAmount += p.paybackAmount;
  });

  // Calculate the left amount to be paid
  const leftAmount = ticket?.loanAmount - totalPaybackAmount;

  return (
    <>
      <div
        className="border relative px-5 py-3 my-3 rounded-md cursor-pointer"
        onClick={() => router.push(`/ticket/${ticket?._id}/details`)}
      >
        {ticket?.lender?.name && <h2>Lender Name: {ticket?.lender?.name}</h2>}
        {ticket?.lender?.email && <p>Lender email: {ticket?.lender?.email}</p>}
        {ticket?.borrowerName && <h2>Borrower: {ticket?.borrowerName}</h2>}
        {ticket?.borrowerAddress && <p>Address: {ticket?.borrowerAddress}</p>}
        {ticket?.loanAmount && (
          <p>
            Borrowed Amount: <strong>₹{ticket?.loanAmount}</strong>
          </p>
        )}
        {ticket?.loanReason && <p>Reason: {ticket?.loanReason}</p>}
        {ticket?.borrowerContactDetails?.borrowerEmail && (
          <p>Email: {ticket?.borrowerContactDetails?.borrowerEmail}</p>
        )}
        {ticket?.borrowerContactDetails?.borrowerPhoneNumber && (
          <p>
            Phone Number: {ticket?.borrowerContactDetails?.borrowerPhoneNumber}
          </p>
        )}

        <p>Borrowed Date: {dayjs(ticket?.loanDate).format("MMM D, YYYY")}</p>
        {/* {pathname === `/ticket/${ticket._id}/details` && (
        <>
          <p>
            Payback Status:{" "}
            {ticket.paybackStatus === "partiallyPaid"
              ? "Some Paid"
              : ticket.paybackStatus}
          </p>
          <div>
            {ticket.paymentsBack.map((payment) => (
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
        {leftAmount === 0 && (
          <div className="absolute right-0 bottom-[-5px]">
            <Image
              src={`/paid-red-stamp-over-white-600nw-126589832.png`}
              alt="paidImage"
              width={150}
              height={20}
            />
          </div>
        )}
      </div>
    </>
  );
}
