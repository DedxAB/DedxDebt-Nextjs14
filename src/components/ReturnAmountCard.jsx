import dayjs from "dayjs";

export default function ReturnAmountCard({ p, index, paybackStatus }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-col gap-2">
          <h1>Return Amount {index + 1}</h1>
          <p
            className={`${
              paybackStatus === "pending"
                ? "bg-red-200"
                : paybackStatus === "partiallyPaid"
                ? "bg-yellow-200"
                : "bg-green-200"
            } text-black font-semibold px-3 py-1 rounded-md text-center`}
          >
            ₹{p.paybackAmount}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h1>Return Date {index + 1}</h1>
          <p
            className={`${
              paybackStatus === "pending"
                ? "bg-red-200"
                : paybackStatus === "partiallyPaid"
                ? "bg-yellow-200"
                : "bg-green-200"
            } text-black font-semibold px-3 py-1 rounded-md`}
          >
            {dayjs(p.paybackDate).format("MMM D, YYYY")}
          </p>
        </div>
      </div>
    </>
  );
}
