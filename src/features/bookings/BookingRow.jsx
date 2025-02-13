import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
  HiArrowDown,
  HiArrowUpOnSquare,
  HiEye,
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

// function BookingRow({
//   booking: {
//     id: bookingId,
//     created_at,
//     startDate,
//     endDate,
//     numNights,
//     numGuests,
//     totalPrice,
//     status,
//     guests: { fullName: guestName, email },
//     cabins: { name: cabinName },
//   },
// }) {
//   guestName = guestName || "Unknown";
//   email = email || "N/A";
//   cabinName = cabinName || "Unknown";
//   const statusToTagName = {
//     unconfirmed: "blue",
//     "checked-in": "green",
//     "checked-out": "silver",
//   };

//   return (
//     <Table.Row>
//       <Cabin>{cabinName}</Cabin>

//       <Stacked>
//         <span>{guestName}</span>
//         <span>{email}</span>
//       </Stacked>

//       <Stacked>
//         <span>
//           {isToday(new Date(startDate))
//             ? "Today"
//             : formatDistanceFromNow(startDate)}{" "}
//           &rarr; {numNights} night stay
//         </span>
//         <span>
//           {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
//           {format(new Date(endDate), "MMM dd yyyy")}
//         </span>
//       </Stacked>

//       <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

//       <Amount>{formatCurrency(totalPrice)}</Amount>
//     </Table.Row>
//   );
// }

// export default BookingRow;

////**************************************** Building the Single Booking Page
//// We gonna use that menus compound component here we will use menus.menu
//// after go and create Booking.jsx in Pages

// function BookingRow({
//   booking: {
//     id: bookingId,
//     created_at,
//     startDate,
//     endDate,
//     numNights,
//     numGuests,
//     totalPrice,
//     status,
//     guests: { fullName: guestName, email },
//     cabins: { name: cabinName },
//   },
// }) {
//   const navigate = useNavigate();
//   guestName = guestName || "Unknown";
//   email = email || "N/A";
//   cabinName = cabinName || "Unknown";
//   const statusToTagName = {
//     unconfirmed: "blue",
//     "checked-in": "green",
//     "checked-out": "silver",
//   };

//   return (
//     <Table.Row>
//       <Cabin>{cabinName}</Cabin>

//       <Stacked>
//         <span>{guestName}</span>
//         <span>{email}</span>
//       </Stacked>

//       <Stacked>
//         <span>
//           {isToday(new Date(startDate))
//             ? "Today"
//             : formatDistanceFromNow(startDate)}{" "}
//           &rarr; {numNights} night stay
//         </span>
//         <span>
//           {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
//           {format(new Date(endDate), "MMM dd yyyy")}
//         </span>
//       </Stacked>

//       <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

//       <Amount>{formatCurrency(totalPrice)}</Amount>

//       <Menus.Menu>
//         <Menus.Toggle id={bookingId} />
//         <Menus.List id={bookingId}>
//           <Menus.Button
//             icon={<HiEye />}
//             onClick={() => navigate(`/bookings/${bookingId}`)}
//           >
//             See Details
//           </Menus.Button>
//         </Menus.List>
//       </Menus.Menu>
//     </Table.Row>
//   );
// }

// export default BookingRow;

////***************************************** Checking In a Booking and Check-Out
//// All bookings can not be checked in as those who have already checked can not be checked in/checked out so lets add condition
//// Go and add same in BookingDetail.jsx
//// after useCheckout pass onClick in check-out
//// Add the same as button in BookingDetail.jsx

// function BookingRow({
//   booking: {
//     id: bookingId,
//     created_at,
//     startDate,
//     endDate,
//     numNights,
//     numGuests,
//     totalPrice,
//     status,
//     guests: { fullName: guestName, email },
//     cabins: { name: cabinName },
//   },
// }) {
//   const { checkout, isCheckingOut } = useCheckout();
//   const navigate = useNavigate();
//   guestName = guestName || "Unknown";
//   email = email || "N/A";
//   cabinName = cabinName || "Unknown";
//   const statusToTagName = {
//     unconfirmed: "blue",
//     "checked-in": "green",
//     "checked-out": "silver",
//   };

//   return (
//     <Table.Row>
//       <Cabin>{cabinName}</Cabin>

//       <Stacked>
//         <span>{guestName}</span>
//         <span>{email}</span>
//       </Stacked>

//       <Stacked>
//         <span>
//           {isToday(new Date(startDate))
//             ? "Today"
//             : formatDistanceFromNow(startDate)}{" "}
//           &rarr; {numNights} night stay
//         </span>
//         <span>
//           {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
//           {format(new Date(endDate), "MMM dd yyyy")}
//         </span>
//       </Stacked>

//       <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

//       <Amount>{formatCurrency(totalPrice)}</Amount>

//       <Menus.Menu>
//         <Menus.Toggle id={bookingId} />
//         <Menus.List id={bookingId}>
//           <Menus.Button
//             icon={<HiEye />}
//             onClick={() => navigate(`/bookings/${bookingId}`)}
//           >
//             See Details
//           </Menus.Button>
//           {status === "unconfirmed" && (
//             <Menus.Button
//               icon={<HiArrowDown />}
//               onClick={() => navigate(`/checkin/${bookingId}`)}
//             >
//               Check in
//             </Menus.Button>
//           )}
//           {status === "checked-in" && (
//             <Menus.Button
//               icon={<HiArrowUpOnSquare />}
//               onClick={() => checkout(bookingId)}
//               disabled={isCheckingOut}
//             >
//               Check out
//             </Menus.Button>
//           )}
//         </Menus.List>
//       </Menus.Menu>
//     </Table.Row>
//   );
// }

// export default BookingRow;

////***************************************** Deleting a Booking
// lets bring Modal, create useDeleteBooking.js hook
// Implement this in booking detail also

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const navigate = useNavigate();
  guestName = guestName || "Unknown";
  email = email || "N/A";
  cabinName = cabinName || "Unknown";
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDown />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}
            <Menus.Button
              icon={<HiOutlineArrowPath />}
              onClick={() => navigate(`/workflow/${bookingId}`)}
            >
              See Work Flow
            </Menus.Button>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
