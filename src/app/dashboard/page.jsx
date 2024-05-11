import { fetchAllTicketsByUserId } from "@/services/ticketServices";
import { fetchUserByClerkId } from "@/services/userServices";
import { currentUser } from "@clerk/nextjs/server";
import dayjs from "dayjs";

export default async function Dashboard() {
  const user = await currentUser();

  const userData = await fetchUserByClerkId(user?.id);
  // console.log(userData?.data?._id);

  const noteData = await fetchAllTicketsByUserId(userData?.data?._id);
  // console.log(noteData);

  /*

        message: 'Loan ticket found',
        data: [
          {
            borrowerContactDetails: [Object],
            _id: '663f27b3948cec1a9a1c8f84',
            lender: [Object],
            borrowerName: 'Sumit Bhoumik',
            borrowerAddress: 'daharkundu',
            loanAmount: 100,
            loanReason: 'grocery',
            reminderSent: false,
            paybackStatus: 'pending',
            paymentsBack: [Array],
            loanDate: '2024-05-11T08:09:23.782Z',
            createdAt: '2024-05-11T08:09:23.785Z',
            updatedAt: '2024-05-11T08:09:23.785Z',
            __v: 0
          },
        ]
  */

  return (
    <div>
      <div>
        <h2>Here is your created loan ticket</h2>
      </div>
      <div>
        {noteData?.data?.map((note) => (
          <div key={note._id} className="border p-5 my-3 rounded-md">
            <h2>{note.lender.name}</h2>
            <p>{note.lender.email}</p>
            <h2>Borrower: {note.borrowerName}</h2>
            <p>{note.borrowerAddress}</p>
            <p>{note.borrowerContactDetails.borrowerEmail}</p>
            <p>{note.borrowerContactDetails.borrowerPhoneNumber}</p>
            <p>💰&nbsp;{note.loanAmount}</p>
            <h3>{note.loanReason}</h3>
            <p>{dayjs(note.loanDate).format("MMM D, YYYY hh:mm A")}</p>
            <p>Payback Status: {note.paybackStatus}</p>
            <div>
              {note.paymentsBack.map((payment) => (
                <div key={payment._id}>
                  <p>
                    {dayjs(payment.paybackDate).format("MMM D, YYYY hh:mm A")}
                  </p>
                  <p>{payment.paybackAmount}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
