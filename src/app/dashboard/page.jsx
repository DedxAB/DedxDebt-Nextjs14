import TicketCard from "@/components/TicketCard";
import { fetchAllTicketsByUserId } from "@/services/ticketServices";
import { fetchUserByClerkId } from "@/services/userServices";
import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser();

  const userData = await fetchUserByClerkId(user?.id);
  // console.log(userData?.data?._id);

  const ticketData = await fetchAllTicketsByUserId(userData?.data?._id);
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
        {ticketData?.data?.map((ticket) => (
          <TicketCard key={ticket?._id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
