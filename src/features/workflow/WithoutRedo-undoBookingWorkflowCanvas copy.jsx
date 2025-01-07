// import React, { useState, useEffect } from "react";
// import ReactFlow, {
//   addEdge,
//   ReactFlowProvider,
//   applyNodeChanges,
//   applyEdgeChanges,
// } from "reactflow";
// import "reactflow/dist/style.css";
// import useCheckin from "../check-in-out/useCheckin";
// import { useBooking } from "../bookings/useBooking";
// import Spinner from "../../ui/Spinner";
// import { useSettings } from "../settings/useSettings";
// import useCheckout from "../check-in-out/useCheckout";
// import { useBookingWorkflow } from "./useBookingWorkflow";
// import Actions from "./Actions";

// const BookingWorkflowCanvas = ({ paramId }) => {
//   const { isLoading: isGettingBooking, booking: bookingData = {} } =
//     useBooking();
//   const { checkin } = useCheckin(Boolean(paramId));
//   const { checkout } = useCheckout();
//   const { settings, isLoading: isGettingSettings } = useSettings();

//   const [confirmPaid, setConfirmPaid] = useState(false);
//   const [addBreakfast, setAddBreakfast] = useState(false);

//   const {
//     id: bookingId,
//     status,
//     isPaid,
//     hasBreakfast,
//     numNights,
//     numGuests,
//   } = bookingData;

//   const { nodes, edges, setNodes, setEdges } = useBookingWorkflow({
//     status,
//     hasBreakfast,
//     isPaid,
//     bookingId,
//     paramId,
//   });

//   if (isGettingBooking || isGettingSettings) return <Spinner />;

//   const optionalBreakfastPrice =
//     settings.breakfastPrice * numNights * numGuests;

//   const handleCheckIn = () => {
//     if (!confirmPaid) return;
//     if (addBreakfast) {
//       checkin({
//         bookingId,
//         breakfast: {
//           hasBreakfast: true,
//           extrasPrice: optionalBreakfastPrice,
//           totalPrice: optionalBreakfastPrice,
//         },
//       });
//     } else {
//       checkin({ bookingId, breakfast: {} });
//     }
//   };

//   const handleCheckOut = () => {
//     // toast.success("Booking is successfully checked out");
//     checkout(bookingId);
//   };

//   const onNodesChange = (changes) =>
//     setNodes((prevNodes) => {
//       const updatedNodes = applyNodeChanges(changes, prevNodes);
//       // console.log("Updated Nodes:", updatedNodes);
//       return updatedNodes;
//     });

//   const onEdgesChange = (changes) =>
//     setEdges((prevEdges) => {
//       const updatedEdges = applyEdgeChanges(changes, prevEdges);
//       // console.log("Updated Edges:", updatedEdges);
//       return updatedEdges;
//     });

//   return (
//     <div style={{ height: "500px" }}>
//       <ReactFlowProvider>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={(params) => setEdges((eds) => addEdge(params, eds))}
//           fitView
//           snapToGrid
//           snapGrid={[15, 15]}
//         />
//       </ReactFlowProvider>

//       {/* Action Buttons */}
//       <div style={{ marginTop: "10px" }}>
//         <Actions
//           status={status}
//           hasBreakfast={hasBreakfast}
//           confirmPaid={confirmPaid}
//           onAddBreakfast={setAddBreakfast}
//           onConfirmPaid={() => setConfirmPaid(true)}
//           onCheckIn={handleCheckIn}
//           onCheckOut={handleCheckOut}
//         />
//       </div>
//     </div>
//   );
// };

// export default BookingWorkflowCanvas;
